import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
  onTagClick?: (tag: string) => void;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

// Inline markdown: `code` and **bold**. Returns React nodes.
const renderInline = (text: string, keyBase: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  // Split on `code` and **bold** while keeping delimiters.
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  parts.forEach((part, i) => {
    if (!part) return;
    if (part.startsWith('`') && part.endsWith('`')) {
      nodes.push(
        <code key={`${keyBase}-${i}`} className="px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-accent font-mono text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    } else if (part.startsWith('**') && part.endsWith('**')) {
      nodes.push(<strong key={`${keyBase}-${i}`} className="text-brand-primary font-bold">{part.slice(2, -2)}</strong>);
    } else {
      nodes.push(part);
    }
  });
  return nodes;
};

// Minimal block-level markdown renderer. No dependency.
const renderMarkdown = (md: string): React.ReactNode[] => {
  const lines = md.replace(/\t/g, '  ').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block (CommonMark fence-length matching: a longer outer
    // fence can wrap shorter inner fences, so .t.md examples render intact)
    const fenceOpen = line.trim().match(/^(`{3,})(.*)$/);
    if (fenceOpen) {
      const fenceLen = fenceOpen[1].length;
      const lang = fenceOpen[2].trim();
      const closeRe = new RegExp(`^\`{${fenceLen},}\\s*$`);
      const code: string[] = [];
      i++;
      while (i < lines.length && !closeRe.test(lines[i].trim())) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push(
        <pre key={key++} className="my-8 p-5 md:p-6 rounded-2xl bg-brand-surface border border-brand-border overflow-x-auto">
          {lang && <div className="text-[11px] font-mono uppercase tracking-widest text-brand-secondary/60 mb-3">{lang}</div>}
          <code className="font-mono text-sm md:text-[0.95rem] text-brand-primary/90 leading-relaxed whitespace-pre">{code.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      blocks.push(<h3 key={key++} className="text-xl md:text-2xl font-bold text-brand-primary mt-12 mb-4 tracking-tight">{renderInline(line.slice(4), `h3-${key}`)}</h3>);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push(<h2 key={key++} className="text-2xl md:text-3xl font-black text-brand-primary mt-16 mb-5 tracking-tight">{renderInline(line.slice(3), `h2-${key}`)}</h2>);
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      blocks.push(<hr key={key++} className="my-12 border-brand-border/40" />);
      i++;
      continue;
    }

    // Blockquote (group consecutive)
    if (line.startsWith('> ')) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quote.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="my-8 pl-6 border-l-2 border-brand-accent/50 text-brand-primary/80 text-lg md:text-xl italic leading-relaxed">
          {renderInline(quote.join(' '), `bq-${key}`)}
        </blockquote>
      );
      continue;
    }

    // Unordered list (group consecutive)
    if (/^\s*[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*] /, ''));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-6 space-y-3 list-none">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-brand-secondary text-base md:text-lg leading-relaxed">
              <span className="text-brand-accent mt-1 shrink-0">—</span>
              <span>{renderInline(item, `li-${key}-${idx}`)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph (group consecutive non-blank, non-special lines)
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trimStart().startsWith('```') &&
      !lines[i].startsWith('## ') &&
      !lines[i].startsWith('### ') &&
      !lines[i].startsWith('> ') &&
      !/^\s*[-*] /.test(lines[i]) &&
      lines[i].trim() !== '---'
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="my-6 text-brand-secondary text-base md:text-lg leading-relaxed">
        {renderInline(para.join(' '), `p-${key}`)}
      </p>
    );
  }

  return blocks;
};

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack, onTagClick }) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Swap document title + meta/OG description to this post while it's open,
    // so a shared /blog/<slug> link previews the article, not the homepage.
    const prevTitle = document.title;
    document.title = `${post.title} — Walt Burge`;

    const setMeta = (selector: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      const prev = el?.getAttribute('content') ?? null;
      el?.setAttribute('content', value);
      return () => { if (el && prev !== null) el.setAttribute('content', prev); };
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
      <div className="fixed top-0 left-0 w-full z-50 px-6 h-16 md:h-20 flex items-center bg-brand-base/95 backdrop-blur border-b border-brand-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Build Log
        </button>
      </div>

      <article className="max-w-3xl mx-auto px-5 md:px-6 py-12 md:py-20">
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

          <h1 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[1.05] mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-brand-secondary font-mono">
            <span className="flex items-center gap-2">
              <Calendar size={15} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={15} />
              {post.readTime}
            </span>
          </div>

          <div className="h-px w-full bg-brand-border/40 mt-10" />
        </motion.header>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-none"
        >
          {post.content
            ? renderMarkdown(post.content)
            : (
              <p className="text-brand-secondary text-lg md:text-xl leading-relaxed italic">
                {post.excerpt}
              </p>
            )}
        </motion.div>

        {/* Footer / signature */}
        <div className="mt-20 pt-10 border-t border-brand-border/40">
          <p className="text-brand-secondary font-mono text-sm">
            Written by <span className="text-brand-primary font-bold">James Walton</span> — building Tessera, FairTradeWorker, and ConstructionAI.
          </p>
          <button
            onClick={onBack}
            className="mt-6 flex items-center gap-2 text-brand-accent hover:gap-3 transition-all font-mono uppercase tracking-wider text-xs"
          >
            <ArrowLeft size={14} />
            More from the Build Log
          </button>
        </div>
      </article>
    </div>
  );
};
