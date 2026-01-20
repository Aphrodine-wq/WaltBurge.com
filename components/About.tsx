import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { SectionId } from '../types';

export const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id={SectionId.ABOUT} className="py-20 md:py-32 px-4 md:px-6 bg-brand-surface relative transition-colors duration-300 overflow-hidden">
        {/* Decorative Background Elements for Detail - Variable Based */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-base/5 to-transparent pointer-events-none"></div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-0 left-10 w-64 h-64 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-20 right-20 w-96 h-96 bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 lg:gap-20 items-start"
            >

                {/* Left Column: Sticky Header */}
                <motion.div variants={itemVariants} className="md:sticky md:top-32 text-center md:text-left">
                    <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block flex items-center gap-2">
                        <span className="w-8 h-px bg-brand-accent"></span>
                        01. About Me
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-8 leading-[0.9]">
                        Engineering <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-secondary/50">From First</span> <br/>
                        Principles.
                    </h2>
                    
                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-8 mx-auto md:mx-0 max-w-sm md:max-w-none">
                        <motion.div
                          whileHover={{
                            scale: 1.08,
                            borderColor: 'rgba(34, 211, 238, 0.5)',
                            boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)'
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="p-4 md:p-5 bg-brand-base/50 backdrop-blur-sm rounded-xl border border-brand-primary/5 transition-all group cursor-default relative overflow-hidden"
                        >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="relative z-10">
                              <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1 group-hover:text-brand-accent transition-colors">5+</div>
                              <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">Years Experience</div>
                            </div>
                        </motion.div>
                        <motion.div
                          whileHover={{
                            scale: 1.08,
                            borderColor: 'rgba(192, 132, 252, 0.5)',
                            boxShadow: '0 0 20px rgba(192, 132, 252, 0.2)'
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="p-4 md:p-5 bg-brand-base/50 backdrop-blur-sm rounded-xl border border-brand-primary/5 transition-all group cursor-default relative overflow-hidden"
                        >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="relative z-10">
                              <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1 group-hover:text-brand-purple transition-colors">12+</div>
                              <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">Shipped Projects</div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Column: Detailed Content */}
                <div className="space-y-12 flex flex-col items-center md:items-start">
                    
                    {/* Intro Statement */}
                    <motion.div
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: '0 20px 50px -12px rgba(34, 211, 238, 0.15)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-panel p-6 md:p-10 rounded-2xl border-l-4 border-l-brand-accent relative overflow-hidden group hover:shadow-2xl hover:shadow-brand-accent/5 transition-all duration-500 w-full cursor-default"
                    >
                        <motion.div
                          className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"
                          animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                            <Code2 size={120} />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-transparent to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        />
                        <p className="text-lg md:text-2xl leading-relaxed font-light text-brand-secondary relative z-10 text-center md:text-left">
                            "I don't just use tools; I build them. My engineering philosophy is rooted in a deep understanding of the entire stack—from <span className="text-brand-primary font-medium">kernel-level memory management</span> to <span className="text-brand-primary font-medium">distributed AI architectures</span>."
                        </p>
                    </motion.div>

                    {/* Narrative Sections */}
                    <motion.div variants={itemVariants} className="space-y-10 w-full">

                        <motion.div
                          whileHover={{ x: 8, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex gap-4 md:gap-6 group cursor-default"
                        >
                            <div className="hidden md:flex flex-col items-center">
                                <motion.div
                                  whileHover={{ rotate: 360, scale: 1.1 }}
                                  transition={{ duration: 0.5, type: 'spring' }}
                                  className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-accent font-bold font-mono text-sm group-hover:bg-brand-accent group-hover:text-brand-black transition-all duration-300 shadow-[0_0_0_rgba(34,211,238,0)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                                >
                                  01
                                </motion.div>
                                <div className="w-px h-full bg-brand-primary/10 my-2 group-hover:bg-brand-accent/50 transition-colors"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3 group-hover:text-brand-accent transition-colors">The Systems Approach</h3>
                                <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                                    My journey began with a frustration: modern abstractions often obscure how computers actually work. To solve this, I built <strong className="text-brand-primary">G-Rump</strong>, a compiled language, and <strong className="text-brand-primary">FTWOS</strong>, a custom operating system. This "bare-metal" education gave me a unique perspective on performance optimization—knowing the cost of every cycle and allocation allows me to write high-level code that is incredibly efficient.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ x: 8, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex gap-4 md:gap-6 group cursor-default"
                        >
                            <div className="hidden md:flex flex-col items-center">
                                <motion.div
                                  whileHover={{ rotate: 360, scale: 1.1 }}
                                  transition={{ duration: 0.5, type: 'spring' }}
                                  className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-purple font-bold font-mono text-sm group-hover:bg-brand-purple group-hover:text-brand-black transition-all duration-300 shadow-[0_0_0_rgba(192,132,252,0)] group-hover:shadow-[0_0_20px_rgba(192,132,252,0.4)]"
                                >
                                  02
                                </motion.div>
                                <div className="w-px h-full bg-brand-primary/10 my-2 group-hover:bg-brand-purple/50 transition-colors"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3 group-hover:text-brand-purple transition-colors">AI & The Future</h3>
                                <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                                    Today, I apply that systems mindset to Artificial Intelligence. I'm not just integrating APIs; I'm architecting <strong className="text-brand-primary">Agentic Workflows</strong> and <strong className="text-brand-primary">RAG Pipelines</strong> that function as reliable system components. Whether it's optimizing inference latency or designing context-aware memory structures, I treat AI models as deterministic parts of a larger, robust machine.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ x: 8, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex gap-4 md:gap-6 group cursor-default"
                        >
                            <div className="hidden md:flex flex-col items-center">
                                <motion.div
                                  whileHover={{ rotate: 360, scale: 1.1 }}
                                  transition={{ duration: 0.5, type: 'spring' }}
                                  className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-green-400 font-bold font-mono text-sm group-hover:bg-green-400 group-hover:text-brand-black transition-all duration-300 shadow-[0_0_0_rgba(74,222,128,0)] group-hover:shadow-[0_0_20px_rgba(74,222,128,0.4)]"
                                >
                                  03
                                </motion.div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3 group-hover:text-green-400 transition-colors">Creative Engineering</h3>
                                <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                                    Code is ultimately a creative medium. My background in <strong className="text-brand-primary">Game Development</strong> (Unreal Engine, Custom Metal Renderers) drives me to build interfaces that feel alive. I obsess over micro-interactions, frame rates, and user feedback loops. I believe software should not only work perfectly but also feel powerful to use.
                                </p>
                            </div>
                        </motion.div>

                    </motion.div>

                    {/* Signature/Footer of About */}
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
