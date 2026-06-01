import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';
import { getAllPosts, allTags } from '../lib/blog';
import { PostCard } from './PostCard';

interface BlogIndexProps {
  onPostClick: (post: BlogPost) => void;
  onBack: () => void;
}

const FilterButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
      active
        ? 'bg-brand-accent border-brand-accent text-white'
        : 'bg-brand-surface border-brand-border text-brand-secondary hover:border-brand-accent/40 hover:text-brand-primary'
    }`}
  >
    {children}
  </button>
);

// The full /blog destination — the blog as a first-class page, not a homepage section.
export const BlogIndex: React.FC<BlogIndexProps> = ({ onPostClick, onBack }) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const posts = getAllPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Blog — Walt Burge';
    return () => { document.title = prevTitle; };
  }, []);

  const filtered = useMemo(
    () => (activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts),
    [activeTag, posts]
  );
  const featured = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p.id !== featured?.id);

  return (
    <div className="min-h-screen bg-brand-base text-brand-primary">
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full z-50 px-5 md:px-8 h-16 md:h-20 flex items-center bg-brand-base/85 backdrop-blur-md border-b border-brand-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to site
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 md:mb-20"
        >
          <span className="font-mono text-xs text-brand-accent uppercase tracking-widest">The Build Log</span>
          <h1 className="mt-4 text-5xl md:text-8xl font-black text-brand-primary tracking-tighter leading-[0.95]">
            Writing<span className="text-brand-accent">.</span>
          </h1>
          <p className="mt-6 text-brand-secondary text-lg md:text-xl max-w-2xl leading-relaxed">
            Notes on building products, training models, and figuring out software engineering from scratch — in public, as I go.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            <FilterButton active={!activeTag} onClick={() => setActiveTag(null)}>All</FilterButton>
            {allTags.map(tag => (
              <FilterButton key={tag} active={activeTag === tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}>
                {tag}
              </FilterButton>
            ))}
          </div>
        </motion.div>

        {featured && <PostCard post={featured} onClick={onPostClick} variant="featured" />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map((post, i) => (
            <PostCard key={post.id} post={post} onClick={onPostClick} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center border border-dashed border-brand-border rounded-xl">
            <BookOpen size={40} className="mx-auto mb-4 text-brand-secondary" />
            <p className="text-brand-secondary font-mono text-lg">No posts tagged "{activeTag}".</p>
            <button onClick={() => setActiveTag(null)} className="mt-4 text-brand-accent hover:underline text-sm uppercase tracking-wider font-mono">
              Clear filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
