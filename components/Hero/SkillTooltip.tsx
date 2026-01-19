import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillNode } from './types';
import { categoryMetadata } from './skillData';

interface SkillTooltipProps {
  skill: SkillNode | null;
  position: { x: number; y: number };
}

export const SkillTooltip: React.FC<SkillTooltipProps> = ({ skill, position }) => {
  if (!skill) return null;

  const categoryColor = categoryMetadata[skill.category].color;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ duration: 0.2 }}
        className="fixed pointer-events-none z-50"
        style={{
          left: position.x + 20,
          top: position.y - 40,
        }}
      >
        <div className="glass-panel p-4 rounded-lg border-l-4 shadow-2xl max-w-xs"
          style={{
            borderLeftColor: categoryColor,
            boxShadow: `0 10px 40px -10px ${categoryColor}40`
          }}
        >
          <div className="space-y-2">
            <div className="font-bold text-brand-primary text-sm">
              {skill.name}
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs text-brand-secondary font-mono">
                {skill.category}
              </div>
              <div className="text-xs font-mono font-bold" style={{ color: categoryColor }}>
                {skill.proficiency}%
              </div>
            </div>
            {/* Proficiency bar */}
            <div className="w-full h-1 bg-brand-surface/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: categoryColor }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
