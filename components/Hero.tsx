import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SectionId } from '../types';
import { HeroBackground } from './Hero/HeroBackground';
import { HeroContent } from './Hero/HeroContent';
import { SkillTooltip } from './Hero/SkillTooltip';
import { SkillNode, FilterCategory } from './Hero/types';

// Lazy load the 3D constellation for better initial load performance
const SkillConstellation = lazy(() =>
  import('./Hero/SkillConstellation').then(module => ({ default: module.SkillConstellation }))
);

export const Hero: React.FC = React.memo(() => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleSkillHover = (skill: SkillNode | null, event?: React.MouseEvent) => {
    setHoveredSkill(skill);
    if (event && skill) {
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleSkillClick = (skill: SkillNode) => {
    // When clicking a skill, filter to its category
    setActiveFilter(skill.category as FilterCategory);
  };

  const scrollToProjects = () => {
    document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id={SectionId.HERO}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-base"
    >
      {/* Background */}
      <HeroBackground />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center min-h-[80vh]">

          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <HeroContent
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          {/* Right: 3D Constellation */}
          <div className="order-1 lg:order-2 h-[400px] md:h-[500px] lg:h-[600px] relative">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
                </div>
              }
            >
              <SkillConstellation
                filter={activeFilter}
                onSkillHover={(skill) => handleSkillHover(skill)}
                onSkillClick={handleSkillClick}
              />
            </Suspense>

            {/* Tooltip */}
            <div
              onMouseMove={(e) => {
                if (hoveredSkill) {
                  setTooltipPosition({ x: e.clientX, y: e.clientY });
                }
              }}
              className="absolute inset-0 pointer-events-none"
            >
              <SkillTooltip skill={hoveredSkill} position={tooltipPosition} />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.6 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToProjects}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-secondary">Scroll</span>
        <div className="relative">
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 blur-sm"
          >
            <ArrowDown size={18} className="text-brand-accent" />
          </motion.div>
          <ArrowDown size={18} className="text-brand-accent relative z-10" />
        </div>
      </motion.div>
    </section>
  );
});
