import { BerkfortePortoPage } from "@/components/public/berkforte/BerkfortePortoPage";
import { getPublicSite } from "@/lib/public/home-payload";

export const revalidate = 60;

export default async function MarketingHomePage() {
  const site = await getPublicSite();

  return (
    <BerkfortePortoPage
      slug="home"
      logoUrl={site.logoUrl}
      siteName={site.siteName}
      contactEmail={site.contactEmail}
    />
  );
}
