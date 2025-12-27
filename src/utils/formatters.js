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
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formatta un periodo temporale in modo leggibile
 * @param {string} startDate - Data inizio
 * @param {string} endDate - Data fine (opzionale, 'present' per attuale)
 * @returns {string} - Periodo formattato
 */
export const formatPeriod = (startDate, endDate = null) => {
  const start = formatDate(startDate);
  if (!endDate || endDate.toLowerCase() === 'present') {
    return `${start} - Presente`;
  }
  return `${start} - ${formatDate(endDate)}`;
};

/**
 * Converte bytes in formato leggibile
 * @param {number} bytes - Numero di bytes
 * @returns {string} - Dimensione formattata (KB, MB, GB)
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Genera un ID univoco
 * @returns {string} - ID univoco
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Estrae le iniziali da un nome
 * @param {string} name - Nome completo
 * @returns {string} - Iniziali (max 2 caratteri)
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};
