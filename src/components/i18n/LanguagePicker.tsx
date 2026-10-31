"use client";

import {
  GOOGLE_TRANSLATE_LANGUAGES,
  GOOGLE_TRANSLATE_PAGE_LANG,
} from "@/lib/i18n/google-translate-languages";
import { isGoogleTranslateClientEnabled } from "@/lib/i18n/google-translate-client-enabled";
import { Languages } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGoogleTranslatePickerRegistration } from "@/components/i18n/GoogleTranslateProvider";

type Variant = "float" | "compact";

type Props = {
  variant?: Variant;
  className?: string;
};

export function LanguagePicker({ variant = "compact", className }: Props) {
  const register = useGoogleTranslatePickerRegistration();

  useEffect(() => {
    if (!isGoogleTranslateClientEnabled()) return;
    const unregister = register();
    return unregister;
  }, [register]);

  useEffect(() => {
    if (!isGoogleTranslateClientEnabled()) return;
    const run = () => {
      const init = (
        window as Window & { __srInitGtranslatePickers?: () => void }
      ).__srInitGtranslatePickers;
      init?.();
    };
    run();
    const t = window.setTimeout(run, 300);
    return () => window.clearTimeout(t);
  }, []);

  if (!isGoogleTranslateClientEnabled()) {
    return null;
  }

  if (variant === "float") {
    return (
      <aside
        className={cn("sr-gtranslate-float", className)}
        data-sr-lang-picker
        data-page-lang={GOOGLE_TRANSLATE_PAGE_LANG}
        aria-label="Translate this page"
      >
        <p className="sr-gtranslate-float__title">Language</p>
        <select
          data-sr-gtranslate-select
          className="sr-gtranslate-select"
          aria-label="Choose language"
          defaultValue={GOOGLE_TRANSLATE_PAGE_LANG}
        >
          {Object.entries(GOOGLE_TRANSLATE_LANGUAGES).map(([code, label]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
        <p className="sr-gtranslate-float__hint">Page reloads after you pick a language.</p>
      </aside>
    );
  }

  return (
    <div
      className={cn("gg-lang-picker", className)}
      data-sr-lang-picker
      data-page-lang={GOOGLE_TRANSLATE_PAGE_LANG}
    >
      <Languages className="gg-lang-picker__icon h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      <select
        data-sr-gtranslate-select
        className="gg-lang-picker__select"
        aria-label="Choose language"
        defaultValue={GOOGLE_TRANSLATE_PAGE_LANG}
      >
        {Object.entries(GOOGLE_TRANSLATE_LANGUAGES).map(([code, label]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
