import React from 'react';
import { Github, Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { trackEvent } from '../lib/track';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-brand-base border-t border-brand-border relative">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">

                {/* Left: Brand & Copyright */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="font-display font-extrabold text-lg tracking-tight text-brand-primary">
                        Walt Burge<span className="text-brand-accent">.</span>
                    </span>
                    <p className="text-xs text-brand-secondary font-mono">
                        &copy; {currentYear} Walt Burge — built in Mississippi.
                    </p>
                </div>

                {/* Center: Contact */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-7">
                    <a href="mailto:jamesburge.mcm@gmail.com" className="flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-accent transition-colors font-mono">
                        <Mail size={15} />
                        jamesburge.mcm@gmail.com
                    </a>
                    <a href="tel:+16622925533" onClick={() => trackEvent('phone_click', { location: 'footer' })} className="flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-accent transition-colors font-mono">
                        <Phone size={15} />
                        (662) 292-5533
                    </a>
                    <a href="/blog" className="text-sm text-brand-secondary hover:text-brand-accent transition-colors font-mono">
                        Blog
                    </a>
                    <a href="/resume" className="text-sm text-brand-secondary hover:text-brand-accent transition-colors font-mono">
                        Résumé
                    </a>
                </div>

                {/* Right: Social Links */}
                <div className="flex items-center gap-6">
                    <a href="https://github.com/Aphrodine-wq" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-brand-secondary hover:text-brand-accent transition-colors">
                        <Github size={18} />
                    </a>
                    <a href="https://www.facebook.com/walt.burge.1/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-brand-secondary hover:text-brand-accent transition-colors">
                        <Facebook size={18} />
                    </a>
                    <a href="https://www.instagram.com/walt.burge" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-brand-secondary hover:text-brand-accent transition-colors">
                        <Instagram size={18} />
                    </a>
                </div>

            </div>
        </footer>
    );
};
