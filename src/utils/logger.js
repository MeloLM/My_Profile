/**
 * 🔧 Logger Utility
 * Sistema di logging condizionale per ambiente development
 * In produzione i log sono disabilitati per performance e sicurezza
 * 
 * @module utils/logger
 */

/** @constant {boolean} isDev - True se in development mode */
const isDev = process.env.NODE_ENV === 'development';

/**
 * Logger object con metodi per diversi livelli di log
 * Attivo solo in development, silenzioso in production
 */
const logger = {
  /**
   * Log informativo generico
   * @param {string} message - Messaggio da loggare
   * @param {...any} args - Argomenti aggiuntivi
   */
  log: (message, ...args) => {
    if (isDev) {
      console.log(`[LOG] ${message}`, ...args);
    }
  },

  /**
   * Log di informazione
   * @param {string} message - Messaggio da loggare
   * @param {...any} args - Argomenti aggiuntivi
   */
  info: (message, ...args) => {
    if (isDev) {
      console.info(`ℹ️ [INFO] ${message}`, ...args);
    }
  },

  /**
   * Log di warning
   * @param {string} message - Messaggio da loggare
   * @param {...any} args - Argomenti aggiuntivi
   */
  warn: (message, ...args) => {
    if (isDev) {
      console.warn(`⚠️ [WARN] ${message}`, ...args);
    }
  },

  /**
   * Log di errore
   * @param {string} message - Messaggio da loggare
   * @param {...any} args - Argomenti aggiuntivi
   */
  error: (message, ...args) => {
    if (isDev) {
      console.error(`❌ [ERROR] ${message}`, ...args);
    }
  },

  /**
   * Log di successo
   * @param {string} message - Messaggio da loggare
   * @param {...any} args - Argomenti aggiuntivi
   */
  success: (message, ...args) => {
    if (isDev) {
      console.log(`✅ [SUCCESS] ${message}`, ...args);
    }
  },

  /**
   * Log di debug (più dettagliato)
   * @param {string} message - Messaggio da loggare
   * @param {...any} args - Argomenti aggiuntivi
   */
  debug: (message, ...args) => {
    if (isDev) {
      console.debug(`🔍 [DEBUG] ${message}`, ...args);
    }
  },

  /**
   * Log raggruppato per componente/modulo
   * @param {string} groupName - Nome del gruppo
   * @param {Function} callback - Funzione con i log da raggruppare
   */
  group: (groupName, callback) => {
    if (isDev) {
      console.group(groupName);
      callback();
      console.groupEnd();
    }
  },

  /**
   * Log di tabella per dati strutturati
   * @param {Array|Object} data - Dati da mostrare in tabella
   */
  table: (data) => {
    if (isDev) {
      console.table(data);
    }
  },
};

export default logger;
