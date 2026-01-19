import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export const DarkModeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        // Default is dark (Onyx). If saved is 'light', add light class.
        const isLight = saved === 'light';
        setIsDark(!isLight);
        if (isLight) document.documentElement.classList.add('light');
        else document.documentElement.classList.remove('light');
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');

        if (!newIsDark) document.documentElement.classList.add('light');
        else document.documentElement.classList.remove('light');
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="group relative w-12 h-12 flex items-center justify-center p-0"
            whileHover={{ scale: 1.1, rotateY: 180 }}
            whileTap={{ scale: 0.9, rotateZ: 45 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Toggle dark mode"
        >
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-brand-border group-hover:border-brand-accent transition-colors duration-500" />

            {/* Inner Rotating Sphere */}
            <motion.div
                animate={{
                    rotateY: isDark ? 180 : 0,
                    backgroundColor: isDark ? 'rgb(var(--bg-surface))' : 'rgb(var(--bg-primary))'
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div
                            key="moon"
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: -10 }}
                        >
                            <Moon size={16} className="text-brand-accent fill-brand-accent/20" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: -10 }}
                        >
                            <Sun size={16} className="text-amber-500 fill-amber-500/20" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Aura */}
            <div className={`absolute inset-[-10px] rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-all duration-700 ${isDark ? 'bg-brand-accent' : 'bg-amber-500'}`} />
        </motion.button>
    );
};
