import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 800);
        return () => clearTimeout(timer);
    }, [onComplete]);

    // More complex ring pattern
    const rings = [0, 1, 2, 3, 4, 5, 6, 7];
    const particles = [0, 1, 2, 3, 4, 5];

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.05,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Central complex pattern */}
            <div className="relative flex items-center justify-center scale-75">

                {/* Expanding ripple rings - faster and more complex */}
                {rings.map((i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-white/70"
                        style={{ width: 6, height: 6 }}
                        initial={{
                            scale: 0,
                            opacity: 0,
                            rotate: i * 45,
                        }}
                        animate={{
                            scale: [0, 18, 22],
                            opacity: [0, 0.7, 0],
                            rotate: [i * 45, i * 45 + 180],
                        }}
                        transition={{
                            duration: 1.5,
                            delay: i * 0.15,
                            ease: [0.22, 0.1, 0.25, 1],
                            repeat: Infinity,
                            repeatDelay: 0.2,
                        }}
                    />
                ))}

                {/* Orbiting particles */}
                {particles.map((i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{
                            x: 0,
                            y: 0,
                            opacity: 0,
                        }}
                        animate={{
                            x: [0, Math.cos(i * 60 * Math.PI / 180) * 30, 0],
                            y: [0, Math.sin(i * 60 * Math.PI / 180) * 30, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            delay: i * 0.1,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    />
                ))}

                {/* The singularity - breathing core */}
                <motion.div
                    className="relative w-1.5 h-1.5 bg-white rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 1, 1.3, 1],
                        opacity: [0, 1, 1, 1],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1],
                    }}
                >
                    {/* Pulsing glow */}
                    <motion.div
                        className="absolute inset-0 bg-white rounded-full blur-sm"
                        animate={{
                            scale: [1, 2, 1],
                            opacity: [0.9, 0.2, 0.9],
                        }}
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    />
                </motion.div>

                {/* Diagonal cross lines */}
                <motion.div
                    className="absolute w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent"
                    style={{ transform: 'rotate(45deg)' }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: [0, 80, 80],
                        opacity: [0, 0.4, 0.4],
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />

                <motion.div
                    className="absolute w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent"
                    style={{ transform: 'rotate(-45deg)' }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: [0, 80, 80],
                        opacity: [0, 0.4, 0.4],
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />

                {/* Vertical and horizontal axes */}
                <motion.div
                    className="absolute w-[1px] bg-gradient-to-b from-transparent via-white/35 to-transparent"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: [0, 90, 90],
                        opacity: [0, 0.45, 0.45],
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.25,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />

                <motion.div
                    className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                        width: [0, 90, 90],
                        opacity: [0, 0.45, 0.45],
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.25,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />
            </div>
        </motion.div>
    );
};
