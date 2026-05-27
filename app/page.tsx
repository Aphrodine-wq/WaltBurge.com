import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: { absolute: 'Walt Burge | AI Engineer & Custom Software Developer | Oxford, MS' },
  description:
    'Based in Oxford, Mississippi — building custom AI models, full-stack applications, and construction technology for clients nationwide. Fine-tuned LLMs, contractor marketplaces, and production-grade software for businesses that need more than a template.',
  alternates: {
    canonical: 'https://waltburge.com',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
