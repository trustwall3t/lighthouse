"use client";

import { useEffect } from "react";

function isGoogleTranslateOverlay(node: Element): boolean {
  if (node.id === "goog-gt-tt") return true;
  const name = node.className;
  if (typeof name !== "string" || !name) return false;
  return (
    name.includes("VIpgJd") ||
    name.includes("skiptranslate") ||
    name.includes("goog-te") ||
    name.includes("goog-te-")
  );
}

function neutralizeGoogleTranslateOverlays() {
  document.querySelectorAll("body > iframe, body > div").forEach((node) => {
    if (!isGoogleTranslateOverlay(node)) return;
    const el = node as HTMLElement;
    el.style.setProperty("pointer-events", "none", "important");
    el.style.setProperty("visibility", "hidden", "important");
    el.style.setProperty("display", "none", "important");
    el.style.setProperty("width", "0", "important");
    el.style.setProperty("height", "0", "important");
    el.style.setProperty("opacity", "0", "important");
    el.setAttribute("aria-hidden", "true");
  });
}

/** Google Translate injects body-level layers that sit above the Porto modal and block clicks. */
export function BerkforteTranslateOverlayFix() {
  useEffect(() => {
    neutralizeGoogleTranslateOverlays();

    const observer = new MutationObserver(() => {
      neutralizeGoogleTranslateOverlays();
    });
    observer.observe(document.body, { childList: true, subtree: false });

    const interval = window.setInterval(neutralizeGoogleTranslateOverlays, 1500);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  return null;
}
