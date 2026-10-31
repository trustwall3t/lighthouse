/**
 * Public CTAs → this app’s auth routes (full page load clears marketing viewport).
 * On marketing pages use a plain `<a href={…}>` (full page load), not `<Link>`,
 * so mobile browsers drop the 1200px marketing viewport before auth renders.
 */
export const authLoginUrl = "/auth/login";
export const authSignupUrl = "/auth/signup";
export const authForgotPasswordUrl = "/auth/forgot-password";
