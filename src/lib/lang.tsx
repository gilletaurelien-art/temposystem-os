import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "fr" | "en";

const STORAGE_KEY = "temposystem_lang";

function detectLanguage(): Language {
  if (typeof window === "undefined") return "fr";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "fr" || stored === "en") return stored;
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "fr";
}

interface LangContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LangContext = createContext<LangContextValue>({ lang: "fr", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(detectLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Sélectionne la variante FR/EN d'un contenu bilingue. */
export type Bilingual<T> = { fr: T; en: T };
export function pick<T>(content: Bilingual<T>, lang: Language): T {
  return content[lang];
}
