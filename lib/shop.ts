import systemsData from '../content/shop/systems.json';

// Walt Builds productized AI systems. The catalog is one JSON file
// (content/shop/systems.json) read by both the app (here) and the sitemap
// generator (scripts/gen-sitemap.mjs) — single source of truth, no drift.
export interface AISystem {
  slug: string;
  name: string;
  tagline: string;
  kind: 'engine' | 'tool' | 'digital';
  industry: 'healthcare' | 'law' | 'construction' | 'any';
  category: string;
  priceFrom: string;
  summary: string;
  includes: string[];
  outcomes?: string[];
  seoTitle: string;
  seoDescription: string;
  featured?: boolean;
  link?: string; // external (e.g. open-source repo) for digital products
}

export const systems = systemsData as AISystem[];

export const engines = systems.filter(s => s.kind === 'engine');
export const tools = systems.filter(s => s.kind === 'tool');
export const digital = systems.filter(s => s.kind === 'digital');

export function getSystem(slug: string): AISystem | undefined {
  return systems.find(s => s.slug === slug);
}

// Tools grouped by category, preserving first-seen category order.
export function toolsByCategory(): { category: string; items: AISystem[] }[] {
  const order: string[] = [];
  const map = new Map<string, AISystem[]>();
  for (const t of tools) {
    if (!map.has(t.category)) { map.set(t.category, []); order.push(t.category); }
    map.get(t.category)!.push(t);
  }
  return order.map(category => ({ category, items: map.get(category)! }));
}

// Industry → matching /services menu slug, for cross-linking on detail pages.
// Only clean matches; healthcare has no dedicated menu, so it's left out.
export const industryMenuSlug: Record<string, string> = {
  law: 'legal-business',
  construction: 'construction',
};
