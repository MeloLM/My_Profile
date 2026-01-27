/**
 * 🎣 useTypewriter Hook
 * Effetto macchina da scrivere per testo animato
 * Supporta array di testi con loop, cursor e delay personalizzabili
 * 
 * @module hooks/useTypewriter
 * @example
 * const { displayedText, isComplete } = useTypewriter(['Dev', 'Designer'], { loop: true });
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * @typedef {Object} TypewriterOptions
 * @property {number} [speed=100] - Velocità digitazione (ms per carattere)
 * @property {number} [deleteSpeed=50] - Velocità cancellazione (ms per carattere)
 * @property {number} [delayBetween=2000] - Pausa tra parole (ms)
 * @property {boolean} [loop=false] - Se ripetere il ciclo
 * @property {boolean} [cursor=true] - Se mostrare il cursore
 */

/**
 * @typedef {Object} TypewriterReturn
 * @property {string} displayedText - Testo attualmente visualizzato
 * @property {boolean} isComplete - True se animazione completata
 * @property {boolean} isDeleting - True se in fase di cancellazione
 * @property {string} textWithCursor - Testo con cursore "|"
 */

/**
 * Custom hook per effetto typewriter
 * @param {string|string[]} text - Testo o array di testi da animare
 * @param {TypewriterOptions} [options] - Opzioni di configurazione
 * @returns {TypewriterReturn} Stato dell'animazione
 */
export const useTypewriter = (
  text,
  {
    speed = 100,
    deleteSpeed = 50,
    delayBetween = 2000,
    loop = false,
    cursor = true,
  } = {}
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const timeoutRef = useRef(null);

  // Supporta sia stringa singola che array di stringhe
  const texts = Array.isArray(text) ? text : [text];
  const currentText = texts[textIndex];

  const typeText = useCallback(() => {
    if (isDeleting) {
      // Cancellazione
      if (displayedText.length > 0) {
        setDisplayedText(prev => prev.slice(0, -1));
        timeoutRef.current = setTimeout(typeText, deleteSpeed);
      } else {
        // Finito di cancellare, passa al prossimo testo
        setIsDeleting(false);
        if (loop || textIndex < texts.length - 1) {
          setTextIndex(prev => (prev + 1) % texts.length);
        }
      }
    } else {
      // Scrittura
      if (displayedText.length < currentText.length) {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
        timeoutRef.current = setTimeout(typeText, speed);
      } else {
        // Finito di scrivere
        if (loop || textIndex < texts.length - 1) {
          // Attendi e poi inizia a cancellare
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            typeText();
          }, delayBetween);
        } else {
          setIsComplete(true);
        }
      }
    }
  }, [displayedText, isDeleting, currentText, textIndex, texts.length, speed, deleteSpeed, delayBetween, loop]);

  useEffect(() => {
    timeoutRef.current = setTimeout(typeText, speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [typeText, speed]);

  // Reset quando cambia il testo SOLO se il contenuto cambia davvero
  useEffect(() => {
    // Evita reset se l'array è tecnicamente diverso ma ha lo stesso contenuto
    const textStr = JSON.stringify(text);
    const prevTextStr = JSON.stringify(texts); // Check logic improvement needed

    // Semplificazione: reset solo se text cambia, ma per array passed inline this triggers always.
    // Better fix: use a ref to track prev text or rely on component to memoize.
    // Assuming component fix in Banner.js, keeping this hook simple but safe.

    setDisplayedText('');
    setTextIndex(0);
    setIsDeleting(false);
    setIsComplete(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(text)]);

  return {
    displayedText,
    isComplete,
    isDeleting,
    textWithCursor: cursor ? `${displayedText}|` : displayedText,
  };
};

export default useTypewriter;