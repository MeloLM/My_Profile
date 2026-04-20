/**
 * ❌ Error State - Next.js App Router
 * Mostrato automaticamente quando si verifica un errore nella route
 * Tema Dark Souls coerente con il resto dell'app
 */

'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        textAlign: 'center',
        padding: '2rem',
      }}
      role="alert"
    >
      <div style={{ fontSize: '80px', marginBottom: '1rem' }}>💀</div>
      <h1
        style={{
          fontSize: 'clamp(24px, 5vw, 40px)',
          color: '#e08821',
          letterSpacing: '4px',
          marginBottom: '1rem',
          textShadow: '0 0 20px rgba(224, 136, 33, 0.5)',
        }}
      >
        YOU DIED
      </h1>
      <p
        style={{
          color: '#888',
          fontSize: '18px',
          marginBottom: '2rem',
          maxWidth: '500px',
        }}
      >
        Something went wrong while loading this page.
      </p>
      <button
        onClick={reset}
        style={{
          padding: '12px 32px',
          border: '2px solid #e08821',
          background: 'transparent',
          color: '#e08821',
          fontSize: '16px',
          fontWeight: 700,
          letterSpacing: '2px',
          cursor: 'pointer',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#e08821';
          e.currentTarget.style.color = '#000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#e08821';
        }}
      >
        RESPAWN AT BONFIRE
      </button>
    </div>
  );
}
