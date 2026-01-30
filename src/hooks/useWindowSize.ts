/**
 * 🪟 useWindowSize Hook
 * Traccia le dimensioni della viewport con throttling
 * 
 * @module hooks/useWindowSize
 */

import { useState, useEffect, useMemo } from 'react';

export interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
}

export interface UseWindowSizeOptions {
  /** Throttle delay in ms (default: 100) */
  throttleMs?: number;
  /** Mobile breakpoint in px (default: 768) */
  mobileBreakpoint?: number;
  /** Tablet breakpoint in px (default: 1024) */
  tabletBreakpoint?: number;
}

const DEFAULTS: Required<UseWindowSizeOptions> = {
  throttleMs: 100,
  mobileBreakpoint: 768,
  tabletBreakpoint: 1024,
};

/**
 * Hook per tracciare le dimensioni del viewport in modo performante
 * 
 * @param options - Configurazione opzionale
 * @returns WindowSize con dimensioni e flag booleani
 * 
 * @example
 * const { isMobile, width } = useWindowSize();
 * // Usa isMobile per conditional rendering
 */
export const useWindowSize = (options: UseWindowSizeOptions = {}): WindowSize => {
  const { throttleMs, mobileBreakpoint, tabletBreakpoint } = { ...DEFAULTS, ...options };

  // SSR-safe: inizializza con valori di fallback
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>(() => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    // SSR fallback (assume desktop)
    return { width: 1200, height: 800 };
  });

  useEffect(() => {
    // Guard per SSR
    if (typeof window === 'undefined') return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      // Throttle per performance
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        timeoutId = null;
      }, throttleMs);
    };

    // Imposta valori iniziali
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [throttleMs]);

  // Memoizza i valori derivati per evitare ricalcoli inutili
  const derivedValues = useMemo((): WindowSize => {
    const { width, height } = windowSize;
    
    return {
      width,
      height,
      isMobile: width < mobileBreakpoint,
      isTablet: width >= mobileBreakpoint && width < tabletBreakpoint,
      isDesktop: width >= tabletBreakpoint,
      isLandscape: width > height,
    };
  }, [windowSize, mobileBreakpoint, tabletBreakpoint]);

  return derivedValues;
};

export default useWindowSize;
