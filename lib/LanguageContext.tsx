"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationSet, Locale } from "./translations";

interface LanguageContextProps {
  lang: Locale;
  t: TranslationSet;
  toggleLang: (target: Locale) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Locale;
}) {
  const [lang, setLangState] = useState<Locale>(initialLang);

  useEffect(() => {
    // Check localStorage on mount
    const savedLang = localStorage.getItem("lang") as Locale | null;
    if (savedLang && (savedLang === "es" || savedLang === "en") && savedLang !== lang) {
      setLangState(savedLang);
      // Sync URL with stored preference without reload
      const newPath = window.location.pathname.replace(/^\/(es|en)/, `/${savedLang}`);
      window.history.pushState(null, "", newPath);
    }
  }, []);

  const toggleLang = (target: Locale) => {
    if (target === lang) return;
    setLangState(target);
    localStorage.setItem("lang", target);

    // Swap URL path segment without trigger-reloading the page
    const newPath = window.location.pathname.replace(/^\/(es|en)/, `/${target}`);
    window.history.pushState(null, "", newPath);
  };

  const t = translations[lang] as TranslationSet;

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
