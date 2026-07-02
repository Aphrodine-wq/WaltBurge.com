import React, { useState, useMemo } from 'react';
import { m as motion } from 'framer-motion';
import { Project, SectionId } from '../types';
import { workItems, kindLabel } from '../lib/work';
import {
  Layers, Monitor, Gamepad, Terminal, Smartphone, Wrench, ArrowRight, ArrowUpRight, Github,
  Binary, Box, Cloud, Code2, Command, Cpu, Database, Hash, Layout, Lock, Power, Server, Zap, BrainCircuit,
  X, Filter
} from 'lucide-react';

// Re-exported as the catalog so existing references keep working. The data now
// lives in content/work/items.json (single source of truth) via lib/work.
export const projects: Project[] = workItems;

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

  if (tag === 'C++') return <div className={`font-mono font-bold text-[10px] px-1 border transition-colors ${customTextClass}`}>C++</div>;
  if (tag === 'C') return <div className={`font-mono font-bold text-[10px] px-1 border transition-colors ${customTextClass}`}>C</div>;
  if (tag === 'C#') return <div className={`font-mono font-bold text-[10px] px-1 border transition-colors ${customTextClass}`}>C#</div>;

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

// Refined-minimal fallback for items without a cover image — which is most of
// them. A cream panel with a hairline grid, the project's monogram, and a single
// cobalt accent. Sharp corners, no gradients, no white-on-dark "AI look".
const AbstractProjectVisual = React.memo(({ project }: { project: Project }) => {
  const monogram = project.title.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();
  return (
    <div className="h-full w-full relative overflow-hidden bg-brand-base">
      {/* Hairline grid */}
      <div className="absolute inset-0 opacity-[0.5] bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:22px_22px]" />
      {/* Monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display font-black text-6xl text-brand-primary/15 tracking-tighter select-none">
          {monogram}
        </span>
      </div>
      {/* Category icon, single cobalt accent */}
      <div className="absolute bottom-4 left-4 text-brand-accent">
        <CategoryIcon category={project.category} />
      </div>
    </div>
  );
});

const ProjectCardImage = React.memo(({ project }: { project: Project }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !project.imageUrl) {
    return <AbstractProjectVisual project={project} />;
  }

  return (
    <img
      src={project.imageUrl}
      alt={project.title}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className="w-full h-full object-cover transform scale-100 group-hover/card:scale-[1.03] transition-transform duration-500 ease-out"
    />
  );
});

interface ProjectsProps {
  onProjectClick?: (project: Project) => void;
  onOpenResume?: () => void;
  onOpenServices?: () => void;
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

// Kind chips, in display order. 'all' clears the kind filter.
const KIND_CHIPS: { key: Project['kind'] | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'product', label: kindLabel.product },
  { key: 'platform', label: kindLabel.platform },
  { key: 'oss', label: kindLabel.oss },
  { key: 'client', label: kindLabel.client },
];

export const Projects: React.FC<ProjectsProps> = React.memo(({ onProjectClick, onOpenResume, onOpenServices, activeFilter, onFilterChange }) => {
  // Kind filter is local to the section; the tech filter (activeFilter) arrives
  // as a prop when a user clicks a tech tag on a detail page. They compose.
  const [kindFilter, setKindFilter] = useState<Project['kind'] | 'all'>('all');

  const filteredProjects = useMemo(() => workItems.filter(p =>
    (kindFilter === 'all' || p.kind === kindFilter) &&
    (!activeFilter || p.techStack.includes(activeFilter))
  ), [kindFilter, activeFilter]);

  // Only show kind chips that actually have items.
  const availableKinds = useMemo(() => new Set(workItems.map(p => p.kind)), []);

  const clearFilter = () => onFilterChange(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  };

  return (
    <section id={SectionId.PROJECTS} className="py-20 md:py-32 px-4 md:px-6 bg-brand-base relative border-t border-brand-border/40">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header — left-aligned, with the construction-to-code throughline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-4">Selected Work</div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[0.95]">
            Built from the<br />job site up<span className="text-brand-accent">.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-brand-secondary leading-relaxed">
            Products, platforms, and AI — shipped end to end.
          </p>
        </motion.div>

        {/* Kind filter chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {KIND_CHIPS.filter(c => c.key === 'all' || availableKinds.has(c.key as Project['kind'])).map(chip => {
            const active = kindFilter === chip.key;
            return (
              <button
                key={chip.key}
                onClick={() => setKindFilter(chip.key)}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                  active
                    ? 'border-brand-accent text-brand-accent bg-brand-accent/5'
                    : 'border-brand-border text-brand-secondary hover:border-brand-accent/50 hover:text-brand-primary'
                }`}
              >
                {chip.label}
              </button>
            );
          })}

          {/* Tech filter indicator (set from a detail page) */}
          {activeFilter && (
            <button
              onClick={clearFilter}
              className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-brand-accent/10 text-brand-accent border border-brand-accent/30 hover:bg-brand-accent/20 transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <Filter size={13} /> {activeFilter} <X size={13} />
            </button>
          )}
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onClick={() => onProjectClick?.(project)}
              className="group/card relative flex flex-col bg-brand-surface border border-brand-border hover:border-brand-accent/50 cursor-pointer transition-colors duration-300"
            >
              {/* Cover */}
              <div className="relative h-44 overflow-hidden border-b border-brand-border bg-brand-base">
                <ProjectCardImage project={project} />
                {/* Year — mono micro-label */}
                <span className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-brand-secondary bg-brand-surface/80 px-1.5 py-0.5">
                  {project.year}
                </span>
              </div>

              {/* Body — left-aligned on cream */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider text-brand-accent">
                  <CategoryIcon category={project.category} />
                  <span>{project.kind ? kindLabel[project.kind] : project.category}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-brand-primary leading-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-brand-secondary leading-relaxed mb-4 line-clamp-2">
                  {project.summary || project.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="font-mono text-[10px] uppercase tracking-wider text-brand-muted">
                      {tech}
                    </span>
                  ))}

                  {/* Live + source links — stop the card's detail click. */}
                  {(project.link || project.repositoryUrl) && (
                    <span className="ml-auto flex items-center gap-2.5">
                      {project.repositoryUrl && (
                        <a
                          href={project.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${project.title} source code`}
                          className="text-brand-secondary hover:text-brand-accent transition-colors"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${project.title} live site`}
                          className="text-brand-secondary hover:text-brand-accent transition-colors"
                        >
                          <ArrowUpRight size={15} />
                        </a>
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* Accent-edge wipe on hover */}
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-accent origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-300 ease-out" />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center border border-dashed border-brand-border">
            <p className="text-brand-secondary font-mono text-sm">Nothing matches that filter.</p>
            <button onClick={() => { setKindFilter('all'); clearFilter(); }} className="mt-4 text-brand-accent hover:underline text-xs font-mono uppercase tracking-wider">Reset</button>
          </div>
        )}

        {/* Hiring cross-link — the full picture for a recruiter or hiring manager */}
        <div className="mt-16 md:mt-20 border border-brand-border bg-brand-surface p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight leading-tight">
              Want the full picture<span className="text-brand-accent">?</span>
            </h3>
            <p className="mt-3 text-brand-secondary leading-relaxed">
              The résumé — skills, selected work, and how I got here in seven months. Open to engineering roles.
              {' '}
              <a
                href="/services"
                onClick={(e) => { if (onOpenServices) { e.preventDefault(); onOpenServices(); } }}
                className="text-brand-secondary underline decoration-brand-border hover:text-brand-accent hover:decoration-brand-accent transition-colors"
              >
                I also build software for businesses.
              </a>
            </p>
          </div>
          <a
            href="/resume"
            onClick={(e) => { if (onOpenResume) { e.preventDefault(); onOpenResume(); } }}
            className="group/cta inline-flex items-center gap-2 shrink-0 bg-brand-accent text-white px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-brand-accent-hover transition-colors"
          >
            View Résumé
            <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
});
