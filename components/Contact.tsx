import React, { useState } from 'react';
import { Mail, Github, Twitter, Linkedin, Send, Radio, Shield, Globe, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    // Simulate network delay
    setTimeout(() => {
      setFormState('sent');
      setTimeout(() => setFormState('idle'), 3000);
    }, 2000);
  };

  const socialLinks = [
    { Icon: Github, href: "https://github.com/Aphrodine-wq", label: "Github", active: true },
    { Icon: Twitter, href: "#", label: "Twitter", active: false },
    { Icon: Linkedin, href: "#", label: "LinkedIn", active: false }
  ];

  return (
    <footer id={SectionId.CONTACT} className="relative bg-brand-black border-t border-brand-border overflow-hidden transition-colors duration-300">
      
      {/* Background Grid & Decor */}
      <div className="absolute inset-0 bg-brand-black opacity-90 z-0"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" 
           style={{
             backgroundImage: 'linear-gradient(to right, rgb(var(--border-color)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--border-color)) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}
      ></div>
      
      {/* Central Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Info */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-4 md:mb-6">
                Get in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-purple">
                  Touch.
                </span>
              </h2>
              <p className="text-brand-secondary text-base md:text-lg font-light leading-relaxed max-w-md">
                I'm always open to discussing product design work, partnership opportunities, or technical consulting.
              </p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-brand-surface border border-brand-primary/10 flex items-center justify-center group-hover:border-brand-accent/50 transition-colors">
                        <Mail className="text-brand-secondary group-hover:text-brand-accent transition-colors" />
                    </div>
                    <div>
                        <div className="text-xs text-brand-secondary font-mono uppercase tracking-wider">Email</div>
                        <a href="mailto:contact@waltburge.com" className="text-brand-primary font-bold hover:text-brand-accent transition-colors">contact@waltburge.com</a>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-brand-surface border border-brand-primary/10 flex items-center justify-center group-hover:border-brand-accent/50 transition-colors">
                        <MapPin className="text-brand-secondary group-hover:text-brand-accent transition-colors" />
                    </div>
                    <div>
                        <div className="text-xs text-brand-secondary font-mono uppercase tracking-wider">Location</div>
                        <div className="text-brand-primary font-bold">Remote / Global</div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                 {socialLinks.map(({ Icon, href, label, active }) => (
                    <a 
                        key={label}
                        href={href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            active 
                            ? "border-brand-primary/10 bg-brand-surface/50 text-brand-secondary hover:bg-brand-surface hover:border-brand-accent/50 hover:text-brand-accent hover:scale-110 shadow-lg hover:shadow-brand-accent/10" 
                            : "border-brand-primary/5 text-brand-secondary/30 cursor-not-allowed bg-transparent"
                        }`}
                        aria-label={label}
                        title={active ? `Visit ${label}` : `${label} (Coming Soon)`}
                        onClick={(e) => !active && e.preventDefault()}
                    >
                       <Icon size={20} />
                    </a>
                  ))}
            </div>
          </div>

          {/* Right Column: Business Form */}
          <div className="bg-brand-surface/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6 md:p-10 relative overflow-hidden group hover:border-brand-primary/20 transition-colors duration-500">
            
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
                <h3 className="text-xl font-bold text-brand-primary mb-4 md:mb-6 flex items-center gap-2">
                    Send a Message
                </h3>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2 group/input">
                        <label className="text-xs font-mono uppercase text-brand-secondary ml-1 group-focus-within/input:text-brand-accent transition-colors duration-300">Name</label>
                        <input 
                            required
                            type="text" 
                            className="w-full bg-brand-surface/50 border border-brand-primary/10 rounded-lg px-4 py-3 text-brand-primary focus:outline-none focus:border-brand-accent focus:bg-brand-surface focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300 placeholder-brand-secondary/30 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500/50"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="space-y-2 group/input">
                        <label className="text-xs font-mono uppercase text-brand-secondary ml-1 group-focus-within/input:text-brand-accent transition-colors duration-300">Email</label>
                        <input 
                            required
                            type="email" 
                            className="w-full bg-brand-surface/50 border border-brand-primary/10 rounded-lg px-4 py-3 text-brand-primary focus:outline-none focus:border-brand-accent focus:bg-brand-surface focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300 placeholder-brand-secondary/30 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500/50"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2 group/input">
                    <label className="text-xs font-mono uppercase text-brand-secondary ml-1 group-focus-within/input:text-brand-accent transition-colors duration-300">Message</label>
                    <textarea 
                        required
                        rows={4}
                        className="w-full bg-brand-surface/50 border border-brand-primary/10 rounded-lg px-4 py-3 text-brand-primary focus:outline-none focus:border-brand-accent focus:bg-brand-surface focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300 placeholder-brand-secondary/30 resize-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500/50"
                        placeholder="How can I help you?"
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={formState !== 'idle'}
                    className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden ${
                        formState === 'sent' 
                        ? 'bg-brand-success text-brand-black shadow-[0_0_15px_rgba(74,222,128,0.3)]' 
                        : 'bg-brand-primary hover:bg-brand-accent text-brand-black hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                    }`}
                >
                    <div className={`flex items-center gap-2 transition-all duration-300 transform ${formState === 'sent' ? 'scale-110' : ''}`}>
                        {formState === 'idle' && (
                            <>Send Message <Send size={16} className="transition-transform group-hover:translate-x-1" /></>
                        )}
                        {formState === 'sending' && (
                            <>Sending <Loader2 size={16} className="animate-spin" /></>
                        )}
                        {formState === 'sent' && (
                            <>Message Sent <CheckCircle2 size={18} className="animate-bounce" /></>
                        )}
                    </div>
                </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-border mt-16 md:mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-brand-secondary uppercase tracking-widest text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Walt Burge. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
            </div>
        </div>

      </div>
    </footer>
  );
};