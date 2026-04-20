/**
 * 🎨 ThemeContext
 * Gestione globale del tema (Dark/Light mode)
 * Persiste la preferenza in localStorage
 * ✅ SSR-Safe: Evita accesso a localStorage durante SSR
 * ✅ TypeScript con interfacce tipizzate
 * 
 * @module context/ThemeContext
 */

'use client';

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback,
  ReactNode 
} from 'react';

// ============================================
// 📝 TYPE DEFINITIONS
// ============================================

/** Tipi di tema disponibili */
type Theme = 'dark' | 'light';

/** Oggetto con i valori dei temi */
interface ThemeValues {
  DARK: 'dark';
  LIGHT: 'light';
}

/** Valore del context del tema */
interface ThemeContextValue {
  /** Tema corrente */
  theme: Theme;
  /** True se il tema è dark */
  isDark: boolean;
  /** True se il tema è light */
  isLight: boolean;
  /** Toggle tra dark e light */
  toggleTheme: () => void;
  /** Imposta un tema specifico */
  setTheme: (theme: Theme) => void;
  /** Oggetto con i valori dei temi */
  THEMES: ThemeValues;
  /** True se l'idratazione è completata */
  isHydrated: boolean;
}

/** Props per ThemeProvider */
interface ThemeProviderProps {
  children: ReactNode;
}

// ============================================
// 📦 CONSTANTS
// ============================================

/** Temi disponibili */
export const THEMES: ThemeValues = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

/** Storage key */
const THEME_STORAGE_KEY = 'portfolio-theme';

// ============================================
// 🎨 CONTEXT
// ============================================

/** Context del tema - null come default per error handling */
const ThemeContext = createContext<ThemeContextValue | null>(null);

// ============================================
// 🔧 HELPERS
// ============================================

/**
 * Recupera il tema iniziale in modo SSR-safe
 * @returns Tema iniziale (sempre DARK durante SSR per evitare flash)
 */
const getInitialTheme = (): Theme => {
  // Durante SSR, ritorna sempre DARK (verrà sincronizzato lato client)
  if (typeof window === 'undefined') {
    return THEMES.DARK;
  }
  
  // Lato client: check localStorage
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === THEMES.DARK || savedTheme === THEMES.LIGHT) {
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

// ============================================
// 🎨 PROVIDER COMPONENT
// ============================================

/**
 * ThemeProvider Component
 * Wrappa l'app e fornisce lo stato del tema globalmente
 */
export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  // ✅ SSR-Safe: Inizializza con DARK, poi sincronizza lato client
  const [theme, setThemeState] = useState<Theme>(THEMES.DARK);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // ✅ Hydration: sincronizza con localStorage dopo il mount
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setThemeState(initialTheme);
    setIsHydrated(true);
  }, []);

  // Toggle tra dark e light
  const toggleTheme = useCallback((): void => {
    setThemeState(prevTheme => 
      prevTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    );
  }, []);

  // Set theme specifico
  const setSpecificTheme = useCallback((newTheme: Theme): void => {
    if (newTheme === THEMES.DARK || newTheme === THEMES.LIGHT) {
      setThemeState(newTheme);
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
    
    const handleChange = (e: MediaQueryListEvent): void => {
      // Solo se l'utente non ha impostato manualmente
      try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (!savedTheme) {
          setThemeState(e.matches ? THEMES.DARK : THEMES.LIGHT);
        }
      } catch {
        // localStorage non disponibile, segui sempre la preferenza sistema
        setThemeState(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value: ThemeContextValue = {
    theme,
    isDark: theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
    toggleTheme,
    setTheme: setSpecificTheme,
    THEMES,
    isHydrated,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================
// 🪝 HOOK
// ============================================

/**
 * useTheme Hook
 * Hook per accedere al context del tema
 * @throws Error se usato fuori da ThemeProvider
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

export default ThemeContext;
export type { Theme, ThemeContextValue, ThemeProviderProps };
