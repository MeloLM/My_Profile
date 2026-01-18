/**
 * 🔔 ToastNotification Component - Common
 * Toast notification riutilizzabile per messaggi di feedback
 * 
 * @module components/common/ToastNotification
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ToastNotification.css';

/** @constant {Object} TOAST_ICONS - Icone per tipo di toast */
const TOAST_ICONS = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ'
};

/**
 * ToastNotification Component
 * @param {Object} props - Component props
 * @param {string} props.message - Messaggio da mostrare
 * @param {'success'|'error'|'warning'|'info'} [props.type='info'] - Tipo di notifica
 * @param {number} [props.duration=3000] - Durata in ms (0 per persistente)
 * @param {Function} props.onClose - Callback alla chiusura
 * @returns {JSX.Element} Toast notification
 */
export default function ToastNotification({ message, type = 'info', duration = 3000, onClose }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`toast-notification toast-${type}`} role="alert">
      <div className="toast-icon">{TOAST_ICONS[type]}</div>
      <div className="toast-message">{message}</div>
      <button 
        className="toast-close" 
        onClick={onClose}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

ToastNotification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

ToastNotification.defaultProps = {
  type: 'info',
  duration: 3000,
};
