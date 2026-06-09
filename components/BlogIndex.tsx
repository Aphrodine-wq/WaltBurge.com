import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { BlogPost, BlogCategory } from '../types';
import { getAllPosts, sections } from '../lib/blog';
import { PostCard, formatDate } from './PostCard';
import { NavLinks } from './NavLinks';

interface BlogIndexProps {
  onPostClick: (post: BlogPost) => void;
  onBack: () => void;
  onNavigate: (id: string) => void;
}

const FilterButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
      active
        ? 'bg-brand-accent border-brand-accent text-white'
        : 'bg-brand-surface border-brand-border text-brand-secondary hover:border-brand-accent/40 hover:text-brand-primary'
    }`}
  >
    {children}
  </button>
);

// Editorial index row: date/meta column beside title + excerpt, hairline divider.
const PostRow: React.FC<{ post: BlogPost; onClick: (p: BlogPost) => void; index: number }> = ({ post, onClick, index }) => (
  <motion.button
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
    onClick={() => onClick(post)}
    className="group w-full text-left py-8 md:py-9 border-b border-brand-border grid md:grid-cols-[170px_1fr] gap-3 md:gap-10 items-start"
  >
    <div className="flex md:flex-col flex-wrap items-center md:items-start gap-x-3 gap-y-1.5 md:gap-2 pt-1">
      <span className="font-mono text-xs text-brand-secondary">{formatDate(post.date)}</span>
      <span className="font-mono text-[11px] text-brand-accent uppercase tracking-wider">{post.tags[0]}</span>
      <span className="font-mono text-xs text-brand-secondary">{post.readTime}</span>
    </div>
    <div>
      <h3 className="text-xl md:text-3xl font-black text-brand-primary tracking-tight leading-tight group-hover:text-brand-accent transition-colors mb-3">
        {post.title}
      </h3>
      <p className="text-brand-secondary text-base md:text-lg leading-relaxed max-w-2xl">{post.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        Read article <ArrowRight size={15} />
      </span>
    </div>
  </motion.button>
);

// The full /blog destination — the blog as a first-class editorial page.
export const BlogIndex: React.FC<BlogIndexProps> = ({ onPostClick, onBack, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null);
  const posts = getAllPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Blog — Walt Burge';
    return () => { document.title = prevTitle; };
  }, []);

  const filtered = useMemo(
    () => (activeCategory ? posts.filter(p => p.category === activeCategory) : posts),
    [activeCategory, posts]
  );
  const featured = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p.id !== featured?.id);

  return (
    <div className="min-h-screen bg-brand-base text-brand-primary">
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full z-50 px-5 md:px-8 h-16 md:h-20 flex items-center justify-between bg-brand-base/85 backdrop-blur-md border-b border-brand-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to site
        </button>
        <NavLinks onNavigate={onNavigate} />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <span className="font-mono text-xs text-brand-accent uppercase tracking-[0.22em]">The Build Log</span>
          <h1 className="mt-4 text-5xl md:text-8xl font-black text-brand-primary tracking-tighter leading-[0.95]">
            Writing<span className="text-brand-accent">.</span>
          </h1>
          <p className="mt-6 text-brand-secondary text-lg md:text-xl max-w-2xl leading-relaxed">
            Notes on building products, training models, and figuring out software engineering from scratch — in public, as I go.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            <FilterButton active={!activeCategory} onClick={() => setActiveCategory(null)}>
              All <span className="opacity-60">{posts.length}</span>
            </FilterButton>
            {sections.map(({ category, count }) => (
              <FilterButton
                key={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              >
                {category} <span className="opacity-60">{count}</span>
              </FilterButton>
            ))}
          </div>
        </motion.div>

        {featured && <PostCard post={featured} onClick={onPostClick} variant="featured" />}

        {/* Editorial list */}
        {rest.length > 0 && (
          <div className="mt-4 border-t border-brand-border">
            {rest.map((post, i) => (
              <PostRow key={post.id} post={post} onClick={onPostClick} index={i} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-24 text-center border border-dashed border-brand-border">
            <BookOpen size={40} className="mx-auto mb-4 text-brand-secondary" />
            <p className="text-brand-secondary font-mono text-lg">Nothing in {activeCategory} yet.</p>
            <button onClick={() => setActiveCategory(null)} className="mt-4 text-brand-accent hover:underline text-sm uppercase tracking-wider font-mono">
              Show all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
