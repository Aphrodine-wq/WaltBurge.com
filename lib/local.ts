import pagesData from '../content/local/pages.json';

// Local SEO landing pages — one per industry, targeted at Oxford, MS + North
// Mississippi searches ("AI for law firms in Oxford MS"). The catalog is one
// JSON file (content/local/pages.json) read by the app, the sitemap generator,
// and the prerender step — single source, no drift.
export interface LocalPage {
  slug: string;
  industry: string;       // e.g. "Law Firms"
  h1: string;
  intro: string;
  systemSlugs: string[];  // Shop systems to feature
  servicesSlug?: string;  // matching /services menu, if any
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
}

export const localPages = pagesData as LocalPage[];
export const localSlugs = localPages.map(p => p.slug);

export function getLocalPage(slug: string): LocalPage | undefined {
  return localPages.find(p => p.slug === slug);
}

// The website-design town pages — the local-SEO set that footer/homepage
// service-area links and town cross-links point at.
export const websitePages = localPages.filter(p => p.slug.startsWith('website-design-'));

// Town display names keyed by slug suffix. Suffix match (not regex) because
// industry slugs also contain hyphens — same approach as scripts/prerender.mjs.
const TOWN_NAMES: Record<string, string> = {
  oxford: 'Oxford',
  tupelo: 'Tupelo',
  southaven: 'Southaven',
  starkville: 'Starkville',
  batesville: 'Batesville',
  'new-albany': 'New Albany',
};

export function townForSlug(slug: string): string | null {
  for (const key of Object.keys(TOWN_NAMES)) {
    if (slug.endsWith(`-${key}-ms`)) return TOWN_NAMES[key];
  }
  return null;
}
