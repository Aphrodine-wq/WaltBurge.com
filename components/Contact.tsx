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
    <section id={SectionId.CONTACT} className="py-20 md:py-32 bg-brand-base relative overflow-hidden transition-colors duration-300">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        
        <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-brand-surface border border-brand-border shadow-lg">
           <Mail size={32} className="text-brand-accent" />
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-6">
          Initialize <span className="text-brand-accent">Connection</span>
        </h2>
        
        <p className="text-brand-secondary text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          Ready to architect the next generation of digital systems? 
          <br/>Transmission channels are open.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a 
                href="mailto:contact@waltburge.com" 
                className="group p-8 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-accent/5 flex flex-col items-center gap-4"
            >
                <div className="w-12 h-12 rounded-full bg-brand-base flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-base transition-colors duration-300">
                    <Mail size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-brand-primary mb-1">Email Protocol</h3>
                    <p className="text-sm text-brand-secondary font-mono">contact@waltburge.com</p>
                </div>
            </a>

            <a 
                href="https://github.com/Aphrodine-wq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-8 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-accent/5 flex flex-col items-center gap-4"
            >
                <div className="w-12 h-12 rounded-full bg-brand-base flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-base transition-colors duration-300">
                    <Github size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-brand-primary mb-1">Source Control</h3>
                    <p className="text-sm text-brand-secondary font-mono">github.com/Aphrodine-wq</p>
                </div>
            </a>
        </div>

        <div className="mt-20 pt-8 border-t border-brand-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-brand-secondary uppercase tracking-widest">
            <span>© 2024 Walt Burge Systems. All rights reserved.</span>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                System Operational
            </div>
        </div>

      </div>
    </section>
  );
};