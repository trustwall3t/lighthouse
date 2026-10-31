import type { ComponentType } from "react";

type ScreenLoader = () => Promise<{ default: ComponentType<any> }>;

export const ADMIN_SCREENS: Record<string, ScreenLoader> = {
  "": () => import("./home"),
  plans: () => import("./plans"),
  deposit: () => import("./deposit"),
  withdrawal: () => import("./withdrawal"),
  transactions: () => import("./transactions"),
  trade: () => import("./trade"),
  livetrade: () => import("./livetrade"),
  users: () => import("./users"),
  kyc: () => import("./kyc"),
  settings: () => import("./settings"),
  "copy-traders": () => import("./copy-traders"),
};

export function adminRouteKey(
  segments?: string[],
): { kind: "screen"; key: string } | { kind: "user"; id: string } | null {
  if (!segments || segments.length === 0) return { kind: "screen", key: "" };
  if (segments.length === 2 && segments[0] === "users") {
    return { kind: "user", id: segments[1]! };
  }
  const key = segments.join("/");
  if (key in ADMIN_SCREENS) return { kind: "screen", key };
  return null;
}
