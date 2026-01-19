import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export const DarkModeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState(true); // Default to dark mode

    useEffect(() => {
        // Check localStorage for saved preference
        const saved = localStorage.getItem('theme');
        if (saved) {
            setIsDark(saved === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');

        // Add class to document for theme switching
        if (newTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-brand-surface border border-brand-border flex items-center justify-between px-1 cursor-pointer transition-colors hover:border-brand-accent/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle dark mode"
        >
            {/* Background slider */}
            <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-accent/20 to-brand-purple/20"
                initial={false}
                animate={{
                    opacity: isDark ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Icons */}
            <div className="relative z-10 flex items-center justify-between w-full px-0.5">
                <motion.div
                    animate={{
                        opacity: isDark ? 0.4 : 1,
                        scale: isDark ? 0.8 : 1
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <Sun size={14} className="text-yellow-400" />
                </motion.div>
                <motion.div
                    animate={{
                        opacity: isDark ? 1 : 0.4,
                        scale: isDark ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <Moon size={14} className="text-brand-accent" />
                </motion.div>
            </div>

            {/* Sliding indicator */}
            <motion.div
                className="absolute w-5 h-5 rounded-full bg-brand-primary shadow-lg"
                initial={false}
                animate={{
                    x: isDark ? 28 : 2
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                }}
            />
        </motion.button>
    );
};
