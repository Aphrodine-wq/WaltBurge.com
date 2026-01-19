import React from 'react';
import { Github, Twitter, Linkedin, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 bg-brand-base border-t border-brand-border/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-accent/5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-700"></div>

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">

                {/* Left: Brand & Copyright */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="flex items-center gap-2">
                        <Code2 size={16} className="text-brand-accent" />
                        <span className="font-bold text-sm tracking-tight text-brand-primary">WB<span className="text-brand-accent">.SYSTEMS</span></span>
                    </div>
                    <p className="text-[10px] text-brand-secondary font-mono">
                        &copy; {currentYear} Walt Burge. All Systems Operational.
                    </p>
                </div>

                {/* Center: Tech Badge */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                    <span className="text-[10px] text-brand-secondary font-mono uppercase tracking-wider">
                        Built with React & Tailwind
                    </span>
                </div>

                {/* Right: Social Links */}
                <div className="flex items-center gap-6">
                    <a href="https://github.com/Aphrodine-wq" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:text-brand-accent transition-colors">
                        <Github size={18} />
                    </a>
                    <a href="#" className="text-brand-secondary hover:text-brand-accent transition-colors">
                        <Twitter size={18} />
                    </a>
                    <a href="#" className="text-brand-secondary hover:text-brand-accent transition-colors">
                        <Linkedin size={18} />
                    </a>
                </div>

            </div>
        </footer>
    );
};
