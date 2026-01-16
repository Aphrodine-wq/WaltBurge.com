export interface Project {
  id: string;
  title: string;
  category: 'Systems' | 'Web' | 'Game Dev' | 'Tools';
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
  CONTACT = 'contact'
}
