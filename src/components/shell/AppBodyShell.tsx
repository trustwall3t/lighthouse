"use client";

import DynamicStyles from "@/components/DynamicStyles";
import { PublicDesktopLockLifecycle } from "@/components/public/PublicDesktopLockLifecycle";
import SmartsuppScript from "@/components/SmartsuppScript";
import { GoogleTranslateProvider } from "@/components/i18n/GoogleTranslateProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { isPublicMarketingRoute } from "@/lib/public/marketing-routes";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

type Props = { children: ReactNode };

export function AppBodyShell({ children }: Props) {
  const pathname = usePathname() ?? "";
  const isMarketing = isPublicMarketingRoute(pathname);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isMarketing) {
      html.classList.add("berkforte-html");
      html.classList.remove(geistSans.variable, geistMono.variable);
      body.className = "berkforte-public";
    } else {
      html.classList.remove("berkforte-html");
      html.classList.add(geistSans.variable, geistMono.variable);
      body.className = `${geistSans.variable} ${geistMono.variable} font-sans`.trim();
    }
  }, [isMarketing]);

  if (isMarketing) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider>
      <GoogleTranslateProvider>
        <PublicDesktopLockLifecycle />
        <DynamicStyles />
        <SmartsuppScript />
        {children}
        <Toaster />
      </GoogleTranslateProvider>
    </ThemeProvider>
  );
}
