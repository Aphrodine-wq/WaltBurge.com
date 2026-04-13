import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Project, SectionId } from '../types';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import {
  ExternalLink, Github, Layers, Monitor, Gamepad, Terminal, Smartphone, Wrench, ArrowRight,
  Binary, Box, Cloud, Code2, Command, Cpu, Database, FileCode, Hash, Layout, Lock, Power, Server, Zap, BrainCircuit,
  Image as ImageIcon, X, Filter, Calendar, Circle
} from 'lucide-react';

// --- Image Handling Helper ---
const getProjectImage = (id: string) => {
  // Map IDs to specific files in public/assets/projects
  switch (id) {
    case 'fairtradeworker': return '/assets/projects/fairtradeworker/fairtradeworker.png';
    default: return `/assets/projects/${id}/cover.png`;
  }
};

const getGradientForProject = (id: string) => {
  // Strict Two-Tone Gradients: Onyx base with Jungle Green hints
  const gradients = [
    'bg-gradient-to-br from-brand-base to-brand-accent/10',
    'bg-gradient-to-br from-brand-base to-brand-accent/20',
    'bg-gradient-to-br from-brand-base via-brand-base to-brand-accent/15',
  ];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

export const projects: Project[] = [
  {
    id: 'fairtradeworker',
    title: 'FairTradeWorker',
    category: 'Web',
    description: 'Two-sided construction marketplace with QuickBooks-native payments and AI-powered estimation.',
    fullDescription: 'FairTradeWorker is a full-stack construction marketplace connecting homeowners with vetted contractors. Homeowners post jobs, contractors bid competitively, and the platform handles payments through QuickBooks Online integration. Built across three repos — Next.js frontend, Kotlin/Spring Boot backend with STOMP WebSocket realtime, and a React Native mobile app.',
    challenge: 'Building a marketplace that handles the full lifecycle — from job posting through bidding, contract signing, milestone-based payments, and dispute resolution — while keeping contractors honest and homeowners protected.',
    solution: 'Three-tier architecture: homeowner posts job, contractor bids, subcontractor handles specialty work. QuickBooks handles all payment flows natively. ConstructionAI powers instant cost estimates so homeowners know what\'s fair before a single bid comes in.',
    features: [
      'QuickBooks-native invoicing and payout',
      'AI-powered cost estimation via ConstructionAI',
      'Real-time bidding with STOMP WebSocket',
      'Three-role system: homeowner, contractor, subcontractor',
      'Mobile app with 30+ screens (React Native/Expo)',
      '6 revenue streams including white-label licensing'
    ],
    techStack: ['Next.js', 'TypeScript', 'Kotlin', 'React Native', 'PostgreSQL', 'Tailwind'],
    tags: ['marketplace', 'full-stack', 'construction'],
    imageUrl: getProjectImage('fairtradeworker'),
    images: [],
    link: 'https://fair-trade-worker.vercel.app',
    repositoryUrl: 'https://github.com/Aphrodine-wq/fairtradeworker',
    status: 'Live',
    year: '2025'
  },
  {
    id: 'mshomepros',
    title: 'MsHomePros',
    category: 'Web',
    description: 'Contractor business platform — estimation, proposals, tracking, and payments powered by ConstructionAI.',
    fullDescription: 'MsHomePros is a contractor-facing business management platform. Contractors generate AI-powered estimates, create professional proposals, track jobs, and manage client relationships. The estimation engine runs on a custom fine-tuned LLM deployed on RunPod Serverless.',
    challenge: 'Construction contractors still price jobs on gut feel and napkin math. Getting accurate, professional estimates out the door fast is the difference between winning and losing bids.',
    solution: 'ConstructionAI generates line-item estimates in seconds. The platform wraps that in professional PDF proposals, job tracking, and client management — everything a contractor needs to run their business from one place.',
    features: [
      'AI-powered line-item estimation',
      'Professional PDF proposal generation',
      'Job tracking and scheduling',
      'Client relationship management',
      'Real contractor in production (MHP Construction, Oxford MS)'
    ],
    techStack: ['Next.js', 'TypeScript', 'Python', 'Tailwind', 'PostgreSQL'],
    tags: ['saas', 'construction', 'ai-powered'],
    imageUrl: getProjectImage('mshomepros'),
    images: [],
    link: 'https://mhpestimate.cloud',
    repositoryUrl: 'https://github.com/Aphrodine-wq/MsHomePros',
    status: 'Live',
    year: '2025'
  },
  {
    id: 'constructionai',
    title: 'ConstructionAI',
    category: 'AI',
    description: 'Fine-tuned Llama 3.1 8B for construction cost estimation — 18,000+ training examples, deployed on RunPod.',
    fullDescription: 'ConstructionAI is a custom fine-tuned large language model built specifically for construction cost estimation. Trained on 18,000+ curated examples covering residential and commercial trades, it generates detailed line-item estimates with material quantities, labor hours, and market-adjusted pricing. Currently scaling to 500K+ training examples via synthetic data distillation.',
    challenge: 'No existing AI model understands construction pricing at the line-item level. Generic LLMs hallucinate costs and miss trade-specific nuances like regional labor rates, material waste factors, and code requirements.',
    solution: 'Built a full training pipeline: curated real-world estimation data, generated synthetic examples via distillation from larger models, fine-tuned Llama 3.1 8B with custom hyperparameters, and deployed on RunPod Serverless at ~$0.002 per estimate.',
    features: [
      'Line-item cost breakdowns by trade',
      'Material quantity and waste calculations',
      'Regional labor rate adjustment',
      'RunPod Serverless deployment (~$0.002/estimate)',
      '8 specialized tool functions',
      'Scaling to 500K+ training examples (v5 pipeline)'
    ],
    techStack: ['Python', 'PyTorch', 'Llama', 'RunPod'],
    tags: ['llm', 'fine-tuning', 'construction'],
    imageUrl: getProjectImage('constructionai'),
    images: [],
    status: 'Live',
    year: '2025'
  },
  {
    id: 'walt',
    title: 'W.A.L.T.',
    category: 'AI',
    description: 'Distributed AI platform spanning three machines — 20 AGI layers, 73-engine verification, screen vision, and autonomous execution.',
    fullDescription: 'W.A.L.T. is a unified AI platform that turns Claude Code into something closer to a full operating system. It runs across three networked machines (Mac, Mini PC, GPU workstation) and includes screen understanding (Claude Eyes — 64 MCP tools), formal code verification (AEON — 73 engines), autonomous overnight execution, persistent goal tracking, an immune system for self-healing, and a file-backed event bus (Nerve) connecting 20 AGI-inspired layers.',
    challenge: 'AI assistants are stateless and reactive. They forget everything between sessions, can\'t see your screen, can\'t verify their own code, and can\'t work while you sleep.',
    solution: 'Built persistence, perception, and autonomy from scratch. Nerve connects all subsystems via pub/sub events. Eyes reads the screen. AEON verifies code formally. The overnight runner executes multi-project work queues autonomously. Goals persist across sessions with velocity tracking.',
    features: [
      'Claude Eyes: 64 MCP tools for screen + webcam understanding',
      'AEON: 73-engine formal verification (22 cybersecurity)',
      'Nerve: file-backed pub/sub event bus across all layers',
      'Overnight runner: autonomous multi-project execution',
      '20 AGI layers: goals, immune, memory, metacognition, and more',
      '3-node distributed network (Mac + Mini PC + GPU workstation)'
    ],
    techStack: ['TypeScript', 'Python', 'Rust', 'Node.js'],
    tags: ['ai-platform', 'distributed', 'autonomous'],
    imageUrl: getProjectImage('walt'),
    images: [],
    repositoryUrl: 'https://github.com/Aphrodine-wq/walt',
    status: 'Live',
    year: '2025'
  },
  {
    id: 'driftlands',
    title: 'Driftlands',
    category: 'Game Dev',
    description: 'Survival crafting game built in Rust and Bevy — 27K lines of code, targeting Steam Early Access.',
    fullDescription: 'Driftlands is a survival crafting game built from scratch in Rust using the Bevy 0.15 ECS game engine. 47 source files, 43 plugins, covering terrain generation, inventory systems, crafting, day/night cycles, and procedural world building. Pixel art assets generated via ComfyUI pipeline on a GPU server.',
    challenge: 'Building a full game in Rust with an ECS engine that\'s still evolving. No Unity safety net, no C# scripting shortcuts — just systems, components, and queries.',
    solution: 'Leaned into Bevy\'s plugin architecture. Each game system (inventory, crafting, terrain, lighting) is an isolated plugin with clean boundaries. Pixel art pipeline runs on vast.ai with ComfyUI for consistent asset generation.',
    features: [
      'Procedural terrain generation',
      'Full inventory and crafting system',
      'Day/night cycle with dynamic lighting',
      'ECS architecture with 43 Bevy plugins',
      'ComfyUI pixel art generation pipeline',
      'Custom keybinding and settings system'
    ],
    techStack: ['Rust', 'Bevy'],
    tags: ['game-dev', 'ecs', 'survival'],
    imageUrl: getProjectImage('driftlands'),
    images: [],
    repositoryUrl: 'https://github.com/Aphrodine-wq/driftlands',
    status: 'Beta',
    year: '2025'
  },
  {
    id: 'wos',
    title: 'WOS',
    category: 'Systems',
    description: 'Custom Linux distribution built on Nobara — gaming, AI development, and cybersecurity in one OS.',
    fullDescription: 'WOS is a custom Linux distribution based on Nobara (Fedora) designed for three workflows: gaming, AI/ML development, and cybersecurity. Ships with a custom AI-powered terminal shell (powered by a fine-tuned Qwen 2B model), pre-configured GPU drivers, and curated tooling for each domain.',
    challenge: 'Switching between gaming, AI work, and security research means juggling different OS configs, driver versions, and tool sets. No existing distro optimizes for all three.',
    solution: 'Built on Nobara\'s gaming-optimized Fedora base, then layered AI development tools and security frameworks on top. The AI terminal shell (liai) runs a locally fine-tuned 2B parameter model for instant command assistance.',
    features: [
      'AI-powered terminal shell (fine-tuned Qwen 2B)',
      'Pre-configured AMD GPU drivers for gaming + ML',
      'Curated cybersecurity toolkit',
      'Custom system configuration and theming',
      'Omarchy desktop environment'
    ],
    techStack: ['Rust', 'Python', 'Bash'],
    tags: ['linux', 'os', 'gaming'],
    imageUrl: getProjectImage('wos'),
    images: [],
    repositoryUrl: 'https://github.com/Aphrodine-wq/WOS',
    status: 'Beta',
    year: '2025'
  }
];

export const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Systems': return <Layers size={14} />;
    case 'Game Dev': return <Gamepad size={14} />;
    case 'Web': return <Monitor size={14} />;
    case 'Tools': return <Wrench size={14} />;
    case 'AI': return <BrainCircuit size={14} />;
    default: return <Terminal size={14} />;
  }
};

export const TechIcon = ({ tag, isActive }: { tag: string, isActive?: boolean }) => {
  const size = 16;
  const baseClass = "transition-colors duration-300";
  const colorClass = isActive ? "text-brand-accent" : "text-brand-secondary group-hover/icon:text-brand-accent";

  if (tag === 'React') return <div className={`${isActive ? 'grayscale-0 text-brand-accent' : 'grayscale text-brand-secondary'} group-hover/icon:grayscale-0 group-hover/icon:text-brand-accent transition-all`}><svg width={size} height={size} viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2" fill="currentColor" /><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5" /><ellipse rx="10" ry="4.5" transform="rotate(60)" /><ellipse rx="10" ry="4.5" transform="rotate(120)" /></g></svg></div>;
  if (tag === 'Next.js') return <div className={`${isActive ? 'grayscale-0 text-brand-accent' : 'grayscale text-brand-secondary'} group-hover/icon:grayscale-0 group-hover/icon:text-brand-accent transition-all`}><svg width={size} height={size} viewBox="0 0 180 180" fill="currentColor"><mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}><circle cx="90" cy="90" fill="black" r="90" /></mask><g mask="url(#mask0_next)"><circle cx="90" cy="90" data-circle="true" fill="black" r="90" stroke="currentColor" strokeWidth="6" /><path d="M149.508 157.527C151.508 158.527 153.508 155.527 155.508 153.527L118.508 102.527H123.508V73.5266H107.508V126.527L74.5082 73.5266H58.5082V126.527H74.5082V88.5266L116.508 154.527C124.508 163.527 137.508 165.527 149.508 157.527Z" fill="currentColor" /></g></svg></div>;
  if (tag === 'TypeScript') return <div className={`${isActive ? 'grayscale-0 text-brand-accent' : 'grayscale text-brand-secondary'} group-hover/icon:grayscale-0 group-hover/icon:text-brand-accent transition-all`}><svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM17.376 17.55c.706.77 1.576 1.166 2.58 1.166 1.485 0 2.37-.87 2.37-2.19v-.06c0-1.5-.96-2.1-2.55-2.73l-.84-.33c-1.02-.42-1.38-.81-1.38-1.56v-.06c0-.81.69-1.38 1.74-1.38 1.05 0 1.74.54 2.01 1.44l1.62-.69c-.54-1.53-1.89-2.34-3.63-2.34-1.95 0-3.33 1.2-3.33 2.91v.06c0 1.53.96 2.1 2.58 2.76l.81.33c1.08.45 1.38.87 1.38 1.62v.06c0 .99-.81 1.59-1.89 1.59-1.23 0-2.07-.63-2.37-1.68l-1.65.69c.045.02.585 1.106 2.535 2.006zM8.7 12.63l1.8 1.05v-5.43h2.4v9.6h-2.4v-2.79l-1.89-1.08v3.87h-2.4v-9.6h2.49v4.38z" /></svg></div>;
  if (tag === 'Tailwind') return <div className={`${isActive ? 'grayscale-0 text-brand-accent' : 'grayscale text-brand-secondary'} group-hover/icon:grayscale-0 group-hover/icon:text-brand-accent transition-all`}><svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89-2.288-1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" /></svg></div>;
  if (tag === 'Python') return <div className={`${isActive ? 'grayscale-0 text-brand-accent' : 'grayscale text-brand-secondary'} group-hover/icon:grayscale-0 group-hover/icon:text-brand-accent transition-all`}><svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-1.23.05-1.08.14-.93.24-.8.32-.68.37-.58.42-.46.44-.37.45-.28.45-.19.41-.12.39-.06.35-.03.29-.01h4.25zM12 9c.13 0 .26.02.39.08.36.15.6.5.6.89 0 .38-.25.74-.61.89-.13.06-.26.08-.39.08s-.26-.02-.39-.08c-.36-.15-.6-.5-.6-.89 0-.38.25-.74.61-.89.13-.06.26-.08.39-.08z" /></svg></div>;

  const customTextClass = isActive
    ? "bg-brand-accent/20 border-brand-accent text-brand-accent"
    : "bg-brand-surface text-brand-secondary border-brand-border group-hover/icon:text-brand-accent group-hover/icon:border-brand-accent/50";

  if (tag === 'C++') return <div className={`font-mono font-bold text-[10px] px-1 rounded border transition-colors ${customTextClass}`}>C++</div>;
  if (tag === 'C') return <div className={`font-mono font-bold text-[10px] px-1 rounded border transition-colors ${customTextClass}`}>C</div>;
  if (tag === 'C#') return <div className={`font-mono font-bold text-[10px] px-1 rounded border transition-colors ${customTextClass}`}>C#</div>;

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
    case 'Kotlin': return <Code2 size={size} className={`${colorClass} ${baseClass}`} />;
    case 'React Native': return <Smartphone size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Rust': return <Cpu size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Bevy': return <Gamepad size={size} className={`${colorClass} ${baseClass}`} />;
    case 'PyTorch': return <BrainCircuit size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Llama': return <BrainCircuit size={size} className={`${colorClass} ${baseClass}`} />;
    case 'RunPod': return <Cloud size={size} className={`${colorClass} ${baseClass}`} />;
    case 'Bash': return <Terminal size={size} className={`${colorClass} ${baseClass}`} />;
    default: return <Code2 size={size} className={`${colorClass} ${baseClass}`} />;
  }
};

const AbstractProjectVisual = React.memo(({ project }: { project: Project }) => {
  // Generate deterministic abstract patterns based on project ID
  const seed = project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Pattern Types: 0: Grid, 1: Concentric, 2: Particles
  const type = seed % 3;

  return (
    <div className={`h-full w-full relative overflow-hidden bg-brand-surface group/image`}>

      {/* Base Gradient / Mesh */}
      <div className={`absolute inset-0 opacity-20 ${getGradientForProject(project.id)}`} />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        {type === 0 && (
          <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        )}
        {type === 1 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[150%] h-[150%] border-2 border-brand-accent/10 rounded-full animate-spin-slow-reverse" />
            <div className="w-[100%] h-[100%] border-2 border-brand-accent/20 rounded-full animate-spin-slow" />
            <div className="w-[50%] h-[50%] border-2 border-brand-accent/30 rounded-full" />
          </div>
        )}
        {type === 2 && (
          <div className="absolute top-10 right-10 w-32 h-32 bg-brand-accent/20 blur-[50px] rounded-full mix-blend-screen animate-pulse-slow" />
        )}
      </div>

      {/* Central Abstract Icon/UI Representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl skew-y-3 group-hover/card:skew-y-0 group-hover/card:scale-110 transition-all duration-700 ease-[0.2,1,0.3,1]">
          <div className="w-16 h-16 flex items-center justify-center text-brand-primary">
            {project.category === 'Systems' && <Cpu size={32} />}
            {project.category === 'Tools' && <Terminal size={32} />}
            {project.category === 'Web' && <Layout size={32} />}
            {project.category === 'AI' && <BrainCircuit size={32} />}
            {project.category === 'Game Dev' && <Gamepad size={32} />}
          </div>
          {/* Mock UI Lines */}
          <div className="space-y-2 mt-4 w-24 opacity-50">
            <div className="h-1 bg-current rounded-full w-3/4" />
            <div className="h-1 bg-current rounded-full w-full" />
            <div className="h-1 bg-current rounded-full w-1/2" />
          </div>
        </div>
      </div>

      {/* Hover Reveal Overlay */}
      <div className="absolute inset-0 bg-brand-surface/40 group-hover/card:bg-transparent transition-all duration-500" />

      {/* Category Badge - Top Right */}
      <div className="absolute top-4 right-4 z-20 translate-y-[-10px] opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col items-end gap-2">
        <div className="bg-black/50 backdrop-blur-md border border-white/10 shadow-lg uppercase tracking-wide px-3 py-1.5 text-xs text-brand-primary rounded-full flex items-center">
          <CategoryIcon category={project.category} />
          <span className="ml-2">{project.category}</span>
        </div>
      </div>

      {/* Year Badge - Top Left */}
      <div className="absolute top-4 left-4 z-20 opacity-60 font-mono text-xs tracking-widest text-brand-secondary">
        {project.year}
      </div>
    </div>
  );
});

const ProjectCardImage = React.memo(({ project }: { project: Project }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <AbstractProjectVisual project={project} />;
  }

  return (
    <div className="h-full w-full relative group/image bg-brand-surface">
      <img
        src={project.imageUrl}
        alt={project.title}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transform scale-100 group-hover/card:scale-105 transition-transform duration-500 ease-out"
      />

      {/* Category Badge - Top Right */}
      <div className="absolute top-4 right-4 z-20 translate-y-[-10px] opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-200 flex flex-col items-end gap-2">
        <div className="bg-black/50 backdrop-blur-md border border-white/10 shadow-lg uppercase tracking-wide px-3 py-1.5 text-xs text-brand-primary rounded-full flex items-center">
          <CategoryIcon category={project.category} />
          <span className="ml-2">{project.category}</span>
        </div>
      </div>
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id={SectionId.PROJECTS} className="py-20 md:py-32 px-4 md:px-6 bg-brand-base relative border-t border-brand-border/10 transition-colors duration-300">

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-6 text-center md:text-left"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter">
              Selected Works
            </h2>
            <div className="h-1 w-20 bg-brand-accent rounded-full mx-auto md:mx-0"></div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-secondary border border-brand-border px-4 py-2 rounded-full bg-brand-surface/50 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
              ALL SYSTEMS OPERATIONAL
            </div>
          </div>
        </motion.div>

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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              onClick={() => onProjectClick?.(project)}
              className="group/card relative bg-brand-surface rounded-[2rem] overflow-hidden cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_60px_rgba(91,146,121,0.15)] transition-all duration-500 border border-white/5 h-[480px] w-full max-w-[400px]"
            >
              {/* Full Picture Background */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <ProjectCardImage project={project} />
                {/* Gradient overlay for bottom text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover/card:from-black/90 group-hover/card:via-black/50 transition-all duration-500" />
              </div>

              {/* Content Panel - Overlaid on image, AT BOTTOM */}
              <div className="absolute inset-0 p-8 pb-10 flex flex-col justify-end items-center z-10 text-center">
                <h3 className="text-2xl font-serif text-white leading-tight text-center mb-1">
                  {project.title}
                </h3>
                <span className="text-brand-accent text-xs font-sans tracking-wide mb-3">
                  {project.year}
                </span>

                <p className="text-white/80 text-sm leading-relaxed font-sans mb-4 line-clamp-2 max-w-xs text-center">
                  {project.description}
                </p>

                {/* Tech Stack - Minimal Pills - Centered */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[10px] text-white tracking-wide font-sans border border-white/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 border-2 border-brand-accent/0 rounded-[2rem] group-hover/card:border-brand-accent/30 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

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
