export interface Project {
  id: string;
  title: string;
  category: 'Systems' | 'Web' | 'Game Dev' | 'Tools' | 'AI';
  description: string;
  techStack: string[];
  tags: string[];
  imageUrl: string;
  images?: string[]; // Multiple images for carousel
  link?: string;        // Live Deployment URL
  repositoryUrl?: string; // Source Code / GitHub URL
  // New fields for detail page
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  status?: 'Live' | 'Beta' | 'Archived' | 'Concept';
  year?: string;
  // Catalog fields (content/work/items.json) — Work is catalog-driven like
  // blog/services/shop. slug is the /work/<slug> route key; id stays for the
  // image-folder lookup and React keys.
  slug?: string;
  kind?: 'product' | 'platform' | 'oss' | 'client';
  summary?: string;       // one-line card blurb (shorter than description)
  seoTitle?: string;      // per-page <title> for prerender
  seoDescription?: string;// per-page meta description for prerender
  client?: { name: string; location?: string }; // case studies (kind: 'client')
  featured?: boolean;
  draft?: boolean;        // scaffolded but not live — hidden from app, sitemap, prerender
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  SPECIALTIES = 'specialties',
  HOW = 'how-it-works',
  PROJECTS = 'projects',
  CALC = 'calculator',
  SKILLS = 'skills',
  BLOG = 'blog',
  CONTACT = 'contact'
}

// Top-level blog sections. Law Practice lands here once that work begins.
export type BlogCategory = 'AI' | 'Construction' | 'Law';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  category: BlogCategory;
  tags: string[];
  featured?: boolean;
  author?: string;
}
