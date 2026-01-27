/**
 * 🎮 useKonamiCode Hook
 * Easter Egg: Riconosce la sequenza Konami Code
 * ↑ ↑ ↓ ↓ ← → ← → B A
 * 
 * @module hooks/useKonamiCode
 */

import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

/**
 * Hook per rilevare la sequenza Konami Code
 * @param {Function} callback - Funzione da eseguire quando il codice viene inserito
 * @param {Object} options - Opzioni del hook
 * @param {number} options.resetDelay - Tempo in ms prima del reset della sequenza (default: 3000)
 * @returns {Object} - { isActivated, resetEasterEgg }
 */
export function useKonamiCode(callback, options = {}) {
  const { resetDelay = 3000 } = options;
  const [keySequence, setKeySequence] = useState([]);
  const [isActivated, setIsActivated] = useState(false);

  const resetEasterEgg = useCallback(() => {
    setIsActivated(false);
    setKeySequence([]);
  }, []);

  useEffect(() => {
    let timeoutId;

    const handleKeyDown = (event) => {
      const key = event.code;

      setKeySequence((prev) => {
        const newSequence = [...prev, key];

        // Verifica se la sequenza è corretta finora
        const isValidSequence = newSequence.every(
          (k, i) => k === KONAMI_CODE[i]
        );

        if (!isValidSequence) {
          // Reset se la sequenza non corrisponde
          return [];
        }

        // Controlla se il codice è completo
        if (newSequence.length === KONAMI_CODE.length) {
          setIsActivated(true);
          if (callback) {
            callback();
          }
          return [];
        }

        return newSequence;
      });

      // Reset dopo un timeout di inattività
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setKeySequence([]);
      }, resetDelay);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [callback, resetDelay]);

  return { isActivated, resetEasterEgg, progress: keySequence.length };
}

export default useKonamiCode;
