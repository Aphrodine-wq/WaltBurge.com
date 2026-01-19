import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const mainX = useMotionValue(0);
    const mainY = useMotionValue(0);

    // Quantum Trail Springs
    const trail1X = useSpring(mainX, { damping: 20, stiffness: 250 });
    const trail1Y = useSpring(mainY, { damping: 20, stiffness: 250 });
    const trail2X = useSpring(trail1X, { damping: 25, stiffness: 200 });
    const trail2Y = useSpring(trail1Y, { damping: 25, stiffness: 200 });
    const trail3X = useSpring(trail2X, { damping: 30, stiffness: 150 });
    const trail3Y = useSpring(trail2Y, { damping: 30, stiffness: 150 });

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const updateMousePosition = (e: MouseEvent) => {
            mainX.set(e.clientX);
            mainY.set(e.clientY);
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

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousemove', updateCursorType);
        window.addEventListener('mouseleave', () => setIsHidden(true));
        window.addEventListener('mouseenter', () => setIsHidden(false));

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousemove', updateCursorType);
        };
    }, [mainX, mainY]);

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Trail Layers */}
            <motion.div
                style={{ x: trail3X, y: trail3Y, translateX: '-50%', translateY: '-50%' }}
                className="absolute w-6 h-6 border border-brand-accent/10 rounded-full opacity-40 shrink-0"
            />
            <motion.div
                style={{ x: trail2X, y: trail2Y, translateX: '-50%', translateY: '-50%' }}
                className="absolute w-4 h-4 border border-brand-accent/20 rounded-full opacity-60 shrink-0"
            />
            <motion.div
                style={{ x: trail1X, y: trail1Y, translateX: '-50%', translateY: '-50%' }}
                className="absolute w-2 h-2 bg-brand-accent/30 rounded-full shrink-0"
            />

            {/* Main Cursor */}
            <motion.div
                style={{
                    x: mainX,
                    y: mainY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isPointer ? 1.5 : 1,
                    opacity: isHidden ? 0 : 1
                }}
                className="absolute w-2 h-2 bg-brand-accent rounded-full shadow-[0_0_15px_rgba(var(--accent-color),0.5)]"
            />
        </div>
    );
};
