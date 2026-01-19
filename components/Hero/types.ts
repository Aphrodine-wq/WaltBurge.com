export interface SkillNode {
  id: string;
  name: string;
  category: 'AI/ML' | 'Systems' | 'Web' | 'Game Dev' | 'Tools';
  proficiency: number; // 0-100
  position: [number, number, number]; // x, y, z
  connections?: string[]; // IDs of related skills
}

export interface SkillCategory {
  name: string;
  color: string;
  count: number;
}

export type FilterCategory = 'AI/ML' | 'Systems' | 'Web' | 'Game Dev' | 'All';
