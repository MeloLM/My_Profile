# 🏛️ Software Architecture & AI Guidelines - Carmelo La Mantia Portfolio

> **DOCUMENTO DI RIFERIMENTO TECNICO - CORE & DESKTOP**
> Questo file definisce l'architettura software, i flussi di dati, il routing e le convenzioni di codice per il progetto Portfolio.
> 
> **⚠️ Per le specifiche di implementazione mobile, vedere [ARCHITECTURE_MOBILE.md](./ARCHITECTURE_MOBILE.md)**
> 
> **AI AGENTS:** Utilizzare questo contesto prima di generare codice.
> **Last Updated**: August 2026

---

## 📚 Table of Contents

1. [Architectural Pattern](#1--architectural-pattern)
2. [Directory Structure](#2--directory-structure)
3. [Data Flow & State Management](#3--data-flow--state-management)
4. [Routing Architecture](#4--routing-architecture)
5. [Server-Side Logic](#5--server-side-logic)
6. [Component Hierarchy](#6--component-hierarchy)
7. [Styling Strategy](#7--styling-strategy)
8. [Performance Optimizations](#8--performance-optimizations)
9. [Testing Architecture](#9--testing-architecture)
10. [AI Agent Guidelines](#10--ai-agent-guidelines)

---

## 1. 🏗 ARCHITECTURAL PATTERN

Il progetto utilizza **Next.js 14 App Router** con architettura ibrida:
- **Server Components** per layout e metadata (SEO-optimized)
- **Client Components** per interattività (hooks, state, animations)

### Principi Core

| # | Principio | Descrizione |
|---|-----------|-------------|
| 1 | **Data-Driven UI** | L'interfaccia è popolata dinamicamente da `src/data/profileData.ts`. Evitare hardcoding. |
| 2 | **Centralized Configuration** | Tutte le configurazioni passano tramite variabili d'ambiente (`.env`). |
| 3 | **Serviceless Backend** | Nessun backend custom. Servizi PaaS/SaaS (EmailJS, Mailchimp) invocati dal client. |
| 4 | **TypeScript-First** | Tutti i nuovi file devono essere TypeScript (`.ts`/`.tsx`). |
| 5 | **Error Boundaries** | Ogni sezione lazy-loaded è wrappata con `ErrorBoundary`. |

---

## 2. 🗺 DIRECTORY STRUCTURE

Architettura Next.js 14 App Router con components modulari.

```text
src/
├── app/                    # 🚀 Next.js App Router
│   ├── layout.tsx          # Root layout (metadata, fonts, JSON-LD)
│   ├── page.tsx            # Homepage (renders HomePage component)
│   ├── robots.ts           # SEO robots configuration
│   └── sitemap.ts          # Dynamic sitemap generation
│
├── assets/                 # 📁 Risorse statiche
│   ├── img/                # Immagini (preferire WebP/AVIF)
│   └── fonts/              # Font locali
│
├── components/             # 🧩 Componenti UI
│   ├── common/             # Riutilizzabili (Loader, Button, ErrorBoundary)
│   ├── layout/             # Strutturali (Navbar, Footer, Banner)
│   ├── sections/           # Sezioni pagina (Skills, Projects, Contact)
│   ├── cards/              # Sotto-componenti (ProjectCard, SkillItem)
│   └── HomePage.tsx        # 🎮 Main client component
│
├── data/                   # 📊 Data Layer
│   └── profileData.ts      # 🧠 SINGLE SOURCE OF TRUTH (tipizzato)
│
├── hooks/                  # 🎣 Custom Hooks (TypeScript)
│   ├── useScroll.ts        # Scroll state & direction
│   ├── useTypewriter.ts    # Text animation
│   ├── useEmail.ts         # EmailJS form handling
│   ├── useWindowSize.ts    # Viewport tracking
│   └── index.ts            # Barrel exports
│
├── styles/                 # 🎨 Styling
│   ├── variables.css       # CSS custom properties
│   ├── global.css          # Reset, typography, a11y
│   ├── bootstrap-custom.scss # Tree-shaken Bootstrap
│   └── components/         # Component-specific styles
│
├── utils/                  # 🔧 Helper functions
│   ├── logger.js           # Console utilities
│   ├── validators.js       # Form validation
│   └── formatters.js       # Date/text formatters
│
├── constants/              # 📌 App-wide constants
│   └── index.js            # Durations, thresholds
│
└── __tests__/              # 🧪 Unit Tests (Vitest)
    ├── setup.ts            # Test environment
    └── hooks/              # Hook tests
```

---

## 3. 🔄 DATA FLOW & STATE MANAGEMENT

### Single Source of Truth

```
┌─────────────────────────────────────────────────────────────┐
│                   profileData.ts                             │
│  (Skills, Projects, Timeline, Contact Info, Social Links)   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    HomePage.tsx                              │
│              (Client Component - Orchestrator)               │
└─────────────────────────────────────────────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           ▼                  ▼                  ▼
     ┌─────────┐        ┌─────────┐        ┌─────────┐
     │ Banner  │        │ Skills  │        │Projects │
     └─────────┘        └─────────┘        └─────────┘
```

### State Management Pattern

| Tipo di State | Soluzione | Esempio |
|---------------|-----------|---------|
| **UI Local** | `useState` | Menu open/close, form inputs |
| **Scroll** | `useScroll` hook | Navbar hide/show |
| **Form** | `useEmail` hook | Contact form state |
| **Animation** | CSS Variables | Transitions, keyframes |

### Data Immutability Rules

```javascript
// ✅ CORRETTO: Spread operator per immutabilità
const updatedSkills = [...skills, newSkill];

// ❌ ERRATO: Mutazione diretta
skills.push(newSkill);
```

---

## 4. 🛣 ROUTING ARCHITECTURE

### App Router Structure

| Route | File | Rendering | Purpose |
|-------|------|-----------|---------|
| `/` | `app/page.tsx` | Hybrid | Homepage (SSR meta + CSR content) |
| `/robots.txt` | `app/robots.ts` | Static | SEO robots file |
| `/sitemap.xml` | `app/sitemap.ts` | Dynamic | SEO sitemap |

### Navigation Pattern

Il sito è una **Single Page Application (SPA)** con smooth scroll tra sezioni:

```javascript
// Scroll-to-section navigation
const sections = ['#home', '#skills', '#projects', '#timeline', '#contact'];
```

### URL Fragments

| Fragment | Target Section |
|----------|----------------|
| `#home` | Banner/Hero |
| `#skills` | Skills carousel |
| `#projects` | Portfolio gallery |
| `#timeline` | Experience timeline |
| `#contact` | Contact form |

---

## 5. 🖥 SERVER-SIDE LOGIC

### Metadata Generation (SEO)

```typescript
// app/layout.tsx - Server Component
export const metadata: Metadata = {
  title: 'Carmelo La Mantia | Full Stack Developer',
  description: '...',
  openGraph: { ... },
  twitter: { ... },
};
```

### Static Generation

| File | Strategy | Revalidation |
|------|----------|--------------|
| `layout.tsx` | Static | Build-time |
| `page.tsx` | Hybrid | On-demand |
| `robots.ts` | Static | Build-time |
| `sitemap.ts` | ISR | 24 hours |

### External Services Integration

```
┌─────────────┐      HTTPS      ┌─────────────┐
│   Client    │ ──────────────► │   EmailJS   │
│  (Browser)  │                 │   (Email)   │
└─────────────┘                 └─────────────┘
       │
       │           HTTPS      ┌─────────────┐
       └──────────────────────►│  Mailchimp  │
                              │ (Newsletter)│
                              └─────────────┘
```

---

## 6. 🏗 COMPONENT HIERARCHY

### Component Types

| Type | Location | Rendering | Use Case |
|------|----------|-----------|----------|
| **Server** | `app/` | Server | Layout, Metadata |
| **Client** | `components/` | Client | Interactivity |
| **Shared** | `components/common/` | Either | Reusable UI |

### Component Composition

```
layout.tsx (Server)
└── page.tsx (Server)
    └── HomePage.tsx (Client)
        ├── Navbar (Client)
        ├── Banner (Client)
        ├── Skills (Client)
        │   └── SkillItem (Client)
        ├── Projects (Client)
        │   └── ProjectCard (Client)
        ├── Timeline (Client)
        │   └── TimelineItem (Client)
        ├── Contact (Client)
        └── Footer (Client)
```

### Props Flow

```typescript
// Pattern: Data down, Events up
<ProjectCard 
  title={project.title}           // Data ↓
  onSelect={(id) => setActive(id)} // Event ↑
/>
```

---

## 7. 🎨 STYLING STRATEGY

### CSS Architecture

| Layer | File | Purpose |
|-------|------|---------|
| **Variables** | `variables.css` | Design tokens |
| **Reset** | `global.css` | Normalize, base styles |
| **Framework** | `bootstrap-custom.scss` | Grid, utilities (tree-shaken) |
| **Components** | `ComponentName.css` | Scoped styles |

### Design Tokens

```css
/* variables.css */
:root {
  /* Colors */
  --color-primary: #7c3aed;
  --color-background: #0a0a0a;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  
  /* Typography */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

### Naming Convention

```css
/* BEM-like naming */
.component { }
.component-element { }
.component--modifier { }
```

---

## 8. ⚡ PERFORMANCE OPTIMIZATIONS

### Image Strategy

```javascript
// next.config.js
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [320, 480, 640, 768, 1024, 1200, 1920],
}
```

**Utilizzo:** Usare `<ResponsiveImage>` da `components/common/` per srcset automatici.

### Bundle Optimization

| Strategy | Implementation |
|----------|----------------|
| **Tree Shaking** | `optimizePackageImports` in `next.config.js` |
| **Code Splitting** | Dynamic imports con `React.lazy()` |
| **CSS Splitting** | Bootstrap modulare (`bootstrap-custom.scss`) |

### Loading Strategy

```typescript
// Lazy loading sections
const Projects = lazy(() => import('./sections/Projects'));
const Timeline = lazy(() => import('./sections/Timeline'));
```

---

## 9. 🧪 TESTING ARCHITECTURE

### Test Stack

| Tool | Purpose |
|------|---------|
| **Vitest** | Unit tests, fast execution |
| **Testing Library** | Component testing |
| **jsdom** | DOM simulation |

### Test Location

```
src/__tests__/
├── setup.ts           # Global setup, mocks
└── hooks/
    ├── useScroll.test.ts
    ├── useTypewriter.test.ts
    └── useWindowSize.test.ts
```

### Test Commands

```bash
npm test           # Watch mode
npm run test:run   # Single run
npm run test:coverage  # Coverage report
```

---

## 10. 🤖 AI AGENT GUIDELINES

### 10.3 AUTO-LOGGING OBBLIGATORIO

**Regola Tassativa per l'Execution Agent:**
Al termine di OGNI esecuzione o pacchetto di modifiche, l'agente DEVE in autonomia generare un file di log sequenziale all'interno della cartella `archivio log/` (es. `LOG_002.md`, `LOG_003.md`). 

Non attendere che l'utente te lo chieda esplicitamente. Se la cartella non esiste, creala. 

**Formato Semplificato Richiesto (Usa esattamente questo template):**

```md
# Log [Numero] - [Titolo Breve dell'Intervento]
**Data:** [GG/MM/AAAA]

## 🎯 Obiettivo
[1-2 righe che riassumono il task principale richiesto dall'utente]

## 📁 File Coinvolti
* **Creati:** `file1.ts`, `file2.ts` (o "Nessuno")
* **Modificati:** `file3.tsx`, `file4.css`
* **Eliminati:** `file5.js` (o "Nessuno")

## 🤖 Note per l'IA (Contesto Futuro)
[Aggiungi note SOLO se ci sono conseguenze per le modifiche future. Es: "La ricerca è stata rimossa, non usare più gli stati di filtro in Projects.tsx", oppure "Il file profileData è ora in TypeScript". Se non c'è nulla di critico, scrivi "Nessuna variazione architetturale di rilievo."]

### Before Generating Code

1. **Read** `profileData.ts` per capire la struttura dati e le interfacce esportate
2. **Check** componenti esistenti in `components/common/`
3. **Follow** TypeScript conventions per nuovi file
4. **Use** CSS variables da `variables.css`

### Code Generation Rules

```typescript
// ✅ CORRETTO: TypeScript con tipi espliciti
interface ProjectProps {
  title: string;
  description: string;
}

// ❌ ERRATO: JavaScript senza tipi
function Project(props) { ... }
```

### Import Patterns

```typescript
// ✅ Barrel imports
import { Button, Loader, ResponsiveImage } from '@/components/common';

// ❌ Deep imports
import Button from '@/components/common/Button';
```

### Error Handling

```typescript
// Wrap lazy components with ErrorBoundary
<ErrorBoundary fallback={<ErrorMessage />}>
  <Suspense fallback={<Loader />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

---

## 📎 Related Documents

| Document | Description |
|----------|-------------|
| [ARCHITECTURE_MOBILE.md](./ARCHITECTURE_MOBILE.md) | 📱 **Specifiche implementazione mobile** |
| [TODO.md](./TODO.md) | Task list generale |
| [TODO_MOBILE.md](./TODO_MOBILE.md) | Task list mobile-specific |
| [CONCEPTMAP.md](./CONCEPTMAP.md) | Mappa concettuale del progetto |
| [PSEUDOCODE.md](./PSEUDOCODE.md) | Pseudocodice componenti |

---

> **Maintained by:** Carmelo La Mantia  
> **Last Review:** August 2026
