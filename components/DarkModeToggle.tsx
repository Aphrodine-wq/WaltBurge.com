import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles, TreeDeciduous } from 'lucide-react';

export const DarkModeToggle: React.FC = () => {
    const themes = ['default', 'light', 'midnight', 'forest'];
    const [theme, setTheme] = useState('midnight');

    useEffect(() => {
        const saved = localStorage.getItem('theme') || 'midnight';
        setTheme(saved);
        applyTheme(saved);
    }, []);

    const applyTheme = (t: string) => {
        const root = document.documentElement;
        // Remove all theme attributes first to be safe, or just set data-theme
        root.removeAttribute('data-theme');
        root.classList.remove('light'); // Clean up legacy class

        if (t !== 'default') {
            root.setAttribute('data-theme', t);
            if (t === 'light') root.classList.add('light'); // Keep backwards compat if needed, but data-theme is better
        }
    };

    const cycleTheme = () => {
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];

        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
    };

    const getIcon = () => {
        switch (theme) {
            case 'light': return <Sun size={16} className="text-amber-500 fill-amber-500/20" />;
            case 'midnight': return <Moon size={16} className="text-blue-400 fill-blue-400/20" />;
            case 'forest': return <TreeDeciduous size={16} className="text-emerald-400 fill-emerald-400/20" />;
            default: return <Sparkles size={16} className="text-brand-accent fill-brand-accent/20" />; // Onyx
        }
    };

    return (
        <motion.button
            onClick={cycleTheme}
            className="group relative w-12 h-12 flex items-center justify-center p-0"
            whileHover={{ scale: 1.1, rotateY: 180 }}
            whileTap={{ scale: 0.9, rotateZ: 45 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Cycle theme"
        >
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-brand-border group-hover:border-brand-accent transition-colors duration-500" />

            {/* Inner Rotating Sphere */}
            <motion.div
                key={theme}
                initial={{ rotateY: -180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden bg-brand-base"
            >
                {getIcon()}
            </motion.div>

            {/* Aura */}
            <div className={`absolute inset-[-10px] rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-all duration-700 bg-brand-accent`} />
        </motion.button>
    );
};
