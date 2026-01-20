import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, User, Lightbulb, Briefcase, Code, Mail, Sparkles } from 'lucide-react';
import { SectionId } from '../types';

export const ArtisticNav: React.FC = () => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const navItems = [
        { id: SectionId.HERO, label: 'Home', icon: Home },
        { id: 'about', label: 'About', icon: User },
        { id: SectionId.PROJECTS, label: 'Projects', icon: Briefcase },
        { id: SectionId.SKILLS, label: 'Skills', icon: Code },
        { id: 'marketplace', label: 'Shop', icon: Sparkles },
        { id: SectionId.CONTACT, label: 'Contact', icon: Mail },
    ];

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] flex justify-center" role="navigation" aria-label="Main navigation">
            {/* The Floating Prism */}
            <motion.div
                className="glass-prism rounded-full px-8 py-5 flex items-center gap-6 transition-all duration-500 hover:shadow-[0_0_60px_rgba(var(--aurora-teal),0.2)] hover:scale-[1.02] border border-white/10"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
                {navItems.map((item, idx) => (
                    <NavItem
                        key={item.id}
                        item={item}
                        idx={idx}
                        hoveredIdx={hoveredIdx}
                        setHoveredIdx={setHoveredIdx}
                        onClick={() => scrollTo(item.id)}
                    />
                ))}
            </motion.div>
        </nav>
    );
};

const NavItem = ({ item, idx, hoveredIdx, setHoveredIdx, onClick }: any) => {
    // Elastic Physics
    const isHovered = hoveredIdx === idx;

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            aria-label={item.label}
            className="relative flex flex-col items-center justify-center p-2 group"
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        layoutId="navGlow"
                        className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-full blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                animate={{
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.2 : 1,
                }}
                className="relative z-10 text-white/60 group-hover:text-white transition-colors duration-300"
            >
                <item.icon size={22} strokeWidth={1.5} />
            </motion.div>

            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: 0, scale: 0.8 }}
                        className="absolute top-full mt-2 text-[10px] font-serif tracking-widest text-brand-accent whitespace-nowrap"
                    >
                        {item.label}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Mirror Reflection Effect */}
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, scaleY: -1, y: 20 }}
                    animate={{ opacity: 0.2, y: 24 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 text-white pointer-events-none blur-[2px]"
                >
                    <item.icon size={22} />
                </motion.div>
            )}
        </button>
    );
}
