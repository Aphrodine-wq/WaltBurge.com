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
      {/* Lightweight geometric accents — no blur, no blend modes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 border border-white/10 rounded-full" />
        <div className="absolute bottom-[30%] right-[15%] w-48 h-48 border border-white/10 rounded-full" />
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-sans text-[11px] tracking-[0.4em] text-brand-secondary uppercase mb-8"
        >
          Creative Development
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-light text-5xl md:text-7xl lg:text-8xl text-brand-primary leading-[1.1] tracking-tight mb-8"
        >
          <span className="block">Walt Burge</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-lg md:text-xl text-brand-primary/80 max-w-xl leading-relaxed mb-12"
        >
          Full-stack engineer building performant systems and clean interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors duration-300"
          >
            <span className="relative z-10 font-sans text-sm tracking-widest uppercase text-brand-primary group-hover:text-white transition-colors">
              View Portfolio
            </span>
          </button>

          <button
            onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 rounded-full transition-colors duration-300"
          >
            <span className="font-sans text-sm tracking-widest uppercase text-brand-primary/60 group-hover:text-brand-primary transition-colors border-b border-transparent group-hover:border-brand-primary/40 pb-1">
              Contact Me
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-white/20" />
        <ArrowDown size={16} className="text-brand-secondary" />
      </motion.div>
    </section>
  );
};
