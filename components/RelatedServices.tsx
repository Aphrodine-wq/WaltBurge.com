'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface RelatedServiceItem {
  title: string;
  href: string;
  description: string;
}

interface RelatedServicesProps {
  items: RelatedServiceItem[];
}

export function RelatedServices({ items }: RelatedServicesProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
      <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
        Related Services
      </span>
      <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
        Explore More Services
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group p-6 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/40 hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-brand-primary mb-3 group-hover:text-brand-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-brand-secondary text-sm leading-relaxed mb-4">
              {item.description}
            </p>
            <span className="inline-flex items-center gap-1.5 text-brand-accent text-sm font-mono group-hover:gap-3 transition-all">
              Learn More <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
