'use client';

/**
 * 🌐 LangContext - Internationalization (IT/EN)
 * Context leggero senza dipendenze esterne
 */

import { createContext, useContext, useState, useCallback } from 'react';

type Lang = 'it' | 'en';

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  it: {
    'nav.home': 'Home',
    'nav.skills': 'Skills',
    'nav.projects': 'Progetti',
    'nav.contact': 'Contatti',
    'nav.blog': 'Blog',
    'banner.tagline': 'Benvenuto nel mio Portfolio',
    'banner.cta': 'Contattami',
    'banner.cv': 'Scarica CV',
    'skills.title': 'Skills',
    'projects.title': 'Progetti',
    'projects.search': 'Cerca progetti per tecnologia...',
    'projects.empty': 'Nessun progetto trovato',
    'timeline.title': 'Il Mio Percorso',
    'timeline.subtitle': 'Dal Diploma al Full Stack',
    'contact.title': 'Contattami',
    'footer.rights': 'Tutti i diritti riservati.',
  },
  en: {
    'nav.home': 'Home',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'banner.tagline': 'Welcome to my Portfolio',
    'banner.cta': 'Contact Me',
    'banner.cv': 'Download CV',
    'skills.title': 'Skills',
    'projects.title': 'Projects',
    'projects.search': 'Search projects by technology...',
    'projects.empty': 'No projects found',
    'timeline.title': 'My Journey',
    'timeline.subtitle': 'From Diploma to Full Stack',
    'contact.title': 'Contact Me',
    'footer.rights': 'All rights reserved.',
  },
};

const LangContext = createContext<LangContextType>({
  lang: 'it',
  toggleLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('it');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'it' ? 'en' : 'it'));
  }, []);

  const t = useCallback(
    (key: string) => translations[lang][key] ?? key,
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
