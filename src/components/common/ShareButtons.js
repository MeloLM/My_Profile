/**
 * 📤 ShareButtons Component
 * Pulsanti per condividere il portfolio sui social media
 * 
 * @module components/common/ShareButtons
 */

import React from 'react';
import PropTypes from 'prop-types';
import './ShareButtons.css';

const ShareButtons = ({
  url = window.location.href,
  title = "Carmelo La Mantia - Portfolio",
  description = "Full Stack Developer Portfolio",
  size = 'medium'
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: 'bi-linkedin',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: '#0077B5'
    },
    {
      name: 'Twitter',
      icon: 'bi-twitter-x',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: '#000000'
    },
    {
      name: 'Facebook',
      icon: 'bi-facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: '#1877F2'
    },
    {
      name: 'WhatsApp',
      icon: 'bi-whatsapp',
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: '#25D366'
    },
    {
      name: 'Telegram',
      icon: 'bi-telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: '#0088CC'
    }
  ];

  const handleShare = (shareUrl, platform) => {
    window.open(shareUrl, `share-${platform}`, 'width=600,height=400,resizable=yes,scrollbars=yes');
  };

  // Native share API for mobile
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    }
  };

  const sizeClass = `share-btn-${size}`;

  return (
    <div className={`share-buttons ${sizeClass}`}>
      <span className="share-label">Condividi:</span>

      {/* Native Share Button (mobile) */}
      {navigator.share && (
        <button
          className="share-btn share-btn-native"
          onClick={handleNativeShare}
          aria-label="Condividi con app native"
        >
          <i className="bi bi-share"></i>
        </button>
      )}

      {/* Social Share Links */}
      {shareLinks.map((link) => (
        <button
          key={link.name}
          className="share-btn"
          style={{ '--share-color': link.color }}
          onClick={() => handleShare(link.url, link.name)}
          aria-label={`Condividi su ${link.name}`}
          title={`Condividi su ${link.name}`}
        >
          <i className={`bi ${link.icon}`}></i>
        </button>
      ))}
    </div>
  );
};

ShareButtons.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default ShareButtons;
