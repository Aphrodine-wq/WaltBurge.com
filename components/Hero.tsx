import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ChevronRight, Database, Cloud, Lock, Zap, MousePointer2, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById(SectionId.PROJECTS);
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id={SectionId.HERO}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-primary transition-colors duration-500"
    >
      <div className="absolute inset-0 z-0">
        {/* Mesh 1: Jungle Green Accent */}
        <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgb(var(--aurora-teal)/0.1),transparent_70%)] blur-[120px] animate-aurora mix-blend-screen" />

        {/* Mesh 2: Jungle Green Depth */}
        <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgb(var(--aurora-teal)/0.15),transparent_70%)] blur-[120px] animate-float-dream mix-blend-screen" />
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
      >
        {/* Editorial Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-sans text-[11px] tracking-[0.4em] text-brand-accent uppercase mb-8 glow-text"
        >
          Architectural Systems
        </motion.span>

        {/* Main Title: Editorial Serif */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl md:text-8xl lg:text-9xl text-brand-primary leading-[0.9] tracking-tight mb-8 drop-shadow-2xl"
        >
          <span className="block">Walt</span>
          <span className="block italic text-white/60">Burge</span>
        </motion.h1>

        {/* Subtitle: Liquid Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl text-white/50 max-w-xl leading-relaxed mb-12 mix-blend-plus-lighter"
        >
          Forging nebulous ideas into solid digital matter.
          Specializing in high-fidelity interfaces and deep-system architecture.
        </motion.p>

        {/* Liquid Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full transition-all duration-500 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-aurora-teal/20 to-aurora-purple/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
            <span className="relative z-10 font-sans text-sm tracking-widest uppercase text-white group-hover:text-aurora-teal transition-colors">
              View Portfolio
            </span>
          </button>

          <button
            onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 rounded-full transition-all duration-500 hover:tracking-widest"
          >
            <span className="font-sans text-sm tracking-widest uppercase text-white/60 group-hover:text-white transition-colors border-b border-transparent group-hover:border-white/40 pb-1">
              Contact Me
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Ambient Elements - Strict Jungle Green */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 pointer-events-none z-0">
        <FloatingOrb x="10%" y="20%" size={200} color="rgba(91, 146, 121, 0.1)" delay={0} />
        <FloatingOrb x="80%" y="60%" size={300} color="rgba(91, 146, 121, 0.08)" delay={2} />
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <ArrowDown size={20} className="text-brand-accent relative z-10" />
      </motion.div>
    </section>
  );
};

const FloatingOrb = ({ x, y, size, color, delay }: any) => (
  <motion.div
    animate={{
      y: [-20, 20, -20],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3]
    }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
    style={{ left: x, top: y, width: size, height: size, background: color }}
    className="absolute rounded-full blur-[80px]"
  />
);
