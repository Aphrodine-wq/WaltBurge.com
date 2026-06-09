import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Hammer, KeyRound } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    icon: Phone,
    title: 'Tell me the problem',
    body: "A free call — no pitch, no sales engineer. You tell me where you're bleeding time or losing people to a missed call. I tell you straight whether AI actually fixes it, or whether it doesn't.",
  },
  {
    n: '02',
    icon: Hammer,
    title: 'I build it for you',
    body: "Custom to how you already work, installed and tuned. Not a template you have to configure — a system built around your practice by the person who answers your call.",
  },
  {
    n: '03',
    icon: KeyRound,
    title: 'You own it',
    body: "It's yours — no per-seat lock-in, no rented black box. It runs in your control and gets sharper the longer it works. The value compounds to you, not a vendor.",
  },
];

// Three-step process. Lowers the fear for conservative buyers who want to know
// exactly what they're signing up for. Reused on the homepage and the
// private-practice landing pages.
export const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="py-20 md:py-28 px-4 md:px-6 bg-brand-base border-t border-brand-border/40">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mb-12 md:mb-16">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-4">How it works</div>
        <h2 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter leading-[0.95]">
          Three steps. No mystery<span className="text-brand-accent">.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border border border-brand-border">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
            className="bg-brand-base p-8 md:p-10"
          >
            <div className="flex items-center justify-between">
              <s.icon size={24} className="text-brand-accent" />
              <span className="font-mono text-sm text-brand-muted tracking-widest">{s.n}</span>
            </div>
            <h3 className="mt-6 text-xl font-display font-bold text-brand-primary tracking-tight">{s.title}</h3>
            <p className="mt-3 text-brand-secondary leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
