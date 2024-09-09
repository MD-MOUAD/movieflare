import { createContext, useState, useContext } from 'react';
import { languageQuery, savedLanguage } from "../i18n";

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return savedLanguage ? languageQuery[savedLanguage] : "en-US";
  });

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
