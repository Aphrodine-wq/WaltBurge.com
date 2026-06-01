import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionId, BlogPost } from '../types';
import { getAllPosts } from '../lib/blog';
import { PostCard } from './PostCard';

interface BlogProps {
  onPostClick?: (post: BlogPost) => void;
  onViewAll?: () => void;
}

// Homepage teaser: featured post + two recent, with a clear path to the full /blog page.
export const Blog: React.FC<BlogProps> = ({ onPostClick, onViewAll }) => {
  const posts = getAllPosts();
  const featured = posts.find(p => p.featured) || posts[0];
  const recent = posts.filter(p => p.id !== featured?.id).slice(0, 2);
  const total = posts.length;

  return (
    <section id={SectionId.BLOG} className="py-24 md:py-40 px-4 md:px-6 bg-brand-muted relative border-t border-brand-border">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div className="space-y-5">
            <span className="font-mono text-xs text-brand-accent uppercase tracking-widest">Writing</span>
            <h2 className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95]">
              From the<br className="hidden md:block" /> Build Log<span className="text-brand-accent">.</span>
            </h2>
            <p className="text-brand-secondary text-lg max-w-lg leading-relaxed">
              Notes on building products, training models, and figuring out software engineering from scratch.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-border hover:border-brand-accent bg-brand-surface text-sm font-semibold text-brand-primary transition-colors shrink-0"
          >
            Read all {total} posts <ArrowRight size={16} />
          </button>
        </motion.div>

        {featured && <PostCard post={featured} onClick={onPostClick} variant="featured" />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recent.map((post, i) => (
            <PostCard key={post.id} post={post} onClick={onPostClick} index={i} />
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <button
            onClick={onViewAll}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-brand-accent text-white text-sm font-semibold"
          >
            Read all {total} posts <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
