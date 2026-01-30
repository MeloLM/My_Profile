# 🏛️ Software Architecture & AI Guidelines - Carmelo La Mantia Portfolio

> **DOCUMENTO DI RIFERIMENTO TECNICO**
> Questo file definisce l'architettura software, i flussi di dati e le convenzioni di codice per il progetto Portfolio.
> **AI AGENTS:** Utilizzare questo contesto prima di generare codice.
> **Last Updated**: January 2026

---

## 1. 🏗 ARCHITECTURAL PATTERN

Il progetto utilizza **Next.js 14 App Router** con architettura ibrida:
- **Server Components** per layout e metadata (SEO-optimized)
- **Client Components** per interattività (hooks, state, animations)

### Principi Core
1.  **Data-Driven UI:** L'interfaccia deve essere popolata dinamicamente leggendo `src/data/profileData.js`. Evitare hardcoding di testi nei componenti.
2.  **Centralized Configuration:** Tutte le configurazioni (API Keys, URL) passano tramite variabili d'ambiente (.env).
3.  **Serviceless Backend:** Nessun backend custom. Si utilizzano servizi PaaS/SaaS (EmailJS, Mailchimp) invocati direttamente dal client.
4.  **TypeScript-First:** Tutti i nuovi file devono essere TypeScript (.ts/.tsx).
5.  **Error Boundaries:** Ogni sezione lazy-loaded è wrappata con ErrorBoundary.

---

## 2. 🗺 DIRECTORY STRUCTURE (Current Architecture)

Architettura Next.js 14 App Router con components modulari.

```text
src/
├── app/                    # 🚀 Next.js App Router
│   ├── layout.tsx          # Root layout (metadata, fonts, providers)
│   ├── page.tsx            # Homepage (renders HomePage component)
│   ├── robots.ts           # SEO robots configuration
│   └── sitemap.ts          # Dynamic sitemap generation
├── assets/                 # Risorse statiche (img, svg, icons)
├── components/             # Componenti UI
│   ├── common/             # Riutilizzabili (Loader, Button, ErrorBoundary, SkipToContent)
│   ├── layout/             # Strutturali (Navbar, Footer, Banner)
│   ├── sections/           # Sezioni pagina (Skills, Projects, Contact, Timeline)
│   └── cards/              # Sotto-componenti (ProjectCard, SkillItem, TimelineItem)
│   └── HomePage.tsx        # 🎮 Main client component (lazy loading, animations)
├── context/
│   └── ThemeContext.js     # Dark/Light theme provider (SSR-safe)
├── data/
│   └── profileData.js      # 🧠 SINGLE SOURCE OF TRUTH (Dati CV)
├── hooks/                  # 🎣 Custom Hooks (TypeScript)
│   ├── useScroll.ts        # Scroll state & direction tracking
│   ├── useTypewriter.ts    # Typewriter text animation
│   ├── useEmail.ts         # EmailJS form handling
│   ├── useKonamiCode.ts    # Easter egg detection
│   ├── useWindowSize.ts    # Responsive viewport tracking
│   └── index.ts            # Barrel exports with types
├── styles/
│   ├── variables.css       # CSS custom properties (colors, spacing)
│   ├── global.css          # Reset, typography, a11y (focus-visible)
│   └── components/         # Component-specific styles
├── utils/                  # Helper functions
│   ├── logger.js           # Console logging utilities
│   ├── validators.js       # Email/form validation
│   └── formatters.js       # Date/text formatters
├── constants/
│   └── index.js            # App-wide constants (durations, thresholds)
└── __tests__/              # 🧪 Unit Tests (Vitest)
    ├── setup.ts            # Test environment setup
    └── hooks/              # Hook tests