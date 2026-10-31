/** Client-side gate (matches server `isGoogleTranslateEnabled` env rules). */
export function isGoogleTranslateClientEnabled(): boolean {
  return process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE !== "0";
}
