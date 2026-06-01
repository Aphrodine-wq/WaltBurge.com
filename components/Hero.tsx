import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToProjects = () => {
    document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id={SectionId.HERO}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-base"
    >
      {/* Lightweight geometric accents — faint ink + one cobalt ring */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 border border-brand-primary/[0.06] rounded-full" />
        <div className="absolute bottom-[30%] right-[15%] w-48 h-48 border border-brand-accent/15 rounded-full" />
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[11px] tracking-[0.4em] text-brand-accent uppercase mb-8"
        >
          AI Consultant · Oxford, MS
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-brand-primary leading-[0.95] tracking-tighter mb-8"
        >
          Walt Burge<span className="text-brand-accent">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed mb-12"
        >
          AI consultant for <span className="text-brand-primary font-semibold">healthcare, law, and construction</span>. I build the custom models, voice agents, and automations that bring you patients, cases, and bids &mdash; not slide decks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto px-4 sm:px-0"
        >
          <button
            onClick={scrollToProjects}
            className="px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover rounded-full transition-colors duration-300"
          >
            <span className="font-sans text-sm tracking-wide font-semibold text-white">
              View Portfolio
            </span>
          </button>

          <button
            onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full border border-brand-border hover:border-brand-accent bg-brand-surface transition-colors duration-300"
          >
            <span className="font-sans text-sm tracking-wide font-semibold text-brand-primary">
              Contact Me
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-brand-border" />
        <ArrowDown size={16} className="text-brand-secondary" />
      </motion.div>
    </section>
  );
};
