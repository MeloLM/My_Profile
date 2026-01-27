/**
 * 🎨 Root Layout - Next.js 14+
 * Sostituisce public/index.html per la SEO server-side
 */

import type { Metadata, Viewport } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-multi-carousel/lib/styles.css';
import '../App.css';
import '../styles/global.css';
import '../styles/components/index.css';

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
    <html lang="it">
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
