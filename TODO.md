# 📋 TODO - Development Roadmap

> **Last Updated**: January 30, 2026  
> **Status**: 🟢 Active Development | Next.js 14+ Portfolio Showcase  
> **Goal**: Impressionare recruiter e reviewer Senior attraverso code quality, testing e best practices moderne

---

## ✅ Sprint Completato - Alta Priorità

### ✅ Code Quality & Industry Standards
- [x] ✅ **TypeScript Migration - Hooks** - Convertiti tutti gli hooks in TypeScript
  - `useScroll.ts`, `useTypewriter.ts`, `useKonamiCode.ts`, `useEmail.ts`, `useWindowSize.ts`
  - Export tipizzati con interfacce dedicate
- [x] ✅ **Unit Testing Setup** - Vitest + React Testing Library configurati
  - 30 test passing su 4 hook
  - Test per: `useScroll`, `useTypewriter`, `useKonamiCode`, `useWindowSize`
  - Scripts: `npm run test`, `npm run test:run`, `npm run test:coverage`
- [x] ✅ **Error Boundaries** - Implementato error handling granulare
  - `ErrorBoundary.tsx` con fallback UI elegante
  - HOC `withErrorBoundary()` per wrapping programmatico
  - Ogni sezione lazy-loaded wrappata con Error Boundary dedicato
- [x] ✅ **CI/CD Pipeline** - GitHub Actions `.github/workflows/ci.yml`
  - Quality job: Lint + Type Check
  - Test job: Vitest run
  - Build job: Next.js production build
  - Deploy jobs: Vercel preview/production (richiede secrets)

### ✅ Accessibilità (A11y) - WCAG 2.1 AA
- [x] ✅ **Skip to Content Link** - `SkipToContent.tsx` per screen readers
- [x] ✅ **Focus Management** - `:focus-visible` styling globale in `global.css`
- [x] ✅ **Reduced Motion** - `prefers-reduced-motion` rispettato
- [ ] 🔴 **Form Labels** - `<label htmlFor>` espliciti su tutti gli input Contact
- [ ] 🔴 **Keyboard Navigation** - Navigazione completa senza mouse

---

## 🎯 Prossimo Sprint - Completamento TypeScript

### 🔴 TypeScript Migration - Componenti
- [ ] 🔴 **Components Core** - Convertire componenti prioritari in `.tsx`
  - `Contact.tsx` - Form con validazione tipizzata
  - `ProjectCard.tsx` - Props tipizzate per dati progetto
  - `SkillItem.tsx` - Props tipizzate
- [ ] 🔴 **Context TypeScript** - `ThemeContext.tsx` con tipi
- [ ] 🔴 **Constants TypeScript** - `constants/index.ts` con `as const`

---

## 📈 Performance - Strategia Consolidata

### Core Web Vitals Optimization
- [ ] 🟡 **Font Stack Optimization** - Usare `next/font` per:
  - Self-hosting fonts (elimina richieste a Google Fonts)
  - `display: swap` per FOUT prevention
  - Subset solo caratteri necessari (latin)
- [ ] 🟡 **Bundle Analysis & Optimization**
  - Installare `@next/bundle-analyzer`
  - Identificare e lazy-load dependencies pesanti (`react-multi-carousel`)
  - Target: First Load JS < 100KB
- [ ] 🟡 **Skeleton Loaders** - Placeholder con dimensioni fisse per:
  - Skills carousel (evita CLS)
  - Projects grid (evita layout jump)
- [ ] 🟡 **Debounce Search** - Ottimizzare filtro progetti con 300ms debounce

---

## 🚀 Features Portfolio - Priorità Media

### 🟡 Showcase Enhancements
- [ ] 🟡 **Project Case Studies** - Route dinamiche `/projects/[slug]`
  - Metadata dinamica con `generateMetadata()`
  - Sezioni: Problema → Soluzione → Tech Stack → Risultati
- [ ] 🟡 **Tech Blog / DevLog** - Sezione articoli in MDX
  - Dimostra capacità di comunicazione tecnica
  - next-mdx-remote per rendering
- [ ] 🟡 **Loading/Error States** - `loading.tsx` e `error.tsx` nelle route

### 🟢 Nice to Have
- [ ] 🟢 **Custom Cursor Context-Aware** - Cursor che cambia su hover elementi
- [ ] 🟢 **Parallax 3D Avanzato** - Effetto profondità al movimento mouse
- [ ] 🟢 **Internationalization (i18n)** - IT/EN con next-intl
- [ ] 🟢 **Lottie Micro-animations** - Per stati vuoti e loading
- [ ] 🟢 **Interactive Roadmap** - Timeline percorso professionale
- [ ] 🟢 **Analytics Dashboard** - Statistiche visite private
- [ ] 🟢 **Guestbook** - Messaggi visitatori (richiede backend)

---

## 🔍 SEO & Discoverability

### ✅ Completati
- [x] ✅ **Metadata API Next.js** - OpenGraph, Twitter Cards, robots
- [x] ✅ **Structured Data JSON-LD** - Schema Person
- [x] ✅ **Sitemap dinamica** - `sitemap.ts`
- [x] ✅ **robots.ts** - Configurazione crawler

### 🟡 Da implementare
- [ ] 🟡 **FAQ Schema** - Structured data per Skills/Projects
- [ ] 🟡 **Breadcrumbs Schema** - Per pagine interne future

---

## 🧹 Code Quality & Manutenzione

### ✅ Completati
- [x] ✅ **Custom Hooks** - `useScroll`, `useTypewriter`, `useEmail`, `useKonamiCode`
- [x] ✅ **Data-Driven UI** - Componenti leggono da `profileData.js`
- [x] ✅ **Ottimizzazione Immagini** - next/image su tutti i componenti

### 🟢 Backlog
- [ ] 🟢 **Component Storybook** - Documentazione UI isolata
- [ ] 🟢 **Reduced Motion** - Rispettare `prefers-reduced-motion`
- [ ] 🟢 **Fix Centratura Loading Screen** - Alignment ultrawide/mobile
- [ ] 🟢 **Carousel Touch Gestures** - Migliorare swipe mobile

---

## ✅ Completati (Archive)

### Gennaio 30, 2026 - Pulizia & Performance
- [x] **Migrazione next/image completa** - 6 componenti migrati
- [x] **Migrazione next/link** - Navbar refactorizzato
- [x] **Rimozione legacy CRA** - App.js, index.js, index.html, build/ eliminati
- [x] **Fix SSR ThemeContext** - Hydration-safe con isHydrated pattern
- [x] **next.config.js ottimizzato** - unoptimized dev, WebP only, optimizePackageImports
- [x] **Loading screen ridotto** - 1500ms → 800ms
- [x] **README.md aggiornato** - Next.js 14, TypeScript, nuova struttura

### Gennaio 2026 - Next.js Migration
- [x] **Next.js 14+ App Router** - Migrazione da CRA completata
- [x] **Layout.tsx con Metadata API** - SEO server-side
- [x] **robots.ts & sitemap.ts** - Generazione dinamica
- [x] **Structured Data JSON-LD** - Schema Person
- [x] **Sharp installato** - Ottimizzazione immagini

### Gennaio 2026 - UI/UX
- [x] **Light Theme "Warm Amber"** - Tema chiaro riprogettato
- [x] **Easter Egg** - Konami Code implementato
- [x] **ScrollProgressBar** - Barra progresso scroll
- [x] **BackToTop** - Bottone ritorno in alto
- [x] **Reveal on Scroll** - Animazioni IntersectionObserver

### Core Features
- [x] Dark/Light Mode con ThemeContext
- [x] Responsive Navigation con overlay mobile
- [x] EmailJS Contact Form con validazione
- [x] Lazy Loading con React.lazy + Suspense
- [x] Parallax scroll effect

---

## 📊 Legenda
- 🔴 **Alta Priorità**: Career-boosting, industry standard
- 🟡 **Media Priorità**: Migliora qualità percepita
- 🟢 **Bassa Priorità**: Nice to have
- ✅ **Completato**: Implementato e funzionante

---

## 📝 Note sulla Revisione

### ❌ Task Rimossi (e perché)

| Task | Motivo Rimozione |
|------|------------------|
| **Soundscape Experience** | Anti-pattern UX. Suoni auto-play sono fastidiosi e problematici per accessibilità (WCAG). Nessun recruiter vuole sentire suoni aprendo un portfolio. |
| **PWA con Service Worker** | Over-engineering per un portfolio. Nessuno "installa" un CV. Meglio investire tempo in testing e TypeScript che dimostrano competenze reali. |
| **Critical CSS Inlining** | Next.js App Router lo gestisce nativamente con il suo sistema di CSS optimization. Task ridondante. |
| **View Transitions API** | Sperimentale e non supportato cross-browser. Rischio di breaking su Safari. Framer Motion è più stabile. |
| **Framer Motion (alta priorità)** | Declassato a opzionale. Le animazioni CSS attuali funzionano. Unit testing > animazioni fancy per impressionare recruiter tecnici. |

### ✅ Task Elevati (e perché)

| Task | Nuova Priorità | Motivo |
|------|----------------|--------|
| **TypeScript Migration** | 🔴 Alta | Standard industriale 2026. Codebase JS pura è red flag per Senior roles. |
| **Unit Testing** | 🔴 Alta | Dimostra mentalità engineering. Un test vale più di 10 animazioni. |
| **Error Boundaries** | 🔴 Alta (nuovo) | Best practice React. Dimostra gestione errori professionale. |
| **CI/CD Pipeline** | 🔴 Alta (nuovo) | DevOps awareness è expected per Full Stack. GitHub Actions è gratis. |
| **A11y Critici** | 🔴 Alta | Accessibilità non è opzionale. Focus management è base per qualsiasi dev serio. |
