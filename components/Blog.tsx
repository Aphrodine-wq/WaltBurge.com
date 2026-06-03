import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionId, BlogPost } from '../types';
import { getAllPosts } from '../lib/blog';
import { formatDate } from './PostCard';

interface BlogProps {
  onPostClick?: (post: BlogPost) => void;
  onViewAll?: () => void;
}

// Editorial homepage module: a featured article beside a clean, date-led list
// of recent posts — the magazine pattern, not a sparse portfolio header.
export const Blog: React.FC<BlogProps> = ({ onPostClick, onViewAll }) => {
  const posts = getAllPosts();
  // Homepage headliner: lead with the consciousness flagship — it's the clearest
  // door into the AI ethics/consciousness arc. Falls back to newest featured.
  const HERO_SLUG = 'i-dont-ask-if-my-ai-is-conscious';
  const featured = posts.find(p => p.id === HERO_SLUG) || posts.find(p => p.featured) || posts[0];
  const recent = posts.filter(p => p.id !== featured?.id).slice(0, 4);
  const total = posts.length;

  return (
    <section id={SectionId.BLOG} className="py-24 md:py-36 px-4 md:px-6 bg-brand-muted border-t border-brand-border">
      <div className="max-w-7xl mx-auto">
        {/* Header with rule */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b border-brand-border pb-7 mb-12 md:mb-14"
        >
          <div>
            <span className="font-mono text-xs text-brand-accent uppercase tracking-[0.22em]">Insights</span>
            <h2 className="mt-3 text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-none">
              From the Build Log<span className="text-brand-accent">.</span>
            </h2>
          </div>
          <button
            onClick={onViewAll}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors shrink-0 group"
          >
            All {total} articles
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-[1.45fr_1fr] gap-10 md:gap-14">
          {/* Featured */}
          {featured && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              onClick={() => onPostClick?.(featured)}
              className="group cursor-pointer flex flex-col rounded-3xl bg-brand-surface border border-brand-border p-8 md:p-11 hover:border-brand-accent/40 hover:shadow-xl hover:shadow-brand-accent/5 transition-all"
            >
              <div className="flex flex-wrap items-center gap-2 mb-7">
                <span className="px-3 py-1 rounded-full bg-brand-accent text-white text-[11px] font-semibold uppercase tracking-wider font-mono">Featured</span>
                {featured.tags.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full border border-brand-border text-[11px] uppercase tracking-wider text-brand-secondary font-mono">{t}</span>
                ))}
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-brand-primary tracking-tight leading-[1.08] mb-5 group-hover:text-brand-accent transition-colors">
                {featured.title}
              </h3>

              <p className="text-brand-secondary text-base md:text-lg leading-relaxed mb-8 flex-1">
                {featured.excerpt}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-brand-border">
                <span className="text-xs font-mono text-brand-secondary">{formatDate(featured.date)} · {featured.readTime}</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent group-hover:gap-2.5 transition-all">
                  Read article <ArrowRight size={15} />
                </span>
              </div>
            </motion.article>
          )}

          {/* Recent list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex flex-col"
          >
            {recent.map(post => (
              <button
                key={post.id}
                onClick={() => onPostClick?.(post)}
                className="group text-left py-6 border-b border-brand-border first:pt-0 transition-colors"
              >
                <div className="flex items-center gap-2.5 text-[11px] font-mono text-brand-secondary uppercase tracking-wider mb-2.5">
                  <span className="text-brand-accent">{post.tags[0]}</span>
                  <span className="w-1 h-1 rounded-full bg-brand-border" />
                  <span>{formatDate(post.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-brand-border" />
                  <span>{post.readTime}</span>
                </div>
                <h4 className="text-lg md:text-xl font-bold text-brand-primary leading-snug tracking-tight group-hover:text-brand-accent transition-colors">
                  {post.title}
                </h4>
              </button>
            ))}

            <button
              onClick={onViewAll}
              className="mt-8 inline-flex sm:hidden items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-accent text-white text-sm font-semibold"
            >
              All {total} articles <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
