import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://waltburge.com'),
  title: {
    template: '%s | Walt Burge',
    default: 'Walt Burge | Custom Software & AI Solutions | Oxford, MS',
  },
  description:
    'Custom software development, AI solutions, and web design for businesses in Oxford, Mississippi. Construction technology, web apps, and AI automation by Walt Burge.',
  keywords: [
    'Walt Burge',
    'custom software development',
    'AI solutions',
    'web design',
    'Oxford Mississippi',
    'construction technology',
    'web apps',
    'AI automation',
    'James Walton',
    'Walt Burge',
    'software developer Oxford MS',
  ],
  openGraph: {
    type: 'website',
    url: 'https://waltburge.com',
    title: 'Walt Burge | Custom Software & AI Solutions | Oxford, MS',
    description:
      'Custom software development, AI solutions, and web design for businesses in Oxford, Mississippi. Construction technology, web apps, and AI automation by Walt Burge.',
    siteName: 'Walt Burge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Walt Burge',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Walt Burge | Custom Software & AI Solutions | Oxford, MS',
    description:
      'Custom software development, AI solutions, and web design for businesses in Oxford, Mississippi.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Walt Burge',
  url: 'https://waltburge.com',
  email: 'jamesburge.mcm@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Oxford',
    addressRegion: 'MS',
    postalCode: '38655',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 34.3665,
    longitude: -89.5193,
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Oxford',
      containedInPlace: { '@type': 'State', name: 'Mississippi' },
    },
    { '@type': 'State', name: 'Mississippi' },
  ],
  sameAs: [
    'https://github.com/Aphrodine-wq',
    'https://www.facebook.com/walt.burge.1/',
    'https://www.instagram.com/walt.burge',
  ],
  knowsAbout: [
    'Custom Software Development',
    'AI Solutions',
    'Construction Technology',
    'Web Design',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent transition-colors duration-300 font-sans">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
