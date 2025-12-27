/**
 * 🎣 useScroll Hook
 * Gestisce lo stato dello scroll per effetti sulla navbar
 * Ottimizzato con throttling per performance
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export const useScroll = (threshold = 50) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Determina direzione scroll
    if (currentScrollY > lastScrollY.current) {
      setScrollDirection('down');
    } else if (currentScrollY < lastScrollY.current) {
      setScrollDirection('up');
    }
    
    // Aggiorna stato scrolled
    setScrolled(currentScrollY > threshold);
    setScrollY(currentScrollY);
    
    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, [threshold]);

  const handleScroll = useCallback(() => {
    // Throttling con requestAnimationFrame per performance
    if (!ticking.current) {
      window.requestAnimationFrame(updateScrollState);
      ticking.current = true;
    }
  }, [updateScrollState]);

  useEffect(() => {
    // Check iniziale
    updateScrollState();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, updateScrollState]);

  return {
    scrolled,
    scrollY,
    scrollDirection,
    isAtTop: scrollY === 0,
    isScrollingDown: scrollDirection === 'down',
    isScrollingUp: scrollDirection === 'up',
  };
};

export default useScroll;