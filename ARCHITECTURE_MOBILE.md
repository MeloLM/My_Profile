# 📱 ARCHITECTURE_MOBILE.md - Mobile Implementation Specification

> **DOCUMENTO TECNICO DEDICATO AL FRONTEND MOBILE**
> Questo file definisce vincoli, strategie e override specifici per l'esperienza mobile del Portfolio.
> 
> **Documento correlato:** [ARCHITECTURE.md](./ARCHITECTURE.md) per architettura core e desktop.
> 
> **Last Updated**: January 2026

---

## 📚 Table of Contents

1. [Mobile-First Constraints](#1--mobile-first-constraints)
2. [Touch Interaction Model](#2--touch-interaction-model)
3. [Responsive Strategy](#3--responsive-strategy)
4. [Image Optimization Strategy](#4--image-optimization-strategy)
5. [Component Overrides](#5--component-overrides)
6. [Performance Budget](#6--performance-budget)
7. [Testing Checklist](#7--testing-checklist)
8. [Implementation Guidelines](#8--implementation-guidelines)

---

## 1. 🎯 MOBILE-FIRST CONSTRAINTS

### Performance Budget (RIGIDO)

| Metric | Budget | Severity |
|--------|--------|----------|
| **Initial JS Bundle** | < 150KB (gzipped) | 🔴 Bloccante |
| **Total CSS** | < 50KB (gzipped) | 🔴 Bloccante |
| **LCP (Largest Contentful Paint)** | < 2.5s | 🔴 Bloccante |
| **FID (First Input Delay)** | < 100ms | 🟡 Importante |
| **CLS (Cumulative Layout Shift)** | 0 | 🔴 Bloccante |
| **TTI (Time to Interactive)** | < 3.8s | 🟡 Importante |

### CPU Budget

```javascript
// Regole per animazioni su mobile
const MOBILE_CPU_RULES = {
  // ❌ VIETATO su mobile
  parallaxEffects: false,
  complexShadows: false,
  cssFilters: false,          // blur, brightness, etc.
  multiLayerAnimations: false,
  
  // ✅ CONSENTITO
  simpleTransforms: true,     // translate, scale, rotate
  opacity: true,
  willChangeOptimized: true,  // solo su elementi animati
};
```

### Memory Constraints

| Constraint | Limit | Rationale |
|------------|-------|-----------|
| **DOM Nodes** | < 800 | Evita GC stalls |
| **Event Listeners** | < 50 | Riduce memory footprint |
| **Images in viewport** | < 3 | Lazy load tutto il resto |
| **Intersection Observers** | < 5 | Consolidare dove possibile |

---

## 2. 👆 TOUCH INTERACTION MODEL

### Touch Target Size (OBBLIGATORIO)

```css
/* Minimo 44x44px per tutti gli elementi interattivi */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}

/* Per icone più piccole, espandere l'area tappabile */
.icon-button {
  position: relative;
}
.icon-button::before {
  content: '';
  position: absolute;
  inset: -8px; /* Espande l'area di 8px in ogni direzione */
}
```

### Gesture Definitions

| Gesture | Action | Component | Implementation |
|---------|--------|-----------|----------------|
| **Tap** | Primary action | Buttons, Links, Cards | `onClick` |
| **Long Press** | Context menu | Project Cards | `onContextMenu` (300ms) |
| **Swipe Left/Right** | Navigate carousel | Skills, Projects | `react-multi-carousel` |
| **Swipe Up/Down** | Scroll | Global | Native scroll |
| **Pinch** | Zoom image | Lightbox (future) | `touch-action: pinch-zoom` |

### Gesture vs Tap Decision Matrix

```
┌─────────────────────────────────────────────────────────────┐
│                    GESTURE DECISION TREE                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  È un'azione primaria (click)?                              │
│  └── SÌ → Usa TAP                                           │
│  └── NO ↓                                                   │
│                                                              │
│  L'utente deve navigare tra elementi?                       │
│  └── SÌ → Usa SWIPE (Left/Right)                           │
│  └── NO ↓                                                   │
│                                                              │
│  È un'azione secondaria/contextuale?                        │
│  └── SÌ → Usa LONG PRESS (con haptic feedback)             │
│  └── NO → Usa TAP con modal/menu                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Visual & Haptic Feedback

```css
/* Active state feedback */
.interactive-element {
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
  -webkit-tap-highlight-color: transparent; /* Rimuove highlight blu default */
}

.interactive-element:active {
  transform: scale(0.97);
  opacity: 0.8;
}

/* Focus visible per accessibilità */
.interactive-element:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

```javascript
// Haptic feedback (dove supportato)
const triggerHaptic = (type = 'light') => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
      success: [10, 50, 10],
      error: [50, 30, 50],
    };
    navigator.vibrate(patterns[type]);
  }
};
```

---

## 3. 📐 RESPONSIVE STRATEGY

### Breakpoints Ufficiali

| Name | Min Width | Max Width | Target Devices |
|------|-----------|-----------|----------------|
| `xs` | 0px | 319px | Small phones (legacy) |
| `sm` | 320px | 479px | iPhone SE, small Android |
| `md` | 480px | 767px | Large phones, phablets |
| `lg` | 768px | 1023px | Tablets portrait |
| `xl` | 1024px | 1199px | Tablets landscape, small laptops |
| `xxl` | 1200px | ∞ | Desktops |

### CSS Custom Properties per Breakpoints

```css
:root {
  /* Breakpoint values (per JS access) */
  --bp-xs: 320px;
  --bp-sm: 480px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1200px;
}
```

### Media Query Pattern (Mobile-First)

```css
/* 
 * ORDINE CORRETTO: Mobile-First
 * Stile base = mobile, poi override verso desktop
 */

.component {
  /* 📱 Mobile (default) */
  padding: var(--space-sm);
  font-size: 1rem;
}

@media (min-width: 480px) {
  .component {
    /* 📱 Large phones */
    padding: var(--space-md);
  }
}

@media (min-width: 768px) {
  .component {
    /* 📱 Tablets */
    padding: var(--space-lg);
    font-size: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .component {
    /* 💻 Desktop */
    padding: var(--space-xl);
    font-size: 1.25rem;
  }
}
```

### Viewport Units: `dvh` vs `vh`

| Unit | Use Case | Browser Support |
|------|----------|-----------------|
| `100vh` | Fallback per browser legacy | 100% |
| `100dvh` | Altezza dinamica (esclude toolbar mobile) | 95%+ |
| `100svh` | Altezza più piccola possibile | 95%+ |
| `100lvh` | Altezza più grande possibile | 95%+ |

```css
/* Pattern safe per full-height sections */
.full-height {
  min-height: 100vh; /* Fallback */
  min-height: 100dvh; /* Dynamic viewport height */
}

/* Hero section con safe area per notch */
.hero {
  min-height: 100dvh;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Safe Area Insets (Notch Support)

```css
/* Supporto per iPhone notch e home indicator */
.navbar {
  padding-top: env(safe-area-inset-top, 0);
  padding-left: env(safe-area-inset-left, 0);
  padding-right: env(safe-area-inset-right, 0);
}

.footer {
  padding-bottom: env(safe-area-inset-bottom, 0);
}

/* CSS viewport-fit per abilitare safe-area-inset */
/* Aggiungere in <meta name="viewport">: viewport-fit=cover */
```

---

## 4. 🖼️ IMAGE OPTIMIZATION STRATEGY

### Art Direction vs Resolution Switching

| Strategy | When to Use | Implementation |
|----------|-------------|----------------|
| **Resolution Switching** | Stessa immagine, dimensioni diverse | `srcset` + `sizes` |
| **Art Direction** | Crop diverso mobile/desktop | `<picture>` + `<source>` |

### Resolution Switching (Default)

```tsx
// Usa ResponsiveImage component
import { ResponsiveImage, SIZE_PRESETS } from '@/components/common';

// Per project cards
<ResponsiveImage 
  src={projectImg}
  alt="Project preview"
  sizePreset="projectThumb"  // (max-width: 480px) 100vw, (max-width: 768px) 50vw, 400px
/>

// Per icone/avatar
<ResponsiveImage 
  src={icon}
  alt="Skill icon"
  sizePreset="icon"  // 80px
  width={80}
  height={80}
/>
```

### Art Direction (Crop Diverso)

```tsx
// Quando serve un crop diverso su mobile
<ResponsiveImage 
  src={desktopHero}        // Landscape 16:9
  mobileSrc={mobileHero}   // Portrait 9:16 o square
  alt="Hero banner"
  sizePreset="hero"
  mobileBreakpoint={768}
/>
```

### Image Format Priority

```
Ordine di preferenza (automatico via next/image):
1. AVIF (50% più piccolo di WebP, supporto 85%+)
2. WebP (30% più piccolo di JPEG, supporto 97%+)
3. JPEG/PNG (fallback)
```

### Lazy Loading Rules

| Position | Loading Strategy | Priority |
|----------|------------------|----------|
| Above the fold | `priority={true}` | Eager |
| Below the fold | Default (lazy) | Lazy |
| Carousel slides | Lazy + preload next | Lazy |
| Background images | CSS `background-image` | Defer |

---

## 5. 🔄 COMPONENT OVERRIDES

### Componenti con Comportamento Mobile Diverso

| Component | Desktop Behavior | Mobile Behavior | Override Method |
|-----------|------------------|-----------------|-----------------|
| **CursorTrail** | Custom SVG cursor follows mouse | **DISABILITATO** | CSS `@media (pointer: coarse)` |
| **Parallax** | Scroll-based movement | **DISABILITATO** | JS `matchMedia` check |
| **Navbar** | Horizontal menu | Hamburger + overlay | CSS + state |
| **Timeline** | Vertical with connectors | Simplified cards | CSS grid change |
| **Carousel** | 3-4 items visible | 1 item visible | `responsive` prop |
| **Hover Effects** | Scale + shadow | **Tap feedback only** | CSS `@media (hover: none)` |

### CursorTrail Override

```css
/* Disabilita custom cursor su touch devices */
@media (pointer: coarse) {
  .cursor-trail,
  .custom-cursor {
    display: none !important;
  }
  
  body {
    cursor: auto !important;
  }
}
```

```javascript
// Hook per rilevare touch device
export function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0
    );
  }, []);
  
  return isTouch;
}
```

### Parallax Override

```javascript
// Disabilita parallax su mobile per performance
const ParallaxSection = ({ children, enabled = true }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const shouldAnimate = enabled && !isMobile && !prefersReducedMotion;
  
  return (
    <section className={shouldAnimate ? 'parallax-enabled' : ''}>
      {children}
    </section>
  );
};
```

### Timeline Mobile Layout

```css
/* Desktop: Alternating left/right with connectors */
@media (min-width: 768px) {
  .timeline-item:nth-child(odd) { 
    flex-direction: row; 
  }
  .timeline-item:nth-child(even) { 
    flex-direction: row-reverse; 
  }
  .timeline-connector { 
    display: block; 
  }
}

/* Mobile: Simple stacked cards */
@media (max-width: 767px) {
  .timeline-item {
    flex-direction: column;
  }
  .timeline-connector {
    display: none; /* Rimuovi linea connettore */
  }
  .timeline-card {
    width: 100%;
    margin-left: 0;
  }
}
```

### Hover vs Tap States

```css
/* Desktop: hover effects */
@media (hover: hover) {
  .project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
}

/* Mobile: tap feedback only */
@media (hover: none) {
  .project-card:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
  
  /* Rimuovi hover-dependent overlays */
  .project-card .hover-overlay {
    opacity: 1; /* Sempre visibile */
  }
}
```

---

## 6. 📊 PERFORMANCE BUDGET

### Bundle Size Targets

```
┌─────────────────────────────────────────────────────────────┐
│                    BUNDLE ANALYSIS                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  JavaScript (gzipped):                                       │
│  ├── Framework (React + Next.js): ~45KB                     │
│  ├── UI Components: ~30KB                                   │
│  ├── Libraries (carousel, icons): ~40KB                     │
│  └── App Code: ~35KB                                        │
│  ────────────────────────────                                │
│  TOTAL: < 150KB ✅                                          │
│                                                              │
│  CSS (gzipped):                                              │
│  ├── Bootstrap (tree-shaken): ~15KB                         │
│  ├── Global styles: ~5KB                                    │
│  └── Component styles: ~10KB                                │
│  ────────────────────────────                                │
│  TOTAL: < 30KB ✅                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** | ≤ 2.5s | 2.5s - 4s | > 4s |
| **FID** | ≤ 100ms | 100ms - 300ms | > 300ms |
| **CLS** | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |
| **INP** | ≤ 200ms | 200ms - 500ms | > 500ms |

### Network Adaptive Loading

```javascript
// Riduce qualità su connessioni lente
const useNetworkQuality = () => {
  const [quality, setQuality] = useState('high');
  
  useEffect(() => {
    const connection = navigator.connection || 
                       navigator.mozConnection || 
                       navigator.webkitConnection;
    
    if (connection) {
      const updateQuality = () => {
        if (connection.saveData) {
          setQuality('low');
        } else if (connection.effectiveType === '2g') {
          setQuality('low');
        } else if (connection.effectiveType === '3g') {
          setQuality('medium');
        } else {
          setQuality('high');
        }
      };
      
      updateQuality();
      connection.addEventListener('change', updateQuality);
      return () => connection.removeEventListener('change', updateQuality);
    }
  }, []);
  
  return quality;
};

// Uso
const imageQuality = {
  high: 85,
  medium: 60,
  low: 40,
};
```

---

## 7. ✅ TESTING CHECKLIST

### Device Testing Matrix

| Device | Viewport | Priority | Status |
|--------|----------|----------|--------|
| iPhone SE | 375×667 | 🔴 High | ⬜ |
| iPhone 12/13/14 | 390×844 | 🔴 High | ⬜ |
| iPhone 14 Pro Max | 430×932 | 🟡 Medium | ⬜ |
| Samsung Galaxy S21 | 360×800 | 🔴 High | ⬜ |
| iPad | 768×1024 | 🟡 Medium | ⬜ |
| iPad Pro | 1024×1366 | 🟢 Low | ⬜ |

### Browser Testing

| Browser | Priority | Notes |
|---------|----------|-------|
| Safari iOS | 🔴 Critical | WebKit quirks, safe-area |
| Chrome Android | 🔴 Critical | Blink engine |
| Samsung Internet | 🟡 Medium | Based on Chromium |
| Firefox Mobile | 🟢 Low | Gecko engine |

### Functional Tests

- [ ] **Navigation**: Menu apre/chiude correttamente
- [ ] **Scroll**: Smooth scroll senza lag (60fps)
- [ ] **Touch targets**: Tutti ≥ 44×44px
- [ ] **Forms**: Input funzionano con tastiera touch
- [ ] **Carousel**: Swipe gesture funziona
- [ ] **Images**: Caricano lazy, no layout shift
- [ ] **Theme**: Toggle dark/light persiste
- [ ] **Orientation**: Layout adatta a landscape

### Performance Tests

- [ ] **Lighthouse Mobile**: Score > 90
- [ ] **First Paint**: < 1.5s su 3G
- [ ] **TTI**: < 4s su 3G
- [ ] **Bundle size**: JS < 150KB gzip

---

## 8. 📝 IMPLEMENTATION GUIDELINES

### Nuovo Componente Mobile-Aware

```typescript
/**
 * Template per componenti responsive
 */
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { BREAKPOINTS } from '@/components/common/ResponsiveImage';

interface MyComponentProps {
  // Props...
}

export function MyComponent(props: MyComponentProps) {
  // 1. Rileva viewport
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.md}px)`);
  const isTouch = useMediaQuery('(pointer: coarse)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  // 2. Adatta comportamento
  const enableAnimations = !isMobile && !prefersReducedMotion;
  const showHoverEffects = !isTouch;
  
  // 3. Render condizionale
  return (
    <div className={`my-component ${isMobile ? 'my-component--mobile' : ''}`}>
      {/* Mobile-only content */}
      {isMobile && <MobileSpecificUI />}
      
      {/* Desktop-only content */}
      {!isMobile && <DesktopSpecificUI />}
      
      {/* Shared content */}
      <SharedContent animate={enableAnimations} />
    </div>
  );
}
```

### CSS Mobile-First Template

```css
/**
 * Template CSS Mobile-First
 */

/* ========================================
   📱 BASE (Mobile)
   ======================================== */
.my-component {
  display: flex;
  flex-direction: column;
  padding: var(--space-sm);
  gap: var(--space-sm);
}

.my-component__title {
  font-size: clamp(1.25rem, 4vw, 2rem);
  line-height: 1.2;
}

.my-component__action {
  min-height: 44px; /* Touch target */
  min-width: 44px;
}

/* ========================================
   📱 TABLETS (768px+)
   ======================================== */
@media (min-width: 768px) {
  .my-component {
    flex-direction: row;
    padding: var(--space-md);
    gap: var(--space-md);
  }
}

/* ========================================
   💻 DESKTOP (1024px+)
   ======================================== */
@media (min-width: 1024px) {
  .my-component {
    padding: var(--space-lg);
    gap: var(--space-lg);
  }
}

/* ========================================
   🖱️ HOVER STATES (non-touch only)
   ======================================== */
@media (hover: hover) {
  .my-component:hover {
    transform: translateY(-2px);
  }
}

/* ========================================
   👆 TOUCH STATES (touch devices)
   ======================================== */
@media (hover: none) {
  .my-component:active {
    transform: scale(0.98);
  }
}
```

---

## 📎 Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                    MOBILE QUICK REFERENCE                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  BREAKPOINTS:                                                │
│  • xs: 320px  │  sm: 480px  │  md: 768px                    │
│  • lg: 1024px │  xl: 1200px                                 │
│                                                              │
│  TOUCH TARGETS: min 44×44px                                 │
│                                                              │
│  VIEWPORT: 100dvh (not 100vh)                               │
│                                                              │
│  IMAGES: <ResponsiveImage sizePreset="...">                 │
│                                                              │
│  ANIMATIONS: Disable on (prefers-reduced-motion: reduce)    │
│                                                              │
│  HOVER: Only on @media (hover: hover)                       │
│                                                              │
│  BUDGET: JS <150KB │ CSS <50KB │ LCP <2.5s │ CLS 0          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

> **Maintained by:** Carmelo La Mantia  
> **Last Review:** January 2026
