import React from 'react';
import { Mail, Github, ArrowUpRight, Copy } from 'lucide-react';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@waltburge.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id={SectionId.CONTACT} className="py-20 md:py-32 bg-brand-base relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute bottom-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            
            {/* Left Column: Heading */}
            <div>
                <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block flex items-center gap-2">
                    <span className="w-8 h-px bg-brand-accent"></span>
                    04. Initialize Connection
                </span>
                <h2 className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter mb-8 leading-[0.9]">
                  Let's <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-secondary/50">Build The</span> <br/>
                  Future.
                </h2>
                <p className="text-brand-secondary text-lg font-light leading-relaxed max-w-md">
                    Open for high-impact engineering roles and technical consulting. 
                    If you're building something that requires bare-metal efficiency or agentic intelligence, let's talk.
                </p>
            </div>

            {/* Right Column: Links */}
            <div className="flex flex-col gap-8 md:pt-10">
                
                {/* Email Link */}
                <div className="group relative">
                    <div className="flex items-baseline justify-between border-b border-brand-border pb-4 group-hover:border-brand-accent transition-colors duration-500">
                        <span className="text-sm font-mono text-brand-secondary uppercase tracking-widest">Email Protocol</span>
                        <ArrowUpRight className="text-brand-secondary group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={20} />
                    </div>
                    <div className="pt-4 flex items-center justify-between">
                         <a href="mailto:contact@waltburge.com" className="text-2xl md:text-3xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                            contact@waltburge.com
                         </a>
                         <button 
                            onClick={copyEmail}
                            className="p-2 text-brand-secondary hover:text-brand-primary transition-colors"
                            title="Copy to clipboard"
                        >
                            {copied ? <span className="text-xs font-mono text-green-400">COPIED</span> : <Copy size={18} />}
                         </button>
                    </div>
                </div>

                {/* GitHub Link */}
                <div className="group relative">
                    <div className="flex items-baseline justify-between border-b border-brand-border pb-4 group-hover:border-brand-accent transition-colors duration-500">
                        <span className="text-sm font-mono text-brand-secondary uppercase tracking-widest">Source Control</span>
                        <ArrowUpRight className="text-brand-secondary group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={20} />
                    </div>
                    <div className="pt-4">
                         <a href="https://github.com/Aphrodine-wq" target="_blank" rel="noopener noreferrer" className="text-2xl md:text-3xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors flex items-center gap-4">
                            github.com/Aphrodine-wq
                            <Github size={24} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                         </a>
                    </div>
                </div>

            </div>

        </div>

        <div className="mt-24 pt-8 border-t border-brand-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-brand-secondary uppercase tracking-widest">
            <span>© 2024 Walt Burge Systems. All rights reserved.</span>
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                System Operational
            </div>
        </div>

      </div>
    </section>
  );
};
