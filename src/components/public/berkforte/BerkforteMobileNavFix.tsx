"use client";

import { useEffect } from "react";

const MOBILE_MQ = "(max-width: 991px)";

type BootstrapCollapse = {
  getInstance: (el: Element) => { dispose: () => void } | null;
};

function disposeBootstrapCollapse(nav: HTMLElement) {
  const Collapse = (window as Window & { bootstrap?: { Collapse?: BootstrapCollapse } })
    .bootstrap?.Collapse;
  Collapse?.getInstance(nav)?.dispose();
}

/** Reliable mobile hamburger — avoids Porto/Bootstrap double-toggle flicker. */
export function BerkforteMobileNavFix() {
  useEffect(() => {
    const root = document.querySelector(".berkforte-porto-page");
    if (!root) return;

    const btn = root.querySelector(
      ".header-btn-collapse-nav",
    ) as HTMLButtonElement | null;
    const nav = root.querySelector(
      "#lhw-mobile-nav, .header-nav-main > nav.collapse",
    ) as HTMLElement | null;

    if (!btn || !nav) return;

    if (!nav.id) nav.id = "lhw-mobile-nav";
    btn.setAttribute("aria-controls", nav.id);

    disposeBootstrapCollapse(nav);

    btn.removeAttribute("data-bs-toggle");
    btn.removeAttribute("data-bs-target");

    const mql = window.matchMedia(MOBILE_MQ);

    const syncChrome = (open: boolean) => {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.classList.toggle("active", open);
      document.documentElement.classList.toggle("mobile-menu-opened", open);
    };

    const isOpen = () => nav.classList.contains("show");

    const setOpen = (open: boolean) => {
      nav.classList.remove("collapsing");
      if (open) {
        nav.classList.add("show");
        nav.style.removeProperty("height");
      } else {
        nav.classList.remove("show");
        nav.style.removeProperty("height");
        root.querySelectorAll("#lhw-mobile-nav li.open").forEach((li) => {
          li.classList.remove("open");
        });
      }
      syncChrome(open);
    };

    const onHamburgerClick = (e: Event) => {
      if (!mql.matches) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      setOpen(!isOpen());
    };

    btn.addEventListener("click", onHamburgerClick, true);

    nav.querySelectorAll("a[href]").forEach((node) => {
      const a = node as HTMLAnchorElement;
      const href = a.getAttribute("href") ?? "";
      if (href === "#" || a.classList.contains("dropdown-toggle")) return;
      a.addEventListener("click", () => {
        if (mql.matches) setOpen(false);
      });
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen()) setOpen(false);
    };

    const onResize = () => {
      if (!mql.matches && isOpen()) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    syncChrome(isOpen());

    return () => {
      btn.removeEventListener("click", onHamburgerClick, true);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
