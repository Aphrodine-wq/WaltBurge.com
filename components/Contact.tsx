import React, { useState, useEffect } from 'react';
import { m as motion } from 'framer-motion';
import { Phone, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { SectionId } from '../types';
import { trackEvent } from '../lib/track';
import { getLeadContext, getUtm, clearLeadContext, LEAD_CONTEXT_EVENT } from '../lib/leadContext';

export const Contact: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  // Honeypot — bots fill it, humans never see it. See lib/leadContext + api/lead.
  const [hp, setHp] = useState('');
  const [leadNote, setLeadNote] = useState('');

  // Carry funnel context into the form: if the visitor came from a vertical page
  // or ran the calculator, default the subject and show a short note — so they
  // know we have the thread, and so the lead arrives with that context attached.
  // Runs on mount AND when context changes, because the homepage calculator and
  // this form share a page (the form is already mounted when the estimate lands).
  useEffect(() => {
    const applyContext = () => {
      const ctx = getLeadContext();
      if (!ctx.vertical && !ctx.annualLoss) return;
      const labels: Record<string, string> = { doctors: 'private practice', lawyers: 'law firm' };
      const v = ctx.vertical ? labels[ctx.vertical] || ctx.vertical : '';
      setFormData(prev => ({
        ...prev,
        subject: prev.subject || (v ? `AI for my ${v}` : 'Booking a free call'),
      }));
      if (ctx.annualLoss && ctx.annualLoss > 0) {
        setLeadNote(`From your estimate: about $${Math.round(ctx.annualLoss).toLocaleString('en-US')}/yr walking out the door. Let's talk about catching it.`);
      } else if (v) {
        setLeadNote(`Following up on AI for your ${v}.`);
      }
    };
    applyContext();
    window.addEventListener(LEAD_CONTEXT_EVENT, applyContext);
    return () => window.removeEventListener(LEAD_CONTEXT_EVENT, applyContext);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('jamesburge.mcm@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Name is required');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Valid email is required');
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Message is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormStatus('error');
      trackEvent('form_submit_error', { reason: 'validation' });
      return;
    }

    setFormStatus('loading');
    setErrorMessage('');

    const ctx = getLeadContext();
    try {
      // Our own endpoint: validates, persists to the CRM store, and forwards to
      // email — so the lead is captured, not just emailed. See api/lead.js.
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject || 'No subject',
          message: formData.message,
          vertical: ctx.vertical || '',
          sourcePage: ctx.sourcePage || (typeof window !== 'undefined' ? window.location.pathname : ''),
          annualLoss: ctx.annualLoss || 0,
          utm: getUtm(),
          _hp: hp,
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
        setLeadNote('');
        clearLeadContext();
        trackEvent('form_submit_success', { vertical: ctx.vertical || 'none' });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again or email directly.');
      trackEvent('form_submit_error', { reason: 'network' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 md:py-32 bg-brand-base relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute bottom-0 right-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 md:gap-24 items-start"
        >

          {/* Left Column: Heading */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block flex items-center gap-2">
              <span className="w-8 h-px bg-brand-accent"></span>
              Get in touch
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter mb-8 leading-[0.9]">
              Let's <br />
              <span className="text-brand-secondary">Talk</span><span className="text-brand-accent">.</span>
            </h2>
            <p className="text-brand-secondary text-lg font-light leading-relaxed max-w-md">
              Tell me where your business is losing time. The first call and the estimate are free.
            </p>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:pt-10"
          >
            {/* Funnel context — only shows when the visitor arrived from a
                vertical page or used the calculator. */}
            {leadNote && (
              <div className="p-3 bg-brand-accent/10 border border-brand-accent/30 text-sm text-brand-primary">
                {leadNote}
              </div>
            )}

            {/* Honeypot — visually hidden, off the tab order. Bots fill it. */}
            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              aria-hidden="true"
              className="absolute left-[-9999px] w-px h-px opacity-0"
            />

            {/* Name Input */}
            <div>
              <label className="text-sm font-mono text-brand-secondary uppercase tracking-widest mb-2 block">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="w-full bg-brand-surface border border-brand-border px-4 py-3 text-brand-primary placeholder-brand-secondary/70 focus:outline-none focus:border-brand-accent transition-colors"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="text-sm font-mono text-brand-secondary uppercase tracking-widest mb-2 block">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full bg-brand-surface border border-brand-border px-4 py-3 text-brand-primary placeholder-brand-secondary/70 focus:outline-none focus:border-brand-accent transition-colors"
                required
              />
            </div>

            {/* Phone + Company (both optional, both map to the CRM lead) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-mono text-brand-secondary uppercase tracking-widest mb-2 block">Phone (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(662) 000-0000"
                  className="w-full bg-brand-surface border border-brand-border px-4 py-3 text-brand-primary placeholder-brand-secondary/70 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-mono text-brand-secondary uppercase tracking-widest mb-2 block">Business (Optional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your business name"
                  className="w-full bg-brand-surface border border-brand-border px-4 py-3 text-brand-primary placeholder-brand-secondary/70 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
            </div>

            {/* Subject Input */}
            <div>
              <label className="text-sm font-mono text-brand-secondary uppercase tracking-widest mb-2 block">Subject (Optional)</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What's this about?"
                className="w-full bg-brand-surface border border-brand-border px-4 py-3 text-brand-primary placeholder-brand-secondary/70 focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="text-sm font-mono text-brand-secondary uppercase tracking-widest mb-2 block">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message here..."
                rows={5}
                className="w-full bg-brand-surface border border-brand-border px-4 py-3 text-brand-primary placeholder-brand-secondary/70 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                required
              />
            </div>

            {/* Error Message */}
            {formStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-600"
              >
                <AlertCircle size={18} />
                <span className="text-sm">{errorMessage}</span>
              </motion.div>
            )}

            {/* Success Message */}
            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 text-green-600"
              >
                <CheckCircle size={18} />
                <span className="text-sm">Message sent successfully! I'll get back to you soon.</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formStatus === 'loading'}
              className="w-full bg-brand-accent hover:bg-brand-accent-hover disabled:bg-brand-accent/50 text-white font-bold py-3 px-6 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {formStatus === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Book my free call
                </>
              )}
            </button>

            {/* Alternative Contact */}
            <div className="pt-4 border-t border-brand-border/30">
              <p className="text-brand-secondary text-sm mb-3">Or reach out directly:</p>
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={copyEmail}
                  className="flex-1 p-3 bg-brand-surface border border-brand-border hover:border-brand-accent transition-colors text-brand-primary font-mono text-xs"
                  title="Copy to clipboard"
                >
                  {copied ? <span className="text-brand-accent">COPIED!</span> : 'jamesburge.mcm@gmail.com'}
                </button>
                <a
                  href="tel:+16622925533"
                  onClick={() => trackEvent('phone_click', { location: 'contact' })}
                  className="p-3 bg-brand-surface border border-brand-border hover:border-brand-accent transition-colors text-brand-secondary hover:text-brand-accent"
                  aria-label="Call or text (662) 292-5533"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </motion.form>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-24 pt-8 border-t border-brand-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-[10px] font-mono text-brand-secondary uppercase tracking-widest text-center md:text-left"
        >
          <span>© {new Date().getFullYear()} Walt Builds. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
            System Operational
          </div>
        </motion.div>

      </div>
    </section>
  );
};
