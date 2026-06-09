import itemsData from '../content/work/items.json';
import { Project } from '../types';

// Selected works — the portfolio. The catalog is one JSON file
// (content/work/items.json) read by the app, the sitemap generator, and the
// prerender step — single source of truth, no drift. Same pattern as lib/shop.ts.
export const workItems = itemsData as Project[];

export const workSlugs = workItems.map(w => w.slug!).filter(Boolean);

// Builds vs client case studies — the two top-level groupings in the section.
export const builds = workItems.filter(w => w.kind !== 'client');
export const caseStudies = workItems.filter(w => w.kind === 'client');

export function getWorkItem(slug: string): Project | undefined {
  return workItems.find(w => w.slug === slug);
}

// Human-readable label for a kind, used on cards and filter chips.
export const kindLabel: Record<NonNullable<Project['kind']>, string> = {
  product: 'Product',
  platform: 'Platform',
  oss: 'Open Source',
  client: 'Client Work',
};
