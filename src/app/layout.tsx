/**
 * 🎨 Root Layout - Next.js 14+
 * Sostituisce public/index.html per la SEO server-side
 */

import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-multi-carousel/lib/styles.css';
import '../App.css';
import '../styles/global.css';
import '../styles/components/index.css';

// ============================================
// 🔤 FONT OPTIMIZATION (self-hosted via next/font)
// ============================================
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

// 🔥 Metadata API - Questo viene renderizzato SERVER-SIDE (SEO perfetto!)
export const metadata: Metadata = {
  metadataBase: new URL('https://carmelolamantia.it'),
  
  title: {
    default: 'Carmelo La Mantia | Full Stack Developer Portfolio',
    template: '%s | Carmelo La Mantia',
  },
  
  description: 'Carmelo La Mantia - Full Stack Developer Portfolio. Specializzato in React, JavaScript, PHP, Laravel. Scopri i miei progetti e contattami per collaborazioni.',
  
  keywords: [
    'Carmelo La Mantia',
    'Full Stack Developer',
    'Web Developer',
    'React',
    'JavaScript',
    'Laravel',
    'PHP',
    'Portfolio',
    'Agrigento',
    'Sicilia',
  ],
  
  authors: [{ name: 'Carmelo La Mantia', url: 'https://carmelolamantia.it' }],
  creator: 'Carmelo La Mantia',
  publisher: 'Carmelo La Mantia',
  
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://carmelolamantia.it/',
    siteName: 'Carmelo La Mantia Portfolio',
    title: 'Carmelo La Mantia | Full Stack Developer Portfolio',
    description: 'Full Stack Developer specializzato in React, JavaScript, PHP e Laravel. Scopri i miei progetti!',
    images: [
      {
        url: '/Melo_icon.png',
        width: 512,
        height: 512,
        alt: 'Carmelo La Mantia - Full Stack Developer',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Carmelo La Mantia | Full Stack Developer Portfolio',
    description: 'Full Stack Developer specializzato in React, JavaScript, PHP e Laravel.',
    images: ['/Melo_icon.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: '/Melo_icon.ico',
    apple: '/Melo_icon.png',
  },
  
  manifest: '/manifest.json',
  
  alternates: {
    canonical: 'https://carmelolamantia.it',
  },
};

export const viewport: Viewport = {
  themeColor: '#121212',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Structured Data per Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Carmelo La Mantia',
              url: 'https://carmelolamantia.it',
              image: 'https://carmelolamantia.it/Melo_icon.png',
              jobTitle: 'Full Stack Developer',
              sameAs: [
                'https://github.com/MeloLM',
                'https://www.linkedin.com/in/carmelo-la-mantia/',
              ],
              knowsAbout: ['React.js', 'JavaScript', 'PHP', 'Laravel', 'Web Development'],
            }),
          }}
        />
        {/* FAQ Schema - Skills & Projects */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Quali sono le competenze principali di Carmelo La Mantia?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Carmelo è specializzato in React.js, JavaScript, PHP, Laravel, MySQL, Bootstrap e strumenti come Git/GitHub. Ha competenze sia frontend che backend.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Quali progetti ha realizzato Carmelo La Mantia?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Tra i progetti: Knight Shooter (game con Phaser 3), Portfolio SoulsLike (React.js), Souls Space Platform (Laravel), e applicazioni web responsive.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Come contattare Carmelo La Mantia?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Puoi contattare Carmelo tramite il form sul sito, via email a carmelo.la.mantia00@gmail.com o tramite LinkedIn.',
                  },
                },
              ],
            }),
          }}
        />
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://carmelolamantia.it',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Skills',
                  item: 'https://carmelolamantia.it/#skills',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Projects',
                  item: 'https://carmelolamantia.it/#projects',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Contact',
                  item: 'https://carmelolamantia.it/#connect',
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
