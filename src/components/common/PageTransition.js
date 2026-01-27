/**
 * 🔄 PageTransition Component
 * Animazioni di transizione tra sezioni
 * 
 * @module components/common/PageTransition
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PageTransition.css';

const PageTransition = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`page-transition ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number
};

/**
 * SectionTransition Component
 * Anima le sezioni quando entrano nel viewport
 */
export const SectionTransition = ({ children, direction = 'up', threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold]);

  const directionClass = `section-transition-${direction}`;

  return (
    <div
      ref={setRef}
      className={`section-transition ${directionClass} ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
};

SectionTransition.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'fade']),
  threshold: PropTypes.number
};

export default PageTransition;
