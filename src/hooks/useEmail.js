/**
 * 🎣 useEmail Hook
 * Gestisce l'invio di email tramite EmailJS collegato a Gmail
 * 
 * 📧 SETUP GMAIL con EmailJS:
 * 1. Vai su https://www.emailjs.com/ e crea account
 * 2. Email Services → Add New Service → Gmail
 * 3. Autorizza con il tuo account Gmail (carmelo.la.mantia00@gmail.com)
 * 4. Copia il Service ID (es: service_xxxxxx)
 * 5. Email Templates → Create New Template
 * 6. Configura template con variabili: {{from_name}}, {{from_email}}, {{message}}, {{phone}}
 * 7. Copia Template ID (es: template_xxxxxx)
 * 8. Account → API Keys → Copia la Public Key
 * 9. Crea file .env nella root del progetto con:
 *    REACT_APP_EMAILJS_SERVICE=service_xxxxxx
 *    REACT_APP_EMAILJS_TEMPLATE=template_xxxxxx
 *    REACT_APP_EMAILJS_KEY=your_public_key
 * 
 * @module hooks/useEmail
 */

import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, VALIDATION } from '../constants';
import logger from '../utils/logger';

/**
 * Valida un indirizzo email
 * @param {string} email - Email da validare
 * @returns {boolean} True se valida
 */
const isValidEmail = (email) => {
  return VALIDATION.emailRegex.test(email);
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

  /**
   * Invia email usando EmailJS
   * @param {Object} formData - Dati del form (firstName, lastName, email, phone, message)
   * @param {Object} formRef - Ref del form HTML (opzionale, per usare sendForm)
   */
  const sendEmail = useCallback(async (formData, formRef = null) => {
    // Validazione pre-invio
    if (!formData.firstName?.trim()) {
      setStatus({
        loading: false,
        success: false,
        error: 'Name required',
        message: 'Please enter your name',
      });
      return { success: false, error: 'Name required' };
    }

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
      
      // Se viene passato un ref del form, usa sendForm (più affidabile)
      if (formRef?.current) {
        result = await emailjs.sendForm(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          formRef.current,
          EMAILJS_CONFIG.publicKey
        );
      } else {
        // Altrimenti usa send con i dati
        result = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: `${formData.firstName} ${formData.lastName || ''}`.trim(),
            from_email: formData.email,
            message: formData.message,
            phone: formData.phone || 'Non fornito',
          },
          EMAILJS_CONFIG.publicKey
        );
      }

      logger.success('Email inviata con successo:', result.text);
      
      setStatus({
        loading: false,
        success: true,
        error: null,
        message: 'Message sent successfully! 🔥',
      });
      
      return { success: true, data: result };
    } catch (error) {
      logger.error('EmailJS Error:', error);
      
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
    config: EMAILJS_CONFIG, // Espone config per debug
  };
};

export default useEmail;