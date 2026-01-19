import React from 'react';
import { motion } from 'framer-motion';

interface ProfileImageProps {
    className?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`relative ${className}`}
        >
            {/* Orbital glow effect */}
            <div className="absolute inset-0 animate-orbit-glow rounded-full" />

            {/* Outer ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-brand-accent/20 border-dashed"
            />

            {/* Image container */}
            <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-brand-accent/30 shadow-2xl shadow-brand-accent/20 bg-brand-surface"
            >
                <img
                    src="/assets/professional_headshot.webp"
                    alt="Walt Burge - Systems Engineer"
                    className="w-full h-full object-cover"
                    loading="eager"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-brand-purple/10 mix-blend-overlay" />
            </motion.div>

            {/* Accent dots */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-4 h-4 bg-brand-accent rounded-full shadow-lg shadow-brand-accent/50"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-brand-purple rounded-full shadow-lg shadow-brand-purple/50"
            />
        </motion.div>
    );
};
