/**
 * 🔘 Button Component - Common
 * Componente pulsante riutilizzabile con varianti multiple
 * Come da PSEUDOCODE.md: Button(props) → {text, onClick, variant}
 */

import React from 'react';
import './Button.css';

/**
 * Button variants disponibili:
 * - primary: Azione principale (arancione)
 * - secondary: Azione secondaria (outline)
 * - ghost: Trasparente con hover
 * - danger: Azione distruttiva (rosso)
 * - success: Conferma (verde)
 */
const Button = ({
  text,
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  ariaLabel,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full-width',
    loading && 'btn-loading',
    disabled && 'btn-disabled',
    className,
  ].filter(Boolean).join(' ');

  const buttonContent = (
    <>
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {icon && iconPosition === 'left' && !loading && (
        <span className="btn-icon btn-icon-left">{icon}</span>
      )}
      <span className="btn-text">{text || children}</span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="btn-icon btn-icon-right">{icon}</span>
      )}
    </>
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || text}
      aria-busy={loading}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

/**
 * Button.Link - Variante link del bottone
 * Per navigazione con stile button
 */
Button.Link = ({
  text,
  children,
  href,
  variant = 'primary',
  size = 'medium',
  target = '_blank',
  rel = 'noopener noreferrer',
  icon = null,
  iconPosition = 'left',
  className = '',
  ariaLabel,
  ...props
}) => {
  const linkClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={linkClasses}
      aria-label={ariaLabel || text}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="btn-icon btn-icon-left">{icon}</span>
      )}
      <span className="btn-text">{text || children}</span>
      {icon && iconPosition === 'right' && (
        <span className="btn-icon btn-icon-right">{icon}</span>
      )}
    </a>
  );
};

export default Button;
export { Button };
