"use client";

import { PublicBootLoader } from "@/components/brand/BrandLoader";
import { useEffect, useState } from "react";

/** Branded splash while marketing desktop-lock bootstraps. */
export function PublicBootGate() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const html = document.documentElement;

    const done = () => {
      if (html.classList.contains("sr-desktop-ready")) {
        setBooting(false);
      }
    };

    done();
    html.addEventListener("sr-desktop-ready", done);
    const timeout = window.setTimeout(done, 3200);

    return () => {
      html.removeEventListener("sr-desktop-ready", done);
      window.clearTimeout(timeout);
    };
  }, []);

  if (!booting) return null;
  return <PublicBootLoader />;
}
