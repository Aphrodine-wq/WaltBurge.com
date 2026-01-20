import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    // Generate staggered ripple rings
    const rings = [0, 1, 2, 3, 4];

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.1,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* The Void - Central point */}
            <div className="relative flex items-center justify-center">

                {/* Expanding ripple rings */}
                {rings.map((i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-white/80"
                        style={{ width: 8, height: 8 }}
                        initial={{
                            scale: 0,
                            opacity: 0,
                        }}
                        animate={{
                            scale: [0, 25, 30],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.25,
                            ease: [0.25, 0.1, 0.25, 1],
                            repeat: Infinity,
                            repeatDelay: 0.25,
                        }}
                    />
                ))}

                {/* The singularity - breathing core */}
                <motion.div
                    className="relative w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 1, 1.2, 1],
                        opacity: [0, 1, 1, 1],
                    }}
                    transition={{
                        duration: 0.6,
                        ease: [0.34, 1.56, 0.64, 1],
                    }}
                >
                    {/* Subtle glow */}
                    <motion.div
                        className="absolute inset-0 bg-white rounded-full blur-sm"
                        animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.8, 0.3, 0.8],
                        }}
                        transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    />
                </motion.div>

                {/* Vertical line - subtle axis */}
                <motion.div
                    className="absolute w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: [0, 120, 120],
                        opacity: [0, 0.5, 0.5],
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />

                {/* Horizontal line - subtle axis */}
                <motion.div
                    className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                        width: [0, 120, 120],
                        opacity: [0, 0.5, 0.5],
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />
            </div>
        </motion.div>
    );
};
