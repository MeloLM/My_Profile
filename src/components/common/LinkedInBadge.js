/**
 * 🔗 LinkedInBadge Component
 * Widget embeddato per il profilo LinkedIn
 * 
 * @module components/common/LinkedInBadge
 */

import React from 'react';
import PropTypes from 'prop-types';
import './LinkedInBadge.css';

const LinkedInBadge = ({
  profileUrl = "https://www.linkedin.com/in/carmelo-la-mantia-web-developer/",
  name = "Carmelo La Mantia",
  role = "Jr Full Stack Developer",
  variant = 'card' // 'card' | 'button' | 'minimal'
}) => {
  const handleClick = () => {
    window.open(profileUrl, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'button') {
    return (
      <button
        className="linkedin-badge linkedin-badge-button"
        onClick={handleClick}
        aria-label={`Visita il profilo LinkedIn di ${name}`}
      >
        <i className="bi bi-linkedin"></i>
        <span>Connettiti su LinkedIn</span>
      </button>
    );
  }

  if (variant === 'minimal') {
    return (
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-badge linkedin-badge-minimal"
        aria-label={`Visita il profilo LinkedIn di ${name}`}
      >
        <i className="bi bi-linkedin"></i>
        <span>LinkedIn</span>
      </a>
    );
  }

  // Default: card variant
  return (
    <div className="linkedin-badge linkedin-badge-card">
      <div className="linkedin-badge-header">
        <i className="bi bi-linkedin linkedin-icon"></i>
        <span className="linkedin-label">LinkedIn Profile</span>
      </div>
      <div className="linkedin-badge-body">
        <h4 className="linkedin-name">{name}</h4>
        <p className="linkedin-role">{role}</p>
      </div>
      <button
        className="linkedin-connect-btn"
        onClick={handleClick}
        aria-label={`Connettiti con ${name} su LinkedIn`}
      >
        <i className="bi bi-person-plus"></i>
        Connettiti
      </button>
    </div>
  );
};

LinkedInBadge.propTypes = {
  profileUrl: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  variant: PropTypes.oneOf(['card', 'button', 'minimal'])
};

export default LinkedInBadge;
