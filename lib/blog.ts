import { BlogPost, BlogCategory } from '../types';

// Posts live as markdown files in /content/blog. Vite inlines them as raw
// strings at build time, so the blog stays a static SPA — no CMS, no backend.
const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

type FrontMatter = Record<string, string | string[] | boolean>;

// Minimal frontmatter parser. We own the .md format, so this stays small and
// predictable — and avoids gray-matter's Node `Buffer` dependency in the browser.
function parseFrontmatter(raw: string): { data: FrontMatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, block, content] = match;
  const data: FrontMatter = {};

  for (const line of block.split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (!value) { data[key] = ''; continue; }

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
      continue;
    }

    value = value.replace(/^['"]|['"]$/g, '');
    if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else data[key] = value;
  }

  return { data, content };
}

function computeReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min`;
}

function asString(v: string | string[] | boolean | undefined, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}

interface ParsedPost {
  post: BlogPost;
  draft: boolean;
}

const CATEGORIES: BlogCategory[] = ['AI', 'Construction', 'Law'];

function asCategory(v: string | string[] | boolean | undefined): BlogCategory {
  const s = asString(v);
  return (CATEGORIES as string[]).includes(s) ? (s as BlogCategory) : 'AI';
}

function buildPost(path: string, raw: string): ParsedPost {
  const { data, content } = parseFrontmatter(raw);
  const slug = asString(data.slug) || path.split('/').pop()!.replace(/\.md$/, '');
  const body = content.trim();

  return {
    draft: data.draft === true,
    post: {
      id: slug,
      title: asString(data.title, slug),
      excerpt: asString(data.excerpt),
      content: body || undefined,
      date: asString(data.date),
      readTime: asString(data.readTime) || (body ? computeReadTime(body) : ''),
      category: asCategory(data.category),
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: data.featured === true,
      author: asString(data.author, 'James Walton'),
    },
  };
}

// Published posts, newest first. Drafts (unwritten stubs) stay hidden until
// their frontmatter flips to draft: false.
const all: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => buildPost(path, raw))
  .filter(p => !p.draft)
  .map(p => p.post)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const posts = all;

export function getAllPosts(): BlogPost[] {
  return all;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return all.find(p => p.id === slug);
}

export const allTags: string[] = Array.from(new Set(all.flatMap(p => p.tags)));

// Sections, in display order, with their post counts. Only sections that
// actually have posts surface — Law stays hidden until the first Law post lands.
export interface BlogSection {
  category: BlogCategory;
  count: number;
}

export const sections: BlogSection[] = CATEGORIES.map(category => ({
  category,
  count: all.filter(p => p.category === category).length,
})).filter(s => s.count > 0);

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return all.filter(p => p.category === category);
}

// Adjacent posts in reverse-chronological order, for prev/next navigation.
export function getAdjacentPosts(slug: string): { prev?: BlogPost; next?: BlogPost } {
  const i = all.findIndex(p => p.id === slug);
  if (i === -1) return {};
  return { next: all[i - 1], prev: all[i + 1] };
}

// Other posts that share the most tags.
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return all
    .filter(p => p.id !== post.id)
    .map(p => ({ post: p, score: p.tags.filter(t => post.tags.includes(t)).length }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.post);
}
