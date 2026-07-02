import React from 'react';
import { m as motion } from 'framer-motion';
import { Brain, Database, Bot, Layers, Server, Code2 } from 'lucide-react';
import { SectionId } from '../types';

// Every card maps to shipped work in content/work/items.json — no aspirational
// claims. AI developer first: training, data, agents, retrieval, inference, then
// the full-stack that puts the models in front of real users.
const expertiseAreas = [
  {
    icon: Brain,
    title: 'LLM Fine-Tuning & Training',
    description: 'Built the whole pipeline behind ConstructionAI — curated data, synthetic distillation from larger models, and a fine-tuned Llama 3.1 8B with custom hyperparameters. Training the model, not prompt-wrapping an API.',
    skills: ['Fine-Tuning', 'Llama 3.1', 'Distillation', 'PyTorch'],
  },
  {
    icon: Database,
    title: 'Data Science & Datasets',
    description: 'Curated 18,000+ training examples and a synthetic-generation pipeline scaling toward 500K. Dataset design, labeling, and evaluation — the unglamorous work that decides whether a model is any good.',
    skills: ['Dataset Curation', 'Synthetic Data', 'Evaluation', 'Data Pipelines'],
  },
  {
    icon: Bot,
    title: 'Agentic AI Systems',
    description: 'Tessera, a markdown-native agent language, and W.A.L.T., a 20-layer agent platform — agents that plan, use tools, and get formally verified before they ever run.',
    skills: ['LLM Agents', 'MCP', 'Tool Use', 'LangChain'],
  },
  {
    icon: Layers,
    title: 'RAG & Semantic Memory',
    description: 'Embedding-indexed memory an agent can search: Twin Brain for persistent recall and Engram for local, on-device perception. Retrieval that actually grounds the model.',
    skills: ['RAG', 'Embeddings', 'Vector Search', 'Semantic Recall'],
  },
  {
    icon: Server,
    title: 'ML Deployment & Inference',
    description: 'A fine-tuned model served serverless on RunPod at ~$0.002 per call, GPU training runs provisioned on vast.ai, and Forge — a desktop trainer that runs the whole loop. Models in production, not notebooks.',
    skills: ['RunPod', 'vast.ai (GPU)', 'Serverless Inference', 'Model Ops'],
  },
  {
    icon: Code2,
    title: 'Full-Stack Delivery',
    description: 'The apps that put the models in front of real users — FairTradeWorker and MsHomePros. Next.js, Java/Spring, and React Native. AI is worthless until someone can actually use it.',
    skills: ['Next.js', 'TypeScript', 'Java / Spring', 'React Native'],
  },
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
    <section id={SectionId.SKILLS} className="py-20 md:py-32 px-4 md:px-6 bg-brand-base relative overflow-hidden border-t border-brand-border/40">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] mb-4 block">
            What I do
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[0.95]">
            AI, trained and shipped<span className="text-brand-accent">.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-brand-secondary leading-relaxed">
            I build the model and everything around it &mdash; data, training, agents, retrieval, inference, and the app
            it lives in. Real systems I&rsquo;ve shipped, not someone else&rsquo;s API with a wrapper on it.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {expertiseAreas.map((area) => (
            <motion.div
              key={area.title}
              variants={itemVariants}
              className="group relative p-6 md:p-8 border border-brand-border bg-brand-surface hover:border-brand-accent/50 transition-colors duration-300 flex flex-col"
            >
              <div className="w-12 h-12 border border-brand-border p-2.5 mb-5 flex items-center justify-center group-hover:border-brand-accent/50 transition-colors">
                <area.icon className="w-7 h-7 text-brand-accent" />
              </div>

              <h3 className="text-xl font-bold text-brand-primary mb-3 leading-tight">
                {area.title}
              </h3>
              <p className="text-sm md:text-base text-brand-secondary leading-relaxed mb-6">
                {area.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1.5">
                {area.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] uppercase tracking-wider text-brand-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Accent-edge wipe on hover — matches the project cards */}
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
