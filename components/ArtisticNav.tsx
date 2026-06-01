import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../types';

// Labeled business header. Logo left (with the card's cobalt period), links right,
// Contact as the cobalt CTA. Solidifies on scroll. Blog promoted to a top-level link.
const navItems = [
  { id: SectionId.SPECIALTIES, label: 'Services' },
  { id: SectionId.PROJECTS, label: 'Work' },
  { id: SectionId.BLOG, label: 'Blog' },
  { id: 'marketplace', label: 'Shop' },
  { id: 'about', label: 'About' },
];

export const ArtisticNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    if (id === SectionId.HERO) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

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
        {/* Wordmark */}
        <button
          onClick={() => goTo(SectionId.HERO)}
          className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-brand-primary hover:text-brand-accent transition-colors"
          aria-label="Walt Burge — home"
        >
          Walt Burge<span className="text-brand-accent">.</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className="group relative font-sans text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-brand-accent transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            onClick={() => goTo(SectionId.CONTACT)}
            className="px-5 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold tracking-tight transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden p-2 -mr-2 text-brand-primary"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-brand-base/95 backdrop-blur-md border-b border-brand-border"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className="text-left py-3 font-sans text-base font-medium text-brand-secondary hover:text-brand-primary border-b border-brand-border/50 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => goTo(SectionId.CONTACT)}
                className="mt-3 px-5 py-3 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white text-base font-semibold text-center transition-colors"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
