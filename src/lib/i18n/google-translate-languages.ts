export const GOOGLE_TRANSLATE_PAGE_LANG = "en";

/** Business languages with Asia-Pacific coverage alongside English. */
export const GOOGLE_TRANSLATE_LANGUAGES: Record<string, string> = {
  en: "English",
  "zh-CN": "中文 (简体)",
  "zh-TW": "中文 (繁體)",
  ja: "日本語",
  ko: "한국어",
  id: "Bahasa Indonesia",
  ms: "Bahasa Melayu",
  th: "ไทย",
  vi: "Tiếng Việt",
  hi: "हिन्दी",
  ta: "தமிழ்",
  bn: "বাংলা",
  fil: "Filipino",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ar: "العربية",
  ru: "Русский",
};

export const GOOGLE_TRANSLATE_INCLUDED = Object.keys(
  GOOGLE_TRANSLATE_LANGUAGES,
).join(",");
