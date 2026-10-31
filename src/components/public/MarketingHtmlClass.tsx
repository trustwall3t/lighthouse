"use client";

import { clearPublicDesktopLock } from "@/lib/public/desktop-lock";
import { SR_LAYOUT_WIDTH } from "@/lib/public/gg-layout-width";
import { useEffect } from "react";

function revealMarketingLayout(html: HTMLElement) {
  html.classList.remove("sr-desktop-boot");
  html.classList.add("sr-desktop-ready");
}

/** Applies Silk Road `sr-public` classes on marketing routes only. */
export function MarketingHtmlClass() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.classList.add("sr-desktop-lock", "sr-desktop-boot");
    html.classList.remove("dark");
    html.style.setProperty("--sr-desktop-lock-width", `${SR_LAYOUT_WIDTH}px`);
    html.style.colorScheme = "light";
    body.classList.add("sr-public", "sr-desktop-lock");

    const onReady = () => revealMarketingLayout(html);
    html.addEventListener("sr-desktop-ready", onReady);

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (html.classList.contains("sr-desktop-boot")) {
          revealMarketingLayout(html);
        }
      });
    });
    const timeout = window.setTimeout(onReady, 3000);

    return () => {
      html.removeEventListener("sr-desktop-ready", onReady);
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      clearPublicDesktopLock();
    };
  }, []);
  return null;
}
