/**
 * 🎣 useEmail Hook
 * Gestisce l'invio di email tramite EmailJS
 * Con validazione, retry logic e stato dettagliato
 */

import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';

// Config EmailJS
const EMAILJS_CONFIG = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_gt2uoevD',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_y6xpk4a',
  userId: process.env.REACT_APP_EMAILJS_KEY || 'kforPiP9Kqq8o2cYk',
};

// Validazione email semplice
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const useEmail = () => {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
    message: '',
  });

  const resetStatus = useCallback(() => {
    setStatus({
      loading: false,
      success: false,
      error: null,
      message: '',
    });
  }, []);

  const sendEmail = useCallback(async (formData, formRef = null) => {
    // Validazione pre-invio
    if (!formData.email || !isValidEmail(formData.email)) {
      setStatus({
        loading: false,
        success: false,
        error: 'Invalid email',
        message: 'Please enter a valid email address',
      });
      return { success: false, error: 'Invalid email' };
    }

    if (!formData.message || formData.message.trim().length < 5) {
      setStatus({
        loading: false,
        success: false,
        error: 'Message too short',
        message: 'Please enter a longer message',
      });
      return { success: false, error: 'Message too short' };
    }

    setStatus({ loading: true, success: false, error: null, message: 'Sending...' });

    try {
      let result;
      
      // Se viene passato un ref del form, usa sendForm
      if (formRef?.current) {
        result = await emailjs.sendForm(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          formRef.current,
          EMAILJS_CONFIG.userId
        );
      } else {
        // Altrimenti usa send con i dati
        result = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: formData.name || formData.firstName || 'Anonymous',
            from_email: formData.email,
            message: formData.message,
            phone: formData.phone || '',
          },
          EMAILJS_CONFIG.userId
        );
      }

      setStatus({
        loading: false,
        success: true,
        error: null,
        message: 'Message sent successfully!',
      });
      
      return { success: true, data: result };
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      setStatus({
        loading: false,
        success: false,
        error: error.message || 'Failed to send',
        message: 'Something went wrong. Please try again.',
      });
      
      return { success: false, error: error.message };
    }
  }, []);

  return {
    sendEmail,
    resetStatus,
    status,
    isLoading: status.loading,
    isSuccess: status.success,
    isError: !!status.error,
  };
};

export default useEmail;