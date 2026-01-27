/**
 * 🎮 EasterEgg Component
 * Dark Souls themed easter egg activated by Konami Code
 * 
 * @module components/common/EasterEgg
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useKonamiCode } from '../../hooks';
import './EasterEgg.css';

const SOULS_MESSAGES = [
  "YOU DIED",
  "PRAISE THE SUN! \\[T]/",
  "Humanity Restored",
  "BONFIRE LIT",
  "Don't give up, skeleton!",
  "Try finger, but hole"
];

const EasterEgg = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [message, setMessage] = useState('');
  const [souls, setSouls] = useState(0);

  const handleKonamiCode = useCallback(() => {
    const randomMessage = SOULS_MESSAGES[Math.floor(Math.random() * SOULS_MESSAGES.length)];
    setMessage(randomMessage);
    setSouls(Math.floor(Math.random() * 1000000) + 100000);
    setShowEasterEgg(true);
    // User closes manually - no auto-close
  }, []);

  const { progress } = useKonamiCode(handleKonamiCode);

  // Show progress hint when user starts entering the code
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (progress > 0 && progress < 10) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleClose = () => {
    setShowEasterEgg(false);
  };

  return (
    <>
      {/* Progress hint */}
      {showHint && (
        <div className="konami-hint" aria-hidden="true">
          <span className="hint-progress">
            {'▲'.repeat(Math.min(progress, 2))}
            {'▼'.repeat(Math.max(0, Math.min(progress - 2, 2)))}
            {'◄►'.slice(0, Math.max(0, Math.min(progress - 4, 4)))}
          </span>
        </div>
      )}

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div
          className="easter-egg-overlay"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="easter-egg-title"
        >
          <div className="easter-egg-modal" onClick={e => e.stopPropagation()}>
            <div className="bonfire-glow"></div>

            <h2 id="easter-egg-title" className="souls-message">{message}</h2>

            <div className="souls-collected">
              <span className="souls-icon">💀</span>
              <span className="souls-count">
                {souls.toLocaleString()} Souls Collected
              </span>
            </div>

            <p className="easter-egg-text">
              Hai scoperto l'Easter Egg! 🎮<br />
              <small>Konami Code: ↑↑↓↓←→←→BA</small>
            </p>

            <button
              className="souls-btn"
              onClick={handleClose}
            >
              REST AT BONFIRE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EasterEgg;
