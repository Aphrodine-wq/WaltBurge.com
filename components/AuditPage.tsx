import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { trackEvent } from '../lib/track';
import { getUtm } from '../lib/leadContext';

interface AuditPageProps {
  onBack: () => void;
  onNavigate: (id: string) => void;
}

const INDUSTRIES = [
  'Therapy / Behavioral Health',
  'Medical / Dental',
  'Med Spa / Wellness',
  'Contractor / Trades',
  'Law Firm',
  'Restaurant / Retail',
  'Other',
];

// What the audit covers — one card per pillar, no fluff.
const PILLARS = [
  {
    title: 'Forms & patient data',
    body: 'If your website collects client or patient info, I check exactly where it goes — and whether that path is compliant. Most healthcare sites fail this without knowing.',
  },
  {
    title: 'Speed & search',
    body: 'How fast your site loads, whether Google can actually read it, and what your competitors rank for that you don’t.',
  },
  {
    title: 'Missed-lead paths',
    body: 'Where a ready-to-buy visitor gives up — dead forms, buried phone numbers, no way to book after hours.',
  },
];

export const AuditPage: React.FC<AuditPageProps> = ({ onBack }) => {
  const [form, setForm] = useState({ business: '', website: '', industry: '', name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hp, setHp] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.business.trim() || !form.website.trim()) {
      setErrorMessage('Business name and website are required');
      setStatus('error');
      return;
    }
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMessage('Your name and a valid email are required');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.business,
          subject: 'Free audit request',
          message: `Free audit requested for ${form.website}` + (form.industry ? ` (${form.industry})` : ''),
          vertical: form.industry || 'audit',
          sourcePage: '/audit',
          utm: getUtm(),
          _hp: hp,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.error || 'Could not send');
      setStatus('success');
      trackEvent('audit_request', { industry: form.industry || 'unspecified' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Could not send — email jamesburge.mcm@gmail.com');
      trackEvent('form_submit_error', { reason: 'audit_network' });
    }
  };

  const inputClass =
    'w-full bg-brand-surface border border-brand-border focus:border-brand-accent outline-none px-4 py-3 text-brand-primary placeholder:text-brand-secondary/60 transition-colors';

  return (
    <div className="min-h-screen bg-brand-base">
      <div className="max-w-5xl mx-auto px-5 md:px-8 pt-28 pb-24">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-brand-secondary hover:text-brand-accent transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="font-mono text-xs text-brand-accent uppercase tracking-[0.22em]">Walt Builds · Free Audit</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[0.95]">
            Get your free audit<span className="text-brand-accent">.</span>
          </h1>
          <p className="mt-5 text-brand-secondary text-base md:text-lg max-w-2xl leading-relaxed">
            One page, in plain English, within two business days. No strings.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-12 md:gap-16">
          {/* What you get */}
          <div className="space-y-8">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="border-t border-brand-border pt-6"
              >
                <h3 className="font-display font-bold text-lg text-brand-primary tracking-tight">{p.title}</h3>
                <p className="mt-2 text-brand-secondary leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
            <p className="text-sm text-brand-secondary border-t border-brand-border pt-6">
              Done by hand by the person who&apos;d fix it — not a bot report.
            </p>
          </div>

          {/* Request form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {status === 'success' ? (
              <div className="border border-brand-border bg-brand-surface p-8">
                <CheckCircle className="text-brand-accent mb-4" size={28} />
                <h3 className="font-display font-bold text-xl text-brand-primary tracking-tight">Request received.</h3>
                <p className="mt-3 text-brand-secondary leading-relaxed">
                  Your audit of <span className="text-brand-primary font-semibold">{form.website}</span> lands in your
                  inbox within two business days. If something urgent turns up, I&apos;ll call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <input className={inputClass} placeholder="Business name *" value={form.business} onChange={set('business')} />
                <input className={inputClass} placeholder="Website (e.g. yourbusiness.com) *" value={form.website} onChange={set('website')} />
                <select className={inputClass} value={form.industry} onChange={set('industry')}>
                  <option value="">Industry (optional)</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                <input className={inputClass} placeholder="Your name *" value={form.name} onChange={set('name')} />
                <input className={inputClass} type="email" placeholder="Email *" value={form.email} onChange={set('email')} />
                <input className={inputClass} type="tel" placeholder="Phone (optional)" value={form.phone} onChange={set('phone')} />

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle size={16} /> {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="font-sans text-sm tracking-wide font-semibold text-white">
                    {status === 'loading' ? 'Sending…' : 'Request my free audit'}
                  </span>
                  {status !== 'loading' && <Send size={15} className="text-white" />}
                </button>
                <p className="text-xs text-brand-secondary/80">Free means free — no invoice, no follow-up sequence.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
