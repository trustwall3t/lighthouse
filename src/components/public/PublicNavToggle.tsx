"use client";

import { useEffect } from "react";

/** Mobile nav toggle (matches silkroadaassets `layouts/base.blade.php`). */
export function PublicNavToggle() {
  useEffect(() => {
    const btn = document.querySelector(".sr-nav-toggle");
    if (!btn) return;

    const onClick = () => {
      const open = document.body.classList.toggle("sr-nav-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    };

    btn.addEventListener("click", onClick);
    return () => btn.removeEventListener("click", onClick);
  }, []);

  return null;
}
