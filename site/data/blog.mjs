// blog.mjs — build-time blog data. Reads content/blog/*.md, parses frontmatter
// (same rules as the old lib/blog.ts), renders the body to HTML with marked +
// highlight.js. All the ordering/section/related helpers the templates need.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

const CATEGORIES = ['AI', 'Construction', 'Law'];

// ── markdown renderer ────────────────────────────────────────────────────────
const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
      try {
        return hljs.highlight(code, { language }).value;
      } catch {
        return hljs.highlightAuto(code).value;
      }
    },
  }),
);
marked.setOptions({ gfm: true, breaks: false });
// External links open in a new tab (matches the React renderer).
marked.use({
  renderer: {
    link(token) {
      const href = token.href || '';
      const title = token.title ? ` title="${token.title}"` : '';
      const text = this.parser.parseInline(token.tokens);
      const ext = /^https?:\/\//.test(href) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${href}"${title}${ext}>${text}</a>`;
    },
  },
});

export function renderMarkdown(md) {
  return marked.parse(md || '');
}

// ── frontmatter ──────────────────────────────────────────────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const [, block, content] = match;
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (!value) { data[key] = ''; continue; }
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
      continue;
    }
    value = value.replace(/^['"]|['"]$/g, '');
    if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else data[key] = value;
  }
  return { data, content };
}

const asStr = (v, f = '') => (typeof v === 'string' ? v : f);
const asCategory = (v) => (CATEGORIES.includes(asStr(v)) ? asStr(v) : 'AI');

// ── load ─────────────────────────────────────────────────────────────────────
export function loadPosts(root) {
  const dir = join(root, 'content', 'blog');
  if (!existsSync(dir)) return { posts: [], sections: [] };

  const posts = readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(join(dir, file), 'utf8');
      const { data, content } = parseFrontmatter(raw);
      if (data.draft === true) return null;
      const slug = asStr(data.slug) || file.replace(/\.md$/, '');
      const body = content.trim();
      return {
        id: slug,
        slug,
        title: asStr(data.title, slug),
        excerpt: asStr(data.excerpt),
        date: asStr(data.date),
        readTime: asStr(data.readTime) || estimateReadTime(body),
        category: asCategory(data.category),
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: data.featured === true,
        author: asStr(data.author, 'James Walton'),
        body,
        html: body ? renderMarkdown(body) : '',
      };
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  const sections = CATEGORIES.map((category) => ({
    category,
    count: posts.filter((p) => p.category === category).length,
  })).filter((s) => s.count > 0);

  return { posts, sections };
}

function estimateReadTime(body) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min`;
}

// Adjacent (reverse-chron): next = newer, prev = older.
export function adjacent(posts, slug) {
  const i = posts.findIndex((p) => p.id === slug);
  if (i === -1) return {};
  return { next: posts[i - 1], prev: posts[i + 1] };
}

// Posts sharing the most tags.
export function related(posts, post, limit = 3) {
  return posts
    .filter((p) => p.id !== post.id)
    .map((p) => ({ post: p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}
