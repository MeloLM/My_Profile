/**
 * ⏳ Loader Component
 * Componente di loading riutilizzabile per Suspense e stati di caricamento
 * 
 * @module components/common/Loader
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Skeleton Placeholder - Animazione shimmer per loading states
 * @param {Object} props - Component props
 * @param {string} [props.width='100%'] - Larghezza del placeholder
 * @param {string} [props.height='20px'] - Altezza del placeholder
 * @param {string} [props.borderRadius='4px'] - Border radius
 * @param {string} [props.className=''] - Classi CSS aggiuntive
 * @returns {JSX.Element} Skeleton placeholder animato
 */
export const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = '' 
}) => (
  <div 
    className={`skeleton-loader ${className}`}
    style={{ width, height, borderRadius }}
  />
);

Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Skeleton Card - Per ProjectCard loading
 */
export const SkeletonCard = () => (
  <div className="skeleton-card">
    <Skeleton height="200px" borderRadius="20px" className="skeleton-image" />
    <div className="skeleton-content">
      <Skeleton width="70%" height="24px" />
      <Skeleton width="100%" height="16px" />
      <Skeleton width="90%" height="16px" />
      <div className="skeleton-tags">
        <Skeleton width="60px" height="20px" borderRadius="10px" />
        <Skeleton width="80px" height="20px" borderRadius="10px" />
        <Skeleton width="50px" height="20px" borderRadius="10px" />
      </div>
    </div>
  </div>
);

/**
 * Skeleton Section - Per sezioni che si caricano
 * @param {Object} props - Component props
 * @param {boolean} [props.title=true] - Mostra titolo skeleton
 * @param {number} [props.cards=3] - Numero di card skeleton
 * @returns {JSX.Element} Sezione skeleton
 */
export const SkeletonSection = ({ title = true, cards = 3 }) => (
  <div className="skeleton-section">
    {title && <Skeleton width="200px" height="45px" className="skeleton-title" />}
    <div className="skeleton-grid">
      {Array.from({ length: cards }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);

SkeletonSection.propTypes = {
  title: PropTypes.bool,
  cards: PropTypes.number,
};

/**
 * Loader con animazione bonfire (coerente con il tema Dark Souls)
 * @param {Object} props - Component props
 * @param {string} [props.message='Loading...'] - Messaggio da mostrare
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Dimensione loader
 * @param {boolean} [props.showMessage=true] - Mostra/nasconde messaggio
 * @param {'bonfire'|'spinner'|'dots'} [props.variant='bonfire'] - Stile animazione
 * @returns {JSX.Element} Loader component
 */
const Loader = ({ 
  message = 'Loading...', 
  size = 'medium',
  showMessage = true,
  variant = 'bonfire'
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

  /* Skeleton Loading Styles */
  .skeleton-loader {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.05) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  .skeleton-card {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 20px;
    padding: 15px;
    margin: 10px;
  }
  
  .skeleton-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
  }
  
  .skeleton-tags {
    display: flex;
    gap: 8px;
    margin-top: 10px;
  }
  
  .skeleton-section {
    padding: 80px 50px;
  }
  
  .skeleton-title {
    margin: 0 auto 40px;
  }
  
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

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

Loader.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showMessage: PropTypes.bool,
  variant: PropTypes.oneOf(['bonfire', 'spinner', 'dots']),
};

Loader.defaultProps = {
  message: 'Loading...',
  size: 'medium',
  showMessage: true,
  variant: 'bonfire',
};

export default Loader;
