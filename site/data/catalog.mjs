// catalog.mjs — build-time loaders for services (markdown menus), shop systems,
// and local SEO pages. Mirrors lib/services.ts, lib/shop.ts, lib/local.ts.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { renderMarkdown } from './blog.mjs';

// ── Services ─────────────────────────────────────────────────────────────────
function parseMenu(file, raw) {
  const slug = file.replace(/\.md$/, '');
  const m = raw.match(/^###\s+(.+?)\s+Services\.?\s*$/m);
  const industry = m ? m[1].trim() : slug;

  let body = raw;
  const contact = body.search(/^##\s+Let.s build something/m);
  if (contact !== -1) body = body.slice(0, contact);
  const firstSection = body.search(/^##\s+SECTION/m);
  if (firstSection !== -1) body = body.slice(firstSection);
  else body = body.replace(/^#\s+Walt Builds[\s\S]*?\n---\s*\n/, '');

  return { slug, industry, body: body.trim(), html: renderMarkdown(body.trim()) };
}

export function loadServices(root) {
  const dir = join(root, 'content', 'services');
  if (!existsSync(dir)) return [];
  const menus = readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parseMenu(f, readFileSync(join(dir, f), 'utf8')));
  // Legal & Business leads; the rest alphabetical by industry.
  menus.sort((a, b) =>
    a.slug === 'legal-business' ? -1 : b.slug === 'legal-business' ? 1 : a.industry.localeCompare(b.industry),
  );
  return menus;
}

// ── Shop ─────────────────────────────────────────────────────────────────────
export function loadSystems(root) {
  const p = join(root, 'content', 'shop', 'systems.json');
  const systems = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : [];
  const byKind = (k) => systems.filter((s) => s.kind === k);
  // Tools grouped by category, first-seen order.
  const order = [];
  const map = new Map();
  for (const t of byKind('tool')) {
    if (!map.has(t.category)) { map.set(t.category, []); order.push(t.category); }
    map.get(t.category).push(t);
  }
  return {
    systems,
    engines: byKind('engine'),
    tools: byKind('tool'),
    digital: byKind('digital'),
    toolsByCategory: order.map((category) => ({ category, items: map.get(category) })),
    getSystem: (slug) => systems.find((s) => s.slug === slug),
  };
}

// ── Local ────────────────────────────────────────────────────────────────────
const TOWNS = {
  oxford: { name: 'Oxford', lat: 34.3665, lng: -89.5192 },
  tupelo: { name: 'Tupelo', lat: 34.2576, lng: -88.7034 },
  southaven: { name: 'Southaven', lat: 34.9889, lng: -90.0126 },
  starkville: { name: 'Starkville', lat: 33.4504, lng: -88.8184 },
  batesville: { name: 'Batesville', lat: 34.312, lng: -89.9462 },
  'new-albany': { name: 'New Albany', lat: 34.4943, lng: -89.0066 },
};

export function townForSlug(slug) {
  for (const key of Object.keys(TOWNS)) {
    if (slug.endsWith(`-${key}-ms`)) return TOWNS[key];
  }
  return null;
}

export function loadLocalPages(root) {
  const p = join(root, 'content', 'local', 'pages.json');
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : [];
}
