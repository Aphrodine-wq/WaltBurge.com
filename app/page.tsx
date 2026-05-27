import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Strata Software Group | Custom Software & AI Solutions | Oxford, MS',
  description:
    'Custom software development, AI solutions, and web design for businesses in Oxford, Mississippi. Construction technology, web apps, and AI automation by Strata Software Group.',
  alternates: {
    canonical: 'https://waltburge.com',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
