/** Public marketing slugs backed by Berk Forte Porto HTML (excludes `/` home key). */
export const BERKFORTE_PUBLIC_SLUGS = [
  "about",
  "terms",
  "privacy",
  "futures",
  "forex",
  "stocks",
  "advancetrading",
  "oilandgas",
  "livetrading",
  "softwares",
  "optioncopytrading",
  "contact",
  "faq",
  "statistic",
  "investments",
] as const;

export type BerkfortePublicSlug = (typeof BERKFORTE_PUBLIC_SLUGS)[number];

export function isBerkfortePublicSlug(value: string): value is BerkfortePublicSlug {
  return (BERKFORTE_PUBLIC_SLUGS as readonly string[]).includes(value);
}
