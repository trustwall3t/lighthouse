import type { Testimonial } from "@/types/site";

/** Display-only locale hints for Trustpilot-style cards (Asia-Pacific weighted mix). */
const TP_COUNTRIES = [
  { code: "SG", flag: "🇸🇬" },
  { code: "HK", flag: "🇭🇰" },
  { code: "MY", flag: "🇲🇾" },
  { code: "TH", flag: "🇹🇭" },
  { code: "ID", flag: "🇮🇩" },
  { code: "PH", flag: "🇵🇭" },
  { code: "VN", flag: "🇻🇳" },
  { code: "IN", flag: "🇮🇳" },
  { code: "JP", flag: "🇯🇵" },
  { code: "KR", flag: "🇰🇷" },
  { code: "TW", flag: "🇹🇼" },
  { code: "AU", flag: "🇦🇺" },
  { code: "NZ", flag: "🇳🇿" },
  { code: "US", flag: "🇺🇸" },
  { code: "GB", flag: "🇬🇧" },
  { code: "AE", flag: "🇦🇪" },
  { code: "CN", flag: "🇨🇳" },
  { code: "BD", flag: "🇧🇩" },
  { code: "PK", flag: "🇵🇰" },
  { code: "MM", flag: "🇲🇲" },
];

function seedFromKey(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (Math.imul(31, h) + key.charCodeAt(i)) >>> 0;
  }
  return h;
}

function formatReviewDate(raw: string | null | undefined, seed: number): { label: string; iso: string } {
  if (raw) {
    const d = new Date(raw);
    if (!Number.isNaN(d.getTime())) {
      const iso = d.toISOString().slice(0, 10);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const atDay = new Date(d);
      atDay.setHours(0, 0, 0, 0);
      const daysAgo = Math.floor((today.getTime() - atDay.getTime()) / 86400000);
      if (daysAgo <= 0) return { label: "Today", iso };
      if (daysAgo === 1) return { label: "1 day ago", iso };
      if (daysAgo <= 30) return { label: `${daysAgo} days ago`, iso };
      return {
        label: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        iso,
      };
    }
  }
  const daysAgo = seed % 181;
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const iso = d.toISOString().slice(0, 10);
  if (daysAgo === 0) return { label: "Today", iso };
  if (daysAgo === 1) return { label: "1 day ago", iso };
  if (daysAgo <= 30) return { label: `${daysAgo} days ago`, iso };
  return {
    label: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    iso,
  };
}

export type EnrichedTestimonial = Testimonial & {
  countryCode: string;
  countryFlag: string;
  dateLabel: string;
  dateIso: string;
};

export function enrichTestimonials(reviews: Testimonial[]): EnrichedTestimonial[] {
  return reviews
    .filter((r) => r.body.trim() !== "")
    .slice(0, 15)
    .map((review) => {
      const seedKey = review.id != null ? `testimony-${review.id}` : review.name;
      const seed = seedFromKey(seedKey);
      const country = TP_COUNTRIES[seed % TP_COUNTRIES.length]!;
      const date = formatReviewDate(review.reviewedAt, seed + 17);
      return {
        ...review,
        countryCode: country.code,
        countryFlag: country.flag,
        dateLabel: date.label,
        dateIso: date.iso,
      };
    });
}
