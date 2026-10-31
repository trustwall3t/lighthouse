import publicPages from "@/data/public-pages.json";
import publicFaq from "@/data/public-faq.json";
import type { PublicSlug } from "@/content/public-slugs";

export type PublicPageSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type PublicPageRecord = {
  title?: string;
  subtitle?: string;
  intro?: string;
  bullets?: string[];
  sections?: PublicPageSection[];
  software_items?: { name?: string; body?: string }[];
  image?: string;
  showRegionalMarkets?: boolean;
  marketsTitle?: string;
  marketsLead?: string;
  paragraphs?: string[];
  support_lead?: string;
  address?: string;
  phone?: string;
  phone_href?: string;
};

const pages = publicPages as Record<string, PublicPageRecord>;

export function publicPageKeyForSlug(slug: PublicSlug): string {
  if (slug === "investments") return "investment";
  if (slug === "statistic") return "statistics";
  return slug;
}

export function withBrandValue<T>(value: T, brand: string): T {
  if (typeof value === "string") {
    return value.replaceAll(":brand", brand) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => withBrandValue(item, brand)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = withBrandValue(v, brand);
    }
    return out as T;
  }
  return value;
}

export function getPublicPage(slug: PublicSlug, siteName: string): PublicPageRecord {
  const key = publicPageKeyForSlug(slug);
  const raw = pages[key] ?? {};
  return withBrandValue(raw, siteName.trim() || "Our platform");
}

export function getMarketingPageProps(slug: PublicSlug, siteName: string) {
  const page = getPublicPage(slug, siteName);
  const image = page.image ?? "main/img/brokerage_PlatformsPicks.png";
  const imageSrc = image.startsWith("http") ? image : `/${image.replace(/^\//, "")}`;
  const imagePath = imageSrc.split("?")[0] ?? "";
  const isLogo =
    /\.svg$/i.test(imagePath) || /logo/i.test(imagePath.split("/").pop() ?? "");

  return {
    pageTitle: page.title ?? slug,
    subtitle: page.subtitle ?? "",
    intro: page.intro ?? "",
    bullets: page.bullets ?? [],
    sections: page.sections ?? [],
    softwareItems: (page.software_items ?? []).map((item) => ({
      name: item.name ?? "",
      body: item.body ?? "",
    })),
    image: imageSrc,
    isLogo,
    showRegionalMarkets: Boolean(page.showRegionalMarkets),
    marketsTitle: page.marketsTitle,
    marketsLead: page.marketsLead,
  };
}

export function getStaticFaqItems(siteName: string): { question: string; answer: string }[] {
  const items = (publicFaq as { items?: { question?: string; answer?: string; q?: string; a?: string }[] })
    .items ?? publicFaq;
  if (!Array.isArray(items)) return [];

  const brand = siteName.trim() || "Our platform";
  return items
    .map((row) => {
      const question = (row.question ?? row.q ?? "").trim();
      const answer = (row.answer ?? row.a ?? "").trim();
      if (!question || !answer) return null;
      return {
        question: question.replaceAll(":brand", brand),
        answer: answer.replaceAll(":brand", brand),
      };
    })
    .filter((x): x is { question: string; answer: string } => x !== null);
}
