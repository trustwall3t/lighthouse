import { BerkforteVerifyGate } from "@/components/public/berkforte/BerkforteVerifyGate";
import { getPublicSite } from "@/lib/public/home-payload";
import { randomBytes } from "node:crypto";

export const dynamic = "force-dynamic";

function makeCaptchaCode(): string {
  return randomBytes(3).toString("hex").toUpperCase();
}

export default async function VerifyPage() {
  const site = await getPublicSite();
  const code = makeCaptchaCode();

  return <BerkforteVerifyGate logoUrl={site.logoUrl} initialCode={code} />;
}
