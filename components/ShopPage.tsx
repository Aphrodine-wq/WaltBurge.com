import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { engines, toolsByCategory, digital, AISystem } from '../lib/shop';
import { NavLinks } from './NavLinks';

interface ShopPageProps {
  onBack: () => void;
  onNavigate: (id: string) => void;
  onOpenSystem: (slug: string) => void;
}

const SystemCard: React.FC<{ s: AISystem; onOpen: (slug: string) => void; big?: boolean }> = ({ s, onOpen, big }) => {
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className={`font-black text-brand-primary tracking-tight ${big ? 'text-2xl' : 'text-lg'}`}>{s.name}</h3>
        <span className="font-mono text-xs text-brand-accent whitespace-nowrap">{s.priceFrom}</span>
      </div>
      <p className="mt-2 text-brand-secondary text-[15px] leading-relaxed">{big ? s.summary : s.tagline}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        {s.link ? 'Open' : 'View'} {s.link ? <ArrowUpRight size={15} /> : <ArrowRight size={15} />}
      </span>
    </>
  );
  const cls = 'group block text-left w-full p-6 md:p-7 border border-brand-border bg-brand-surface hover:border-brand-accent transition-colors';
  return s.link ? (
    <a href={s.link} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <button onClick={() => onOpen(s.slug)} className={cls}>{inner}</button>
  );
};

export const ShopPage: React.FC<ShopPageProps> = ({ onBack, onNavigate, onOpenSystem }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Shop — AI Systems You Can Buy | Walt Burge';
    window.scrollTo(0, 0);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Walt Builds AI Systems',
      itemListElement: engines.map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: e.name,
        url: `https://waltburge.com/shop/${e.slug}`,
      })),
    });
    document.head.appendChild(ld);
    return () => { document.title = prevTitle; ld.remove(); };
  }, []);

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

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="font-mono text-xs text-brand-accent uppercase tracking-[0.22em] flex items-center gap-3">
            <span className="w-8 h-px bg-brand-accent" /> Walt Builds · Shop
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[0.95] max-w-3xl">
            AI systems, off the shelf<span className="text-brand-accent">.</span>
          </h1>
          <p className="mt-5 text-brand-secondary text-base md:text-lg max-w-2xl leading-relaxed">
            Buy the outcome, not a slide deck. Pick a system, book a call, and I build and install it. Every price is a
            starting point — the estimate and the audit are free.
          </p>
        </motion.div>

        {/* Engines */}
        <section className="mt-16">
          <div className="flex items-baseline gap-4 border-b border-brand-border pb-3">
            <h2 className="text-xl md:text-2xl font-black text-brand-primary tracking-tight">The Engines</h2>
            <span className="font-mono text-xs text-brand-faint">complete systems, one per trade</span>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-brand-border border border-brand-border mt-6">
            {engines.map(e => (
              <div key={e.slug} className="bg-brand-base">
                <SystemCard s={e} onOpen={onOpenSystem} big />
              </div>
            ))}
          </div>
        </section>

        {/* Tools by category */}
        {toolsByCategory().map(group => (
          <section key={group.category} className="mt-14">
            <div className="flex items-baseline gap-4 border-b border-brand-border pb-3">
              <h2 className="text-xl md:text-2xl font-black text-brand-primary tracking-tight">{group.category}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border border border-brand-border mt-6">
              {group.items.map(s => (
                <div key={s.slug} className="bg-brand-base">
                  <SystemCard s={s} onOpen={onOpenSystem} />
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Digital / self-serve */}
        {digital.length > 0 && (
          <section className="mt-14">
            <div className="flex items-baseline gap-4 border-b border-brand-border pb-3">
              <h2 className="text-xl md:text-2xl font-black text-brand-primary tracking-tight">Self-Serve</h2>
              <span className="font-mono text-xs text-brand-faint">run it yourself, today</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border border border-brand-border mt-6">
              {digital.map(s => (
                <div key={s.slug} className="bg-brand-base">
                  <SystemCard s={s} onOpen={onOpenSystem} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-brand-border">
          <h3 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight">Not sure which system fits?</h3>
          <p className="mt-3 text-brand-secondary max-w-xl">Tell me the task. I'll tell you straight what to build — or whether you even need a custom system at all. The audit is free.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="mt-6 px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold tracking-wide transition-colors"
          >
            Book a free call
          </button>
        </div>
      </div>
    </div>
  );
};
