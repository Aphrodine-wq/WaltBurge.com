import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

export const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id={SectionId.ABOUT} className="py-20 md:py-32 px-4 md:px-6 bg-brand-surface relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 lg:gap-20 items-start"
        >

          {/* Left Column */}
          <motion.div variants={itemVariants} className="md:sticky md:top-32 text-center md:text-left">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block flex items-center gap-2">
              <span className="w-8 h-px bg-brand-accent" />
              01. About Me
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-8 leading-[0.9]">
              Engineering <br />
              <span className="text-brand-secondary/50">From First</span> <br />
              Principles.
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-8 mx-auto md:mx-0 max-w-sm md:max-w-none">
              <div className="p-4 md:p-5 bg-brand-base/50 rounded-xl border border-brand-primary/5">
                <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1">5+</div>
                <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">Years Experience</div>
              </div>
              <div className="p-4 md:p-5 bg-brand-base/50 rounded-xl border border-brand-primary/5">
                <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1">12+</div>
                <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">Shipped Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-12 flex flex-col items-center md:items-start">

            <motion.div
              variants={itemVariants}
              className="p-6 md:p-10 rounded-2xl border-l-4 border-l-brand-accent bg-brand-base/30 border border-brand-primary/5 w-full"
            >
              <p className="text-lg md:text-2xl leading-relaxed font-light text-brand-secondary text-center md:text-left">
                "I don't just use tools; I build them. My engineering philosophy is rooted in a deep understanding of the entire stack -- from <span className="text-brand-primary font-medium">kernel-level memory management</span> to <span className="text-brand-primary font-medium">distributed AI architectures</span>."
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-10 w-full">

              <div className="flex gap-4 md:gap-6 group">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-accent font-bold font-mono text-sm">01</div>
                  <div className="w-px h-full bg-brand-primary/10 my-2" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3">The Systems Approach</h3>
                  <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                    My journey began with a frustration: modern abstractions often obscure how computers actually work. This "bare-metal" education gave me a unique perspective on performance optimization -- knowing the cost of every cycle and allocation allows me to write high-level code that is incredibly efficient.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6 group">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-purple font-bold font-mono text-sm">02</div>
                  <div className="w-px h-full bg-brand-primary/10 my-2" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3">AI & The Future</h3>
                  <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                    Today, I apply that systems mindset to Artificial Intelligence. I'm not just integrating APIs; I'm architecting <strong className="text-brand-primary">Agentic Workflows</strong> and <strong className="text-brand-primary">RAG Pipelines</strong> that function as reliable system components. Whether it's optimizing inference latency or designing context-aware memory structures, I treat AI models as deterministic parts of a larger, robust machine.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6 group">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-green-400 font-bold font-mono text-sm">03</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3">Creative Engineering</h3>
                  <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                    Code is ultimately a creative medium. My background in <strong className="text-brand-primary">Game Development</strong> drives me to build interfaces that feel alive. I obsess over micro-interactions, frame rates, and user feedback loops. I believe software should not only work perfectly but also feel powerful to use.
                  </p>
                </div>
              </div>

            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-brand-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4 w-full text-center sm:text-left"
            >
              <div className="font-mono text-xs text-brand-secondary uppercase tracking-widest">
                Based in Global / Remote
              </div>
              <div className="font-mono text-xs text-brand-secondary uppercase tracking-widest">
                Open for collaborations
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
