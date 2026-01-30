/**
 * 📦 Barrel Export per tutti gli Hooks
 * 
 * @module hooks
 */

export { useScroll } from './useScroll';
export type { UseScrollReturn } from './useScroll';

export { useTypewriter } from './useTypewriter';
export type { TypewriterOptions, TypewriterReturn } from './useTypewriter';

export { useKonamiCode } from './useKonamiCode';
export type { UseKonamiCodeOptions, UseKonamiCodeReturn } from './useKonamiCode';

export { useEmail } from './useEmail';
export type { 
  EmailFormData, 
  EmailStatus, 
  SendEmailResult, 
  UseEmailReturn 
} from './useEmail';

export { useWindowSize } from './useWindowSize';
export type { WindowSize, UseWindowSizeOptions } from './useWindowSize';
