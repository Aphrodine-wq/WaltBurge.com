import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SectionId } from '../types';

// One source of truth — drives both the visible accordion and the FAQPage
// JSON-LD, so Google's rich-snippet text always matches what's on screen.
const faqs = [
  {
    q: 'What does the free audit include?',
    a: 'A one-page review of your website in plain English: whether your forms handle client or patient data safely, how fast your site loads and how Google sees it, and where visitors give up before contacting you. Delivered within two business days — free, no strings.',
  },
  {
    q: 'What does an AI consultant do?',
    a: 'I build and install custom AI systems for your business — a 24/7 AI receptionist, automated lead follow-up, custom-trained models, and more. Not advice and slide decks; working software you own.',
  },
  {
    q: 'Do you only work with businesses in Oxford, MS?',
    a: "I'm based in Oxford, Mississippi and love working with local businesses, but I build for clients anywhere. The work is remote-friendly and the system runs wherever you do.",
  },
  {
    q: 'How much does a custom AI system cost?',
    a: 'It depends on what you need — a single AI tool runs a few thousand dollars; a full system is more. The first call and the estimate are always free, and I scope the build to your budget.',
  },
  {
    q: "What's the difference between custom AI and ChatGPT?",
    a: "ChatGPT is a rented generalist that's never seen your business. A custom system is trained on your world, runs on infrastructure you own, and does one job extremely well — no per-use bill, no vendor lock-in.",
  },
  {
    q: 'Which industries do you work with?',
    a: 'Healthcare, law, and construction are my focus — I know those trades firsthand. But the systems I build (receptionists, intake, estimating, document drafting) fit almost any small business.',
  },
  {
    q: 'Can you build an AI that answers my phone?',
    a: 'Yes. An AI voice receptionist answers every call day and night, handles common questions, and books appointments straight to your calendar — so you never lose a customer to voicemail.',
  },
  {
    q: 'Do I own the AI you build?',
    a: "Yes — you own the system and the source code outright. It's not rented from me or anyone else. Take it anywhere; there's no lock-in.",
  },
  {
    q: 'How long does it take to build?',
    a: 'A focused tool can be live in a couple of weeks; a full custom system takes longer. We set a real timeline on the first call.',
  },
];

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    document.head.appendChild(ld);
    return () => { ld.remove(); };
  }, []);

  return (
    <section id="faq" className="py-20 md:py-32 px-6 md:px-8 bg-brand-surface border-t border-brand-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-14"
        >
          <span className="font-mono text-xs text-brand-accent uppercase tracking-widest flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-brand-accent" /> FAQ · Oxford, MS
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[0.95]">
            Questions, answered<span className="text-brand-accent">.</span>
          </h2>
        </motion.div>

        <div className="border-t border-brand-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-brand-border">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group w-full flex items-start justify-between gap-6 text-left py-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-bold text-brand-primary tracking-tight group-hover:text-brand-accent transition-colors">
                    {f.q}
                  </span>
                  <Plus
                    size={20}
                    className={`shrink-0 mt-1 text-brand-accent transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-brand-secondary leading-relaxed pb-6 max-w-2xl">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-brand-secondary">
          Still have a question?{' '}
          <button
            onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
            className="text-brand-accent font-semibold hover:underline"
          >
            Just ask — the first call is free.
          </button>
        </p>
      </div>
    </section>
  );
};
