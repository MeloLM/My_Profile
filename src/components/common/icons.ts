/**
 * 🎯 Bootstrap Icons - Tree-Shaking Optimized
 * 
 * PROBLEMA:
 * `import 'bootstrap-icons/font/bootstrap-icons.css'` carica ~1500+ icone (~400KB)
 * 
 * SOLUZIONE:
 * Importare SOLO le icone utilizzate come componenti React
 * da react-bootstrap-icons (già installato)
 * 
 * ICONE UTILIZZATE NEL PROGETTO:
 * - ArrowUp (BackToTop)
 * - ArrowRightCircle (Banner CTA)
 * - Sun, Moon (Theme toggle)
 * - ChevronLeft, ChevronRight (Timeline navigation)
 * 
 * ISTRUZIONI:
 * 1. Rimuovere: import 'bootstrap-icons/font/bootstrap-icons.css' da layout.tsx
 * 2. Usare direttamente i componenti da react-bootstrap-icons
 * 
 * @example
 * // ❌ Prima (carica TUTTE le icone)
 * import 'bootstrap-icons/font/bootstrap-icons.css';
 * <i className="bi bi-arrow-up"></i>
 * 
 * // ✅ Dopo (tree-shakable, solo icone usate)
 * import { ArrowUp } from 'react-bootstrap-icons';
 * <ArrowUp size={24} />
 */

// Re-export delle sole icone utilizzate nel progetto
// Questo permette import centralizzato e facile manutenzione

export {
  ArrowUp,
  ArrowRightCircle,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
  Envelope,
  GeoAlt,
  Telephone,
} from 'react-bootstrap-icons';

// Tipo per size standard
export type IconSize = 16 | 20 | 24 | 32 | 40;

// Props comuni per icone
export interface IconProps {
  size?: IconSize;
  className?: string;
  color?: string;
  'aria-hidden'?: boolean;
}
