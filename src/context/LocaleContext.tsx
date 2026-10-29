/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, uiStrings } from '../data/quizData';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('learnertype_locale');
      if (saved === 'pt' || saved === 'en' || saved === 'ko') {
        setLocaleState(saved as Locale);
      } else {
        // Detect browser language
        const navLang = navigator.language.toLowerCase();
        if (navLang.startsWith('ko')) {
          setLocaleState('ko');
        } else if (navLang.startsWith('en')) {
          setLocaleState('en');
        } else {
          // Default to Brazilian Portuguese
          setLocaleState('pt');
        }
      }
    } catch {
      // Fallback to pt
      setLocaleState('pt');
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('learnertype_locale', newLocale);
      document.documentElement.lang = newLocale === 'pt' ? 'pt-BR' : newLocale;
    } catch {
      // ignore
    }
  };

  const t = (path: string, params?: Record<string, string | number>): string => {
    const keys = path.split('.');
    let cur: any = uiStrings[locale] || uiStrings.pt;
    for (const k of keys) {
      if (cur && typeof cur === 'object' && k in cur) {
        cur = cur[k];
      } else {
        // fallback to pt
        let fb: any = uiStrings.pt;
        for (const fbk of keys) {
          if (fb && typeof fb === 'object' && fbk in fb) {
            fb = fb[fbk];
          } else {
            return path;
          }
        }
        cur = fb;
        break;
      }
    }

    if (typeof cur === 'string') {
      if (params) {
        let res = cur;
        for (const [pk, pv] of Object.entries(params)) {
          res = res.replace(new RegExp(`\\{${pk}\\}`, 'g'), String(pv));
        }
        return res;
      }
      return cur;
    }
    return path;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return ctx;
}
