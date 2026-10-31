import { AppBodyShell } from "@/components/shell/AppBodyShell";
import { defaultAppViewport } from "@/lib/public/gg-viewport-server";
import { DEFAULT_SITE_NAME } from "@/lib/site/default-brand";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export async function generateViewport(): Promise<Viewport> {
  return defaultAppViewport;
}

export const metadata: Metadata = {
  title: {
    default: DEFAULT_SITE_NAME,
    template: "%s",
  },
  description:
    "Live trading, forex, stocks, commodities, investment plans, and member dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppBodyShell>{children}</AppBodyShell>
      </body>
    </html>
  );
}
