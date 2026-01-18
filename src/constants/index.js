/**
 * 📦 Constants
 * Costanti globali dell'applicazione
 * Centralizza "magic numbers" e valori riutilizzabili
 * 
 * @module constants
 */

// ============================================
// 🕐 TIMING CONSTANTS (in millisecondi)
// ============================================

/** Tempo di visualizzazione loading screen iniziale */
export const LOADING_SCREEN_DURATION = 1500;

/** Threshold scroll per attivare navbar sticky */
export const SCROLL_THRESHOLD = 50;

/** Threshold scroll per mostrare BackToTop button */
export const BACK_TO_TOP_THRESHOLD = 300;

/** Durata default animazioni */
export const ANIMATION_DURATION = 500;

/** Durata toast notifications */
export const TOAST_DURATION = 3000;

/** Debounce delay per resize events */
export const RESIZE_DEBOUNCE_DELAY = 150;

/** Delay tra parole nel typewriter effect */
export const TYPEWRITER_DELAY = 2000;

// ============================================
// 🎨 ANIMATION SPEEDS
// ============================================

/** Velocità typing nel typewriter (ms per carattere) */
export const TYPEWRITER_SPEED = 100;

/** Velocità cancellazione nel typewriter (ms per carattere) */
export const TYPEWRITER_DELETE_SPEED = 50;

/** Velocità scroll parallax */
export const PARALLAX_SPEED = 0.5;

// ============================================
// 📊 UI THRESHOLDS
// ============================================

/** Threshold IntersectionObserver per animazioni reveal */
export const INTERSECTION_THRESHOLD = 0.1;

/** Threshold IntersectionObserver per skill bars */
export const SKILL_INTERSECTION_THRESHOLD = 0.3;

/** Scroll amount per timeline navigation (px) */
export const TIMELINE_SCROLL_AMOUNT = 350;

// ============================================
// 📱 BREAKPOINTS (coerenti con CSS)
// ============================================

export const BREAKPOINTS = {
  mobile: 576,
  tablet: 768,
  desktop: 992,
  largeDesktop: 1200,
};

// ============================================
// 📧 EMAILJS CONFIGURATION
// ============================================

export const EMAILJS_CONFIG = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE || 'service_gt2uoev',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE || 'template_y6xpk4a',
  publicKey: process.env.REACT_APP_EMAILJS_KEY || 'kforPiP9Kqq8o2cYk',
};

// ============================================
// 🔑 STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  theme: 'portfolio-theme',
  language: 'portfolio-lang',
};

// ============================================
// 🎨 THEME VALUES
// ============================================

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

// ============================================
// ✅ VALIDATION RULES
// ============================================

export const VALIDATION = {
  minNameLength: 2,
  minMessageLength: 5,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneRegex: /^(\+39)?[\s]?([0-9]{2,4}[\s]?[0-9]{6,7})$/,
};
