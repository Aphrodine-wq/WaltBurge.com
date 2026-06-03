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
    promise: 'Fills your schedule',
    description:
      'It answers your phone day and night, books new patients while you’re busy with the ones in front of you, and asks happy patients for reviews so more people find you. It never gives medical advice — it just makes sure nobody slips through.',
    chips: ['Answers calls 24/7', 'Books patients', 'Builds reviews', 'HIPAA-safe'],
    proof: 'Running now for a Mississippi clinic.',
  },
  {
    icon: Scale,
    industry: 'Law',
    promise: 'Never miss a case',
    description:
      'When someone needs a lawyer at 2 a.m., it picks up, figures out the kind of case and how urgent it is, gathers the details, and books the consult. The next emergency becomes your client — not the firm down the street’s. It never gives legal advice.',
    chips: ['Answers 24/7', 'Sorts urgent cases', 'Books consults', 'Bar-safe'],
    proof: 'Built on a live voice-agent setup.',
  },
  {
    icon: HardHat,
    industry: 'Construction',
    promise: 'Win more bids',
    description:
      'It prices jobs in minutes instead of late nights, turns a quick voice note into a real estimate, and follows up on every lead so none go cold. Built by someone who ran crews and wrote estimates by hand long before he wrote code.',
    chips: ['Fast estimates', 'Voice-to-quote', 'Follows up leads', 'Built by a builder'],
    proof: 'My own estimating tool + live marketplace.',
  },
];

const ladder = [
  { icon: Search, step: 'Free audit', detail: 'I find the 3 jobs AI can take off your plate.' },
  { icon: Wrench, step: 'Build & set up', detail: 'I build it and get it running — a working tool, not a slide deck.' },
  { icon: RefreshCw, step: 'Keep it earning', detail: 'I tune it each month so it keeps paying for itself.' },
];

interface SpecialtiesProps {
  onOpenMenu?: () => void;
}

export const Specialties: React.FC<SpecialtiesProps> = ({ onOpenMenu }) => {
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
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            AI Consultant · Oxford, MS
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-6 uppercase">
            Built for <span className="text-brand-accent">Health, Law &amp; Construction</span>
          </h2>
          <p className="text-lg text-brand-secondary max-w-2xl">
            I build smart tools that answer your phone, follow up with every lead, and take the busywork off
            your plate &mdash; so you stop losing customers to whoever picks up first. Made for three
            industries I know firsthand.
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
              className="group relative p-7 md:p-8 border border-brand-border bg-brand-surface hover:border-brand-accent transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 bg-brand-muted border border-brand-border p-3 mb-5 flex items-center justify-center group-hover:border-brand-accent/50 transition-colors">
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
                    className="text-xs px-3 py-1 bg-brand-muted border border-brand-border text-brand-secondary font-mono group-hover:border-brand-accent/50 group-hover:text-brand-accent transition-colors"
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
                className="flex items-start gap-4 p-5 border border-brand-border bg-brand-surface"
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 mt-10">
            <button
              onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover transition-colors duration-300"
            >
              <span className="font-sans text-sm tracking-wide font-semibold text-white">
                Book a free AI audit
              </span>
            </button>
            {onOpenMenu && (
              <button
                onClick={onOpenMenu}
                className="font-sans text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors"
              >
                See the full service menu &rarr;
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
