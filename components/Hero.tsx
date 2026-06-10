import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone } from 'lucide-react';
import { SectionId } from '../types';
import { trackEvent } from '../lib/track';

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
      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 flex flex-col items-start text-left px-6 md:px-8 max-w-5xl w-full mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[11px] tracking-[0.4em] text-brand-accent uppercase mb-8"
        >
          AI Consultant · Oxford, MS
        </motion.span>

        {/* Mask reveal — the name slides up from a clipped baseline on load. */}
        <div className="overflow-hidden pb-[0.12em] mb-8">
          <motion.h1
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-brand-primary leading-[0.95] tracking-tighter"
          >
            Walt Burge<span className="text-brand-accent">.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-lg md:text-xl text-brand-secondary max-w-xl leading-relaxed mb-12"
        >
          Custom AI for <span className="text-brand-primary font-semibold">healthcare, law, and construction</span> &mdash; built to bring you patients, cases, and bids.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto px-4 sm:px-0"
        >
          <button
            onClick={scrollToProjects}
            className="px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover transition-colors duration-300"
          >
            <span className="font-sans text-sm tracking-wide font-semibold text-white">
              View Portfolio
            </span>
          </button>

          <button
            onClick={() => { trackEvent('cta_click', { location: 'hero', label: 'contact' }); document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-4 border border-brand-border hover:border-brand-accent bg-brand-surface transition-colors duration-300"
          >
            <span className="font-sans text-sm tracking-wide font-semibold text-brand-primary">
              Contact Me
            </span>
          </button>
        </motion.div>

        <motion.a
          href="tel:+16622925533"
          onClick={() => trackEvent('phone_click', { location: 'hero' })}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="group mt-6 inline-flex items-center gap-2.5 text-base font-medium text-brand-secondary hover:text-brand-primary transition-colors"
        >
          <Phone size={16} className="text-brand-accent" />
          <span>
            Your first phone call is <span className="text-brand-primary font-bold">free</span>
            <span className="text-brand-faint"> — no pitch, no obligation.</span>
          </span>
        </motion.a>
      </motion.div>

      {/* Anchored baseline rule — a structural mark, not a floating accent. */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="h-px bg-brand-border mb-12" />
        </div>
      </div>
    </section>
  );
};
