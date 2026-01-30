/**
 * 🎣 useEmail Hook
 * Gestisce l'invio di email tramite EmailJS collegato a Gmail
 * 
 * @module hooks/useEmail
 */

import { useState, useCallback, RefObject } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, VALIDATION } from '../constants';
import logger from '../utils/logger';

export interface EmailFormData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  message: string;
}

export interface EmailStatus {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string;
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

export interface UseEmailReturn {
  sendEmail: (formData: EmailFormData, formRef?: RefObject<HTMLFormElement>) => Promise<SendEmailResult>;
  resetStatus: () => void;
  status: EmailStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  config: typeof EMAILJS_CONFIG;
}

/**
 * Valida un indirizzo email
 */
const isValidEmail = (email: string): boolean => {
  return VALIDATION.emailRegex.test(email);
};

export const useEmail = (): UseEmailReturn => {
  const [status, setStatus] = useState<EmailStatus>({
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
   */
  const sendEmail = useCallback(async (
    formData: EmailFormData, 
    formRef?: RefObject<HTMLFormElement>
  ): Promise<SendEmailResult> => {
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
      const errorMessage = error instanceof Error ? error.message : 'Failed to send';
      logger.error('EmailJS Error:', error);
      
      setStatus({
        loading: false,
        success: false,
        error: errorMessage,
        message: 'Something went wrong. Please try again.',
      });
      
      return { success: false, error: errorMessage };
    }
  }, []);

  return {
    sendEmail,
    resetStatus,
    status,
    isLoading: status.loading,
    isSuccess: status.success,
    isError: !!status.error,
    config: EMAILJS_CONFIG,
  };
};

export default useEmail;
