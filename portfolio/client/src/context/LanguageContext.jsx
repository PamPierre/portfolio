import React, { createContext, useContext, useEffect, useState } from "react";
import i18next from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translations from "../data/translations.js";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: translations.fr },
      en: { translation: translations.en },
    },
    fallbackLng: "fr",
    supportedLngs: ["fr", "en"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(i18next.resolvedLanguage || "fr");

  const setLanguage = (lng) => {
    i18next.changeLanguage(lng);
    setLanguageState(lng);
  };

  const toggleLanguage = () => setLanguage(language === "fr" ? "en" : "fr");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <I18nextProvider i18n={i18next}>
      <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage doit être utilisé dans un LanguageProvider");
  return ctx;
};
