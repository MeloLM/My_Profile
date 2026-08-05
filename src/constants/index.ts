/**
 * 📦 Constants
 * Costanti globali dell'applicazione
 * Centralizza "magic numbers" e valori riutilizzabili
 * ✅ TypeScript con `as const` per type inference
 * 
 * @module constants
 */

// ============================================
// 🌐 SITE URL
// ============================================

/**
 * URL base del sito, senza slash finale.
 *
 * Alimenta `metadataBase`, canonical, OpenGraph, Twitter Card, JSON-LD,
 * sitemap.ts e robots.ts: è l'unico punto da cambiare per migrare dominio.
 *
 * ⚠️ Attualmente punta al dominio Vercel: il dominio custom
 * carmelolamantia.it non è ancora configurato a livello DNS
 * (`nslookup` → Non-existent domain). Appena i record saranno attivi
 * basta cambiare questa riga.
 */
export const SITE_URL = 'https://my-profile-ten-beta.vercel.app' as const;

// ============================================
// 🕐 TIMING CONSTANTS (in millisecondi)
// ============================================

/** Tempo di visualizzazione loading screen iniziale (ridotto per performance) */
export const LOADING_SCREEN_DURATION = 800 as const;

/** Threshold scroll per attivare navbar sticky */
export const SCROLL_THRESHOLD = 50 as const;

/** Threshold scroll per mostrare BackToTop button */
export const BACK_TO_TOP_THRESHOLD = 300 as const;

/** Durata default animazioni */
export const ANIMATION_DURATION = 500 as const;

/** Durata toast notifications */
export const TOAST_DURATION = 3000 as const;

/** Debounce delay per resize events */
export const RESIZE_DEBOUNCE_DELAY = 150 as const;

/** Delay tra parole nel typewriter effect */
export const TYPEWRITER_DELAY = 2000 as const;

// ============================================
// 🎨 ANIMATION SPEEDS
// ============================================

/** Velocità typing nel typewriter (ms per carattere) */
export const TYPEWRITER_SPEED = 100 as const;

/** Velocità cancellazione nel typewriter (ms per carattere) */
export const TYPEWRITER_DELETE_SPEED = 50 as const;

/** Velocità scroll parallax */
export const PARALLAX_SPEED = 0.5 as const;

// ============================================
// 📊 UI THRESHOLDS
// ============================================

/** Threshold IntersectionObserver per animazioni reveal */
export const INTERSECTION_THRESHOLD = 0.1 as const;

/** Threshold IntersectionObserver per skill bars */
export const SKILL_INTERSECTION_THRESHOLD = 0.3 as const;

/** Scroll amount per timeline navigation (px) */
export const TIMELINE_SCROLL_AMOUNT = 350 as const;

// ============================================
// 📱 BREAKPOINTS (coerenti con CSS)
// ============================================

export const BREAKPOINTS = {
  mobile: 576,
  tablet: 768,
  desktop: 992,
  largeDesktop: 1200,
} as const;

/** Type per le chiavi dei breakpoints */
export type BreakpointKey = keyof typeof BREAKPOINTS;

/** Type per i valori dei breakpoints */
export type BreakpointValue = typeof BREAKPOINTS[BreakpointKey];

// ============================================
// 📧 EMAILJS CONFIGURATION
// ============================================

export const EMAILJS_CONFIG = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE || 'service_gt2uoev',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE || 'template_y6xpk4a',
  publicKey: process.env.REACT_APP_EMAILJS_KEY || 'kforPiP9Kqq8o2cYk',
} as const;

/** Type per la configurazione EmailJS */
export type EmailJsConfig = typeof EMAILJS_CONFIG;

// ============================================
// 🔑 STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  theme: 'portfolio-theme',
  language: 'portfolio-lang',
} as const;

/** Type per le chiavi di storage */
export type StorageKey = keyof typeof STORAGE_KEYS;

// ============================================
// 🎨 THEME VALUES
// ============================================

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

/** Type per i temi */
export type Theme = typeof THEMES[keyof typeof THEMES];

// ============================================
// ✅ VALIDATION RULES
// ============================================

export const VALIDATION = {
  minNameLength: 2,
  minMessageLength: 5,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneRegex: /^(\+39)?[\s]?([0-9]{2,4}[\s]?[0-9]{6,7})$/,
} as const;

/** Type per le regole di validazione */
export type ValidationRules = typeof VALIDATION;

// ============================================
// 📦 GROUPED EXPORTS (for namespace imports)
// ============================================

/** Tutte le costanti di timing */
export const TIMING = {
  LOADING_SCREEN_DURATION,
  SCROLL_THRESHOLD,
  BACK_TO_TOP_THRESHOLD,
  ANIMATION_DURATION,
  TOAST_DURATION,
  RESIZE_DEBOUNCE_DELAY,
  TYPEWRITER_DELAY,
} as const;

/** Tutte le costanti di animazione */
export const ANIMATION = {
  TYPEWRITER_SPEED,
  TYPEWRITER_DELETE_SPEED,
  PARALLAX_SPEED,
} as const;

/** Tutte le costanti UI */
export const UI = {
  INTERSECTION_THRESHOLD,
  SKILL_INTERSECTION_THRESHOLD,
  TIMELINE_SCROLL_AMOUNT,
} as const;
