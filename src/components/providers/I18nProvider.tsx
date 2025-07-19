'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, Messages, getMessages, detectLanguage } from '@/lib/i18n/messages';

interface I18nContextValue {
  lang: Language;
  messages: Messages;
  changeLanguage: (newLang: Language) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [lang, setLang] = useState<Language>('ja');
  const [messages, setMessages] = useState<Messages>(getMessages('ja'));

  useEffect(() => {
    // ローカルストレージから保存された言語設定を読み込む
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'ja' || savedLang === 'en')) {
      setLang(savedLang);
      setMessages(getMessages(savedLang));
    } else {
      // 保存された言語がない場合、ブラウザの言語設定を検出
      const browserLang = detectLanguage(navigator.language || navigator.languages?.[0]);
      setLang(browserLang);
      setMessages(getMessages(browserLang));
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    setMessages(getMessages(newLang));
    localStorage.setItem('language', newLang);
  };

  const value = {
    lang,
    messages,
    changeLanguage,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
