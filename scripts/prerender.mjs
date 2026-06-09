// Per-route static HTML so every page ships its own crawler-visible <title>,
// description, canonical, and OG tags — not the homepage's. Runs as `postbuild`,
// after `vite build`, writing dist/<route>/index.html variants of dist/index.html.
//
// This is a META prerender: it swaps the head tags per route (what crawlers and
// social link-unfurlers read) while the SPA still hydrates and renders the body.
// Vercel serves the static file before the SPA catch-all rewrite, so each URL
// gets the right meta with zero routing changes.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://waltburge.com';
const SUFFIX = ' | Walt Burge';

const template = readFileSync(path.join(DIST, 'index.html'), 'utf8');

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

// Swap the head tags that carry per-page SEO signal.
function render({ route, title, description }) {
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
  return html;
}

function emit(route, title, description) {
  const dir = path.join(DIST, route.replace(/^\//, ''));
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), render({ route, title, description }));
}

const routes = [];

// Blog index + posts
routes.push(['/blog', `Blog — Notes on Building AI${SUFFIX}`,
  'Essays on AI consciousness, AI ethics, custom models, and building software from the job site up. By Walt Burge, AI consultant in Oxford, MS.']);
for (const f of readdirSync(path.join(ROOT, 'content', 'blog')).filter(f => f.endsWith('.md'))) {
  const fm = frontmatter(readFileSync(path.join(ROOT, 'content', 'blog', f), 'utf8'));
  if (fm.draft === 'true') continue;
  const slug = fm.slug || f.replace(/\.md$/, '');
  routes.push([`/blog/${slug}`, `${fm.title || slug}${SUFFIX}`, fm.excerpt || '']);
}

// Services index + industry menus
routes.push(['/services', `Service Menu — Software & AI by Industry${SUFFIX}`,
  'Full Walt Builds service menu: websites, automations, integrations, and custom AI systems, priced and built to own. Healthcare, law, construction, and more — Oxford, MS.']);
for (const f of readdirSync(path.join(ROOT, 'content', 'services')).filter(f => f.endsWith('.md'))) {
  const slug = f.replace(/\.md$/, '');
  const raw = readFileSync(path.join(ROOT, 'content', 'services', f), 'utf8');
  const m = raw.match(/^###\s+(.+?)\s+Services\.?\s*$/m);
  const industry = m ? m[1].trim() : slug;
  routes.push([`/services/${slug}`, `${industry} Software & AI Services${SUFFIX}`,
    `Custom software and AI for ${industry.toLowerCase()} — websites, automations, integrations, and AI systems, built and owned. Walt Builds, Oxford MS.`]);
}

// Shop index + AI systems
const systems = JSON.parse(readFileSync(path.join(ROOT, 'content', 'shop', 'systems.json'), 'utf8'));
routes.push(['/shop', `Shop — AI Systems You Can Buy${SUFFIX}`,
  'Productized AI systems built and installed for your business: AI receptionists, intake, estimating, document drafting, and more. Walt Builds, Oxford MS.']);
for (const s of systems) {
  routes.push([`/shop/${s.slug}`, `${s.seoTitle}${SUFFIX}`, s.seoDescription]);
}

// Selected work — portfolio + client case studies
const workItems = JSON.parse(readFileSync(path.join(ROOT, 'content', 'work', 'items.json'), 'utf8'));
routes.push(['/work', `Selected Work — Products, Platforms & AI${SUFFIX}`,
  'Selected work by Walt Burge: construction marketplaces, custom AI models, developer platforms, and client builds — shipped end to end from Oxford, MS.']);
for (const w of workItems) {
  routes.push([`/work/${w.slug}`, `${w.seoTitle || w.title}${SUFFIX}`, w.seoDescription || w.summary || w.description || '']);
}

// Local Oxford, MS industry landing pages
const localPages = JSON.parse(readFileSync(path.join(ROOT, 'content', 'local', 'pages.json'), 'utf8'));
for (const p of localPages) {
  routes.push([`/${p.slug}`, `${p.seoTitle}${SUFFIX}`, p.seoDescription]);
}

// Conversion landing pages for the priority verticals (kept in sync with lib/practice.ts).
routes.push(['/for-doctors', `AI for Doctors in Private Practice — Never Miss a Patient Call${SUFFIX}`,
  'AI front-desk systems for private medical practices: 24/7 call answering, patient booking, and recall. HIPAA-aware, owned by you. Built by Walt Burge, Oxford MS.']);
routes.push(['/for-lawyers', `AI for Lawyers in Private Practice — Never Miss a Case Again${SUFFIX}`,
  'AI intake systems for private-practice attorneys: 24/7 call answering, case triage, and booked consults. Bar-aware, owned by you. Built by Walt Burge, Oxford MS.']);

for (const [route, title, description] of routes) emit(route, title, description);
console.log(`prerendered ${routes.length} routes`);
