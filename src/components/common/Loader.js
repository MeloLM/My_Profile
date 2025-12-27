/**
 * ⏳ Loader Component
 * Componente di loading riutilizzabile per Suspense e stati di caricamento
 */

import React from 'react';

/**
 * Loader con animazione bonfire (coerente con il tema Dark Souls)
 */
const Loader = ({ 
  message = 'Loading...', 
  size = 'medium',
  showMessage = true,
  variant = 'bonfire' // 'bonfire' | 'spinner' | 'dots'
}) => {
  const sizeClasses = {
    small: 'loader-small',
    medium: 'loader-medium',
    large: 'loader-large',
  };

  const renderLoader = () => {
    switch (variant) {
      case 'bonfire':
        return (
          <div className="bonfire-loader">
            <span className="bonfire-flame">🔥</span>
          </div>
        );
      
      case 'spinner':
        return (
          <div className="spinner-loader">
            <div className="spinner"></div>
          </div>
        );
      
      case 'dots':
        return (
          <div className="dots-loader">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        );
      
      default:
        return (
          <div className="bonfire-loader">
            <span className="bonfire-flame">🔥</span>
          </div>
        );
    }
  };

  return (
    <div className={`loader-container ${sizeClasses[size]}`}>
      {renderLoader()}
      {showMessage && <p className="loader-message">{message}</p>}
    </div>
  );
};

// CSS inline per il componente (può essere spostato in un CSS module)
const styles = `
  .loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    min-height: 200px;
  }

  .loader-small { min-height: 100px; }
  .loader-medium { min-height: 200px; }
  .loader-large { min-height: 300px; }

  .bonfire-loader {
    animation: pulse 1.5s ease-in-out infinite;
  }

  .bonfire-flame {
    font-size: 3rem;
    display: block;
  }

  .loader-small .bonfire-flame { font-size: 1.5rem; }
  .loader-large .bonfire-flame { font-size: 5rem; }

  .loader-message {
    margin-top: 1rem;
    color: var(--main-color, #e08821);
    font-family: 'OptimusPrinceps', serif;
    letter-spacing: 2px;
  }

  .spinner-loader .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(224, 136, 33, 0.3);
    border-top-color: var(--main-color, #e08821);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .dots-loader {
    display: flex;
    gap: 8px;
  }

  .dots-loader .dot {
    width: 12px;
    height: 12px;
    background: var(--main-color, #e08821);
    border-radius: 50%;
    animation: bounce 1.4s ease-in-out infinite;
  }

  .dots-loader .dot:nth-child(2) { animation-delay: 0.2s; }
  .dots-loader .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  styleSheet.id = 'loader-styles';
  if (!document.getElementById('loader-styles')) {
    document.head.appendChild(styleSheet);
  }
}

export default Loader;
