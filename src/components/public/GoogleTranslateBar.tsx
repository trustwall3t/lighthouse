"use client";

import { LanguagePicker } from "@/components/i18n/LanguagePicker";

/** Floating picker for public marketing (keeps clear of live-chat corner). */
export function GoogleTranslateBar() {
  return <LanguagePicker variant="float" />;
}
