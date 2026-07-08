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
import { resumePage } from './site/templates/resume.mjs';
import { loadPosts, adjacent, related } from './site/data/blog.mjs';

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

// Work: index + one case study per non-draft item
built.push(writePage(workIndexPage({ workItems })));
for (const w of workItems.filter((x) => !x.draft)) {
  built.push(writePage(workDetailPage(w)));
}

// Résumé
built.push(writePage(resumePage({ workItems })));

// ── done ──────────────────────────────────────────────────────────────────────
console.log(`built ${built.length} page(s) in ${Date.now() - t0}ms → dist/`);
for (const r of built) console.log('  ' + r);
