import "server-only";

import { BerkfortePortoAssets } from "@/components/public/berkforte/BerkfortePortoAssets";
import { BerkfortePortoReveal } from "@/components/public/berkforte/BerkfortePortoReveal";
import { BerkforteGTranslate } from "@/components/public/berkforte/BerkforteGTranslate";
import { BerkforteLangPicker } from "@/components/public/berkforte/BerkforteLangPicker";
import { BerkforteMobileNavFix } from "@/components/public/berkforte/BerkforteMobileNavFix";
import { BerkforteTranslateOverlayFix } from "@/components/public/berkforte/BerkforteTranslateOverlayFix";
import { BerkforteWordRotator } from "@/components/public/berkforte/BerkforteWordRotator";
import { renderBerkfortePortoPageHtml } from "@/lib/berkforte/load-page";
import type { BerkfortePublicSlug } from "@/lib/berkforte/slugs";
import { SITE_LOGO_URL } from "@/lib/public/site-logo";
import { DEFAULT_SITE_NAME } from "@/lib/site/default-brand";
import type { HomeStats } from "@/types/site";

type Props = {
  slug: "home" | BerkfortePublicSlug;
  logoUrl?: string;
  siteName?: string;
  contactEmail?: string | null;
  stats?: HomeStats | null;
};

export function BerkfortePortoPage({
  slug,
  logoUrl = SITE_LOGO_URL,
  siteName = DEFAULT_SITE_NAME,
  contactEmail = null,
  stats = null,
}: Props) {
  const html = renderBerkfortePortoPageHtml(slug, {
    logoUrl,
    siteName,
    contactEmail,
    stats,
  });

  return (
    <>
      <BerkfortePortoAssets />
      <BerkforteGTranslate />
      <BerkforteTranslateOverlayFix />
      <BerkforteLangPicker />
      <BerkforteMobileNavFix />
      <BerkfortePortoReveal />
      <BerkforteWordRotator />
      <div className="berkforte-porto-page" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
