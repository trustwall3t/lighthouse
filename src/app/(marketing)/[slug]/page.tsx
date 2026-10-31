import { BerkfortePortoPage } from "@/components/public/berkforte/BerkfortePortoPage";
import { BERKFORTE_PUBLIC_SLUGS, isBerkfortePublicSlug } from "@/lib/berkforte/slugs";
import { isPublicSlug, SLUG_META } from "@/content/public-slugs";
import { getHomePayload, getPublicSite } from "@/lib/public/home-payload";
import { notFound } from "next/navigation";

export const revalidate = 300;

export function generateStaticParams() {
  return BERKFORTE_PUBLIC_SLUGS.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!isPublicSlug(slug)) return {};
  const site = await getPublicSite();
  const meta = SLUG_META[slug];
  return {
    title: `${meta.title} | ${site.siteName}`,
  };
}

export default async function PublicSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!isBerkfortePublicSlug(slug)) notFound();

  const site = await getPublicSite();
  const home = slug === "statistic" ? await getHomePayload() : null;

  return (
    <BerkfortePortoPage
      slug={slug}
      logoUrl={site.logoUrl}
      siteName={site.siteName}
      contactEmail={site.contactEmail}
      stats={home?.stats ?? null}
    />
  );
}
