import React from 'react';

const PROPS = [
  {
    title: 'The first call costs nothing',
    body: "Neither does the estimate. If software is the wrong tool for your problem, I'll say so and save us both the time.",
  },
  {
    title: 'You own what I build',
    body: "Source code, data, accounts — yours. No per-seat subscription that climbs every year, no vendor holding your own system hostage.",
  },
  {
    title: 'Built compliant',
    body: 'HIPAA-aware for practices, bar-aware for firms. Patient and client data stays in your control.',
  },
  {
    title: 'One person, start to finish',
    body: 'The person who writes the code is the one who answers your phone. No account reps, no ticket queue.',
  },
];

// Risk-reversal band — the four reasons a cautious buyer says yes. Hairline
// grid, no icons: the words carry it.
export const WhyWaltBuilds: React.FC = () => (
  <section className="py-20 md:py-28 px-4 md:px-6 bg-brand-muted border-t border-brand-border/40">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter leading-[0.95]">
          The deal, plainly
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border border border-brand-border">
        {PROPS.map((p, i) => (
          <div key={p.title} className="bg-brand-base p-8">
            <span className="font-mono text-xs text-brand-faint">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 font-display font-bold text-brand-primary tracking-tight leading-snug">{p.title}</h3>
            <p className="mt-2 text-sm text-brand-secondary leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
