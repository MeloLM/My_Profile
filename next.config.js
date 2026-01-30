/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================
  // 🖼️ IMAGE OPTIMIZATION
  // ============================================
  images: {
    // Domini esterni consentiti
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
    // ⚡ Ottimizzazione Dev Mode: disabilita ottimizzazione in dev per velocità
    unoptimized: process.env.NODE_ENV === 'development',
    // Formati moderni (WebP prioritario, AVIF più lento da generare)
    formats: ['image/webp'],
    // Device sizes per responsive images
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ============================================
  // ⚡ PERFORMANCE OPTIMIZATIONS
  // ============================================
  
  // Abilita compilazione incrementale più veloce
  experimental: {
    // Ottimizza i package imports per bundle più piccoli
    optimizePackageImports: ['react-bootstrap', 'react-icons', 'react-bootstrap-icons'],
  },

  // Abilita SWC minifier (più veloce di Terser)
  swcMinify: true,

  // Riduci il logging in dev
  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  // ============================================
  // 🔄 REDIRECTS & HEADERS
  // ============================================
  
  // Redirect per compatibilità con vecchi URL se necessario
  async redirects() {
    return [];
  },
  
  // Headers per sicurezza e SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
