/**
 * i18n Context Helper
 * GraphQLコンテキスト用の言語検出とメッセージ取得
 */

import { getMessages, detectLanguage, Language, Messages } from './messages';

export interface I18nContext {
  lang: Language;
  messages: Messages;
}

/**
 * HTTPヘッダーから言語設定を取得してi18nコンテキストを作成
 */
export function createI18nContext(headers?: { [key: string]: string }): I18nContext {
  const acceptLanguage = headers?.['accept-language'] || headers?.['Accept-Language'];
  const lang = detectLanguage(acceptLanguage);
  const messages = getMessages(lang);

  return {
    lang,
    messages,
  };
}

/**
 * GraphQLコンテキストにi18n機能を追加
 */
export function withI18n<T extends { req?: { headers?: { [key: string]: string } } }>(
  context: T,
): T & { i18n: I18nContext } {
  const headers = context.req?.headers;
  const i18n = createI18nContext(headers);

  return {
    ...context,
    i18n,
  };
}
