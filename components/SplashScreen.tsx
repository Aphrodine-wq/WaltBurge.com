import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    useEffect(() => {
        // Speed up to 1.5s for a snappier feel
        const timer = setTimeout(() => {
            onComplete();
        }, 1500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <div className="relative flex flex-col items-center justify-center">

                {/* Abstract Core - Hyper-fast geometric vortex */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Rotating Glitch Border */}
                    <motion.div
                        className="absolute w-16 h-16 border border-white/90"
                        animate={{
                            rotate: [0, 360],
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
                    />

                    <motion.div
                        className="absolute w-20 h-20 border border-brand-accent/40"
                        animate={{
                            rotate: [360, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
                    />

                    {/* Scanning Beam */}
                    <motion.div
                        className="absolute w-full h-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                        animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Center Core */}
                    <div className="w-2 h-2 bg-white rounded-full relative">
                        <motion.div
                            className="absolute inset-0 bg-white rounded-full"
                            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        />
                    </div>
                </div>

                {/* Cryptic Data Stream (No Name) */}
                <div className="mt-6 flex flex-col items-center gap-1 font-mono text-[10px] tracking-[0.4em] text-white/50 uppercase">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-2"
                    >
                        <span className="w-1 h-1 bg-brand-accent animate-pulse" /> SYSTEM READY
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};
