import React from 'react';

const STEPS = [
  {
    title: 'Tell me the problem',
    body: "A free call. You tell me where you're bleeding time or losing people to a missed call, and I tell you straight whether software fixes it. Sometimes the honest answer is that it doesn't — you'll hear that too.",
  },
  {
    title: 'I build it',
    body: 'Custom to how you already work, installed and tuned. Not a template you have to configure yourself — I set it up, test it against your real day, and train whoever needs to use it.',
  },
  {
    title: 'It starts earning',
    body: "Most tools pay for themselves on the first few caught calls or won bids. I stay reachable after launch — same phone number, same person — and tune it as your business changes.",
  },
];

// Three-step process, written like it'd be said across a counter. Deliberately
// a plain numbered list, not another card grid — section shapes should vary.
export const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="py-20 md:py-28 px-4 md:px-6 bg-brand-base border-t border-brand-border/40">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 items-start">
        <h2 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter leading-[0.95] md:sticky md:top-28">
          How a project goes
        </h2>

        <ol className="space-y-10 md:space-y-12">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[auto_1fr] gap-5 md:gap-7">
              <span className="font-mono text-lg font-bold text-brand-accent leading-7">{i + 1}.</span>
              <div>
                <h3 className="text-xl font-display font-bold text-brand-primary tracking-tight leading-7">{s.title}</h3>
                <p className="mt-2 text-brand-secondary leading-relaxed max-w-xl">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
