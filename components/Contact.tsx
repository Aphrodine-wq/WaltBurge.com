import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, ArrowUpRight, Copy, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@waltburge.com');
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
      return;
    }

    setFormStatus('loading');
    setErrorMessage('');

    try {
      // Using Formspree for email handling
      const response = await fetch('https://formspree.io/f/xyzgwdzk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'No subject',
          message: formData.message
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('Failed to send message. Please try again or email directly.');
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
              04. Initialize Connection
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter mb-8 leading-[0.9]">
              Let's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-secondary/50">Build The</span> <br />
              Future.
            </h2>
            <p className="text-brand-secondary text-lg font-light leading-relaxed max-w-md">
              Open for high-impact engineering roles and technical consulting.
              If you're building something that requires bare-metal efficiency or agentic intelligence, let's talk.
            </p>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:pt-10"
          >
            {/* Name Input */}
            <div>
              <label className="text-sm font-mono text-brand-secondary uppercase tracking-widest mb-2 block">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-primary placeholder-brand-secondary/70 focus:outline-none focus:border-brand-accent transition-colors"
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
                className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-primary placeholder-brand-secondary/70 focus:outline-none focus:border-brand-accent transition-colors"
                required
              />
            </div>

            {/* Subject Input */}
            <div>
              <label className="text-sm font-mono text-brand-secondary uppercase tracking-widest mb-2 block">Subject (Optional)</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What's this about?"
                className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-primary placeholder-brand-secondary/70 focus:outline-none focus:border-brand-accent transition-colors"
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
                className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-primary placeholder-brand-secondary/70 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                required
              />
            </div>

            {/* Error Message */}
            {formStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
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
                className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400"
              >
                <CheckCircle size={18} />
                <span className="text-sm">Message sent successfully! I'll get back to you soon.</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formStatus === 'loading'}
              className="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:bg-brand-accent/50 text-brand-base font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              {formStatus === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-brand-base/30 border-t-brand-base rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

            {/* Alternative Contact */}
            <div className="pt-4 border-t border-brand-border/30">
              <p className="text-brand-secondary text-sm mb-3">Or reach out directly:</p>
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={copyEmail}
                  className="flex-1 p-3 bg-brand-dark/50 border border-brand-border rounded-lg hover:border-brand-accent transition-colors text-brand-primary font-mono text-xs"
                  title="Copy to clipboard"
                >
                  {copied ? <span className="text-brand-accent">COPIED!</span> : 'contact@waltburge.com'}
                </button>
                <a
                  href="https://github.com/Aphrodine-wq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-brand-dark/50 border border-brand-border rounded-lg hover:border-brand-accent transition-colors text-brand-secondary hover:text-brand-accent"
                >
                  <Github size={20} />
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
          <span>© 2025 Walt Burge Systems. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
            System Operational
          </div>
        </motion.div>

      </div>
    </section>
  );
};
