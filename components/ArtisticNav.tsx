import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { NavLinks, NAV_ITEMS } from './NavLinks';

interface ArtisticNavProps {
  onNavigate: (id: string) => void;
  onHome: () => void;
}

// Homepage header. Wordmark left, shared NavLinks right. Solidifies on scroll and
// underlines the section you're currently looking at (scrollspy).
export const ArtisticNav: React.FC<ArtisticNavProps> = ({ onNavigate, onHome }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy: highlight whichever nav section is currently centered in the
  // viewport. The section nearest the upper-middle of the screen wins.
  useEffect(() => {
    const ids = NAV_ITEMS.map(i => i.id);
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-300 ${
        scrolled
          ? 'bg-brand-base/85 backdrop-blur-md border-b border-brand-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <button
          onClick={onHome}
          className="flex items-center gap-2.5 font-display text-xl md:text-2xl font-extrabold tracking-tight text-brand-primary hover:text-brand-accent transition-colors"
          aria-label="Walt Burge — home"
        >
          <img src="/brand/mark.svg" alt="" aria-hidden="true" className="w-6 h-6 md:w-7 md:h-7" />
          <span>Walt Burge<span className="text-brand-accent">.</span></span>
        </button>

        <NavLinks onNavigate={onNavigate} activeId={activeId} />
      </div>
    </motion.nav>
  );
};
