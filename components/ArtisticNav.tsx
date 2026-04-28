import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail, Sparkles, BookOpen } from 'lucide-react';
import { SectionId } from '../types';

export const ArtisticNav: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const navItems = [
    { id: SectionId.HERO, label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: SectionId.PROJECTS, label: 'Projects', icon: Briefcase },
    { id: SectionId.SKILLS, label: 'Skills', icon: Code },
    { id: 'marketplace', label: 'Shop', icon: Sparkles },
    { id: SectionId.BLOG, label: 'Blog', icon: BookOpen },
    { id: SectionId.CONTACT, label: 'Contact', icon: Mail },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-[100] flex justify-center w-auto px-4" role="navigation" aria-label="Main navigation">
      <motion.div
        className="bg-black/70 backdrop-blur-md rounded-full px-3 py-2.5 md:px-8 md:py-5 flex items-center gap-1 md:gap-6 border border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {navItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            aria-label={item.label}
            className="relative flex flex-col items-center justify-center p-1.5 md:p-2 group"
          >
            <div className={`relative z-10 transition-all duration-150 ${hoveredIdx === idx ? 'text-white -translate-y-1' : 'text-white/60'}`}>
              <item.icon strokeWidth={1.5} className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
            </div>

            <AnimatePresence>
              {hoveredIdx === idx && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 8 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full text-[10px] font-serif tracking-widest text-brand-accent whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </motion.div>
    </nav>
  );
};
