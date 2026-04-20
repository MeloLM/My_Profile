/**
 * ✨ CursorTrail Component
 * Cursore custom context-aware: cambia forma su hover elementi interattivi
 * 
 * @module components/common/CursorTrail
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import './CursorTrail.css';

const MAX_PARTICLES = 15;
const PARTICLE_LIFETIME = 600; // ms

const CURSOR_CONTEXTS = {
  default: { label: '', scale: 1 },
  link: { label: 'APRI', scale: 1.6 },
  button: { label: 'CLICK', scale: 1.4 },
  text: { label: 'LEGGI', scale: 1.2 },
  image: { label: 'GUARDA', scale: 1.5 },
};

function getCursorContext(el) {
  if (!el) return 'default';
  const tag = el.tagName?.toLowerCase();
  const role = el.getAttribute('role');
  if (tag === 'a' || el.closest('a')) return 'link';
  if (tag === 'button' || role === 'button') return 'button';
  if (tag === 'img' || el.closest('img')) return 'image';
  if (['p', 'h1', 'h2', 'h3', 'h4', 'span', 'li'].includes(tag)) return 'text';
  return 'default';
}

const CursorTrail = ({ enabled = true, color = '#e08821' }) => {
  const [particles, setParticles] = useState([]);
  const [isTouch, setIsTouch] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [context, setContext] = useState('default');
  const particleId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const throttleRef = useRef(false);

  // Check for touch device
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const createParticle = useCallback((x, y) => {
    const id = particleId.current++;
    const size = Math.random() * 8 + 4;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    return { id, x: x + offsetX, y: y + offsetY, size, opacity: 1, createdAt: Date.now() };
  }, []);

  useEffect(() => {
    if (!enabled || isTouch) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setPos({ x: clientX, y: clientY });
      setContext(getCursorContext(e.target));

      if (throttleRef.current) return;
      throttleRef.current = true;
      setTimeout(() => { throttleRef.current = false; }, 30);

      const dx = clientX - lastPos.current.x;
      const dy = clientY - lastPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < 10) return;
      lastPos.current = { x: clientX, y: clientY };

      setParticles(prev => {
        const now = Date.now();
        const filtered = prev
          .filter(p => now - p.createdAt < PARTICLE_LIFETIME)
          .slice(-MAX_PARTICLES + 1);
        return [...filtered, createParticle(clientX, clientY)];
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled, isTouch, createParticle]);

  // Cleanup old particles
  useEffect(() => {
    if (!enabled || isTouch) return;
    const cleanup = setInterval(() => {
      const now = Date.now();
      setParticles(prev => prev.filter(p => now - p.createdAt < PARTICLE_LIFETIME));
    }, 100);
    return () => clearInterval(cleanup);
  }, [enabled, isTouch]);

  if (!enabled || isTouch) return null;

  const { scale, label } = CURSOR_CONTEXTS[context] || CURSOR_CONTEXTS.default;

  return (
    <div className="cursor-trail" aria-hidden="true">
      {/* Custom cursor dot */}
      <div
        className={`cursor-dot ${context !== 'default' ? 'cursor-dot--active' : ''}`}
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${scale})`,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          borderColor: color,
        }}
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>

      {/* Particles */}
      {particles.map(particle => {
        const age = Date.now() - particle.createdAt;
        const progress = age / PARTICLE_LIFETIME;
        const opacity = Math.max(0, 1 - progress);
        const sc = 1 - progress * 0.5;
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
              transform: `translate(-50%, -50%) scale(${sc})`,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorTrail;

