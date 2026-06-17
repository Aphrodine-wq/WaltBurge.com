import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { SectionId } from '../types';
import { trackEvent } from '../lib/track';

// The single source of nav truth. Lives in the homepage header AND in every
// sub-page bar (blog, post, project), so navigation is the same everywhere and
// a reader is never stranded one "back" link from the rest of the site.
export const NAV_ITEMS = [
  { id: SectionId.PROJECTS, label: 'Work' },
  { id: SectionId.SKILLS, label: 'Skills' },
  { id: SectionId.BLOG, label: 'Blog' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
];

interface NavLinksProps {
  onNavigate: (id: string) => void;
  // Highlighted section, scrollspy-driven on the homepage; undefined elsewhere.
  activeId?: string | null;
}

export const NavLinks: React.FC<NavLinksProps> = ({ onNavigate, activeId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (id: string) => { setMenuOpen(false); onNavigate(id); };

  return (
    <>
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-9">
        {NAV_ITEMS.map(item => {
          const active = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              aria-current={active ? 'true' : undefined}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                active ? 'text-brand-primary' : 'text-brand-secondary hover:text-brand-primary'
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-0.5 bg-brand-accent transition-all duration-300 ${
                  active ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          );
        })}
        <a
          href="tel:+16622925533"
          onClick={() => trackEvent('phone_click', { location: 'header' })}
          className="hidden lg:flex items-center gap-1.5 font-sans text-sm font-medium text-brand-secondary hover:text-brand-accent transition-colors"
          aria-label="Call or text (662) 292-5533"
        >
          <Phone size={15} />
          (662) 292-5533
        </a>
        <button
          onClick={() => { trackEvent('cta_click', { location: 'header', label: 'resume' }); go('resume'); }}
          className="px-5 py-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold tracking-tight transition-colors"
        >
          Résumé
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

      {/* Mobile panel — drops from under the bar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full overflow-hidden bg-brand-base/95 backdrop-blur-md border-b border-brand-border"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className="text-left py-3 font-sans text-base font-medium text-brand-secondary hover:text-brand-primary border-b border-brand-border/50 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { trackEvent('cta_click', { location: 'mobile-menu', label: 'resume' }); go('resume'); }}
                className="mt-3 px-5 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white text-base font-semibold text-center transition-colors"
              >
                Résumé
              </button>
              <a
                href="tel:+16622925533"
                onClick={() => { setMenuOpen(false); trackEvent('phone_click', { location: 'mobile-menu' }); }}
                className="mt-2 px-5 py-3 border border-brand-border text-brand-primary text-base font-semibold text-center transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={16} /> Call or text (662) 292-5533
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
