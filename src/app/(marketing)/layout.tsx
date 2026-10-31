import { SITE_LOGO_URL } from '@/lib/public/site-logo';
import { DEFAULT_SITE_NAME } from '@/lib/site/default-brand';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../berkforte-marketing.css';
import '../berkforte-lang-picker.css';

export const metadata: Metadata = {
  title: {
    default: `${DEFAULT_SITE_NAME} | Welcome`,
    template: `%s | ${DEFAULT_SITE_NAME}`,
  },
  description:
    "Online trading, investments, and copy trading.",
  icons: { icon: SITE_LOGO_URL },
};

/** Berk Forte Porto marketing — no Silk Road / dashboard shell. */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return children;
}
