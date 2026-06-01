import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight } from 'lucide-react';

const categories = ['Next.js templates', 'React components', 'Tailwind UI kits', 'Landing pages'];

// Honest "coming soon" — production templates pulled from real work. No fake
// inventory, no placeholder products: an intentional pre-launch panel.
export const Marketplace: React.FC = () => {
  const goContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="marketplace" className="py-24 md:py-32 px-4 md:px-6 bg-brand-base border-t border-brand-border relative overflow-hidden">
      <div className="absolute -top-10 -right-10 opacity-[0.04] pointer-events-none text-brand-accent hidden md:block">
        <Package size={360} strokeWidth={1} />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-mono uppercase tracking-wider mb-7">
            <Package size={14} /> Shop
          </span>

          <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-6 leading-[0.95]">
            Templates &amp; components<span className="text-brand-accent">.</span>
          </h2>

          <p className="text-brand-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Production-ready templates and UI components, pulled straight from real projects — typed, accessible, and built to ship. Launching soon.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {categories.map(c => (
              <span key={c} className="px-4 py-2 rounded-full bg-brand-surface border border-brand-border text-sm font-mono text-brand-secondary">
                {c}
              </span>
            ))}
          </div>

          <button
            onClick={goContact}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold transition-colors group"
          >
            Get notified at launch
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
