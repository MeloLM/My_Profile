/**
 * ⏭️ Skip to Content Link
 * Link accessibile per saltare la navigazione e andare al contenuto principale
 * 
 * @module components/common/SkipToContent
 */

'use client';

import React from 'react';
import './SkipToContent.css';

export interface SkipToContentProps {
  /** ID dell'elemento target (default: 'main-content') */
  targetId?: string;
  /** Testo del link */
  text?: string;
}

const SkipToContent: React.FC<SkipToContentProps> = ({
  targetId = 'main-content',
  text = 'Skip to main content',
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    
    if (target) {
      // Imposta focus sull'elemento target
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
      
      // Rimuovi tabindex dopo blur per non interferire con la navigazione normale
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex');
      }, { once: true });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      className="skip-to-content"
      onClick={handleClick}
    >
      {text}
    </a>
  );
};

export default SkipToContent;
