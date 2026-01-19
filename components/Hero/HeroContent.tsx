import React from 'react';
import { motion } from 'framer-motion';
import { Database, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { FilterCategory } from './types';
import { categoryMetadata } from './skillData';
import { SectionId } from '../../types';

interface HeroContentProps {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  activeFilter,
  onFilterChange
}) => {
  const filters: FilterCategory[] = ['All', 'AI/ML', 'Systems', 'Web', 'Game Dev'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 100 }
    }
  };

  const scrollToProjects = () => {
    document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center h-full space-y-8 md:space-y-10"
    >
      {/* Name */}
      <motion.div variants={itemVariants}>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-brand-primary leading-none">
          WALT<span className="text-brand-accent">.</span>BURGE
        </h1>
      </motion.div>

      {/* Identity Statement */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-primary">
          Engineering Intelligence
        </h2>
        <p className="text-base md:text-lg text-brand-secondary font-light max-w-lg">
          From bare-metal to LLMs, building systems that think.
        </p>
      </motion.div>

      {/* Skill Category Filters */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="text-xs font-mono text-brand-secondary uppercase tracking-wider">
          Explore Skills
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            const count = filter === 'All'
              ? Object.values(categoryMetadata).reduce((sum, cat) => sum + cat.count, 0)
              : categoryMetadata[filter as keyof typeof categoryMetadata]?.count || 0;

            return (
              <motion.button
                key={filter}
                onClick={() => onFilterChange(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-4 py-2 rounded-lg text-sm font-mono font-bold uppercase tracking-wide
                  transition-all duration-300
                  ${isActive
                    ? 'bg-brand-accent text-brand-base border-2 border-brand-accent shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                    : 'bg-brand-surface text-brand-secondary border-2 border-brand-border hover:border-brand-accent/50'
                  }
                `}
              >
                {filter} {filter !== 'All' && `(${count})`}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Value Propositions */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="space-y-2 font-mono text-sm md:text-base text-brand-secondary">
          {[
            '• Compiler design + AI integration',
            '• RAG pipelines processing millions of tokens',
            '• Metal/HLSL shaders for real-time 3D',
            '• Full-stack systems from C++ to React'
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Counter */}
      <motion.div variants={itemVariants} className="flex gap-6 text-center md:text-left">
        <div>
          <div className="text-3xl md:text-4xl font-black text-brand-accent">40+</div>
          <div className="text-xs font-mono text-brand-secondary uppercase tracking-wider">Technologies</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-black text-brand-accent">10+</div>
          <div className="text-xs font-mono text-brand-secondary uppercase tracking-wider">Years</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-black text-brand-accent">100+</div>
          <div className="text-xs font-mono text-brand-secondary uppercase tracking-wider">Projects</div>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto"
        >
          <Button
            onClick={scrollToProjects}
            variant="outline"
            className="w-full sm:w-auto min-w-[180px] border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-base transition-all duration-300"
          >
            <Database size={16} className="mr-2" />
            Explore Work
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto"
        >
          <Button
            onClick={scrollToContact}
            variant="default"
            className="w-full sm:w-auto min-w-[180px] bg-brand-accent hover:bg-cyan-500 text-brand-base font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300"
          >
            <Mail size={16} className="mr-2" />
            Let's Talk
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
