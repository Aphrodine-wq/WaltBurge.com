import React from 'react';
import { Quote } from 'lucide-react';
import testimonialsData from '../content/testimonials/items.json';

// Client reviews, quoted with permission — populate from real Google reviews
// as they land (start with MHP and Life Balance). Renders nothing while the
// list is empty, so the section can ship wired-up ahead of the first review.
// No AggregateRating schema until there are real ratings to aggregate.
interface Testimonial {
  quote: string;
  name: string;
  business: string;
  town?: string;
}

const testimonials = testimonialsData as Testimonial[];

export const Testimonials: React.FC = () => {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-28 px-4 md:px-6 border-t border-brand-border/40">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-6">
          What clients say
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-brand-border border border-brand-border">
          {testimonials.map(t => (
            <figure key={t.name + t.business} className="bg-brand-base p-6 md:p-8">
              <Quote size={18} className="text-brand-accent" />
              <blockquote className="mt-4 text-brand-primary leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-4 text-sm text-brand-secondary font-mono">
                {t.name} — {t.business}{t.town ? `, ${t.town}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
