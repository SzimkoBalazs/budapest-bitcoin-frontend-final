"use client";

import { createContext, useContext, useState } from "react";

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState("en"); // Alapértelmezett nyelv: angol

  const switchLocale = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// Hook a használathoz
export function useLocale() {
  return useContext(LocaleContext);
}
