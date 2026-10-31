export type MarketingLanguage = {
  /** Google Translate target code (page language is always `en`). */
  code: string;
  label: string;
  /** ISO 3166-1 alpha-2 for flagcdn.com */
  country: string;
  /** Shown in the header quick row */
  quick?: boolean;
};

export const MARKETING_LANGUAGES: MarketingLanguage[] = [
  { code: "en", label: "English", country: "gb", quick: true },
  { code: "de", label: "Deutsch", country: "de", quick: true },
  { code: "fr", label: "Français", country: "fr", quick: true },
  { code: "es", label: "Español", country: "es", quick: true },
  { code: "pt", label: "Português", country: "pt" },
  { code: "ar", label: "Arabic", country: "sa" },
  { code: "it", label: "Italiano", country: "it" },
  { code: "id", label: "Indonesian", country: "id" },
  { code: "tl", label: "Filipino", country: "ph" },
  { code: "vi", label: "Tiếng Việt", country: "vn" },
  { code: "th", label: "ไทย", country: "th" },
  { code: "fa", label: "Persian", country: "ir" },
  { code: "zh-CN", label: "中文 (简体)", country: "cn" },
  { code: "ja", label: "日本語", country: "jp" },
  { code: "ko", label: "한국어", country: "kr" },
  { code: "ru", label: "Русский", country: "ru" },
  { code: "hi", label: "हिन्दी", country: "in" },
];

export function marketingFlagUrl(country: string): string {
  return `https://flagcdn.com/24x18/${country}.png`;
}

export function marketingLanguageByCode(code: string): MarketingLanguage | undefined {
  return MARKETING_LANGUAGES.find((l) => l.code === code);
}
