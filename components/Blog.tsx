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
    <section id={SectionId.BLOG} className="py-24 md:py-40 px-4 md:px-6 bg-brand-base relative border-t border-brand-border/10">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-5">
              <span className="font-mono text-xs text-brand-accent uppercase tracking-widest">
                Writing
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter">
                From the <br className="hidden md:block" />
                <span className="text-brand-secondary opacity-60">Build Log</span>
              </h2>
              <div className="h-1 w-24 bg-brand-accent rounded-full" />
              <p className="text-brand-secondary text-lg max-w-lg leading-relaxed">
                Notes on building products, training models, and figuring out software engineering from scratch.
              </p>
            </div>

            {/* Tag filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
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
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                    activeTag === tag
                      ? 'bg-brand-accent/10 border-brand-accent/30 text-brand-accent'
                      : 'bg-brand-surface border-brand-border text-brand-secondary hover:border-brand-accent/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured post — full width, big */}
        {featured && (
          <motion.article
            key={featured.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group mb-12 md:mb-16 p-10 md:p-16 rounded-3xl bg-brand-surface/50 border border-brand-border hover:border-brand-accent/30 transition-all cursor-pointer"
          >
            <div className="flex flex-wrap gap-2 mb-8">
              {featured.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs uppercase tracking-wider text-brand-accent font-mono">
                  {tag}
                </span>
              ))}
              {featured.featured && (
                <span className="px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs uppercase tracking-wider text-brand-purple font-mono">
                  Featured
                </span>
              )}
            </div>

            <h3 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tight mb-6 group-hover:text-brand-accent transition-colors leading-tight max-w-4xl">
              {featured.title}
            </h3>

            <p className="text-brand-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-3xl">
              {featured.excerpt}
            </p>

            <div className="flex items-center justify-between pt-8 border-t border-brand-border/30">
              <div className="flex items-center gap-6 text-sm text-brand-secondary font-mono">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {featured.readTime}
                </span>
              </div>
              <span className="flex items-center gap-2 text-sm text-brand-accent font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Read <ArrowRight size={18} />
              </span>
            </div>
          </motion.article>
        )}

        {/* Post grid — 2 columns for bigger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group p-8 md:p-10 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-accent/30 transition-all cursor-pointer flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-brand-base border border-brand-border text-[11px] uppercase tracking-wider text-brand-secondary font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <h4 className="text-xl md:text-2xl font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors leading-snug">
                  {post.title}
                </h4>

                <p className="text-sm md:text-base text-brand-secondary leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between mt-8 pt-5 border-t border-brand-border/50">
                <div className="flex items-center gap-4 text-xs text-brand-secondary font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-2 text-xs text-brand-accent font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Read <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center border border-dashed border-brand-border rounded-xl">
            <BookOpen size={40} className="mx-auto mb-4 text-brand-secondary" />
            <p className="text-brand-secondary font-mono text-lg">No posts with tag "{activeTag}".</p>
            <button onClick={() => setActiveTag(null)} className="mt-4 text-brand-accent hover:underline text-sm uppercase tracking-wider">
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
