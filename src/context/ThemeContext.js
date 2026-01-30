/**
 * 🎨 ThemeContext
 * Gestione globale del tema (Dark/Light mode)
 * Persiste la preferenza in localStorage
 * 
 * ✅ SSR-Safe: Evita accesso a localStorage durante SSR
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Creo il context
const ThemeContext = createContext(null);

// Temi disponibili
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

// Storage key
const THEME_STORAGE_KEY = 'portfolio-theme';

/**
 * Recupera il tema iniziale in modo SSR-safe
 * @returns {string} Tema iniziale (sempre DARK durante SSR per evitare flash)
 */
const getInitialTheme = () => {
  // Durante SSR, ritorna sempre DARK (verrà sincronizzato lato client)
  if (typeof window === 'undefined') {
    return THEMES.DARK;
  }
  
  // Lato client: check localStorage
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      return savedTheme;
    }
  } catch (e) {
    // localStorage non disponibile (es. private mode)
    console.warn('localStorage not available:', e);
  }
  
  // Fallback alla preferenza di sistema
  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? THEMES.DARK 
      : THEMES.LIGHT;
  }
  
  return THEMES.DARK;
};

/**
 * ThemeProvider Component
 * Wrappa l'app e fornisce lo stato del tema globalmente
 */
export const ThemeProvider = ({ children }) => {
  // ✅ SSR-Safe: Inizializza con DARK, poi sincronizza lato client
  const [theme, setTheme] = useState(THEMES.DARK);
  const [isHydrated, setIsHydrated] = useState(false);

  // ✅ Hydration: sincronizza con localStorage dopo il mount
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    setIsHydrated(true);
  }, []);

  // Toggle tra dark e light
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => 
      prevTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    );
  }, []);

  // Set theme specifico
  const setSpecificTheme = useCallback((newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme);
    }
  }, []);

  // Effetto per persistere e applicare il tema
  useEffect(() => {
    // ✅ SSR-Safe: non eseguire durante SSR o prima dell'hydration
    if (typeof window === 'undefined' || !isHydrated) return;
    
    // Salva in localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage:', e);
    }
    
    // Applica al DOM
    document.documentElement.setAttribute('data-theme', theme);
    
    // Aggiorna meta theme-color per mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === THEMES.DARK ? '#121212' : '#ffffff');
    }
  }, [theme, isHydrated]);

  // Ascolta cambiamenti preferenze sistema
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Solo se l'utente non ha impostato manualmente
      try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (!savedTheme) {
          setTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
        }
      } catch {
        // localStorage non disponibile, segui sempre la preferenza sistema
        setTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    theme,
    isDark: theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
    toggleTheme,
    setTheme: setSpecificTheme,
    THEMES,
    isHydrated, // Esponi per gestire flash prevention se necessario
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme Hook
 * Hook per accedere al context del tema
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

export default ThemeContext;
