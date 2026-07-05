// Pulls published content from walt-crm's CMS (/content) and writes it into
// content/blog/*.md, content/services/*.md, content/work/items.json, and
// content/local/pages.json — the exact same paths/shapes lib/blog.ts,
// lib/services.ts, lib/work.ts, and lib/local.ts already read, and that
// prerender.mjs/gen-sitemap.mjs already parse. Nothing downstream changes;
// only where these files come from changes (CRM DB instead of git).
//
// Runs as the FIRST step of `prebuild`, before gen-sitemap.mjs. On any
// failure — missing env, network error, bad response — this logs a warning
// and leaves whatever files are already on disk untouched, then exits 0.
// A CRM hiccup must never break a site deploy (same convention as
// api/lead.js's optional Postgres persistence).
//
// Needs CRM_CONTENT_API_URL and CONTENT_EXPORT_SECRET as build-time Vercel
// env vars — never VITE_-prefixed, so they're never shipped to the client
// bundle.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "content");
const API_URL = process.env.CRM_CONTENT_API_URL;
const SECRET = process.env.CONTENT_EXPORT_SECRET;

function warnAndExit(reason) {
  console.warn(`[fetch-content] skipping — ${reason}. Using whatever content/ already has on disk.`);
  process.exit(0);
}

if (!API_URL || !SECRET) {
  warnAndExit("CRM_CONTENT_API_URL and/or CONTENT_EXPORT_SECRET not set");
}

let data;
try {
  const res = await fetch(`${API_URL}/api/content/export?key=${encodeURIComponent(SECRET)}`);
  if (!res.ok) warnAndExit(`export API returned ${res.status}`);
  data = await res.json();
} catch (e) {
  warnAndExit(`fetch failed — ${e.message}`);
}

// ── Blog: rebuild content/blog/*.md — a full sync, so a post that gets
// unpublished in the CRM disappears from the build instead of lingering. ──
function frontmatterBlock(fields) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.join(", ")}]`);
    } else if (value) {
      // Quote when the value contains a colon — the parser only splits on
      // the FIRST colon in a line, so this is cosmetic (matches source
      // authoring style), not required for correctness.
      const v = typeof value === "string" && value.includes(":") ? `"${value.replace(/"/g, '\\"')}"` : value;
      lines.push(`${key}: ${v}`);
    }
  }
  lines.push("---", "");
  return lines.join("\n");
}

const blogDir = join(ROOT, "blog");
mkdirSync(blogDir, { recursive: true });
for (const f of readdirSync(blogDir).filter((f) => f.endsWith(".md"))) rmSync(join(blogDir, f));
for (const p of data.posts) {
  const fm = frontmatterBlock({
    title: p.title,
    slug: p.slug,
    date: p.date,
    readTime: p.readTime,
    tags: p.tags,
    category: p.category,
    author: p.author,
    // Only emitted when true — the parser treats "absent" and "false" the
    // same way (data.featured === true), matching how most source files
    // simply omit this line rather than writing `featured: false`.
    ...(p.featured ? { featured: true } : {}),
    excerpt: p.excerpt,
  });
  writeFileSync(join(blogDir, `${p.slug}.md`), `${fm}\n${p.body}\n`);
}

// ── Services: rebuild content/services/*.md, full sync, body written verbatim ──
const servicesDir = join(ROOT, "services");
mkdirSync(servicesDir, { recursive: true });
for (const f of readdirSync(servicesDir).filter((f) => f.endsWith(".md"))) rmSync(join(servicesDir, f));
for (const s of data.services) {
  writeFileSync(join(servicesDir, `${s.slug}.md`), s.body);
}

// ── Work + local: single JSON arrays, same shape as today ──
mkdirSync(join(ROOT, "work"), { recursive: true });
writeFileSync(join(ROOT, "work", "items.json"), JSON.stringify(data.work, null, 2) + "\n");

mkdirSync(join(ROOT, "local"), { recursive: true });
writeFileSync(join(ROOT, "local", "pages.json"), JSON.stringify(data.local, null, 2) + "\n");

console.log(
  `[fetch-content] wrote ${data.posts.length} posts, ${data.services.length} services, ` +
    `${data.work.length} work items, ${data.local.length} local pages from the CRM.`,
);
