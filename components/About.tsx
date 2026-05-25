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
              From the <br />
              <span className="text-brand-secondary/50">Job Site to</span> <br />
              the Codebase.
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-8 mx-auto md:mx-0 max-w-sm md:max-w-none">
              <div className="p-4 md:p-5 bg-brand-base/50 rounded-xl border border-brand-primary/5">
                <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1">7mo</div>
                <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">Self-Taught</div>
              </div>
              <div className="p-4 md:p-5 bg-brand-base/50 rounded-xl border border-brand-primary/5">
                <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1">12+</div>
                <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">Projects Shipped</div>
              </div>
              <div className="p-4 md:p-5 bg-brand-base/50 rounded-xl border border-brand-primary/5">
                <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1">18K+</div>
                <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">AI Training Examples</div>
              </div>
              <div className="p-4 md:p-5 bg-brand-base/50 rounded-xl border border-brand-primary/5">
                <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1">1</div>
                <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">Custom LLM Trained</div>
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
                "I came up on job sites, not in a CS program. I wrote my first line of code about seven months ago. Since then I've shipped a <span className="text-brand-primary font-medium">contractor marketplace</span>, trained a <span className="text-brand-primary font-medium">custom AI model</span> for construction estimation, and built the tools I use to build everything else."
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-10 w-full">

              <div className="flex gap-4 md:gap-6 group">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-accent font-bold font-mono text-sm">01</div>
                  <div className="w-px h-full bg-brand-primary/10 my-2" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3">The Construction Edge</h3>
                  <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                    Years of construction taught me how to scope a job, sequence the work, and finish what I start -- and that a thing is only done when it holds up under load. I build software the same way I built houses: estimate honestly, sequence the work, and ship something real. It's also why my construction-tech actually fits the trade -- I've lived the problems I'm solving.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6 group">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-purple font-bold font-mono text-sm">02</div>
                  <div className="w-px h-full bg-brand-primary/10 my-2" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3">Self-Taught, Production-First</h3>
                  <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                    I didn't learn from a curriculum -- I learned by shipping. My first real project had a real client (<strong className="text-brand-primary">MHP Construction</strong> in Oxford, MS) using it in production. I'd rather build the hard thing for someone who needs it tomorrow than work through tutorials. That pressure is how I went from zero to a working <strong className="text-brand-primary">AI estimation platform</strong> in months.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6 group">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-green-400 font-bold font-mono text-sm">03</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3">Own Your Tools</h3>
                  <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                    When the tool I needed didn't exist, I built it. Instead of renting an AI API, I trained my own model -- <strong className="text-brand-primary">ConstructionAI</strong>. Instead of wiring up five agent frameworks, I built a language for it -- <strong className="text-brand-primary">Tessera</strong>. I'd rather own the thing I depend on than be locked into someone else's roadmap.
                  </p>
                </div>
              </div>

            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-brand-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4 w-full text-center sm:text-left"
            >
              <div className="font-mono text-xs text-brand-secondary uppercase tracking-widest">
                Based in North Mississippi
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
