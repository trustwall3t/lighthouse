import { BERKFORTE_PUBLIC_SLUGS, type BerkfortePublicSlug } from "@/lib/berkforte/slugs";

/** URL slugs matching berkforte.com `routes/home.php`. */
export const PUBLIC_SLUGS = BERKFORTE_PUBLIC_SLUGS;

export type PublicSlug = BerkfortePublicSlug;

export function isPublicSlug(value: string): value is PublicSlug {
  return PUBLIC_SLUGS.includes(value as PublicSlug);
}

export type SlugMeta = {
  title: string;
  kicker: string;
  lead?: string;
};

export const SLUG_META: Record<PublicSlug, SlugMeta> = {
  about: { title: "About us", kicker: "About" },
  terms: { title: "Terms and conditions", kicker: "Terms" },
  privacy: { title: "Privacy policy", kicker: "Privacy" },
  futures: { title: "Futures trading", kicker: "Futures" },
  forex: { title: "Forex trading", kicker: "Forex" },
  stocks: { title: "Stock trading", kicker: "Stocks" },
  advancetrading: { title: "Crypto trading", kicker: "Crypto" },
  oilandgas: { title: "Real estate", kicker: "Real estate" },
  livetrading: { title: "NFTs trading", kicker: "NFTs" },
  softwares: { title: "Metaverse", kicker: "Metaverse" },
  optioncopytrading: { title: "Why choose us", kicker: "Company" },
  contact: { title: "Agriculture", kicker: "Services" },
  faq: { title: "FAQs", kicker: "FAQ" },
  statistic: { title: "Statistics", kicker: "Statistics" },
  investments: { title: "Investment plan", kicker: "Investors" },
};
