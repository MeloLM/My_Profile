/**
 * ✨ CursorTrail Component
 * Effetto particelle/trail che segue il cursore custom
 * 
 * @module components/common/CursorTrail
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import './CursorTrail.css';

const MAX_PARTICLES = 15;
const PARTICLE_LIFETIME = 600; // ms

const CursorTrail = ({ enabled = true, color = '#e08821' }) => {
  const [particles, setParticles] = useState([]);
  const [isTouch, setIsTouch] = useState(false);
  const particleId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const throttleRef = useRef(false);

  // Check for touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const createParticle = useCallback((x, y) => {
    const id = particleId.current++;
    const size = Math.random() * 8 + 4;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    return {
      id,
      x: x + offsetX,
      y: y + offsetY,
      size,
      opacity: 1,
      createdAt: Date.now()
    };
  }, []);

  useEffect(() => {
    if (!enabled || isTouch) return;

    const handleMouseMove = (e) => {
      // Throttle particle creation
      if (throttleRef.current) return;
      throttleRef.current = true;

      setTimeout(() => {
        throttleRef.current = false;
      }, 30);

      const { clientX, clientY } = e;

      // Only create particles if mouse moved enough
      const dx = clientX - lastPos.current.x;
      const dy = clientY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 10) return;

      lastPos.current = { x: clientX, y: clientY };

      setParticles(prev => {
        const now = Date.now();
        // Remove old particles and add new one
        const filtered = prev
          .filter(p => now - p.createdAt < PARTICLE_LIFETIME)
          .slice(-MAX_PARTICLES + 1);

        return [...filtered, createParticle(clientX, clientY)];
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled, isTouch, createParticle]);

  // Cleanup old particles periodically
  useEffect(() => {
    if (!enabled || isTouch) return;

    const cleanup = setInterval(() => {
      const now = Date.now();
      setParticles(prev => prev.filter(p => now - p.createdAt < PARTICLE_LIFETIME));
    }, 100);

    return () => clearInterval(cleanup);
  }, [enabled, isTouch]);

  if (!enabled || isTouch || particles.length === 0) return null;

  return (
    <div className="cursor-trail" aria-hidden="true">
      {particles.map(particle => {
        const age = Date.now() - particle.createdAt;
        const progress = age / PARTICLE_LIFETIME;
        const opacity = Math.max(0, 1 - progress);
        const scale = 1 - progress * 0.5;

        return (
          <div
            key={particle.id}
            className="cursor-particle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity,
              transform: `translate(-50%, -50%) scale(${scale})`,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorTrail;
