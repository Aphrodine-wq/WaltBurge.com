// build.mjs — the static site generator. Vanilla, no framework, no bundler.
// Reads content/ (markdown + JSON, same files the CRM pipeline writes) and the
// site/ source, and emits real static HTML per route into dist/.
//
//   node build.mjs
//
// Pipeline: clean dist → copy public assets → bundle CSS → copy JS modules →
// render pages. Add a route by pushing another writePage() below.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { layout } from './site/templates/layout.mjs';
import { homePage } from './site/templates/home.mjs';
import { blogIndexPage } from './site/templates/blog-index.mjs';
import { blogPostPage } from './site/templates/blog-post.mjs';
import { workIndexPage } from './site/templates/work-index.mjs';
import { workDetailPage } from './site/templates/work-detail.mjs';
import { resumePage, flagshipIds } from './site/templates/resume.mjs';
import { servicesIndexPage, serviceDetailPage } from './site/templates/services.mjs';
import { shopIndexPage, shopDetailPage } from './site/templates/shop.mjs';
import { localPage } from './site/templates/local.mjs';
import { practicePage } from './site/templates/practice.mjs';
import { auditPage } from './site/templates/audit.mjs';
import { loadPosts, adjacent, related } from './site/data/blog.mjs';
import { loadServices, loadSystems, loadLocalPages, townForSlug } from './site/data/catalog.mjs';

// Practice verticals — config lives here (was lib/practice.ts).
const VERTICALS = [
  {
    slug: 'for-doctors', eyebrow: 'For Doctors in Private Practice',
    h1: 'Stop losing patients to a busy front desk',
    intro: "Every call your front desk can't pick up is a patient calling the next clinic down the road. I build AI front-desk systems for private practices that answer every call, book around the clock, and work your recall list — HIPAA-aware, installed for you, and owned by you. No call center, no per-seat software you rent forever.",
    painPoints: [
      { stat: 'After-hours', label: 'when most patients call — and most practices send them to voicemail' },
      { stat: '1 missed call', label: 'is one patient who books with whoever answers first' },
      { stat: 'Your staff', label: 'is chairside, not on the phone — so the phone wins or loses on its own' },
    ],
    calc: { heading: 'What is your front desk actually costing you?', unitLabel: 'calls a week that go unanswered or to voicemail', valueLabel: 'average value of a new patient (first year)', rateLabel: 'percent of those callers who would have booked', resultNoun: 'patients', defaultMissed: 15, defaultValue: 1500, defaultRate: 30, valueHint: 'A new patient is worth far more than one visit — count the first year of care.' },
    systemSlugs: ['patient-engine', 'ai-voice-receptionist', 'ai-appointment-scheduler', 'ai-review-responder'],
    faqs: [
      { q: 'Is this HIPAA-compliant?', a: 'Yes — built HIPAA-aware from the first line of code, with BAAs in place. The system captures, books, and routes. It never gives medical advice — that line stays with you and your providers.' },
      { q: 'Will this replace my front-desk staff?', a: "No. It covers what they can't — after-hours, lunch, overflow, and the calls that hit voicemail while they're with a patient. Your people stop chasing the phone and do the work only a human can." },
      { q: 'What does it cost, and is it another monthly subscription?', a: 'The first call and the estimate are free. You own what I build — no per-seat SaaS bill that climbs forever. I scope it to your practice and your budget.' },
      { q: "I'm not technical. Is this hard to run?", a: 'No. I build it and install it for you, tuned to how your practice already works. The person who writes the code is the person who answers your call — there’s no account rep and no help-desk maze.' },
      { q: 'Where does my patient data live?', a: "In your control. I build owned systems that keep your data in your environment, not fed into someone else's product. Private by design." },
    ],
    seoTitle: 'AI for Doctors in Private Practice — Never Miss a Patient Call',
    seoDescription: 'AI front-desk systems for private medical practices: 24/7 call answering, patient booking, and recall. HIPAA-aware, owned by you. Built by Walt Burge, Oxford MS.',
    servicesSlug: 'healthcare',
  },
  {
    slug: 'for-lawyers', eyebrow: 'For Lawyers in Private Practice',
    h1: 'Stop letting good cases walk after hours',
    intro: 'The client with a real case calls three firms and signs with whoever answers first — and that call usually comes in after five. I build AI intake systems for private-practice attorneys that answer every call, qualify it, and book the consult around the clock — bar-aware, installed for you, and owned by you. No answering service reading off a script, no software you rent forever.',
    painPoints: [
      { stat: 'After 5 p.m.', label: 'when most legal calls come in — and most firms miss them' },
      { stat: '3 firms', label: 'a serious client calls — they sign with the first one that answers' },
      { stat: 'Voicemail', label: 'is where good cases go to die over a weekend' },
    ],
    calc: { heading: 'What are missed calls costing your firm?', unitLabel: 'calls a week that go unanswered or to voicemail', valueLabel: 'average value of a signed case', rateLabel: 'percent of those callers who had a real case', resultNoun: 'cases', defaultMissed: 10, defaultValue: 3500, defaultRate: 25, valueHint: 'Use your average fee per matter — one signed case usually pays for the whole system.' },
    systemSlugs: ['intake-engine', 'ai-intake-triage', 'ai-document-drafting', 'ai-phone-agent'],
    faqs: [
      { q: 'Is this bar-compliant? Does it give legal advice?', a: 'It never gives legal advice. It captures intake and conflict-check details and routes the matter — the judgment stays with your attorneys. Built bar-aware from the start.' },
      { q: 'Will this replace my paralegal or intake staff?', a: "No. It covers the after-hours and overflow calls your staff can't — the ones that currently hit voicemail and walk to another firm. Your team handles the cases it books." },
      { q: 'What does it cost, and is it another subscription?', a: 'The first call and the estimate are free. You own what I build — not a per-seat tool you rent forever. One signed case usually covers the whole system.' },
      { q: "I'm not technical. Is this hard to run?", a: 'No. I build and install it for you, tuned to how your firm already intakes. The person who writes the code answers your call — no account rep, no ticket queue.' },
      { q: 'Is client information kept confidential?', a: "Yes. I build owned systems that keep your client data in your control, never fed into someone else's product. Confidential by design." },
    ],
    seoTitle: 'AI for Lawyers in Private Practice — Never Miss a Case Again',
    seoDescription: 'AI intake systems for private-practice attorneys: 24/7 call answering, case triage, and booked consults. Bar-aware, owned by you. Built by Walt Burge, Oxford MS.',
    servicesSlug: 'legal-business',
  },
];

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'dist');
const t0 = Date.now();

// ── helpers ────────────────────────────────────────────────────────────────
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const readJSON = (p) => (existsSync(join(ROOT, p)) ? JSON.parse(read(p)) : null);

function writePage(descriptor) {
  const html = layout(descriptor);
  const route = descriptor.path === '/' ? '' : descriptor.path.replace(/^\//, '');
  const dir = join(OUT, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  return descriptor.path;
}

// ── 1. clean + skeleton ──────────────────────────────────────────────────────
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'assets'), { recursive: true });

// ── 2. public assets (fonts, vendor, favicon, og, brand, work images, robots) ─
for (const entry of readdirSync(join(ROOT, 'public'))) {
  cpSync(join(ROOT, 'public', entry), join(OUT, entry), { recursive: true });
}

// ── 3. bundle CSS (order matters: tokens → components → page styles) ─────────
const cssFiles = ['base.css', 'components.css', 'home.css', 'blog.css', 'pages.css'];
const css = cssFiles
  .filter((f) => existsSync(join(ROOT, 'site/styles', f)))
  .map((f) => `/* ${f} */\n` + read(`site/styles/${f}`))
  .join('\n\n');
writeFileSync(join(OUT, 'assets', 'site.css'), css);

// ── 4. copy client JS modules (relative imports preserved side-by-side) ──────
for (const f of readdirSync(join(ROOT, 'site/js'))) {
  cpSync(join(ROOT, 'site/js', f), join(OUT, 'assets', f));
}

// ── 5. load content ──────────────────────────────────────────────────────────
const workItems = readJSON('content/work/items.json') || [];
const { posts, sections } = loadPosts(ROOT);

// ── 6. render routes ─────────────────────────────────────────────────────────
const built = [];
built.push(writePage(homePage({ workItems })));

// Blog: index + one page per post
built.push(writePage(blogIndexPage({ posts, sections })));
for (const post of posts) {
  const { prev, next } = adjacent(posts, post.id);
  built.push(writePage(blogPostPage({ post, prev, next, related: related(posts, post, 3) })));
}

// Work: index (non-draft only) + case-study pages for non-draft items AND any
// flagship item the résumé links to (so those links always resolve).
built.push(writePage(workIndexPage({ workItems })));
const flagship = new Set(flagshipIds);
for (const w of workItems.filter((x) => !x.draft || flagship.has(x.id))) {
  built.push(writePage(workDetailPage(w)));
}

// Résumé
built.push(writePage(resumePage({ workItems })));

// Services: menu index + one page per industry
const menus = loadServices(ROOT);
built.push(writePage(servicesIndexPage({ menus })));
for (const menu of menus) built.push(writePage(serviceDetailPage(menu)));

// Shop: catalog + one page per system
const shop = loadSystems(ROOT);
built.push(writePage(shopIndexPage(shop)));
for (const s of shop.systems) built.push(writePage(shopDetailPage(s)));

// Local SEO pages at /:slug
const localPages = loadLocalPages(ROOT);
for (const page of localPages) {
  built.push(writePage(localPage({ page, getSystem: shop.getSystem, town: townForSlug(page.slug) })));
}

// Practice verticals + audit
for (const vertical of VERTICALS) built.push(writePage(practicePage({ vertical, getSystem: shop.getSystem })));
built.push(writePage(auditPage()));

// ── 7. sitemap (accurate — generated from exactly what we built) ─────────────
const ORIGIN = 'https://waltburge.com';
const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  built
    .map((route) => `  <url>\n    <loc>${ORIGIN}${route === '/' ? '/' : route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join('\n') +
  `\n</urlset>\n`;
writeFileSync(join(OUT, 'sitemap.xml'), sitemap);

// ── done ──────────────────────────────────────────────────────────────────────
console.log(`built ${built.length} page(s) + sitemap in ${Date.now() - t0}ms → dist/`);
