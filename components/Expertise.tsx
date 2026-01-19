import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Cloud, Cpu, Network, Zap } from 'lucide-react';
import { SectionId } from '../types';

const expertiseAreas = [
    {
        icon: Brain,
        title: 'AI & Machine Learning',
        description: 'Architecting agentic workflows, RAG pipelines, and context-aware AI systems. Optimizing inference latency and designing robust AI components.',
        skills: ['LLM Integration', 'RAG Systems', 'Agentic Workflows', 'Model Optimization'],
        color: 'from-brand-accent to-cyan-400',
        borderColor: 'border-brand-accent/30',
        hoverBorder: 'group-hover:border-brand-accent',
        glowColor: 'shadow-brand-accent/20'
    },
    {
        icon: Database,
        title: 'Data Engineering',
        description: 'Building scalable data pipelines, distributed systems, and high-performance databases. Expertise in data modeling and ETL optimization.',
        skills: ['Pipeline Architecture', 'Distributed Systems', 'Data Modeling', 'ETL Optimization'],
        color: 'from-brand-purple to-purple-400',
        borderColor: 'border-brand-purple/30',
        hoverBorder: 'group-hover:border-brand-purple',
        glowColor: 'shadow-brand-purple/20'
    },
    {
        icon: Cloud,
        title: 'Enterprise Architecture',
        description: 'Designing resilient, scalable cloud infrastructure. Microservices, containerization, and orchestration at enterprise scale.',
        skills: ['Cloud Infrastructure', 'Microservices', 'Kubernetes', 'System Design'],
        color: 'from-brand-gold to-yellow-400',
        borderColor: 'border-brand-gold/30',
        hoverBorder: 'group-hover:border-brand-gold',
        glowColor: 'shadow-brand-gold/20'
    },
    {
        icon: Cpu,
        title: 'Systems Programming',
        description: 'Low-level optimization from kernel to application. Custom language design, OS development, and performance engineering.',
        skills: ['Language Design', 'OS Development', 'Memory Management', 'Performance Tuning'],
        color: 'from-green-400 to-emerald-500',
        borderColor: 'border-green-400/30',
        hoverBorder: 'group-hover:border-green-400',
        glowColor: 'shadow-green-400/20'
    },
    {
        icon: Network,
        title: 'Full-Stack Development',
        description: 'End-to-end application development with modern frameworks. React, Next.js, Node.js, and real-time systems.',
        skills: ['React/Next.js', 'Node.js', 'TypeScript', 'Real-time Systems'],
        color: 'from-blue-400 to-indigo-500',
        borderColor: 'border-blue-400/30',
        hoverBorder: 'group-hover:border-blue-400',
        glowColor: 'shadow-blue-400/20'
    },
    {
        icon: Zap,
        title: 'Game Development',
        description: 'High-performance game engines, custom renderers, and interactive experiences. Unreal Engine and Metal expertise.',
        skills: ['Unreal Engine', 'Custom Renderers', 'Physics Systems', 'Real-time Graphics'],
        color: 'from-orange-400 to-red-500',
        borderColor: 'border-orange-400/30',
        hoverBorder: 'group-hover:border-orange-400',
        glowColor: 'shadow-orange-400/20'
    }
];

export const Expertise: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <section id={SectionId.SKILLS} className="py-20 md:py-32 px-4 md:px-6 bg-brand-base relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-20 right-10 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute bottom-20 left-10 w-96 h-96 bg-brand-purple/5 rounded-full blur-[120px]"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
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
                        02. Expertise
                        <span className="inline-block w-8 h-px bg-brand-accent ml-3" />
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-6">
                        Domain <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-purple">Mastery</span>
                    </h2>
                    <p className="text-lg text-brand-secondary max-w-2xl mx-auto">
                        Deep expertise across the full technology stack, from bare metal to AI
                    </p>
                </motion.div>

                {/* Expertise Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {expertiseAreas.map((area, index) => (
                        <motion.div
                            key={area.title}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`group relative p-6 md:p-8 rounded-2xl border ${area.borderColor} ${area.hoverBorder} bg-brand-surface/50 backdrop-blur-sm transition-all duration-500 cursor-default overflow-hidden hover:shadow-2xl ${area.glowColor}`}
                        >
                            {/* Gradient overlay on hover */}
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                            />

                            {/* Icon */}
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6, type: 'spring' }}
                                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} p-3 mb-5 relative z-10 shadow-lg`}
                            >
                                <area.icon className="w-full h-full text-white" />
                            </motion.div>

                            {/* Content */}
                            <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-3 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-brand-accent transition-all duration-300">
                                {area.title}
                            </h3>
                            <p className="text-sm md:text-base text-brand-secondary leading-relaxed mb-5 relative z-10">
                                {area.description}
                            </p>

                            {/* Skills tags */}
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {area.skills.map((skill, idx) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                                        className="text-xs px-3 py-1 rounded-full bg-brand-base/50 border border-brand-border text-brand-secondary font-mono group-hover:border-brand-accent/50 group-hover:text-brand-accent transition-colors"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity">
                                <area.icon className="w-full h-full text-brand-primary" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
