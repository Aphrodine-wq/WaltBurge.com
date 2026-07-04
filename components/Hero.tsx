import React from 'react';
import { m as motion, useScroll, useTransform } from 'framer-motion';
import { SectionId } from '../types';
import { trackEvent } from '../lib/track';
import { TerrainField } from './TerrainField';

interface HeroProps {
  onBookCall: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookCall }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToProjects = () => {
    document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id={SectionId.HERO}
      className="relative min-h-screen flex flex-col items-center justify-start pt-28 md:justify-center md:pt-0 overflow-hidden bg-brand-base"
    >
      {/* Survey-drawing terrain — raw WebGL, sits behind the copy in the lower half. */}
      <div className="absolute inset-x-0 bottom-0 h-[68%] pointer-events-none" aria-hidden="true">
        <TerrainField />
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 flex flex-col items-start text-left px-6 md:px-8 max-w-5xl w-full mx-auto"
      >
        {/* Mask reveal — the headline slides up from a clipped baseline on load. */}
        <div className="overflow-hidden pb-[0.12em] mb-8">
          <motion.h1
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-brand-primary leading-[0.95] tracking-tighter"
          >
            Never miss another customer<span className="text-brand-accent">.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed mb-12"
        >
          Custom <span className="text-brand-primary font-semibold">software</span> for local business. Owned by you, not rented.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto px-4 sm:px-0"
        >
          <button
            onClick={() => { trackEvent('cta_click', { location: 'hero', label: 'book-call' }); onBookCall(); }}
            className="px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover transition-colors duration-300"
          >
            <span className="font-sans text-sm tracking-wide font-semibold text-white">
              Book a free call
            </span>
          </button>

          <button
            onClick={() => { trackEvent('cta_click', { location: 'hero', label: 'see-the-work' }); scrollToProjects(); }}
            className="px-8 py-4 border border-brand-border hover:border-brand-accent bg-brand-surface transition-colors duration-300"
          >
            <span className="font-sans text-sm tracking-wide font-semibold text-brand-primary">
              See the work
            </span>
          </button>
        </motion.div>

      </motion.div>

      {/* Title block — survey coordinates over the anchored baseline rule.
          Real numbers: Oxford, MS. The terrain above is the drawing; this is
          its caption. */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="flex justify-between items-end pb-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-brand-secondary"
          >
            <span>34.3665° N · 89.5192° W</span>
            <span className="hidden sm:inline">Oxford, Mississippi · Elev 500 ft</span>
            <span className="sm:hidden">Oxford, MS</span>
          </motion.div>
          <div className="h-px bg-brand-border mb-12" />
        </div>
      </div>
    </section>
  );
};
