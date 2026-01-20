import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ChevronRight, ArrowDown } from 'lucide-react';
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-base transition-colors duration-500"
    >
      <div className="absolute inset-0 z-0">
        {/* Abstract Things - Geometric Minimalism */}
        <div className="absolute top-[20%] left-[10%] w-64 h-64 border border-white/5 rounded-full blur-[1px] animate-float-slow" />
        <div className="absolute bottom-[30%] right-[15%] w-48 h-48 border border-white/5 rounded-full blur-[1px] animate-float-delayed" />
        <div className="absolute top-[60%] left-[20%] w-24 h-24 bg-white/5 rounded-full blur-[40px] animate-pulse-slow" />
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
          className="font-sans text-[11px] tracking-[0.4em] text-brand-secondary uppercase mb-8"
        >
          Architectural Systems
        </motion.span>

        {/* Main Title: Humble Sans */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-light text-5xl md:text-7xl lg:text-8xl text-brand-primary leading-[1.1] tracking-tight mb-8"
        >
          <span className="block">Walt Burge</span>
          {/* Subtitle removed from here to separate component */}
        </motion.h1>

        {/* Subtitle: Liquid Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl text-brand-primary/80 max-w-xl leading-relaxed mb-12 mix-blend-plus-lighter"
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
            <span className="relative z-10 font-sans text-sm tracking-widest uppercase text-brand-primary group-hover:text-white transition-colors">
              View Portfolio
            </span>
          </button>

          <button
            onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 rounded-full transition-all duration-500 hover:tracking-widest"
          >
            <span className="font-sans text-sm tracking-widest uppercase text-brand-primary/60 group-hover:text-brand-primary transition-colors border-b border-transparent group-hover:border-brand-primary/40 pb-1">
              Contact Me
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Ambient Elements - Stormy/Pacific Vibes */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 pointer-events-none z-0">
        <FloatingOrb x="10%" y="20%" size={200} color="rgba(255,255,255,0.02)" delay={0} />
        <FloatingOrb x="80%" y="60%" size={300} color="rgba(255,255,255,0.01)" delay={2} />
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <ArrowDown size={20} className="text-brand-secondary relative z-10" />
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
