/** Pinnacle Wealth FX — aligned with dashboard globals & marketing `.btn-primary`. */
export const EMAIL_BRAND = {
  primary: "#0088cc",
  primaryDark: "#0077b3",
  primarySoft: "#e6f4fb",
  navy: "#0e4152",
  navyMuted: "#1a5a72",
  text: "#243041",
  textMuted: "#6b7280",
  textFaint: "#9ca3af",
  border: "#e5e7eb",
  canvas: "#f0f4f8",
  card: "#ffffff",
  success: "#0d7a4f",
} as const;

export function emailMoney(amount: number): string {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
