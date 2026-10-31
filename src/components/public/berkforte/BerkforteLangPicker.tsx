"use client";

import {
  MARKETING_LANGUAGES,
  marketingFlagUrl,
  marketingLanguageByCode,
} from "@/lib/berkforte/marketing-languages";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** Same preview flags as original Porto header (local assets, same order). */
const HEADER_PREVIEW_FLAGS = [
  { src: "/front/img/lang/de.png", code: "de", title: "Deutsch" },
  { src: "/front/img/lang/fr.png", code: "fr", title: "Français" },
  { src: "/front/img/lang/en.png", code: "en", title: "English" },
] as const;

declare global {
  interface Window {
    doGTranslate?: (arg: string | { value: string }) => void;
  }
}

function readActiveLang(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return "en";
  const parts = decodeURIComponent(match[1]).split("/").filter(Boolean);
  return parts[parts.length - 1] || "en";
}

function translateTo(code: string) {
  window.doGTranslate?.(`en|${code}`);
}

function activeLabel(code: string): string {
  if (code === "en") return "EN";
  const lang = marketingLanguageByCode(code);
  if (!lang) return code.toUpperCase().slice(0, 2);
  if (lang.code.length <= 3) return lang.code.toUpperCase();
  return lang.label.slice(0, 2).toUpperCase();
}

export function BerkforteLangPicker() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("en");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = document.querySelector(
      ".berkforte-porto-page .lhw-lang-trigger",
    )?.closest("li.nav-item") as HTMLElement | null;
    if (!item) return;

    item.innerHTML = "";
    setHost(item);
    setActive(readActiveLang());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = useCallback((code: string) => {
    translateTo(code);
    setActive(code);
    setOpen(false);
  }, []);

  if (!host) return null;

  return createPortal(
    <div className="lhw-lang-picker-root" ref={rootRef}>
      <a
        href="#"
        className="lhw-lang-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
      >
        {HEADER_PREVIEW_FLAGS.map((flag) => (
          <img
            key={flag.code}
            className="ls-flag"
            src={flag.src}
            alt=""
            title={flag.title}
          />
        ))}
        <span className="wpml-ls-native">
          {activeLabel(active)}
          <i className="fa fa-caret-down" aria-hidden="true" />
        </span>
      </a>

      {open ? (
        <div className="lhw-lang-picker__menu" role="listbox" aria-label="Select language">
          {MARKETING_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={lang.code === active}
              className={`lhw-lang-picker__option${lang.code === active ? " is-active" : ""}`}
              onClick={() => pick(lang.code)}
            >
              <img src={marketingFlagUrl(lang.country)} alt="" width={24} height={18} loading="lazy" />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>,
    host,
  );
}
