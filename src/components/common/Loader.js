/**
 * ⏳ Loader Component
 * Componente di loading riutilizzabile per Suspense e stati di caricamento
 * 
 * @module components/common/Loader
 */

import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/loader.css';

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
