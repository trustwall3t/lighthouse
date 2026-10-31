"use client";

import {
  GOOGLE_TRANSLATE_INCLUDED,
  GOOGLE_TRANSLATE_PAGE_LANG,
} from "@/lib/i18n/google-translate-languages";
import { isGoogleTranslateClientEnabled } from "@/lib/i18n/google-translate-client-enabled";
import Script from "next/script";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Ctx = {
  registerPicker: () => () => void;
};

const GoogleTranslateContext = createContext<Ctx | null>(null);

export function GoogleTranslateProvider({ children }: { children: ReactNode }) {
  const [pickerCount, setPickerCount] = useState(0);
  const enabled = isGoogleTranslateClientEnabled();

  const registerPicker = useCallback(() => {
    setPickerCount((n) => n + 1);
    return () => setPickerCount((n) => Math.max(0, n - 1));
  }, []);

  const value = useMemo(() => ({ registerPicker }), [registerPicker]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <GoogleTranslateContext.Provider value={value}>
      {pickerCount > 0 ? (
        <>
          <div
            id="google_translate_element"
            className="sr-gtranslate-engine"
            aria-hidden="true"
          />
          <Script id="google-translate-init" strategy="afterInteractive">
            {`
              function googleTranslateElementInit() {
                if (!window.google || !google.translate || !google.translate.TranslateElement) return;
                new google.translate.TranslateElement(
                  {
                    pageLanguage: ${JSON.stringify(GOOGLE_TRANSLATE_PAGE_LANG)},
                    includedLanguages: ${JSON.stringify(GOOGLE_TRANSLATE_INCLUDED)},
                    autoDisplay: false,
                  },
                  'google_translate_element'
                );
              }
            `}
          </Script>
          <Script
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            strategy="afterInteractive"
          />
          <Script src="/main/js/google-translate-picker.js" strategy="afterInteractive" />
        </>
      ) : null}
      {children}
    </GoogleTranslateContext.Provider>
  );
}

export function useGoogleTranslatePickerRegistration(): () => void {
  const ctx = useContext(GoogleTranslateContext);
  return ctx?.registerPicker ?? (() => () => {});
}
