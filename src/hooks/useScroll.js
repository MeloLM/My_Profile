/**
 * 🎣 useScroll Hook
 * Gestisce lo stato dello scroll per effetti sulla navbar
 * Ottimizzato con throttling via requestAnimationFrame per performance
 * 
 * @module hooks/useScroll
 * @example
 * const { scrolled, scrollDirection, isAtTop } = useScroll(50);
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook per tracciare stato e direzione scroll
 * @param {number} [threshold=50] - Soglia in px per attivare stato "scrolled"
 * @returns {Object} Oggetto con stati scroll
 * @returns {boolean} return.scrolled - True se scrollato oltre threshold
 * @returns {number} return.scrollY - Posizione scroll corrente
 * @returns {'up'|'down'} return.scrollDirection - Direzione scroll
 * @returns {boolean} return.isAtTop - True se in cima alla pagina
 * @returns {boolean} return.isScrollingDown - True se scrollando verso il basso
 * @returns {boolean} return.isScrollingUp - True se scrollando verso l'alto
 */
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