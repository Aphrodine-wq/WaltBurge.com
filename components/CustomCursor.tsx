import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        // Only enable on desktop (non-touch devices)
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsHidden(false);
        };

        const updateCursorType = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') !== null ||
                target.closest('a') !== null ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(isClickable);
        };

        const hideCursor = () => setIsHidden(true);
        const showCursor = () => setIsHidden(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousemove', updateCursorType);
        window.addEventListener('mouseleave', hideCursor);
        window.addEventListener('mouseenter', showCursor);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousemove', updateCursorType);
            window.removeEventListener('mouseleave', hideCursor);
            window.removeEventListener('mouseenter', showCursor);
        };
    }, []);

    // Don't render on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-brand-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isPointer ? 1.5 : 1,
                    opacity: isHidden ? 0 : 1
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            />

            {/* Follower ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-brand-accent/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isPointer ? 1.5 : 1,
                    opacity: isHidden ? 0 : 0.5
                }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                    mass: 0.5
                }}
            />
        </>
    );
};
