import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

export const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

interface PostCardProps {
  post: BlogPost;
  onClick?: (post: BlogPost) => void;
  variant?: 'featured' | 'standard';
  index?: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick, variant = 'standard', index = 0 }) => {
  if (variant === 'featured') {
    return (
      <motion.article
        onClick={() => onClick?.(post)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group mb-10 md:mb-14 p-8 md:p-14 bg-brand-surface border border-brand-border hover:border-brand-accent/50 transition-colors cursor-pointer"
      >
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-brand-accent text-white text-[11px] uppercase tracking-wider font-mono font-semibold">
            Featured
          </span>
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 border border-brand-accent/30 text-[11px] uppercase tracking-wider text-brand-accent font-mono">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tight mb-6 group-hover:text-brand-accent transition-colors leading-[1.05] max-w-4xl">
          {post.title}
        </h3>

        <p className="text-brand-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-3xl">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-8 border-t border-brand-border">
          <div className="flex items-center gap-6 text-sm text-brand-secondary font-mono">
            <span className="flex items-center gap-2"><Calendar size={16} />{formatDate(post.date)}</span>
            <span className="flex items-center gap-2"><Clock size={16} />{post.readTime}</span>
          </div>
          <span className="hidden sm:flex items-center gap-2 text-sm text-brand-accent font-semibold uppercase tracking-wider group-hover:gap-3 transition-all">
            Read <ArrowRight size={18} />
          </span>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      onClick={() => onClick?.(post)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.06 }}
      className="group p-7 md:p-9 bg-brand-surface border border-brand-border hover:border-brand-accent/50 transition-colors cursor-pointer flex flex-col justify-between min-h-[260px]"
    >
      <div>
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 border border-brand-border text-[11px] uppercase tracking-wider text-brand-secondary font-mono">
              {tag}
            </span>
          ))}
        </div>

        <h4 className="text-xl md:text-2xl font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors leading-snug tracking-tight">
          {post.title}
        </h4>

        <p className="text-sm md:text-base text-brand-secondary leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      <div className="flex items-center justify-between mt-8 pt-5 border-t border-brand-border">
        <div className="flex items-center gap-4 text-xs text-brand-secondary font-mono">
          <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(post.date)}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-brand-accent font-semibold uppercase tracking-wider group-hover:gap-2.5 transition-all">
          Read <ArrowRight size={14} />
        </span>
      </div>
    </motion.article>
  );
};
