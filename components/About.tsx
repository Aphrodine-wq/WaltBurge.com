import React from 'react';
import { m as motion } from 'framer-motion';
import { SectionId } from '../types';
import { CountUp } from './CountUp';

const stats = [
  { value: '7mo', label: 'Self-Taught' },
  { value: '11', label: 'Systems Shipped' },
  { value: '18K+', label: 'AI Training Examples' },
  { value: '1', label: 'Custom LLM Trained' },
];

const points = [
  {
    n: '01',
    title: 'The Construction Edge',
    body: 'I build software like I built houses — scope it, sequence it, ship something that holds under load.',
  },
  {
    n: '02',
    title: 'Production-First',
    body: 'No curriculum. My first project shipped to a real client — MHP Construction, Oxford MS — in production.',
  },
  {
    n: '03',
    title: 'Own Your Tools',
    body: 'When the tool didn’t exist, I built it: my own model (ConstructionAI), my own agent language (Tessera).',
  },
];

export const About: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id={SectionId.ABOUT} className="py-20 md:py-32 px-6 md:px-8 bg-brand-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={container}
          className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start"
        >
          {/* Left — heading + stats */}
          <motion.div variants={item} className="md:sticky md:top-32">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-8 h-px bg-brand-accent" />
              01 · About
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[0.9]">
              From the <br />
              <span className="text-brand-secondary/50">Job Site</span> to <br />
              the Codebase.
            </h2>

            <div className="grid grid-cols-2 gap-px mt-10 border border-brand-border bg-brand-border">
              {stats.map(s => (
                <div key={s.label} className="p-4 md:p-5 bg-brand-surface">
                  <CountUp value={s.value} className="block text-2xl md:text-3xl font-black text-brand-primary mb-1" />
                  <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — statement + points */}
          <div className="flex flex-col">
            <motion.p
              variants={item}
              className="text-2xl md:text-3xl font-light text-brand-primary leading-snug tracking-tight"
            >
              I wrote my first line of code seven months ago. Since then: a{' '}
              <span className="font-medium">contractor marketplace</span>, a{' '}
              <span className="font-medium">custom AI estimation model</span>, and the tools I build everything else with.
            </motion.p>

            <motion.div variants={item} className="mt-12 border-t border-brand-border">
              {points.map(p => (
                <div key={p.n} className="grid grid-cols-[2.5rem_1fr] gap-4 py-7 border-b border-brand-border">
                  <span className="font-mono text-sm font-bold text-brand-accent pt-1">{p.n}</span>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-1.5">{p.title}</h3>
                    <p className="text-brand-secondary leading-relaxed">{p.body}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-brand-secondary uppercase tracking-widest"
            >
              <span>Based in North Mississippi · Remote-friendly</span>
              <span>Open to AI / ML roles</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
