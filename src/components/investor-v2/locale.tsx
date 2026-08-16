import React from "react";
import type { LocaleCode } from "@/content/investor";
import { trackInvestorEvent } from "@/lib/analytics";

const STORAGE_KEY = "cb_lang";

type LocaleContextValue = {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  toggleLocale: () => void;
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

function readInitialLocale(): LocaleCode {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "vi" ? "vi" : "en";
}

export function InvestorLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<LocaleCode>(readInitialLocale);

  const setLocale = React.useCallback((next: LocaleCode) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
    trackInvestorEvent("investor_language_changed", { locale: next });
  }, []);

  const toggleLocale = React.useCallback(() => {
    setLocale(locale === "en" ? "vi" : "en");
  }, [locale, setLocale]);

  const value = React.useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useInvestorLocale() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useInvestorLocale must be used within InvestorLocaleProvider");
  return ctx;
}
