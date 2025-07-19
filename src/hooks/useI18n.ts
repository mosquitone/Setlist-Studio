/**
 * i18n Hook for React Components
 * 多言語サポート用のカスタムフック
 */

import { Language } from '@/lib/i18n/messages';

export { useI18n } from '@/components/providers/I18nProvider';

// 言語切り替えコンポーネント用の型
export interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
}

export const languageOptions: LanguageOption[] = [
  { value: 'ja', label: '日本語', flag: '🇯🇵' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
];
