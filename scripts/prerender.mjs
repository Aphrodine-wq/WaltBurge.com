// Per-route static HTML so every page ships its own crawler-visible <title>,
// description, canonical, OG tags — AND its own JSON-LD structured data. Runs as
// `postbuild`, after `vite build`, writing dist/<route>/index.html variants of
// dist/index.html.
//
// Two things happen per route: (1) the head meta tags are swapped (what crawlers
// and social unfurlers read), and (2) a route-typed application/ld+json block is
// injected before </head> — BlogPosting, Service, SoftwareApplication,
// LocalBusiness (with geo), each wrapped in a BreadcrumbList. Vercel serves the
// static file before the SPA catch-all rewrite, so each URL gets the right head
// with zero routing changes.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://waltburge.com';
const SUFFIX = ' | Walt Burge';

const template = readFileSync(path.join(DIST, 'index.html'), 'utf8');

const AUTHOR = { '@type': 'Person', name: 'Walt Burge', url: ORIGIN };

function esc(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function frontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  if (!m) return data;
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '');
  }
  return data;
}

// Schema.org helpers ────────────────────────────────────────────────────────

// Breadcrumb trail. Pass [name, route] pairs from home down to the page.
function crumbs(pairs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pairs.map(([name, route], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${ORIGIN}${route}`,
    })),
  };
}

function faqPage(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// North MS towns the local pages target, with geo for LocalBusiness schema.
const TOWNS = {
  oxford: { name: 'Oxford', lat: 34.3665, lng: -89.5192 },
  tupelo: { name: 'Tupelo', lat: 34.2576, lng: -88.7034 },
  southaven: { name: 'Southaven', lat: 34.9889, lng: -90.0126 },
  starkville: { name: 'Starkville', lat: 33.4504, lng: -88.8184 },
  batesville: { name: 'Batesville', lat: 34.312, lng: -89.9462 },
  'new-albany': { name: 'New Albany', lat: 34.4943, lng: -89.0066 },
};

// Match the town by known suffix — industry slugs also contain hyphens
// (real-estate, new-albany), so a regex would be ambiguous. endsWith is exact.
function townForSlug(slug) {
  for (const key of Object.keys(TOWNS)) {
    if (slug.endsWith(`-${key}-ms`)) return TOWNS[key];
  }
  return null;
}

// Inject the head: swap meta tags, then add the per-page JSON-LD before </head>.
function render({ route, title, description, jsonLd }) {
  const url = `${ORIGIN}${route}`;
  let html = template;
  const subs = [
    [/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`],
    [/(<meta name="description" content=")[\s\S]*?(")/, `$1${esc(description)}$2`],
    [/(<link rel="canonical" href=")[\s\S]*?(")/, `$1${url}$2`],
    [/(<meta property="og:url" content=")[\s\S]*?(")/, `$1${url}$2`],
    [/(<meta property="og:title" content=")[\s\S]*?(")/, `$1${esc(title)}$2`],
    [/(<meta property="og:description" content=")[\s\S]*?(")/, `$1${esc(description)}$2`],
    [/(<meta name="twitter:url" content=")[\s\S]*?(")/, `$1${url}$2`],
    [/(<meta name="twitter:title" content=")[\s\S]*?(")/, `$1${esc(title)}$2`],
    [/(<meta name="twitter:description" content=")[\s\S]*?(")/, `$1${esc(description)}$2`],
  ];
  for (const [re, rep] of subs) html = html.replace(re, rep);

  if (jsonLd) {
    const list = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    // Escape "<" so a stray "</script>" in any text can't break out of the tag.
    const blocks = list
      .map(o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
      .join('\n    ');
    html = html.replace('</head>', `    ${blocks}\n  </head>`);
  }
  return html;
}

function emit(route, title, description, jsonLd) {
  const dir = path.join(DIST, route.replace(/^\//, ''));
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), render({ route, title, description, jsonLd }));
}

const routes = [];

// Blog index + posts
routes.push(['/blog', `Blog — Notes on Building AI${SUFFIX}`,
  'Essays on AI consciousness, AI ethics, custom models, and building software from the job site up. By Walt Burge, AI consultant in Oxford, MS.']);
for (const f of readdirSync(path.join(ROOT, 'content', 'blog')).filter(f => f.endsWith('.md'))) {
  const fm = frontmatter(readFileSync(path.join(ROOT, 'content', 'blog', f), 'utf8'));
  if (fm.draft === 'true') continue;
  const slug = fm.slug || f.replace(/\.md$/, '');
  const route = `/blog/${slug}`;
  const title = fm.title || slug;
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: fm.excerpt || '',
      url: `${ORIGIN}${route}`,
      mainEntityOfPage: `${ORIGIN}${route}`,
      ...(fm.date ? { datePublished: fm.date, dateModified: fm.date } : {}),
      author: AUTHOR,
      publisher: AUTHOR,
      ...(fm.category ? { articleSection: fm.category } : {}),
      image: `${ORIGIN}/og-image.png`,
    },
    crumbs([['Home', '/'], ['Blog', '/blog'], [title, route]]),
  ];
  routes.push([route, `${title}${SUFFIX}`, fm.excerpt || '', ld]);
}

// Services index + industry menus
routes.push(['/services', `Service Menu — Software & AI by Industry${SUFFIX}`,
  'Full Walt Builds service menu: websites, automations, integrations, and custom AI systems, priced and built to own. Healthcare, law, construction, and more — Oxford, MS.']);
for (const f of readdirSync(path.join(ROOT, 'content', 'services')).filter(f => f.endsWith('.md'))) {
  const slug = f.replace(/\.md$/, '');
  const raw = readFileSync(path.join(ROOT, 'content', 'services', f), 'utf8');
  const m = raw.match(/^###\s+(.+?)\s+Services\.?\s*$/m);
  const industry = m ? m[1].trim() : slug;
  const route = `/services/${slug}`;
  const desc = `Custom software and AI for ${industry.toLowerCase()} — websites, automations, integrations, and AI systems, built and owned. Walt Builds, Oxford MS.`;
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${industry} Software & AI Services`,
      description: desc,
      serviceType: `${industry} AI & software`,
      provider: AUTHOR,
      areaServed: { '@type': 'State', name: 'Mississippi' },
      url: `${ORIGIN}${route}`,
    },
    crumbs([['Home', '/'], ['Services', '/services'], [industry, route]]),
  ];
  routes.push([route, `${industry} Software & AI Services${SUFFIX}`, desc, ld]);
}

// Shop index + AI systems
const systems = JSON.parse(readFileSync(path.join(ROOT, 'content', 'shop', 'systems.json'), 'utf8'));
routes.push(['/shop', `Shop — AI Systems You Can Buy${SUFFIX}`,
  'Productized AI systems built and installed for your business: AI receptionists, intake, estimating, document drafting, and more. Walt Builds, Oxford MS.']);
for (const s of systems) {
  const route = `/shop/${s.slug}`;
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: s.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cloud',
      description: s.seoDescription,
      author: AUTHOR,
      url: `${ORIGIN}${route}`,
    },
    crumbs([['Home', '/'], ['Shop', '/shop'], [s.name, route]]),
  ];
  routes.push([route, `${s.seoTitle}${SUFFIX}`, s.seoDescription, ld]);
}

// Résumé — recruiter-facing landing. ProfilePage wrapping the Person, plus a
// breadcrumb, so the page that lands a job is its own crawlable, structured URL.
routes.push(['/resume', `Résumé — AI Developer (Data Science & Learning Systems)${SUFFIX}`,
  'Walt Burge — AI developer in Oxford, MS, focused on data science and AI learning systems. Self-taught in seven months; trained a custom LLM end to end and built the tooling and agent systems around it. Skills, selected work, and contact. Open to AI / ML roles.',
  [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Walt Burge',
        alternateName: 'James Burge',
        jobTitle: 'AI Developer',
        url: `${ORIGIN}/resume`,
        email: 'jamesburge.mcm@gmail.com',
        telephone: '+1-662-292-5533',
        sameAs: ['https://github.com/Aphrodine-wq'],
        knowsAbout: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'LLM Fine-Tuning', 'Model Distillation', 'Dataset Curation', 'PyTorch', 'Llama', 'RAG', 'Embeddings', 'LangChain', 'MCP', 'Agentic AI', 'Python'],
        address: { '@type': 'PostalAddress', addressLocality: 'Oxford', addressRegion: 'MS', addressCountry: 'US' },
      },
    },
    crumbs([['Home', '/'], ['Résumé', '/resume']]),
  ]]);

// Free audit — the lead-magnet landing page.
routes.push(['/audit', `Free Website & Intake Audit — Oxford, MS${SUFFIX}`,
  'Get a free one-page audit of your business website from Walt Burge in Oxford, MS — forms and patient-data compliance, speed and search, and where you are losing leads. Plain English, two business days, no strings.',
  [
    crumbs([['Home', '/'], ['Free audit', '/audit']]),
  ]]);

// Selected work — portfolio + client case studies (skip scaffolded drafts).
const workItems = JSON.parse(readFileSync(path.join(ROOT, 'content', 'work', 'items.json'), 'utf8'));
routes.push(['/work', `Selected Work — Products, Platforms & AI${SUFFIX}`,
  'Selected work by Walt Burge: construction marketplaces, custom AI models, developer platforms, and client builds — shipped end to end from Oxford, MS.']);
for (const w of workItems) {
  if (w.draft) continue;
  const route = `/work/${w.slug}`;
  const title = w.seoTitle || w.title;
  const desc = w.seoDescription || w.summary || w.description || '';
  const ld = [crumbs([['Home', '/'], ['Work', '/work'], [w.title, route]])];
  routes.push([route, `${title}${SUFFIX}`, desc, ld]);
}

// Local industry landing pages — LocalBusiness w/ geo + FAQ + breadcrumb.
const localPages = JSON.parse(readFileSync(path.join(ROOT, 'content', 'local', 'pages.json'), 'utf8'));
for (const p of localPages) {
  const route = `/${p.slug}`;
  const town = townForSlug(p.slug);
  const local = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Walt Burge — ${p.industry} AI${town ? `, ${town.name} MS` : ''}`,
    description: p.seoDescription,
    url: `${ORIGIN}${route}`,
    telephone: '+1-662-292-5533',
    email: 'jamesburge.mcm@gmail.com',
    priceRange: '$$',
    provider: AUTHOR,
    address: {
      '@type': 'PostalAddress',
      addressLocality: town ? town.name : 'Oxford',
      addressRegion: 'MS',
      addressCountry: 'US',
    },
    areaServed: town ? { '@type': 'City', name: `${town.name}, Mississippi` } : { '@type': 'State', name: 'Mississippi' },
    ...(town ? { geo: { '@type': 'GeoCoordinates', latitude: town.lat, longitude: town.lng } } : {}),
  };
  const ld = [local];
  if (Array.isArray(p.faqs) && p.faqs.length) ld.push(faqPage(p.faqs));
  ld.push(crumbs([['Home', '/'], [p.h1, route]]));
  routes.push([route, `${p.seoTitle}${SUFFIX}`, p.seoDescription, ld]);
}

// Conversion landing pages for the priority verticals (kept in sync with lib/practice.ts).
routes.push(['/for-doctors', `AI for Doctors in Private Practice — Never Miss a Patient Call${SUFFIX}`,
  'AI front-desk systems for private medical practices: 24/7 call answering, patient booking, and recall. HIPAA-aware, owned by you. Built by Walt Burge, Oxford MS.',
  [crumbs([['Home', '/'], ['AI for Doctors', '/for-doctors']])]]);
routes.push(['/for-lawyers', `AI for Lawyers in Private Practice — Never Miss a Case Again${SUFFIX}`,
  'AI intake systems for private-practice attorneys: 24/7 call answering, case triage, and booked consults. Bar-aware, owned by you. Built by Walt Burge, Oxford MS.',
  [crumbs([['Home', '/'], ['AI for Lawyers', '/for-lawyers']])]]);

for (const [route, title, description, jsonLd] of routes) emit(route, title, description, jsonLd);
console.log(`prerendered ${routes.length} routes`);
