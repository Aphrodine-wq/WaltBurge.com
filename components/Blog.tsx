import React from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionId, BlogPost } from '../types';
import { getAllPosts } from '../lib/blog';
import { formatDate } from './PostCard';

interface BlogProps {
  onPostClick?: (post: BlogPost) => void;
  onViewAll?: () => void;
}

// Homepage writing module — an editorial contents list, sharp and hairline-ruled
// to match the rest of the site. A lead article, then a clean list of recent ones.
export const Blog: React.FC<BlogProps> = ({ onPostClick, onViewAll }) => {
  const posts = getAllPosts();
  // Lead with the consciousness flagship — the clearest door into the arc.
  const HERO_SLUG = 'i-dont-ask-if-my-ai-is-conscious';
  const featured = posts.find(p => p.id === HERO_SLUG) || posts.find(p => p.featured) || posts[0];
  const recent = posts.filter(p => p.id !== featured?.id).slice(0, 4);
  const total = posts.length;

  const Meta: React.FC<{ post: BlogPost }> = ({ post }) => (
    <div className="flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-wider text-brand-secondary">
      <span className="text-brand-accent">{post.tags[0]}</span>
      <span className="w-1 h-1 rounded-full bg-brand-border" />
      <span>{formatDate(post.date)}</span>
      <span className="w-1 h-1 rounded-full bg-brand-border" />
      <span>{post.readTime}</span>
    </div>
  );

  return (
    <section id={SectionId.BLOG} className="py-20 md:py-28 px-6 md:px-8 bg-brand-muted border-t border-brand-border">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between gap-5 border-b border-brand-border pb-5 mb-2"
        >
          <div>
            <span className="font-mono text-xs text-brand-accent uppercase tracking-[0.22em] flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-brand-accent" /> Writing
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-none">
              From the Build Log<span className="text-brand-accent">.</span>
            </h2>
          </div>
          <button
            onClick={onViewAll}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors shrink-0 group pb-1"
          >
            All {total} articles
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Lead article */}
        {featured && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            onClick={() => onPostClick?.(featured)}
            className="group block w-full text-left py-9 border-b border-brand-border"
          >
            <Meta post={featured} />
            <h3 className="mt-3 text-2xl md:text-4xl font-black text-brand-primary tracking-tight leading-[1.05] max-w-3xl group-hover:text-brand-accent transition-colors">
              {featured.title}
            </h3>
            <p className="mt-4 text-brand-secondary text-base md:text-lg leading-relaxed max-w-2xl">{featured.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent group-hover:gap-2.5 transition-all">
              Read article <ArrowRight size={15} />
            </span>
          </motion.button>
        )}

        {/* Recent — two-column hairline list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="grid sm:grid-cols-2 gap-x-10"
        >
          {recent.map(post => (
            <button
              key={post.id}
              onClick={() => onPostClick?.(post)}
              className="group text-left py-6 border-b border-brand-border"
            >
              <Meta post={post} />
              <h4 className="mt-2.5 text-lg md:text-xl font-bold text-brand-primary leading-snug tracking-tight group-hover:text-brand-accent transition-colors">
                {post.title}
              </h4>
            </button>
          ))}
        </motion.div>

        <button
          onClick={onViewAll}
          className="mt-8 inline-flex sm:hidden items-center gap-2 text-sm font-semibold text-brand-accent"
        >
          All {total} articles <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};
