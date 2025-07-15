import React, { createContext, useContext, useMemo } from 'react';

// Tipagem para traduções
interface TranslationKeys {
  greeting: string;
  welcome: string;
  login: string;
  signup: string;
  [key: string]: string;
}

const translations: Record<string, TranslationKeys> = {
  en: {
    greeting: 'Hello',
    welcome: 'Welcome to Nai Diary!',
    login: 'Login',
    signup: 'Sign Up',
  },
  'pt-BR': {
    greeting: 'Olá',
    welcome: 'Bem-vinda ao Nai Diary!',
    login: 'Entrar',
    signup: 'Cadastrar',
  },
};

// Detecta idioma do navegador
function detectLanguage() {
  const lang = navigator.language || 'pt-BR';
  if (lang.startsWith('en')) return 'en';
  return 'pt-BR';
}

const LanguageContext = createContext({
  lang: 'pt-BR',
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lang = useMemo(() => detectLanguage(), []);
  const t = (key: string) => translations[lang]?.[key] || translations['pt-BR'][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 