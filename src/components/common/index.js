/**
 * 📦 Common Components Exports
 * Export centralizzato per tutti i componenti riutilizzabili
 */

export { default as Loader } from './Loader';
export { default as Button, Button as ButtonComponent } from './Button';
export { SocialIcons } from './SocialIcons';
export { default as ScrollProgressBar } from './ScrollProgressBar';
export { default as BackToTop } from './BackToTop';
export { default as ToastNotification } from './ToastNotification';
export { default as ErrorBoundary, withErrorBoundary } from './ErrorBoundary';
export { default as SkipToContent } from './SkipToContent';

// 🖼️ Mobile-optimized image component
export { ResponsiveImage, BREAKPOINTS, SIZE_PRESETS } from './ResponsiveImage';

// 🎨 Tree-shaken icons (solo icone utilizzate)
export * from './icons';
