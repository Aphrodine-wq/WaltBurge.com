import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Scale, HardHat, Search, Wrench, RefreshCw } from 'lucide-react';
import { SectionId } from '../types';

// The positioning section: Walt Burge as an AI consultant specializing in three
// industries he knows cold — Health, Law, Construction. Each card names the
// industry's painful job, the AI system that kills it, and the proof it's real.
const specialties = [
  {
    icon: HeartPulse,
    industry: 'Healthcare',
    promise: 'AI that fills the schedule',
    description:
      'A 24/7 AI front desk that answers insurance and "how do I get started" questions, captures after-hours patients, and an automated review engine that builds your local reputation. HIPAA-aware by design — it captures and routes, it never gives medical advice.',
    chips: ['AI Front Desk', 'Patient Intake', 'Review Engine', 'HIPAA-aware'],
    proof: 'Live for a Mississippi MAT clinic.',
  },
  {
    icon: Scale,
    industry: 'Law',
    promise: 'AI that never misses a case',
    description:
      'Round-the-clock AI intake that triages case type and urgency, catches the 2 a.m. arrest and the weekend injury, captures conflict-check details, and books the consult. Bar-compliant — and it never gives legal advice. One missed call is a case walking to the firm down the street.',
    chips: ['AI Intake', 'Case Triage', 'Conflict Capture', 'Bar-Compliant'],
    proof: 'Built on a live AI voice-agent deployment.',
  },
  {
    icon: HardHat,
    industry: 'Construction',
    promise: 'AI that prices and wins work',
    description:
      'Custom estimation models, voice-to-estimate agents, and lead-to-bid automation — built by someone who ran crews and wrote estimates by hand before writing code. ConstructionAI (a custom-trained model) and the FairTradeWorker marketplace are mine, not someone else’s API.',
    chips: ['Custom LLM', 'Voice Estimates', 'Lead-to-Bid', 'Marketplace'],
    proof: 'Custom construction LLM + live marketplace.',
  },
];

const ladder = [
  { icon: Search, step: 'AI Audit', detail: 'I find the 3 tasks AI can kill in your business.' },
  { icon: Wrench, step: 'Build & Install', detail: 'A fixed-scope system that ships, not a strategy deck.' },
  { icon: RefreshCw, step: 'Manage & Grow', detail: 'Monthly tuning and reporting so it keeps paying off.' },
];

export const Specialties: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <section id={SectionId.SPECIALTIES} className="py-20 md:py-32 px-4 md:px-6 bg-brand-muted relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            <span className="inline-block w-8 h-px bg-brand-accent mr-3" />
            AI Consultant · Oxford, MS
            <span className="inline-block w-8 h-px bg-brand-accent ml-3" />
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-6 uppercase">
            Built for <span className="text-brand-accent">Health, Law &amp; Construction</span>
          </h2>
          <p className="text-lg text-brand-secondary max-w-2xl mx-auto">
            I don&rsquo;t resell ChatGPT. I build the custom models, voice agents, and automations that bring
            you patients, cases, and bids &mdash; specialized for three industries I know cold.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {specialties.map((s) => (
            <motion.div
              key={s.industry}
              variants={item}
              className="group relative p-7 md:p-8 rounded-2xl border border-brand-border bg-brand-surface hover:border-brand-accent hover:shadow-xl hover:shadow-brand-accent/5 transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-muted border border-brand-border p-3 mb-5 flex items-center justify-center group-hover:border-brand-accent/50 transition-colors">
                <s.icon className="w-8 h-8 text-brand-accent" />
              </div>

              <h3 className="text-2xl font-black text-brand-primary tracking-tight">{s.industry}</h3>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-accent mt-1 mb-4">
                {s.promise}
              </p>
              <p className="text-sm md:text-[15px] text-brand-secondary leading-relaxed mb-5 flex-1">
                {s.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {s.chips.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-3 py-1 rounded-full bg-brand-muted border border-brand-border text-brand-secondary font-mono group-hover:border-brand-accent/50 group-hover:text-brand-accent transition-colors"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-brand-border">
                <span className="font-mono text-[11px] uppercase tracking-wider text-brand-faint">
                  {s.proof}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How I work — the offer ladder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mt-14 md:mt-16"
        >
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {ladder.map((l, i) => (
              <div
                key={l.step}
                className="flex items-start gap-4 p-5 rounded-xl border border-brand-border bg-brand-surface"
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-sm font-bold text-brand-accent">0{i + 1}</span>
                  <l.icon className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-primary text-sm">{l.step}</h4>
                  <p className="text-xs text-brand-secondary leading-relaxed mt-1">{l.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover rounded-full transition-colors duration-300"
            >
              <span className="font-sans text-sm tracking-wide font-semibold text-white">
                Book a free AI audit
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
