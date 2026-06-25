import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

interface EngineeringCredibilityProps {
  onOpenResume: () => void;
}

const stats = [
  { value: '11', label: 'Production Systems' },
  { value: '7mo', label: 'Self-Taught' },
  { value: '1', label: 'Custom AI Model' },
];

// The secondary trust signal: behind the services is one engineer with real,
// shipped work. Condensed from the old six-card Expertise + About sections —
// enough to earn trust, with the full depth a click away on /resume.
export const EngineeringCredibility: React.FC<EngineeringCredibilityProps> = ({ onOpenResume }) => {
  const scrollToProjects = () =>
    document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id={SectionId.SKILLS}
      className="py-20 md:py-28 px-4 md:px-6 bg-brand-base border-t border-brand-border/40"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 items-start">
        {/* Left — who's building it */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-4">
            Who builds it
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter leading-[0.95]">
            Not an agency &mdash; the engineer<span className="text-brand-accent">.</span>
          </h2>
          <p className="mt-6 text-lg text-brand-secondary leading-relaxed">
            I taught myself to code, trained a custom AI model end to end, and shipped 11 production
            systems in the last seven months &mdash; including the software <span className="text-brand-primary font-semibold">MHP
            Construction</span> runs in Oxford. Hire me and you get the person who writes the code, not a
            sales rep or an account manager.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3">
            <button
              onClick={onOpenResume}
              className="text-brand-accent hover:text-brand-accent-hover font-semibold transition-colors text-left"
            >
              See the r&eacute;sum&eacute; &rarr;
            </button>
            <button
              onClick={scrollToProjects}
              className="text-brand-secondary hover:text-brand-primary font-semibold transition-colors text-left"
            >
              See the work &rarr;
            </button>
          </div>
        </motion.div>

        {/* Right — proof in numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-px border border-brand-border bg-brand-border w-full"
        >
          {stats.map((s) => (
            <div key={s.label} className="p-4 md:p-5 bg-brand-surface">
              <span className="block text-2xl md:text-4xl font-black text-brand-primary mb-1">{s.value}</span>
              <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
