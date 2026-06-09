// Auto-generates public/sitemap.xml from the blog markdown so it can never go
// stale. Runs as `prebuild`, before every `vite build`. Add a post, get a
// sitemap entry — no manual editing, no forgotten URLs.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const SERVICES_DIR = path.join(ROOT, 'content', 'services');
const SHOP_FILE = path.join(ROOT, 'content', 'shop', 'systems.json');
const WORK_FILE = path.join(ROOT, 'content', 'work', 'items.json');
const LOCAL_FILE = path.join(ROOT, 'content', 'local', 'pages.json');
const ORIGIN = 'https://waltburge.com';

// Conversion landing pages for the priority verticals (lib/practice.ts).
const practiceSlugs = ['for-doctors', 'for-lawyers'];

// Minimal frontmatter read — we only need date + draft, and we own the format.
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

const posts = readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.md'))
  .map(f => ({ slug: f.replace(/\.md$/, ''), ...frontmatter(readFileSync(path.join(BLOG_DIR, f), 'utf8')) }))
  .filter(p => p.draft !== 'true')
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const today = posts[0]?.date || '2026-06-01';

// Service menu industries (commercial-intent pages — high SEO priority).
const serviceSlugs = readdirSync(SERVICES_DIR)
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''));

// Shop AI systems (commercial-intent product pages).
const shopSlugs = JSON.parse(readFileSync(SHOP_FILE, 'utf8')).map(s => s.slug);

// Selected work — portfolio + client case studies.
const workSlugs = JSON.parse(readFileSync(WORK_FILE, 'utf8')).map(w => w.slug);

// Local industry landing pages (Oxford, MS — high-intent local SEO).
const localSlugs = JSON.parse(readFileSync(LOCAL_FILE, 'utf8')).map(p => p.slug);

const urls = [
  { loc: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
  { loc: '/services', lastmod: today, changefreq: 'weekly', priority: '0.9' },
  ...serviceSlugs.map(slug => ({
    loc: `/services/${slug}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  { loc: '/shop', lastmod: today, changefreq: 'weekly', priority: '0.9' },
  ...shopSlugs.map(slug => ({
    loc: `/shop/${slug}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  { loc: '/work', lastmod: today, changefreq: 'weekly', priority: '0.9' },
  ...workSlugs.map(slug => ({
    loc: `/work/${slug}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...localSlugs.map(slug => ({
    loc: `/${slug}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.85',
  })),
  ...practiceSlugs.map(slug => ({
    loc: `/${slug}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.9',
  })),
  { loc: '/blog', lastmod: today, changefreq: 'weekly', priority: '0.9' },
  ...posts.map(p => ({
    loc: `/blog/${p.slug}`,
    lastmod: p.date || today,
    changefreq: 'monthly',
    priority: p.featured === 'true' ? '0.9' : '0.8',
  })),
  { loc: '/#about', lastmod: today, changefreq: 'monthly', priority: '0.6' },
  { loc: '/#contact', lastmod: today, changefreq: 'monthly', priority: '0.5' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${ORIGIN}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), xml);
console.log(`sitemap.xml — ${urls.length} URLs (${posts.length} posts)`);
