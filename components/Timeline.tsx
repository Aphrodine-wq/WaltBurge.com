import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, TrendingUp } from 'lucide-react';

interface TimelineEvent {
    year: string;
    title: string;
    company?: string;
    type: 'work' | 'education' | 'achievement';
    description: string;
    highlights: string[];
    icon: typeof Briefcase;
    color: string;
    gradient: string;
}

const timelineEvents: TimelineEvent[] = [
    {
        year: '2024-Present',
        title: 'Senior Full-Stack Engineer',
        company: 'Enterprise Solutions',
        type: 'work',
        description: 'Leading AI integration and enterprise architecture initiatives',
        highlights: [
            'Architected agentic AI workflows reducing processing time by 60%',
            'Designed scalable RAG pipeline serving 10M+ queries/month',
            'Led migration to microservices architecture'
        ],
        icon: Briefcase,
        color: 'text-brand-accent',
        gradient: 'from-brand-accent to-cyan-400'
    },
    {
        year: '2022-2024',
        title: 'Systems Architect',
        company: 'Tech Innovation Labs',
        type: 'work',
        description: 'Built high-performance distributed systems and data pipelines',
        highlights: [
            'Reduced infrastructure costs by $2M annually',
            'Achieved 99.99% uptime across critical services',
            'Optimized data pipeline performance by 400%'
        ],
        icon: TrendingUp,
        color: 'text-brand-purple',
        gradient: 'from-brand-purple to-purple-400'
    },
    {
        year: '2020-2022',
        title: 'Full-Stack Developer',
        company: 'Startup Ventures',
        type: 'work',
        description: 'Developed custom solutions and scalable web applications',
        highlights: [
            'Built real-time collaboration platform from scratch',
            'Enabled $25M in sales through custom CRM',
            'Implemented CI/CD reducing deployment time by 80%'
        ],
        icon: Briefcase,
        color: 'text-brand-gold',
        gradient: 'from-brand-gold to-yellow-400'
    },
    {
        year: '2019',
        title: 'Custom OS & Language Development',
        type: 'achievement',
        description: 'Created FTWOS operating system and G-Rump compiled language',
        highlights: [
            'Designed custom OS with memory management',
            'Built compiled language with LLVM backend',
            'Deep understanding of systems programming'
        ],
        icon: Award,
        color: 'text-green-400',
        gradient: 'from-green-400 to-emerald-500'
    }
];

export const Timeline: React.FC = () => {
    return (
        <section className="py-20 md:py-32 px-4 md:px-6 bg-brand-surface relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-1/4 left-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]"
                />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
                        <span className="inline-block w-8 h-px bg-brand-accent mr-3" />
                        03. Journey
                        <span className="inline-block w-8 h-px bg-brand-accent ml-3" />
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-6">
                        Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-copper">Progression</span>
                    </h2>
                    <p className="text-lg text-brand-secondary max-w-2xl mx-auto">
                        A journey from systems fundamentals to enterprise-scale solutions
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-accent/50 via-brand-purple/50 to-brand-gold/50" />

                    {/* Events */}
                    <div className="space-y-12 md:space-y-16">
                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    } flex-row`}
                            >
                                {/* Timeline dot */}
                                <motion.div
                                    whileHover={{ scale: 1.3, rotate: 180 }}
                                    className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${event.gradient} border-4 border-brand-surface shadow-lg transform -translate-x-1/2 z-10`}
                                />

                                {/* Content card */}
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                                        } group cursor-default`}
                                >
                                    <div className="relative p-6 md:p-8 rounded-2xl border border-brand-border bg-brand-base/80 backdrop-blur-sm hover:border-brand-accent/50 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-brand-accent/10">
                                        {/* Gradient overlay */}
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                                        />

                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${event.gradient} p-2.5 mb-4 shadow-lg`}
                                        >
                                            <event.icon className="w-full h-full text-white" />
                                        </motion.div>

                                        {/* Year badge */}
                                        <div className="inline-block px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-accent text-xs font-mono font-bold mb-3">
                                            {event.year}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-brand-accent transition-all">
                                            {event.title}
                                        </h3>

                                        {/* Company */}
                                        {event.company && (
                                            <p className={`${event.color} font-semibold mb-3`}>
                                                {event.company}
                                            </p>
                                        )}

                                        {/* Description */}
                                        <p className="text-brand-secondary mb-4 leading-relaxed">
                                            {event.description}
                                        </p>

                                        {/* Highlights */}
                                        <ul className="space-y-2">
                                            {event.highlights.map((highlight, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                                                    className="flex items-start gap-2 text-sm text-brand-secondary"
                                                >
                                                    <span className={`${event.color} mt-1.5 flex-shrink-0`}>▸</span>
                                                    <span>{highlight}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
