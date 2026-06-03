import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { engines } from '../lib/shop';

interface MarketplaceProps {
  onBrowse?: () => void;
}

// Homepage Shop teaser — previews the three Engines and sends people to the full
// /shop catalog. Sharp, left-aligned, cream/cobalt (refined-minimal direction).
export const Marketplace: React.FC<MarketplaceProps> = ({ onBrowse }) => {
  return (
    <section id="marketplace" className="py-20 md:py-32 px-6 md:px-8 bg-brand-base border-t border-brand-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="font-mono text-xs text-brand-accent uppercase tracking-widest flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-brand-accent" /> Shop
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[0.95]">
            AI systems you can buy<span className="text-brand-accent">.</span>
          </h2>
          <p className="mt-5 text-brand-secondary text-lg max-w-2xl leading-relaxed">
            Packaged AI systems — named, priced, and built to install. Buy the outcome, not a slide deck.
          </p>
        </motion.div>

        {/* The three Engines */}
        <div className="grid md:grid-cols-3 gap-px bg-brand-border border border-brand-border mt-10">
          {engines.map(e => (
            <button
              key={e.slug}
              onClick={onBrowse}
              className="group text-left bg-brand-base p-6 md:p-8 hover:bg-brand-surface transition-colors"
            >
              <h3 className="text-xl font-black text-brand-primary tracking-tight group-hover:text-brand-accent transition-colors">{e.name}</h3>
              <p className="mt-2 text-brand-secondary text-[15px] leading-relaxed">{e.tagline}</p>
            </button>
          ))}
        </div>

        <button
          onClick={onBrowse}
          className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors"
        >
          Browse the full shop
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
