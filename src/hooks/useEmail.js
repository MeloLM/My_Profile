/**
 * 🎣 useEmail Hook
 * Gestisce l'invio di email tramite EmailJS
 */

import { useState } from 'react';
import emailjs from '@emailjs/browser';

export const useEmail = () => {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const sendEmail = async (formData) => {
    setStatus({ loading: true, success: false, error: null });

    try {
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_USER_ID
      );

      setStatus({ loading: false, success: true, error: null });
      return { success: true, data: result };
    } catch (error) {
      setStatus({ loading: false, success: false, error: error.message });
      return { success: false, error: error.message };
    }
  };

  return { sendEmail, status };
};
