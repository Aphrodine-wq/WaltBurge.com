import React from 'react';
import { PhoneCall, KeyRound, ShieldCheck, UserCheck } from 'lucide-react';

const PROPS = [
  {
    icon: PhoneCall,
    title: 'The first call is free',
    body: 'And so is the estimate. No obligation, no pressure — if AI is the wrong tool for your problem, I tell you.',
  },
  {
    icon: KeyRound,
    title: 'You own what I build',
    body: 'Not a per-seat subscription that climbs forever. It runs in your control, and the value compounds to you.',
  },
  {
    icon: ShieldCheck,
    title: 'Built compliant',
    body: 'HIPAA-aware for practices, bar-aware for firms. Your data stays in your control — private by design.',
  },
  {
    icon: UserCheck,
    title: 'One person, start to finish',
    body: 'The person who writes the code is the one who answers your phone. No account reps, no ticket queue.',
  },
];

// Risk-reversal band. The four reasons a cautious buyer says yes — free to
// start, owned not rented, compliant, and a real person on the other end.
// Reused on the homepage and the private-practice landing pages.
export const WhyWaltBuilds: React.FC = () => (
  <section className="py-20 md:py-28 px-4 md:px-6 bg-brand-muted border-t border-brand-border/40">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mb-12 md:mb-16">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-4">Why work with me</div>
        <h2 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter leading-[0.95]">
          Low risk, on purpose<span className="text-brand-accent">.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border border border-brand-border">
        {PROPS.map(p => (
          <div key={p.title} className="bg-brand-base p-8">
            <p.icon size={22} className="text-brand-accent" />
            <h3 className="mt-5 font-display font-bold text-brand-primary tracking-tight leading-snug">{p.title}</h3>
            <p className="mt-2 text-sm text-brand-secondary leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
