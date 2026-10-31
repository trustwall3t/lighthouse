/** Public marketing Google Translate widget (SiteSettings + optional env override). */
export function isGoogleTranslateEnabled(siteFlag: boolean): boolean {
  if (process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE === "0") return false;
  if (process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE === "1") return true;
  return siteFlag;
}
