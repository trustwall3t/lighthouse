/** Bump when replacing files in /public to bust browser & Next image cache. */
const LOGO_CACHE_VERSION = "hana-fidelity-1";

function brandAsset(path: string): string {
	return `${path}?v=${LOGO_CACHE_VERSION}`;
}

/** Dark-colored mark for light backgrounds (auth/dashboard light mode). */
export const SITE_LOGO_URL_ON_LIGHT_BG = brandAsset("/logo.png");

/** Light-colored mark for dark backgrounds (auth/dashboard dark mode). */
export const SITE_LOGO_URL_ON_DARK_BG = brandAsset("/logo-black.png");

/** Used by `ThemeLogo` in light mode. */
export const SITE_LOGO_URL_LIGHT_THEME = SITE_LOGO_URL_ON_LIGHT_BG;

/** Used by `ThemeLogo` in dark mode. */
export const SITE_LOGO_URL_DARK_THEME = SITE_LOGO_URL_ON_DARK_BG;

/** Default for public marketing, metadata, and JSON payloads. */
export const SITE_LOGO_URL = SITE_LOGO_URL_ON_LIGHT_BG;
