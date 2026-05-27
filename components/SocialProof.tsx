'use client';

import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  'MHP Construction',
  'Delta Stump',
  'First Choice Land Dev',
  'Lafayette Insurance',
  'M3A',
  'OM365 Forum',
];

const stats = [
  { value: '12+', label: 'Projects Shipped' },
  { value: '18K+', label: 'AI Training Examples' },
  { value: '6+', label: 'Clients Served' },
  { value: '$0.002', label: 'Per AI Estimate' },
];

export const SocialProof: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-brand-base relative overflow-hidden">
      {/* Subtle top/bottom border lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand-border/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand-border/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* A. Trusted By / Client Logos Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <span className="font-mono text-[10px] md:text-xs text-brand-secondary uppercase tracking-[0.2em]">
              Trusted By
            </span>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {clients.map((client) => (
              <motion.span
                key={client}
                variants={itemVariants}
                className="px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-brand-border/40 bg-brand-surface/10 text-brand-secondary text-xs md:text-sm font-medium tracking-wide hover:border-brand-accent/30 hover:text-brand-primary transition-all duration-300"
              >
                {client}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* B. Stats Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={statVariants}
              className={`text-center py-6 md:py-8 ${
                i < stats.length - 1
                  ? 'md:border-r md:border-brand-border/20'
                  : ''
              }`}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-primary tracking-tighter mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] md:text-xs text-brand-secondary uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
