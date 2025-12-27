/**
 * 🛠️ Validators Utilities
 * Funzioni di validazione per form e input
 */

/**
 * Valida un indirizzo email
 * @param {string} email - Email da validare
 * @returns {boolean} - True se valida
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida i dati di un form di contatto
 * @param {Object} formData - Dati del form
 * @returns {Object} - Oggetto con eventuali errori
 */
export const validateContactForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Il nome deve contenere almeno 2 caratteri';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Inserisci un indirizzo email valido';
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Il messaggio deve contenere almeno 10 caratteri';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valida un numero di telefono (formato IT)
 * @param {string} phone - Numero di telefono
 * @returns {boolean} - True se valido
 */
export const validatePhone = (phone) => {
  if (!phone) return true; // Opzionale
  const phoneRegex = /^(\+39)?[\s]?([0-9]{2,4}[\s]?[0-9]{6,7})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valida una URL
 * @param {string} url - URL da validare
 * @returns {boolean} - True se valida
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida che una stringa non sia vuota
 * @param {string} str - Stringa da validare
 * @param {number} minLength - Lunghezza minima (default: 1)
 * @returns {boolean} - True se valida
 */
export const validateRequired = (str, minLength = 1) => {
  return str && str.trim().length >= minLength;
};

/**
 * Sanitizza input da caratteri potenzialmente pericolosi
 * @param {string} input - Input da sanitizzare
 * @returns {string} - Input sanitizzato
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Rimuove < e >
    .trim();
};
