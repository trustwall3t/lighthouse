import type { ComponentType } from "react";

type ScreenLoader = () => Promise<{ default: ComponentType<any> }>;

/** Single server entry for all /dashboard/* URLs (Vercel Hobby function limit). */
export const DASHBOARD_SCREENS: Record<string, ScreenLoader> = {
  "": () => import("./home"),
  deposit: () => import("./deposit"),
  withdraw: () => import("./withdraw"),
  plans: () => import("./plans"),
  copy: () => import("./copy"),
  "copy/history": () => import("./copy-history"),
  kyc: () => import("./kyc"),
  settings: () => import("./settings"),
  "live-trading": () => import("./live-trading"),
  "trading-history": () => import("./trading-history"),
  "transaction-history": () => import("./transaction-history"),
  "trade-scanner": () => import("./trade-scanner"),
  "trade-signals": () => import("./trade-signals"),
  "invite-friends": () => import("./invite-friends"),
};

export function dashboardRouteKey(segments?: string[]): string | null {
  if (!segments || segments.length === 0) return "";
  const key = segments.join("/");
  return key in DASHBOARD_SCREENS ? key : null;
}
