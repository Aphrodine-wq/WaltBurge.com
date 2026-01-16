import React, { useState, useMemo } from 'react';
import { Project, SectionId } from '../types';
import { 
  ExternalLink, Github, Layers, Monitor, Gamepad, Terminal, Smartphone, Wrench, ArrowRight,
  Binary, Box, Cloud, Code2, Command, Cpu, Database, FileCode, Hash, Layout, Lock, Power, Server, Zap, BrainCircuit,
  Image as ImageIcon, X, Filter, Calendar, Circle
} from 'lucide-react';

// --- Image Handling Helper ---
const getProjectImage = (id: string, fileName: string = 'cover.jpg') => {
    // In a real build, Vite handles public assets directly
    return `/assets/projects/${id}/${fileName}`;
};

export const projects: Project[] = [
  {
    id: 'g-rump',
    title: 'G-Rump Coding Language',
    category: 'Systems',
    description: 'A custom high-performance compiled language designed for systems programming.',
    fullDescription: 'G-Rump is a statically typed, compiled language built from the ground up to address the specific needs of modern systems programming. It offers manual memory management with optional safety rails, aiming to provide C++ level performance with a more modern, expressive syntax.',
    challenge: 'Existing systems languages often force a trade-off between control and safety, or suffer from decades of legacy bloat. The challenge was to create a compiler backend that could optimize specifically for parallel processing architectures without the overhead of a runtime garbage collector.',
    solution: 'I architected a custom frontend using LLVM as the backend. The compiler implements a unique ownership model that resolves memory constraints at compile-time. I also developed a "Parallel-Block" syntax that allows the compiler to auto-vectorize specific loops more aggressively than standard O3 optimizations.',
    features: [
      'Zero-cost abstractions with no runtime GC',
      'Custom LLVM frontend implementation',
      'Built-in "Parallel-Block" syntax for SIMD operations',
      'Interoperability with C/C++ libraries'
    ],
    techStack: ['C++', 'LLVM', 'Assembly', 'Compiler Design'],
    tags: ['performance', 'memory-safety', 'multithreading'],
    imageUrl: getProjectImage('g-rump'),
    images: [],
    repositoryUrl: 'https://github.com/Aphrodine-wq/g-rump',
    status: 'Beta',
    year: '2024'
  },
  {
    id: 'g-rump-ide',
    title: 'G-Rump IDE',
    category: 'Tools',
    description: 'A fully integrated development environment built specifically for G-Rump.',
    fullDescription: 'To support the adoption of G-Rump, a robust toolchain was necessary. The G-Rump IDE is a native Windows application providing a complete development lifecycle environment, from writing code to debugging binaries.',
    challenge: 'Generic text editors lacked the understanding of G-Rump\'s specific syntax and memory ownership rules, making development slow and error-prone.',
    solution: 'I built a custom Language Server Protocol (LSP) integration within a high-performance WPF shell. The IDE features a real-time Abstract Syntax Tree (AST) visualizer that helps developers understand how their code is being parsed and optimized by the compiler.',
    features: [
      'Custom Syntax Highlighting & Intelligent Autocomplete',
      'Real-time AST (Abstract Syntax Tree) Visualizer',
      'Integrated Debugger with Register View',
      'Direct Compiler Linking'
    ],
    techStack: ['C#', 'WPF', 'LSP', 'Win32'],
    tags: ['dx', 'visualizer', 'productivity'],
    imageUrl: getProjectImage('g-rump-ide'),
    images: [],
    repositoryUrl: 'https://github.com/Aphrodine-wq/g-rump-ide',
    status: 'Live',
    year: '2024'
  },
  {
    id: 'reaper',
    title: 'Reaper',
    category: 'Game Dev',
    description: 'A high-fidelity iOS application featuring custom Metal rendering pipelines.',
    fullDescription: 'Reaper is a mobile action game that pushes the limits of mobile graphics. By bypassing standard game engines and writing a custom renderer using the Metal API, Reaper achieves console-quality visuals on mobile devices.',
    challenge: 'Achieving 60 FPS with dynamic lighting and shadow casting on mobile hardware while managing battery life and thermal throttling.',
    solution: 'Developed a custom rendering engine using Swift and Metal. Implemented tile-based deferred rendering to handle multiple light sources efficiently. Created a custom entity-component system (ECS) to manage game state with minimal memory overhead.',
    features: [
      'Custom Metal Rendering Engine',
      'Tile-Based Deferred Lighting',
      'Custom Entity-Component System (ECS)',
      'Optimized Touch Input Latency'
    ],
    techStack: ['Swift', 'Metal API', 'iOS SDK', 'UIKit'],
    tags: ['rendering', 'optimization', 'touch-input'],
    imageUrl: getProjectImage('reaper'),
    images: [],
    repositoryUrl: 'https://github.com/Aphrodine-wq/reaper-engine',
    status: 'Live',
    year: '2023'
  },
  {
    id: 'clipsync',
    title: 'ClipSync',
    category: 'Tools',
    description: 'A seamless clipboard synchronization utility connecting Windows and mobile.',
    fullDescription: 'ClipSync bridges the gap between desktop and mobile workflows. It runs as a lightweight daemon on Windows and a background service on mobile, ensuring your clipboard is always in sync across devices.',
    challenge: 'Ensuring instant synchronization without compromising security or relying on slow cloud relays.',
    solution: 'Implemented a local peer-to-peer connection protocol over WiFi. Data is encrypted using AES-256 before transmission. The system uses UDP hole punching to establish direct connections, falling back to a secure relay only when necessary.',
    features: [
      'End-to-End AES-256 Encryption',
      'Local P2P Data Transfer (No Cloud Storage)',
      'Cross-Platform Background Services',
      'Instant Text & Image Sync'
    ],
    techStack: ['C#', '.NET Core', 'Encryption'],
    tags: ['security', 'p2p', 'workflow'],
    imageUrl: getProjectImage('clipsync'),
    images: [],
    repositoryUrl: 'https://github.com/Aphrodine-wq/clipsync',
    status: 'Archived',
    year: '2022'
  },
  {
    id: 'ftwos',
    title: 'FTWOS',
    category: 'Systems',
    description: 'Experimental operating system architecture focused on real-time task scheduling.',
    fullDescription: 'FTWOS is an experimental operating system kernel built from scratch, focusing on real-time task scheduling and low-level system architecture.',
    challenge: 'Writing a bootloader and kernel from scratch requires handling hardware interrupts and memory mapping manually, which is notoriously difficult to debug.',
    solution: 'Wrote a custom bootloader in Assembly to switch the CPU to protected mode. Implemented a microkernel architecture where drivers run in user space to improve stability. The scheduler uses a unique priority-inheritance mechanism to prevent deadlocks.',
    features: [
      'Custom Bootloader & Kernel',
      'Preemptive Multitasking Scheduler',
      'FAT32 File System Implementation',
      'VGA Text Mode Driver'
    ],
    techStack: ['C', 'Assembly', 'Kernel', 'Bootloader'],
    tags: ['kernel', 'experimental', 'bare-metal'],
    imageUrl: getProjectImage('ftwos'),
    images: [],
    repositoryUrl: 'https://github.com/Aphrodine-wq/ftwos',
    status: 'Concept',
    year: '2021'
  },
  {
    id: 'icongen',
    title: 'IconGEN',
    category: 'Tools',
    description: 'Automated asset generation tool using heuristic algorithms.',
    fullDescription: 'IconGEN is a CLI tool for mobile developers that automatically generates all required icon sizes and asset exports from a single vector source, using AI to suggest aesthetic improvements for different form factors.',
    challenge: 'Managing hundreds of asset exports for iOS, Android, and Web requires significant manual effort and is prone to errors.',
    solution: 'Built a Python-based pipeline that wraps standard image processing libraries. Added a heuristic layer that analyzes the input image complexity and suggests simplifications for smaller icon sizes to ensure legibility.',
    features: [
      'Multi-Platform Export (iOS, Android, Web)',
      'Heuristic Legibility Analysis',
      'Vector to Raster High-Quality Scaling',
      'CLI Integration for CI/CD Pipelines'
    ],
    techStack: ['Python', 'AI Heuristics', 'CLI'],
    tags: ['automation', 'generative', 'asset-pipeline'],
    imageUrl: getProjectImage('icongen'),
    images: [],
    repositoryUrl: 'https://github.com/Aphrodine-wq/icongen',
    status: 'Live',
    year: '2023'
  },
  {
    id: 'olemiss365',
    title: 'OleMiss365',
    category: 'Web',
    description: 'Web portal architecture designed for high-traffic community engagement.',
    fullDescription: 'OleMiss365 is a centralized hub for community events, news, and student interaction. It handles high concurrent user loads during major university events.',
    challenge: 'Scaling to handle traffic spikes during game days and enrollment periods while maintaining sub-second response times.',
    solution: 'Designed a serverless architecture using AWS Lambda and API Gateway. Implemented aggressive caching strategies with Redis and a Content Delivery Network (CDN) for static assets. The frontend is a highly optimized React application.',
    features: [
      'Serverless Auto-Scaling Architecture',
      'Real-Time Event Feeds',
      'Secure Student Authentication (SSO)',
      'High-Performance CDN Caching'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    tags: ['scalable', 'social', 'full-stack'],
    imageUrl: getProjectImage('olemiss365'),
    images: [],
    link: 'https://olemiss.edu',
    repositoryUrl: 'https://github.com/Aphrodine-wq/olemiss365',
    status: 'Live',
    year: '2022'
  },
  {
    id: 'oxford-outdoor',
    title: 'Oxford Outdoor Living',
    category: 'Web',
    description: 'High-end commercial web presence featuring interactive product galleries.',
    fullDescription: 'A luxury commercial website designed to showcase high-end outdoor living products, including kitchens, patios, and landscapes. The platform serves as a digital showroom, allowing potential clients to visualize premium materials in their own space.',
    challenge: 'Translating the physical quality of luxury materials (granite, marble, teak) into a digital experience without compromising load speeds or user experience on mobile devices.',
    solution: 'Utilized Next.js for server-side rendering to ensure fast initial loads despite heavy media assets. Implemented a custom WebGL image carousel that simulates 3D depth. Used a headless CMS to allow the client to easily update product inventory without touching code.',
    features: [
      'Next.js Server-Side Rendering (SSR)',
      'Custom WebGL Product Viewers',
      'Sanity.io Headless CMS Integration',
      'Advanced SEO & Analytics'
    ],
    techStack: ['TypeScript', 'Next.js', 'Tailwind', 'WebGL'],
    tags: ['ui/ux', 'responsive', 'commercial'],
    imageUrl: getProjectImage('oxford-outdoor'),
    images: [],
    link: 'https://oxfordoutdoorliving.com',
    status: 'Live',
    year: '2023'
  }
];

export const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Systems': return <Layers size={14} />;
    case 'Game Dev': return <Gamepad size={14} />;
    case 'Web': return <Monitor size={14} />;
    case 'Tools': return <Wrench size={14} />;
    default: return <Terminal size={14} />;
  }
};

export const TechIcon = ({ tag, isActive }: { tag: string, isActive?: boolean }) => {
  const size = 16;
  const baseClass = "transition-colors duration-300";
  // If active, use brand accent color, otherwise gray-500. Group hover always triggers accent.
  const colorClass = isActive ? "text-brand-accent" : "text-brand-secondary group-hover/icon:text-brand-accent";

  // Brand Logos via SVG
  if (tag === 'React') return <div className={`${isActive ? 'grayscale-0' : 'grayscale'} group-hover/icon:grayscale-0 transition-all text-[#61DAFB]`}><svg width={size} height={size} viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2" fill="currentColor"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"/><ellipse rx="10" ry="4.5" transform="rotate(60)"/><ellipse rx="10" ry="4.5" transform="rotate(120)"/></g></svg></div>;
  if (tag === 'Next.js') return <div className={`${isActive ? 'grayscale-0' : 'grayscale'} group-hover/icon:grayscale-0 transition-all text-brand-primary`}><svg width={size} height={size} viewBox="0 0 180 180" fill="currentColor"><mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{maskType:'alpha'}}><circle cx="90" cy="90" fill="black" r="90"/></mask><g mask="url(#mask0_next)"><circle cx="90" cy="90" data-circle="true" fill="black" r="90" stroke="currentColor" strokeWidth="6"/><path d="M149.508 157.527C151.508 158.527 153.508 155.527 155.508 153.527L118.508 102.527H123.508V73.5266H107.508V126.527L74.5082 73.5266H58.5082V126.527H74.5082V88.5266L116.508 154.527C124.508 163.527 137.508 165.527 149.508 157.527Z" fill="currentColor"/></g></svg></div>;
  if (tag === 'TypeScript') return <div className={`${isActive ? 'grayscale-0' : 'grayscale'} group-hover/icon:grayscale-0 transition-all text-[#3178C6]`}><svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM17.376 17.55c.706.77 1.576 1.166 2.58 1.166 1.485 0 2.37-.87 2.37-2.19v-.06c0-1.5-.96-2.1-2.55-2.73l-.84-.33c-1.02-.42-1.38-.81-1.38-1.56v-.06c0-.81.69-1.38 1.74-1.38 1.05 0 1.74.54 2.01 1.44l1.62-.69c-.54-1.53-1.89-2.34-3.63-2.34-1.95 0-3.33 1.2-3.33 2.91v.06c0 1.53.96 2.1 2.58 2.76l.81.33c1.08.45 1.38.87 1.38 1.62v.06c0 .99-.81 1.59-1.89 1.59-1.23 0-2.07-.63-2.37-1.68l-1.65.69c.045.02.585 1.106 2.535 2.006zM8.7 12.63l1.8 1.05v-5.43h2.4v9.6h-2.4v-2.79l-1.89-1.08v3.87h-2.4v-9.6h2.49v4.38z"/></svg></div>;
  if (tag === 'Tailwind') return <div className={`${isActive ? 'grayscale-0' : 'grayscale'} group-hover/icon:grayscale-0 transition-all text-[#38B2AC]`}><svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89-2.288-1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg></div>;
  if (tag === 'Python') return <div className={`${isActive ? 'grayscale-0' : 'grayscale'} group-hover/icon:grayscale-0 transition-all text-[#3776AB]`}><svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-1.23.05-1.08.14-.93.24-.8.32-.68.37-.58.42-.46.44-.37.45-.28.45-.19.41-.12.39-.06.35-.03.29-.01h4.25zM12 9c.13 0 .26.02.39.08.36.15.6.5.6.89 0 .38-.25.74-.61.89-.13.06-.26.08-.39.08s-.26-.02-.39-.08c-.36-.15-.6-.5-.6-.89 0-.38.25-.74.61-.89.13-.06.26-.08.39-.08z"/></svg></div>;

  // Custom stylized text for C family
  const customTextClass = isActive 
    ? "bg-brand-accent/20 border-brand-accent text-brand-accent" 
    : "bg-brand-surface text-brand-secondary border-brand-border group-hover/icon:text-brand-accent group-hover/icon:border-brand-accent/50";
    
  if (tag === 'C++') return <div className={`font-mono font-bold text-[10px] px-1 rounded border transition-colors ${customTextClass}`}>C++</div>;
  if (tag === 'C') return <div className={`font-mono font-bold text-[10px] px-1 rounded border transition-colors ${customTextClass}`}>C</div>;
  if (tag === 'C#') return <div className={`font-mono font-bold text-[10px] px-1 rounded border transition-colors ${customTextClass}`}>C#</div>;

  // Icon Mapping
  switch (tag) {
    case 'Assembly': return <Binary size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Compiler Design': return <Cpu size={size} className={`${colorClass} ${baseClass}`} />;
    case 'LLVM': return <Box size={size} className={`${colorClass} ${baseClass}`} />;
    case 'WPF': return <Layout size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Win32': return <Command size={size} className={`${colorClass} ${baseClass}`} />;
    case 'LSP': return <Code2 size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Swift': return <Zap size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Metal API': return <Hash size={size} className={`${colorClass} ${baseClass}`} />;
    case 'iOS SDK': return <Smartphone size={size} className={`${colorClass} ${baseClass}`} />;
    case 'UIKit': return <Layout size={size} className={`${colorClass} ${baseClass}`} />;
    case '.NET Core': return <Box size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Encryption': return <Lock size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Kernel': return <Cpu size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Bootloader': return <Power size={size} className={`${colorClass} ${baseClass}`} />;
    case 'AI Heuristics': return <BrainCircuit size={size} className={`${colorClass} ${baseClass}`} />;
    case 'CLI': return <Terminal size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Node.js': return <Server size={size} className={`${colorClass} ${baseClass}`} />;
    case 'PostgreSQL': return <Database size={size} className={`${colorClass} ${baseClass}`} />;
    case 'AWS': return <Cloud size={size} className={`${colorClass} ${baseClass}`} />;
    case 'WebGL': return <Box size={size} className={`${colorClass} ${baseClass}`} />;
    default: return <Code2 size={size} className={`${colorClass} ${baseClass}`} />;
  }
};

const ProjectCardImage = React.memo(({ project }: { project: Project }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="h-full w-full overflow-hidden relative bg-brand-surface group/image">
       {/* Loading State */}
       {!isLoaded && !hasError && (
        <div 
            className="absolute inset-0 z-10 bg-brand-base flex items-center justify-center transition-opacity duration-500"
        >
            <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(to right, rgb(var(--border-color)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--border-color)) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                opacity: 0.2
            }}></div>
            <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-brand-accent/30 border-t-brand-accent animate-spin"></div>
                <span className="text-[10px] font-mono text-brand-accent/50 animate-pulse">LOADING_ASSET</span>
            </div>
        </div>
       )}

       {/* Error State / Placeholder */}
       {hasError && (
        <div className="absolute inset-0 z-10 bg-brand-base flex items-center justify-center">
             <div className="flex flex-col items-center gap-3 text-brand-secondary/50">
                 <div className="p-4 rounded-full bg-brand-surface border border-brand-border">
                    <ImageIcon size={32} />
                 </div>
                 <div className="text-center">
                    <p className="text-xs font-mono uppercase tracking-widest">Asset Not Found</p>
                    <p className="text-[10px] font-mono opacity-50 mt-1">/assets/projects/{project.id}/cover.jpg</p>
                 </div>
             </div>
        </div>
       )}

       {/* Overlay Gradient */}
       <div className="absolute inset-0 bg-gradient-to-t from-brand-base via-brand-base/20 to-transparent opacity-80 z-10 group-hover/card:opacity-60 transition-opacity duration-500"></div>
       
       <img 
        src={project.imageUrl} 
        alt={project.title} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
            setHasError(true);
            setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transform scale-100 group-hover/card:scale-105 transition-all duration-700 ease-out filter grayscale group-hover/card:grayscale-0 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
      />
      
      {/* Category Badge - Top Right */}
      <div className="absolute top-4 right-4 z-20 translate-y-[-10px] opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col items-end gap-2">
         <span className="bg-brand-base/90 backdrop-blur-md border border-brand-border/20 text-brand-primary text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-wide shadow-lg">
            <CategoryIcon category={project.category} />
            {project.category}
         </span>
         
         {project.status && (
            <span className={`bg-brand-base/90 backdrop-blur-md border border-brand-border/20 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-wide shadow-lg ${
                project.status === 'Live' ? 'text-green-400' : 
                project.status === 'Beta' ? 'text-brand-accent' :
                project.status === 'Archived' ? 'text-gray-400' : 'text-brand-purple'
            }`}>
               <span className={`w-1.5 h-1.5 rounded-full ${
                  project.status === 'Live' ? 'bg-green-400 animate-pulse' : 
                  project.status === 'Beta' ? 'bg-brand-accent animate-pulse' :
                  project.status === 'Archived' ? 'bg-gray-400' : 'bg-brand-purple'
               }`}></span>
               {project.status}
            </span>
         )}
      </div>

      {/* Year Badge - Top Left */}
      {project.year && (
        <div className="absolute top-4 left-4 z-20 translate-y-[-10px] opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 delay-75">
             <span className="bg-brand-base/90 backdrop-blur-md border border-brand-border/20 text-brand-secondary text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-wide shadow-lg">
                <Calendar size={12} />
                {project.year}
             </span>
        </div>
      )}
    </div>
  );
});

interface ProjectsProps {
    onProjectClick?: (project: Project) => void;
    activeFilter: string | null;
    onFilterChange: (filter: string | null) => void;
}

export const Projects: React.FC<ProjectsProps> = React.memo(({ onProjectClick, activeFilter, onFilterChange }) => {

  const filteredProjects = useMemo(() => activeFilter 
    ? projects.filter(project => project.techStack.includes(activeFilter)) 
    : projects, [activeFilter]);

  const toggleFilter = (tech: string) => {
    onFilterChange(activeFilter === tech ? null : tech);
  };

  const clearFilter = () => onFilterChange(null);

  return (
    <section id={SectionId.PROJECTS} className="py-16 md:py-32 px-4 bg-brand-dark relative border-t border-brand-border transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter">
              Selected Works
            </h2>
            <div className="h-1 w-20 bg-brand-accent rounded-full"></div>
          </div>
          <div className="hidden md:block">
             <div className="flex items-center gap-2 text-xs font-mono text-brand-secondary border border-brand-border px-4 py-2 rounded-full bg-brand-surface backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></span>
                ALL SYSTEMS OPERATIONAL
             </div>
          </div>
        </div>

        {/* Active Filter Indicator */}
        {activeFilter && (
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
                <div className="flex items-center gap-2 text-sm text-brand-accent">
                    <Filter size={16} />
                    <span className="font-mono uppercase tracking-wider">Filtered by:</span>
                </div>
                <button 
                    onClick={clearFilter}
                    className="flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20 hover:bg-brand-accent/20 transition-colors text-xs font-bold uppercase tracking-wide"
                >
                    {activeFilter} <X size={14} />
                </button>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
                key={project.id} 
                onClick={() => onProjectClick?.(project)}
                className="group/card relative rounded-2xl overflow-hidden bg-brand-surface border border-brand-border hover:border-brand-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-accent/5 cursor-pointer h-[450px]"
            >
              
              {/* Image Container - Full Height */}
              <div className="absolute inset-0 h-full w-full">
                <ProjectCardImage project={project} />
              </div>

              {/* Content Overlay - Positioned at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-brand-base via-brand-base/90 to-transparent z-20 transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover/card:text-brand-accent transition-colors">
                    {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light line-clamp-2 mb-4 group-hover/card:text-gray-300">
                    {project.description}
                    </p>
                </div>
                
                {/* Tech Stack - Reveal on hover */}
                <div className="space-y-4 h-0 opacity-0 group-hover/card:h-auto group-hover/card:opacity-100 transition-all duration-500 delay-75 overflow-hidden">
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                        {project.techStack.slice(0, 5).map((tech) => (
                            <div key={tech} className="p-1.5 bg-white/10 rounded-md hover:bg-white/20 transition-colors group/icon" title={tech}>
                                <TechIcon tag={tech} isActive={true} />
                            </div>
                        ))}
                        {project.techStack.length > 5 && (
                            <span className="text-[10px] font-mono font-bold px-2 py-1 bg-white/5 rounded text-gray-500 flex items-center">+{project.techStack.length - 5}</span>
                        )}
                    </div>
                    
                    <div className="flex items-center text-brand-accent text-xs font-bold uppercase tracking-widest gap-2">
                        View Case Study <ArrowRight size={14} />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
            <div className="py-20 text-center border border-dashed border-brand-border rounded-xl">
                <p className="text-brand-secondary font-mono">No projects found with filter "{activeFilter}".</p>
                <button onClick={clearFilter} className="mt-4 text-brand-accent hover:underline text-sm uppercase tracking-wider">Clear Filter</button>
            </div>
        )}
      </div>
    </section>
  );
});
