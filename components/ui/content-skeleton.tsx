import React from 'react';
import { motion } from 'framer-motion';

export const ContentSkeleton: React.FC<{ count?: number; variant?: 'card' | 'list' | 'grid' }> = ({
  count = 1,
  variant = 'card',
}) => {
  const items = Array.from({ length: count });

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
            className="aspect-video bg-brand-surface/50 rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {items.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
            className="h-12 bg-brand-surface/50 rounded"
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      className="w-full h-full bg-brand-surface/50 rounded-lg"
    />
  );
};
