import React, { useState, useEffect, useMemo } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { menus, getMenu } from '../lib/services';
import { NavLinks } from './NavLinks';

interface ServicesPageProps {
  initialSlug?: string;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onSelect: (slug: string) => void; // keep the URL in sync without a full nav
}

// Menu markdown → site styling. Tables are the whole point here (Service | Price),
// so they get real treatment the blog never needed.
const mdComponents: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-4xl font-black text-brand-primary tracking-tighter mt-16 mb-2 first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg md:text-xl font-bold text-brand-primary tracking-tight mt-10 mb-4">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-2xl md:text-3xl font-black text-brand-accent tracking-tight mt-1 mb-3">{children}</h4>
  ),
  p: ({ children }) => <p className="my-4 text-brand-secondary text-[15px] leading-relaxed">{children}</p>,
  em: ({ children }) => <em className="not-italic text-brand-faint">{children}</em>,
  strong: ({ children }) => <strong className="text-brand-primary font-bold">{children}</strong>,
  ul: ({ children }) => <ul className="my-4 space-y-1.5 pl-5 list-disc marker:text-brand-accent">{children}</ul>,
  li: ({ children }) => <li className="text-brand-secondary text-[15px] leading-relaxed pl-1">{children}</li>,
  hr: () => <hr className="my-12 border-brand-border" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-brand-border">
      <table className="w-full text-left border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-brand-muted">{children}</thead>,
  th: ({ children }) => (
    <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-brand-faint last:text-right">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-[14px] text-brand-secondary border-t border-brand-border last:text-right last:font-semibold last:text-brand-primary last:whitespace-nowrap">{children}</td>
  ),
};

const Pill: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
      active
        ? 'bg-brand-accent border-brand-accent text-white'
        : 'bg-brand-surface border-brand-border text-brand-secondary hover:border-brand-accent/40 hover:text-brand-primary'
    }`}
  >
    {children}
  </button>
);

export const ServicesPage: React.FC<ServicesPageProps> = ({ initialSlug, onBack, onNavigate, onSelect }) => {
  const [slug, setSlug] = useState(initialSlug && getMenu(initialSlug) ? initialSlug : menus[0]?.slug);
  const menu = useMemo(() => getMenu(slug) || menus[0], [slug]);

  useEffect(() => {
    document.title = `Service Menu — Walt Burge`;
  }, []);

  const pick = (s: string) => {
    setSlug(s);
    onSelect(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-base text-brand-primary pt-16 md:pt-20">
      {/* Bar */}
      <div className="fixed top-0 left-0 w-full z-50 px-5 md:px-8 h-16 md:h-20 flex items-center justify-between bg-brand-base/85 backdrop-blur-md border-b border-brand-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to site
        </button>
        <NavLinks onNavigate={onNavigate} />
      </div>

      <div className="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="font-mono text-xs text-brand-accent uppercase tracking-[0.22em]">Walt Builds · Service Menu</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[0.95]">
            {menu.industry}<span className="text-brand-accent">.</span>
          </h1>
          <p className="mt-5 text-brand-secondary text-base md:text-lg max-w-2xl leading-relaxed">
            Real software, shipped and owned. The estimate and the audit are free.
          </p>
        </motion.div>

        {/* Industry switcher */}
        <div className="mt-8 -mx-5 md:mx-0 px-5 md:px-0 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {menus.map(m => (
            <Pill key={m.slug} active={m.slug === menu.slug} onClick={() => pick(m.slug)}>
              {m.industry}
            </Pill>
          ))}
        </div>

        {/* Rendered menu */}
        <article className="mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {menu.body}
          </ReactMarkdown>
        </article>

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-brand-border text-center">
          <h3 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight">Let's build something.</h3>
          <p className="mt-3 text-brand-secondary">The estimate is free. The audit is free. You only pay when we start building.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="mt-6 px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold tracking-wide transition-colors"
          >
            Get a free estimate
          </button>
        </div>
      </div>
    </div>
  );
};
