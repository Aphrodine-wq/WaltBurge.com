import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { SectionId, BlogPost } from '../types';

const posts: BlogPost[] = [
  {
    id: 'self-taught-7-months',
    title: 'From Construction Sites to Codebases: 7 Months Self-Taught',
    excerpt: 'I spent 15 years in construction before writing my first line of code. Here\'s what building houses taught me about building software — and why the transition wasn\'t as far as people think.',
    date: '2025-04-10',
    readTime: '8 min',
    tags: ['Career', 'Construction'],
    featured: true,
  },
  {
    id: 'fine-tuning-construction-llm',
    title: 'Fine-Tuning a Construction Estimation LLM from Scratch',
    excerpt: 'No existing AI understands construction pricing at the line-item level. So I built one — 18,000+ training examples, custom distillation pipeline, deployed on RunPod for $0.002 per estimate.',
    date: '2025-04-06',
    readTime: '12 min',
    tags: ['AI', 'ConstructionAI'],
  },
  {
    id: 'building-with-ai-not-around-it',
    title: 'Building With AI, Not Around It',
    excerpt: 'Most developers use AI as autocomplete. I use it as a cofounder. The difference is whether you let it shape architecture or just fill in blanks.',
    date: '2025-03-28',
    readTime: '6 min',
    tags: ['AI', 'Development'],
  },
  {
    id: 'three-node-ai-network',
    title: 'Running a Distributed AI System Across Three Machines',
    excerpt: 'A Mac for development, a mini PC as the always-on nerve hub, and a GPU workstation for the heavy lifting. How I wired them together with a file-backed event bus.',
    date: '2025-03-20',
    readTime: '10 min',
    tags: ['Systems', 'WALT'],
  },
  {
    id: 'marketplace-architecture',
    title: 'Designing a Three-Sided Construction Marketplace',
    excerpt: 'Homeowners, contractors, and subcontractors all have different incentives. The bidding system, payment flows, and trust mechanics that make it work.',
    date: '2025-03-14',
    readTime: '9 min',
    tags: ['Architecture', 'FTW'],
  },
  {
    id: 'overnight-autonomous-runner',
    title: 'Shipping Code While You Sleep',
    excerpt: 'My overnight runner executes multi-project work queues autonomously — building features, running verification, rolling back on failure. 1,600 lines of bash that changed everything.',
    date: '2025-03-08',
    readTime: '7 min',
    tags: ['Systems', 'Automation'],
  },
];

const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const Blog: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() =>
    activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts,
    [activeTag]
  );

  const featured = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p.id !== featured?.id);

  return (
    <section id={SectionId.BLOG} className="py-20 md:py-32 px-4 md:px-6 bg-brand-base relative border-t border-brand-border/10">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6"
        >
          <div className="space-y-4">
            <span className="font-mono text-xs text-brand-accent uppercase tracking-widest">
              Writing
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter">
              From the <br className="hidden md:block" />
              <span className="text-brand-secondary opacity-60">Build Log</span>
            </h2>
            <div className="h-1 w-20 bg-brand-accent rounded-full" />
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                !activeTag
                  ? 'bg-brand-accent/10 border-brand-accent/30 text-brand-accent'
                  : 'bg-brand-surface border-brand-border text-brand-secondary hover:border-brand-accent/20'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                  activeTag === tag
                    ? 'bg-brand-accent/10 border-brand-accent/30 text-brand-accent'
                    : 'bg-brand-surface border-brand-border text-brand-secondary hover:border-brand-accent/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured post */}
        {featured && (
          <motion.article
            key={featured.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group mb-8 md:mb-12 p-8 md:p-12 rounded-3xl bg-brand-surface/50 border border-brand-border hover:border-brand-accent/30 transition-all cursor-pointer"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {featured.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[10px] uppercase tracking-wider text-brand-accent font-mono">
                  {tag}
                </span>
              ))}
              {featured.featured && (
                <span className="px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-[10px] uppercase tracking-wider text-brand-purple font-mono">
                  Featured
                </span>
              )}
            </div>

            <h3 className="text-2xl md:text-4xl font-black text-brand-primary tracking-tight mb-4 group-hover:text-brand-accent transition-colors leading-tight">
              {featured.title}
            </h3>

            <p className="text-brand-secondary text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
              {featured.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-brand-secondary font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {featured.readTime}
                </span>
              </div>
              <span className="flex items-center gap-2 text-sm text-brand-accent font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Read <ArrowRight size={16} />
              </span>
            </div>
          </motion.article>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group p-6 md:p-8 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-accent/30 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-brand-base border border-brand-border text-[10px] uppercase tracking-wider text-brand-secondary font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <h4 className="text-lg md:text-xl font-bold text-brand-primary mb-3 group-hover:text-brand-accent transition-colors leading-snug">
                  {post.title}
                </h4>

                <p className="text-sm text-brand-secondary leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-brand-border/50 text-xs text-brand-secondary font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center border border-dashed border-brand-border rounded-xl">
            <BookOpen size={32} className="mx-auto mb-4 text-brand-secondary" />
            <p className="text-brand-secondary font-mono">No posts with tag "{activeTag}".</p>
            <button onClick={() => setActiveTag(null)} className="mt-4 text-brand-accent hover:underline text-sm uppercase tracking-wider">
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
