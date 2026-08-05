# 📋 TODO - Development Roadmap

> **Last Updated**: April 20, 2026 (Sprint 10 task)  
> **Status**: 🟢 Active Development | Next.js 14+ Portfolio Showcase  
> **Goal**: Impressionare recruiter e reviewer Senior attraverso code quality, testing e best practices moderne

---

## ✅ Sprint Completato - Alta Priorità

### ✅ Code Quality & Industry Standards
- [x] ✅ **TypeScript Migration - Hooks** - Convertiti tutti gli hooks in TypeScript
  - `useScroll.ts`, `useTypewriter.ts`, `useEmail.ts`, `useWindowSize.ts`
  - Export tipizzati con interfacce dedicate
- [x] ✅ **Unit Testing Setup** - Vitest + React Testing Library configurati
  - 30 test passing su 4 hook
  - Test per: `useScroll`, `useTypewriter`, `useWindowSize`
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
- [x] ✅ **Form Labels** - `<label htmlFor>` espliciti su tutti gli input Contact
  - Migrato in `Contact.tsx` con label `visually-hidden` su tutti gli input
- [x] ✅ **Keyboard Navigation** - Navigazione completa senza mouse
  - Focus trap nella navbar mobile (Tab cycle tra elementi)
  - Escape chiude il menu e restituisce focus al toggler
  - `ref={navRef}` per focus management

---

## 🎯 Prossimo Sprint - Completamento TypeScript

### ✅ TypeScript Migration - Componenti
- [x] ✅ **Components Core** - Convertiti componenti prioritari in `.tsx`
  - `Contact.tsx` - Form con validazione tipizzata + label accessibili
  - `ProjectCard.tsx` - Props tipizzate con `StaticImageData`
  - `SkillItem.tsx` - Props tipizzate con size types
- [x] ✅ **Constants TypeScript** - `constants/index.ts` con `as const` e type exports
- [x] ✅ **Data Layer TypeScript** - `profileData.ts` con interfacce dedicate
  - `PersonalInfo`, `Skill`, `Project`, `TimelineEvent`, `EducationEntry`, `WorkExperience`, `Language`

---

## 📈 Performance - Strategia Consolidata

### Core Web Vitals Optimization
- [x] ✅ **Font Stack Optimization** - `next/font/google` implementato
  - Inter + Poppins self-hosted (zero richieste esterne a runtime)
  - `display: swap` + subset `latin`
  - CSS variables `--font-inter` / `--font-poppins` in `layout.tsx`
- [x] ✅ **Bundle Analysis & Optimization** - `@next/bundle-analyzer` configurato
  - Script `npm run analyze` per analisi bundle
  - Wrapped `next.config.js` con `withBundleAnalyzer`
- [x] ✅ **Skeleton Loaders** - Placeholder integrati nel Suspense fallback
  - `SkeletonSection` per Skills e Projects (evita CLS)
  - Shimmer animation con prefers-reduced-motion
### ✅ UX Improvements
- [x] ✅ **Snellimento UI Sezioni** - Rimossi filtri e paginazione superflui
  - Projects: eliminata search bar + debounce, render diretto dell'intero array
  - Timeline: eliminati bottoni Avanti/Indietro e dot indicators, flusso continuo

---

## 🚀 Features Portfolio - Priorità Media

### 🟡 Showcase Enhancements
- [x] ✅ **Project Case Studies** - Route dinamiche `/projects/[slug]`
  - Metadata dinamica con `generateMetadata()`
  - Sezioni: Problema → Soluzione → Tech Stack → Risultati
  - `ProjectCaseStudy.tsx` + CSS dedicato
- [x] ✅ **Tech Blog / DevLog** - Sezione articoli in MDX
  - `/blog` con lista articoli, `/blog/[slug]` per singolo post
  - `next-mdx-remote/rsc` + `gray-matter` per parsing
  - Reading time calcolato automaticamente
- [x] ✅ **Loading/Error States** - `loading.tsx` e `error.tsx` nelle route
  - `loading.tsx` con bonfire animation (Dark Souls theme)
  - `error.tsx` con "YOU DIED" e bottone RESPAWN AT BONFIRE

### 🟢 Nice to Have
- [x] ✅ **Custom Cursor Context-Aware** - Cursor con label (APRI, CLICK, LEGGI) su hover
  - `CursorTrail.js` aggiornato con `getCursorContext()`
- [x] ✅ **Parallax 3D Avanzato** - Tilt effect sull'immagine hero Banner
  - `handleMouseMove` con `perspective()`, `rotateY()`, `rotateX()`
- [x] ✅ **Lottie Micro-animations** - `LottieEmpty.tsx` per stato "nessun risultato"
  - Animazione inline semplice, `lottie-react` installato
- [x] ✅ **Interactive Roadmap** - Timeline con ultimo item pulsante
  - `roadmapPulse` keyframes sull'ultimo `.timeline-card`
- [ ] 🟢 **Analytics Dashboard** - Statistiche visite private
- [ ] 🟢 **Guestbook** - Messaggi visitatori (richiede backend)

---

## 🔍 SEO & Discoverability

### ✅ Completati
- [x] ✅ **Metadata API Next.js** - OpenGraph, Twitter Cards, robots
- [x] ✅ **Structured Data JSON-LD** - Schema Person
- [x] ✅ **Sitemap dinamica** - `sitemap.ts`
- [x] ✅ **robots.ts** - Configurazione crawler

### ✅ Completati
- [x] ✅ **FAQ Schema** - Structured data JSON-LD per Skills/Projects/Contact
- [x] ✅ **Breadcrumbs Schema** - BreadcrumbList per Home > Skills > Projects > Contact

---

## 🧹 Code Quality & Manutenzione

### ✅ Completati
- [x] ✅ **Custom Hooks** - `useScroll`, `useTypewriter`, `useEmail`, `useWindowSize`
- [x] ✅ **Data-Driven UI** - Componenti leggono da `profileData.js`
- [x] ✅ **Ottimizzazione Immagini** - next/image su tutti i componenti

### 🟢 Backlog
- [ ] 🟢 **Component Storybook** - Documentazione UI isolata
- [ ] 🟢 **Reduced Motion** - Rispettare `prefers-reduced-motion`
- [x] ✅ **Fix Centratura Loading Screen** - Rimosso `margin-left: 500px`, ora usa `margin: auto`
- [x] ✅ **Carousel Touch Gestures** - `swipeable`, `draggable`, `minimumTouchDrag` + touch-action CSS

---

## ✅ Completati (Archive)

### Gennaio 30, 2026 - Pulizia & Performance
- [x] **Migrazione next/image completa** - 6 componenti migrati
- [x] **Migrazione next/link** - Navbar refactorizzato
- [x] **Rimozione legacy CRA** - App.js, index.js, index.html, build/ eliminati
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
- [x] **Easter Egg** - Bonfire cliccabile nella sezione Contact
- [x] **ScrollProgressBar** - Barra progresso scroll
- [x] **BackToTop** - Bottone ritorno in alto
- [x] **Reveal on Scroll** - Animazioni IntersectionObserver

### Core Features
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
