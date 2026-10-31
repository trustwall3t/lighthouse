import { getPublicSite } from '@/lib/public/home-payload';
import { SITE_LOGO_URL } from '@/lib/public/site-logo';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../berkforte-marketing.css';
import '../berkforte-lang-picker.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getPublicSite();
  return {
    title: {
      default: `${site.siteName} | Welcome`,
      template: `%s | ${site.siteName}`,
    },
    description:
      site.description ||
      site.welcomeMessage ||
      'Online trading, investments, and copy trading.',
    icons: { icon: SITE_LOGO_URL },
  };
}

/** Berk Forte Porto marketing — no Silk Road / dashboard shell. */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return children;
}
