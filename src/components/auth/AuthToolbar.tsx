"use client";

import { LanguagePicker } from "@/components/i18n/LanguagePicker";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

/** Auth header actions — language + theme, no overlap with form content. */
export function AuthToolbar() {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <LanguagePicker variant="compact" />
      <ThemeToggle />
    </div>
  );
}
