import { AsianFinancialInstitutionsBar } from "@/components/public/AsianFinancialInstitutionsBar";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import type { SiteInfo } from "@/types/site";
import type { ReactNode } from "react";

type Props = {
  site: SiteInfo;
  children: ReactNode;
};

export function PublicPageShell({ site, children }: Props) {
  return (
    <div className="sr-shell">
      <PublicHeader brandName={site.siteName} />
      <AsianFinancialInstitutionsBar />
      <main className="sr-main">{children}</main>
      <PublicFooter brandName={site.siteName} />
    </div>
  );
}
