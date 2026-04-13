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
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Building scalable data pipelines, distributed systems, and high-performance databases. Expertise in data modeling and ETL optimization.',
    skills: ['Pipeline Architecture', 'Distributed Systems', 'Data Modeling', 'ETL Optimization'],
  },
  {
    icon: Cloud,
    title: 'Enterprise Architecture',
    description: 'Designing resilient, scalable cloud infrastructure. Microservices, containerization, and orchestration at enterprise scale.',
    skills: ['Cloud Infrastructure', 'Microservices', 'Kubernetes', 'System Design'],
  },
  {
    icon: Cpu,
    title: 'Systems Programming',
    description: 'Low-level optimization from kernel to application. Custom language design, OS development, and performance engineering.',
    skills: ['Language Design', 'OS Development', 'Memory Management', 'Performance Tuning'],
  },
  {
    icon: Network,
    title: 'Full-Stack Development',
    description: 'End-to-end application development with modern frameworks. React, Next.js, Node.js, and real-time systems.',
    skills: ['React/Next.js', 'Node.js', 'TypeScript', 'Real-time Systems'],
  },
  {
    icon: Zap,
    title: 'Game Development',
    description: 'High-performance game engines, custom renderers, and interactive experiences. Rust/Bevy and custom tooling.',
    skills: ['Rust/Bevy', 'Custom Renderers', 'Physics Systems', 'Real-time Graphics'],
  }
];

export const Expertise: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id={SectionId.SKILLS} className="py-20 md:py-32 px-4 md:px-6 bg-brand-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            <span className="inline-block w-8 h-px bg-brand-accent mr-3" />
            02. Expertise
            <span className="inline-block w-8 h-px bg-brand-accent ml-3" />
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-6 uppercase">
            Domain <span className="text-brand-accent">Mastery</span>
          </h2>
          <p className="text-lg text-brand-secondary max-w-2xl mx-auto">
            Deep expertise across the full technology stack, from bare metal to AI
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {expertiseAreas.map((area) => (
            <motion.div
              key={area.title}
              variants={itemVariants}
              className="group relative p-6 md:p-8 rounded-2xl border border-brand-accent/20 bg-brand-surface/50 hover:border-brand-accent transition-colors duration-300 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-surface border border-brand-border p-3 mb-5 flex items-center justify-center group-hover:border-brand-accent/50 transition-colors">
                <area.icon className="w-8 h-8 text-brand-accent" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-3 group-hover:text-brand-accent transition-colors">
                {area.title}
              </h3>
              <p className="text-sm md:text-base text-brand-secondary leading-relaxed mb-5">
                {area.description}
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                {area.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full bg-brand-base/50 border border-brand-border text-brand-secondary font-mono group-hover:border-brand-accent/50 group-hover:text-brand-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
