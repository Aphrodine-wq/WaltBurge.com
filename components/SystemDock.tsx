import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Home, User, Code, Mail, Terminal, ShoppingBag } from 'lucide-react';
import { SectionId } from '../types';

interface DockItemProps {
    mouseX: MotionValue;
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    isActive?: boolean;
}

const DockItem = ({ mouseX, icon: Icon, label, onClick, isActive }: DockItemProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            onClick={onClick}
            className={`aspect-square rounded-2xl flex items-center justify-center cursor-pointer relative group transition-colors duration-300 ${isActive
                ? 'bg-brand-accent text-brand-base shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                : 'bg-brand-surface/80 border border-brand-accent/20 text-brand-secondary hover:bg-brand-surface hover:border-brand-accent/50'
                }`}
        >
            <Icon size={24} className="relative z-10" />

            {/* Label Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-brand-surface border border-brand-accent/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none mb-2">
                <span className="text-[10px] font-mono tracking-widest text-brand-primary">{label}</span>
            </div>

            {/* Active Indicator */}
            {isActive && (
                <motion.div
                    layoutId="dock-active"
                    className="absolute -bottom-2 w-1 h-1 rounded-full bg-brand-accent"
                />
            )}
        </motion.div>
    );
};

export const SystemDock: React.FC = () => {
    const mouseX = useMotionValue(Infinity);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const menuItems = [
        { id: SectionId.HERO, icon: Home, label: 'SYSTEM' },
        { id: 'about', icon: User, label: 'PROFILE' },
        { id: 'marketplace', icon: ShoppingBag, label: 'STORE' },
        { id: SectionId.PROJECTS, icon: Code, label: 'MODULES' },
        { id: SectionId.SKILLS, icon: Terminal, label: 'SKILLS' },
        { id: SectionId.CONTACT, icon: Mail, label: 'UPLINK' },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 hidden md:flex justify-center">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end gap-3 px-4 py-3 rounded-full bg-brand-base border border-brand-border shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] shadow-brand-border/50"
            >
                {menuItems.map((item) => (
                    <DockItem
                        key={item.id}
                        mouseX={mouseX}
                        icon={item.icon}
                        label={item.label}
                        onClick={() => scrollTo(item.id)}
                    />
                ))}
            </motion.div>
        </div>
    );
};
