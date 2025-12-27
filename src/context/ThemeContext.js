/**
 * 🎨 ThemeContext
 * Gestione globale del tema (Dark/Light mode)
 * Persiste la preferenza in localStorage
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
 * ThemeProvider Component
 * Wrappa l'app e fornisce lo stato del tema globalmente
 */
export const ThemeProvider = ({ children }) => {
  // Inizializza con la preferenza salvata o il tema di sistema
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      return savedTheme;
    }
    
    // Fallback alla preferenza di sistema
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? THEMES.DARK 
        : THEMES.LIGHT;
    }
    
    // Default dark (come il portfolio attuale)
    return THEMES.DARK;
  });

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
    // Salva in localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    
    // Applica al DOM
    document.documentElement.setAttribute('data-theme', theme);
    
    // Aggiorna meta theme-color per mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === THEMES.DARK ? '#121212' : '#ffffff');
    }
  }, [theme]);

  // Ascolta cambiamenti preferenze sistema
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Solo se l'utente non ha impostato manualmente
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!savedTheme) {
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
