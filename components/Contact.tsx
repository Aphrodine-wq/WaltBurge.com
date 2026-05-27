'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  AlertCircle,
  CheckCircle,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { SectionId } from '../types';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    detail: 'jamesburge.mcm@gmail.com',
    sub: 'Typically responds within 24 hours',
    href: 'mailto:jamesburge.mcm@gmail.com',
    copyable: true,
  },
  {
    icon: Calendar,
    title: 'Schedule a Call',
    detail: 'Book a 30-min call',
    sub: 'Free consultation, no obligation',
    href: '/#contact',
    copyable: false,
  },
  {
    icon: MapPin,
    title: 'Location',
    detail: 'Oxford, Mississippi',
    sub: 'Serving clients nationwide',
    href: undefined,
    copyable: false,
  },
];

const socials = [
  { icon: Github, href: 'https://github.com/Aphrodine-wq', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jameswalton', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://www.facebook.com/walt.burge.1/', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/walt.burge', label: 'Instagram' },
];

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText('jamesburge.mcm@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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
      return;
    }

    setFormStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xyzgwdzk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'No subject',
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      setFormStatus('error');
      setErrorMessage('Failed to send message. Please try again or email directly.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 md:py-36 bg-brand-base relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/[0.02] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        {/* Geometric accent line */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-border/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2">
            <span className="w-8 h-px bg-brand-accent" />
            Get In Touch
            <span className="w-8 h-px bg-brand-accent" />
          </span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start"
        >
          {/* Left Column: Info Panel (3/5) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-10">
            {/* Tagline */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-5">
                Let&apos;s Build{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent/70">
                  Something Real
                </span>
              </h2>
              <p className="text-brand-secondary text-base md:text-lg leading-relaxed max-w-md">
                I work with businesses that need software that actually ships. Whether it is a custom platform,
                an AI solution, or a site that converts -- tell me what you need and I will tell you what it takes.
              </p>
            </div>

            {/* Contact Method Cards */}
            <div className="space-y-3">
              {contactMethods.map((method, i) => {
                const Icon = method.icon;
                const inner = (
                  <motion.div
                    variants={cardVariants}
                    className="group flex items-start gap-4 p-4 rounded-xl border border-brand-border/40 bg-brand-surface/20 hover:border-brand-accent/50 hover:bg-brand-surface/40 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-base border border-brand-border flex items-center justify-center shrink-0 group-hover:border-brand-accent/50 transition-colors">
                      <Icon className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-0.5">
                        {method.title}
                      </div>
                      <div className="text-brand-primary font-semibold text-sm truncate">
                        {method.detail}
                      </div>
                      <div className="text-brand-secondary text-xs mt-0.5">{method.sub}</div>
                    </div>
                    {method.copyable && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          copyEmail();
                        }}
                        className="p-1.5 rounded-md hover:bg-brand-accent/10 transition-colors shrink-0 self-center"
                        title="Copy email"
                      >
                        {copiedEmail ? (
                          <Check size={14} className="text-brand-accent" />
                        ) : (
                          <Copy size={14} className="text-brand-secondary" />
                        )}
                      </button>
                    )}
                  </motion.div>
                );

                if (method.href) {
                  return (
                    <a key={i} href={method.href} className="block">
                      {inner}
                    </a>
                  );
                }
                return <div key={i}>{inner}</div>;
              })}
            </div>

            {/* Social Links */}
            <motion.div variants={cardVariants} className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className="w-10 h-10 rounded-lg border border-brand-border/40 bg-brand-surface/20 flex items-center justify-center text-brand-secondary hover:text-brand-accent hover:border-brand-accent/50 hover:bg-brand-surface/40 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form (2/5) */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="rounded-2xl border border-brand-border/40 bg-brand-surface/10 backdrop-blur-sm p-6 md:p-10">
              <h3 className="text-2xl font-bold text-brand-primary tracking-tight mb-1">
                Send a Message
              </h3>
              <p className="text-brand-secondary text-sm mb-8">
                Fill out the form and I will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-2 block">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-brand-base/60 border border-brand-border/50 rounded-xl px-4 py-3 text-brand-primary text-sm placeholder-brand-secondary/50 focus:outline-none focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/20 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-brand-base/60 border border-brand-border/50 rounded-xl px-4 py-3 text-brand-primary text-sm placeholder-brand-secondary/50 focus:outline-none focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-2 block">
                    Subject <span className="normal-case tracking-normal text-brand-secondary/50">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is this about?"
                    className="w-full bg-brand-base/60 border border-brand-border/50 rounded-xl px-4 py-3 text-brand-primary text-sm placeholder-brand-secondary/50 focus:outline-none focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/20 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-mono text-brand-secondary uppercase tracking-widest mb-2 block">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full bg-brand-base/60 border border-brand-border/50 rounded-xl px-4 py-3 text-brand-primary text-sm placeholder-brand-secondary/50 focus:outline-none focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/20 transition-all resize-none"
                    required
                  />
                </div>

                {/* Error Message */}
                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
                  >
                    <AlertCircle size={16} />
                    <span className="text-sm">{errorMessage}</span>
                  </motion.div>
                )}

                {/* Success Message */}
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400"
                  >
                    <CheckCircle size={16} />
                    <span className="text-sm">Message sent. I will get back to you soon.</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:bg-brand-accent/40 disabled:cursor-not-allowed text-brand-base font-bold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-brand-base/30 border-t-brand-base rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {/* Project Brief Link */}
              <div className="mt-6 pt-6 border-t border-brand-border/20 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-accent transition-colors group"
                >
                  Or request a full project brief
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
