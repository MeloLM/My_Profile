/**
 * 📊 ScrollProgressBar Component - Common
 * Barra di progresso che mostra la percentuale di scroll della pagina
 */

import { useState, useEffect } from 'react';
import './ScrollProgressBar.css';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const progress = (currentScroll / scrollHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    // Initial check
    updateScrollProgress();

    // Update on scroll
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="scroll-progress-container" role="progressbar" aria-valuenow={Math.round(scrollProgress)} aria-valuemin="0" aria-valuemax="100">
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
