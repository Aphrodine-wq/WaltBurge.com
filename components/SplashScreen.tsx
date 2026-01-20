import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2500); // 2.5s duration
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-primary"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="relative flex flex-col items-center">
                {/* Rotating Ring */}
                <motion.div
                    className="absolute inset-[-40px] rounded-full border border-brand-accent/20"
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                />

                {/* Name Reveal */}
                <div className="overflow-hidden mb-2">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display text-4xl md:text-6xl text-brand-accent"
                    >
                        Walt Burge
                    </motion.h1>
                </div>

                {/* Subtitle Line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                    className="h-[1px] bg-brand-accent/50 w-full"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-4 font-sans text-xs tracking-[0.5em] text-brand-secondary uppercase"
                >
                    System Initializing
                </motion.p>

                {/* Skip Button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    onClick={onComplete}
                    className="mt-8 px-6 py-2 text-xs font-mono tracking-widest text-brand-accent uppercase border border-brand-accent/50 hover:border-brand-accent hover:bg-brand-accent/10 transition-all duration-300"
                >
                    Skip →
                </motion.button>
            </div>
        </motion.div>
    );
};
