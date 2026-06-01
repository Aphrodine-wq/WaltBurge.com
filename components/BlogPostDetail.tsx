import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, Link2, Check } from 'lucide-react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { BlogPost } from '../types';
import { getAdjacentPosts, getRelatedPosts } from '../lib/blog';
import { PostCard } from './PostCard';
import { Comments } from './Comments';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
  onPostClick?: (post: BlogPost) => void;
  onTagClick?: (tag: string) => void;
}

const formatDateLong = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

// Styled renderers for the markdown body — cobalt links, dark code panels, grotesque headings.
const mdComponents: Components = {
  h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-black text-brand-primary mt-14 mb-5 tracking-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold text-brand-primary mt-10 mb-4 tracking-tight">{children}</h3>,
  p: ({ children }) => <p className="my-6 text-brand-secondary text-base md:text-lg leading-[1.8]">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-accent font-medium underline underline-offset-2 decoration-brand-accent/40 hover:decoration-brand-accent transition-colors">
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="my-6 space-y-2.5 pl-5 list-disc marker:text-brand-accent">{children}</ul>,
  ol: ({ children }) => <ol className="my-6 space-y-2.5 pl-5 list-decimal marker:text-brand-accent marker:font-mono">{children}</ol>,
  li: ({ children }) => <li className="text-brand-secondary text-base md:text-lg leading-[1.7] pl-1.5">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 pl-6 border-l-2 border-brand-accent text-brand-primary text-lg md:text-xl italic leading-relaxed">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-brand-border" />,
  strong: ({ children }) => <strong className="text-brand-primary font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  pre: ({ children }) => <pre className="article-pre my-8 rounded-2xl overflow-x-auto">{children}</pre>,
  code: ({ className, children }) => {
    // Block code is fenced (has a language class) or spans multiple lines;
    // everything else is inline. Newline check avoids depending on node.position.
    const text = String(children);
    const isBlock = (typeof className === 'string' && className.includes('language-')) || text.includes('\n');
    if (isBlock) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="px-1.5 py-0.5 rounded bg-brand-muted border border-brand-border text-brand-accent font-mono text-[0.85em]">
        {children}
      </code>
    );
  },
};

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack, onPostClick, onTagClick }) => {
  const [copied, setCopied] = useState(false);
  const { prev, next } = getAdjacentPosts(post.id);
  const related = getRelatedPosts(post, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://waltburge.com/blog/${post.id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Swap document title + meta/OG to this post while it's open, so a shared
    // /blog/<slug> link previews the article, not the homepage.
    const prevTitle = document.title;
    document.title = `${post.title} — Walt Burge`;

    const setMeta = (selector: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      const previous = el?.getAttribute('content') ?? null;
      el?.setAttribute('content', value);
      return () => { if (el && previous !== null) el.setAttribute('content', previous); };
    };
    const restorers = [
      setMeta('meta[name="description"]', post.excerpt),
      setMeta('meta[property="og:title"]', post.title),
      setMeta('meta[property="og:description"]', post.excerpt),
      setMeta('meta[name="twitter:title"]', post.title),
      setMeta('meta[name="twitter:description"]', post.excerpt),
    ];

    return () => {
      document.title = prevTitle;
      restorers.forEach(restore => restore());
    };
  }, [post.id, post.title, post.excerpt]);

  return (
    <div className="min-h-screen bg-brand-base text-brand-primary pt-16 md:pt-20 animate-fade-in">
      {/* Back bar */}
      <div className="fixed top-0 left-0 w-full z-50 px-5 md:px-8 h-16 md:h-20 flex items-center justify-between bg-brand-base/85 backdrop-blur-md border-b border-brand-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </button>
        <button
          onClick={copyLink}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs"
        >
          {copied ? <><Check size={15} /> Copied</> : <><Link2 size={15} /> Share</>}
        </button>
      </div>

      <article className="max-w-2xl mx-auto px-5 md:px-6 py-12 md:py-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-wrap gap-2 mb-7">
            {post.tags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className="px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs uppercase tracking-wider text-brand-accent font-mono hover:bg-brand-accent/20 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[1.03] mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-secondary font-mono">
            <span className="text-brand-primary font-semibold">{post.author || 'James Walton'}</span>
            <span className="flex items-center gap-2"><Calendar size={15} />{formatDateLong(post.date)}</span>
            <span className="flex items-center gap-2"><Clock size={15} />{post.readTime}</span>
          </div>

          <div className="h-px w-full bg-brand-border mt-10" />
        </motion.header>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="article-body"
        >
          {post.content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={mdComponents}>
              {post.content}
            </ReactMarkdown>
          ) : (
            <p className="text-brand-secondary text-lg md:text-xl leading-relaxed italic">{post.excerpt}</p>
          )}
        </motion.div>

        {/* Signature */}
        <div className="mt-16 pt-10 border-t border-brand-border">
          <p className="text-brand-secondary font-mono text-sm">
            Written by <span className="text-brand-primary font-bold">{post.author || 'James Walton'}</span> — building Tessera, FairTradeWorker, and ConstructionAI.
          </p>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <nav className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <button
                onClick={() => onPostClick?.(prev)}
                className="group text-left p-5 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-accent/40 transition-colors"
              >
                <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-brand-secondary mb-2">
                  <ArrowLeft size={13} /> Older
                </span>
                <span className="text-brand-primary font-bold leading-snug group-hover:text-brand-accent transition-colors line-clamp-2">{prev.title}</span>
              </button>
            ) : <span className="hidden sm:block" />}
            {next && (
              <button
                onClick={() => onPostClick?.(next)}
                className="group text-left sm:text-right p-5 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-accent/40 transition-colors"
              >
                <span className="flex items-center sm:justify-end gap-1.5 text-[11px] font-mono uppercase tracking-wider text-brand-secondary mb-2">
                  Newer <ArrowRight size={13} />
                </span>
                <span className="text-brand-primary font-bold leading-snug group-hover:text-brand-accent transition-colors line-clamp-2">{next.title}</span>
              </button>
            )}
          </nav>
        )}

        {/* Comments */}
        <Comments />
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-brand-border bg-brand-muted py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-5 md:px-6">
            <h2 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight mb-10">
              Keep reading<span className="text-brand-accent">.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p, i) => (
                <PostCard key={p.id} post={p} onClick={onPostClick} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
