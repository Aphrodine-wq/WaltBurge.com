import React, { useEffect } from 'react';
import { Mail, Phone, Github, ArrowLeft, ArrowUpRight, MapPin, Printer } from 'lucide-react';
import { allWorkItems } from '../lib/work';
import { NavLinks } from './NavLinks';
import { Project } from '../types';
import { trackEvent } from '../lib/track';

interface ResumePageProps {
  onBack: () => void;
  onNavigate: (id: string) => void;
  onProjectClick?: (project: Project) => void;
}

// Contact + identity — single source so the header and the schema stay in sync.
const CONTACT = {
  name: 'Walt Burge',
  alt: 'James Walton',
  title: 'AI Developer — Data Science & AI Learning Systems',
  location: 'Oxford, MS · Remote-friendly',
  email: 'jamesburge.mcm@gmail.com',
  phone: '(662) 292-5533',
  phoneHref: 'tel:+16622925533',
  github: 'github.com/Aphrodine-wq',
  githubHref: 'https://github.com/Aphrodine-wq',
};

// Skills, grouped. AI developer first — ML and data science lead. Every line here
// is backed by a project in content/work/items.json, so it survives an interview.
const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: 'ML / AI', items: ['PyTorch', 'LLM fine-tuning (Llama 3.1)', 'Distillation', 'RAG', 'Embeddings', 'LangChain', 'Ollama', 'MCP'] },
  { label: 'Data Science', items: ['Dataset curation', 'Synthetic data generation', 'Evaluation', 'Data pipelines'] },
  { label: 'ML Infra', items: ['RunPod', 'vast.ai (GPU)', 'Serverless inference', 'Model ops'] },
  { label: 'Languages', items: ['Python', 'TypeScript', 'Java', 'Rust'] },
  { label: 'Backend & APIs', items: ['Spring Boot', 'Node.js', 'REST', 'WebSocket', 'PostgreSQL', 'SQLite'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'React Native (Expo)', 'Tailwind CSS'] },
];

// Flagship work, pulled from the catalog by id so it never drifts from /work.
// `proves` is the one line a hiring manager reads — what each project demonstrates.
// Ordered AI-developer-first: the model, the training systems, then AI in production.
const FLAGSHIP: { id: string; proves: string }[] = [
  { id: 'constructionai', proves: 'A custom fine-tuned LLM in production, not a notebook — built the whole pipeline: data curation, synthetic distillation, hyperparameter tuning, and serverless deploy at ~$0.002/estimate.' },
  { id: 'forge', proves: 'A desktop trainer for the whole fine-tuning loop — GPU provisioning on vast.ai, dataset and hyperparameter management, launch and monitor. The training toolchain, productized.' },
  { id: 'tessera', proves: 'A markdown-native language for AI agents — substrate-typed, executed on PyTorch / LangChain / Ollama backends, and formally verified before it runs.' },
  { id: 'engram', proves: 'MIT-licensed, local-first AI memory — on-device OCR + an MCP server so any agent can search it. One pip install, nothing leaves the machine.' },
  { id: 'fairtradeworker', proves: 'AI shipped to real users — a two-sided marketplace where ConstructionAI prices jobs live, across Next.js web, a Java/Spring backend, and a React Native app.' },
];

const flagshipProjects = FLAGSHIP
  .map(f => ({ proves: f.proves, project: allWorkItems.find(w => w.id === f.id) }))
  .filter((x): x is { proves: string; project: Project } => Boolean(x.project));

export const ResumePage: React.FC<ResumePageProps> = ({ onBack, onNavigate, onProjectClick }) => {
  // A resume page should read with a normal pointer, and print clean.
  useEffect(() => {
    const prev = document.body.style.cursor;
    document.body.style.cursor = 'auto';
    return () => { document.body.style.cursor = prev; };
  }, []);

  const projectHref = (p: Project) => p.link || p.repositoryUrl;

  return (
    <div className="min-h-screen bg-brand-base text-brand-primary font-sans">
      {/* Top bar — chrome only, hidden when printing */}
      <header className="print:hidden sticky top-0 z-[100] bg-brand-base/85 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-sans text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <NavLinks onNavigate={onNavigate} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-16 print:py-0 print:max-w-none">
        {/* Identity */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-brand-border">
          <div>
            <span className="font-mono text-[11px] tracking-[0.3em] text-brand-accent uppercase">Résumé</span>
            <h1 className="mt-3 font-display font-black text-4xl md:text-6xl tracking-tighter leading-[0.95]">
              {CONTACT.name}<span className="text-brand-accent">.</span>
            </h1>
            <p className="mt-3 text-lg md:text-xl text-brand-secondary font-light">{CONTACT.title}</p>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-1.5 font-mono text-xs text-brand-secondary md:text-right">
            <span className="inline-flex items-center gap-2 md:justify-end"><MapPin size={13} className="text-brand-accent" /> {CONTACT.location}</span>
            <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 md:justify-end hover:text-brand-accent transition-colors"><Mail size={13} className="text-brand-accent" /> {CONTACT.email}</a>
            <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 md:justify-end hover:text-brand-accent transition-colors"><Phone size={13} className="text-brand-accent" /> {CONTACT.phone}</a>
            <a href={CONTACT.githubHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 md:justify-end hover:text-brand-accent transition-colors"><Github size={13} className="text-brand-accent" /> {CONTACT.github}</a>
          </div>
        </div>

        {/* Summary */}
        <section className="py-8 border-b border-brand-border">
          <p className="text-lg md:text-xl leading-relaxed text-brand-primary font-light">
            Self-taught AI developer with a heavy data-science and learning-systems focus. I wrote my first line of code
            seven months ago; since then I've <span className="font-medium">trained a custom LLM</span> end to end —
            data curation, synthetic distillation, fine-tuning, and serverless deploy — built the
            <span className="font-medium"> tooling and agent systems</span> around it, and shipped
            {' '}11 production systems that put real AI in front of real users. I build the model and
            everything around it: when the thing I needed didn't exist, I built it.
          </p>
        </section>

        {/* Skills */}
        <section className="py-8 border-b border-brand-border">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-5">Skills</h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
            {SKILL_GROUPS.map(group => (
              <div key={group.label} className="grid grid-cols-[7rem_1fr] gap-3 items-baseline">
                <span className="font-mono text-[11px] uppercase tracking-wider text-brand-secondary pt-0.5">{group.label}</span>
                <span className="text-sm text-brand-primary leading-relaxed">{group.items.join(' · ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Selected work */}
        <section className="py-8 border-b border-brand-border">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-5">Selected Work</h2>
          <div className="flex flex-col">
            {flagshipProjects.map(({ project, proves }) => {
              const href = projectHref(project);
              return (
                <div key={project.id} className="grid grid-cols-[1fr_auto] gap-4 py-5 border-b border-brand-border/60 last:border-0">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => onProjectClick?.(project)}
                        className="text-left font-display text-lg font-bold text-brand-primary hover:text-brand-accent transition-colors print:hover:text-brand-primary"
                      >
                        {project.title}
                      </button>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-brand-muted">{project.status} · {project.year}</span>
                    </div>
                    <p className="mt-1.5 text-sm text-brand-secondary leading-relaxed">{proves}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-brand-muted">
                      {project.techStack.join(' · ')}
                    </p>
                  </div>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('cta_click', { location: 'resume', label: `link-${project.id}` })}
                      className="self-start inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-brand-accent hover:underline whitespace-nowrap"
                    >
                      {project.repositoryUrl && !project.link ? 'Code' : 'Live'} <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="print:hidden mt-5 font-mono text-[11px] uppercase tracking-wider text-brand-accent hover:underline"
          >
            See the portfolio →
          </button>
        </section>

        {/* Background */}
        <section className="py-8 border-b border-brand-border">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-5">Background</h2>
          <div className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-brand-secondary pt-0.5">2025 — now</span>
            <p className="text-sm text-brand-primary leading-relaxed">
              Self-taught AI / ML development, with the full-stack to ship it. Trained a custom model and built the data,
              training, and agent systems around it — live in production for a paying contractor (MHP Construction, Oxford MS).
            </p>
            <span className="font-mono text-[11px] uppercase tracking-wider text-brand-secondary pt-0.5">Before</span>
            <p className="text-sm text-brand-primary leading-relaxed">
              Construction — ran crews and wrote estimates by hand. That's where the engineering instinct comes from:
              scope it, sequence it, ship something that holds under load.
            </p>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              onClick={() => trackEvent('cta_click', { location: 'resume', label: 'email' })}
              className="inline-flex items-center gap-2 bg-brand-accent text-white px-5 py-2.5 font-semibold text-sm hover:bg-brand-accent-hover transition-colors"
            >
              <Mail size={16} /> Get in touch
            </a>
            <a
              href={CONTACT.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-brand-border bg-brand-surface px-5 py-2.5 font-semibold text-sm text-brand-primary hover:border-brand-accent transition-colors"
            >
              <Github size={16} /> GitHub
            </a>
          </div>
          <button
            onClick={() => { trackEvent('cta_click', { location: 'resume', label: 'print' }); window.print(); }}
            className="print:hidden inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-brand-secondary hover:text-brand-accent transition-colors"
          >
            <Printer size={14} /> Save as PDF
          </button>
        </section>
      </main>
    </div>
  );
};
