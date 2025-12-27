/**
 * 🎣 useWindowSize Hook
 * Helper per la responsività - fornisce dimensioni finestra e breakpoints
 */

import { useState, useEffect, useCallback } from 'react';

// Breakpoints coerenti con le variabili CSS
const BREAKPOINTS = {
  mobile: 576,
  tablet: 768,
  desktop: 992,
  largeDesktop: 1200,
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    // Check se siamo in ambiente browser
    if (typeof window === 'undefined') return;

    // Debounce per performance
    let timeoutId = null;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  // Computed breakpoint values
  const isMobile = windowSize.width < BREAKPOINTS.mobile;
  const isTablet = windowSize.width >= BREAKPOINTS.mobile && windowSize.width < BREAKPOINTS.tablet;
  const isDesktop = windowSize.width >= BREAKPOINTS.desktop;
  const isLargeDesktop = windowSize.width >= BREAKPOINTS.largeDesktop;

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    breakpoints: BREAKPOINTS,
  };
};

export default useWindowSize;
