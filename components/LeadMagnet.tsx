'use client';

import React, { useState } from 'react';

export function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');

    try {
      const res = await fetch('https://formspree.io/f/xyzgwdzk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'ai-checklist' }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="lead-magnet" className="py-20 md:py-28 px-5 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="relative p-8 md:p-12 rounded-2xl border border-brand-accent/20 bg-brand-surface/50 text-center overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-brand-accent border border-brand-accent/20 rounded-full mb-6">
              Free Resource
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-3">
              Free AI Readiness Checklist
            </h2>
            <p className="text-lg text-brand-accent font-medium mb-2">
              Is Your Business Ready for AI?
            </p>
            <p className="text-brand-secondary text-sm md:text-base mb-8 max-w-lg mx-auto">
              A 15-point checklist to evaluate whether AI can save your business time and money. No fluff, no sales pitch — just the honest questions to ask before investing in AI.
            </p>

            {status === 'success' ? (
              <div className="p-4 rounded-xl bg-brand-accent/10 border border-brand-accent/20">
                <p className="text-brand-accent font-medium">
                  Check your inbox! The checklist is on its way.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-full bg-brand-base border border-brand-border/40 text-brand-primary placeholder:text-brand-secondary/50 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="px-6 py-3 bg-brand-accent text-brand-base font-bold rounded-full text-sm hover:bg-brand-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === 'submitting' ? 'Sending...' : 'Get the Checklist'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="text-red-400 text-sm mt-3">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="text-brand-secondary/50 text-xs mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
