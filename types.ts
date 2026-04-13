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
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  BLOG = 'blog',
  CONTACT = 'contact'
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}
