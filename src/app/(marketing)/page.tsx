import { BerkfortePortoPage } from "@/components/public/berkforte/BerkfortePortoPage";
import { getHomePayload, getPublicSite } from "@/lib/public/home-payload";

export const revalidate = 60;

export default async function MarketingHomePage() {
  const [site, home] = await Promise.all([getPublicSite(), getHomePayload()]);

  return (
    <BerkfortePortoPage
      slug="home"
      logoUrl={site.logoUrl}
      siteName={site.siteName}
      contactEmail={site.contactEmail}
      stats={home.stats}
    />
  );
}
