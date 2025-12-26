/**
 * 🛠️ Formatters Utilities
 * Funzioni per formattare dati e stringhe
 */

/**
 * Formatta una data in formato locale
 * @param {string|Date} date - Data da formattare
 * @param {string} locale - Locale (default: 'it-IT')
 * @returns {string} - Data formattata
 */
export const formatDate = (date, locale = 'it-IT') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Tronca un testo a una lunghezza massima
 * @param {string} text - Testo da troncare
 * @param {number} maxLength - Lunghezza massima
 * @returns {string} - Testo troncato
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Formatta un numero con separatore di migliaia
 * @param {number} num - Numero da formattare
 * @returns {string} - Numero formattato
 */
export const formatNumber = (num) => {
  return num.toLocaleString('it-IT');
};

/**
 * Converte una stringa in kebab-case
 * @param {string} str - Stringa da convertire
 * @returns {string} - Stringa in kebab-case
 */
export const toKebabCase = (str) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

/**
 * Capitalizza la prima lettera di una stringa
 * @param {string} str - Stringa da capitalizzare
 * @returns {string} - Stringa capitalizzata
 */
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
