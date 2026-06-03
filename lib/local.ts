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
