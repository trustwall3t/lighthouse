import { AuthToolbar } from "@/components/auth/AuthToolbar";
import { BerkforteGuestAssets } from "@/components/public/berkforte/BerkforteGuestAssets";
import { SITE_LOGO_URL } from "@/lib/public/site-logo";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  logoUrl?: string;
  sideTitle: string;
  sideLead: string;
  sideImageSrc: string;
  sideImageClass?: string;
};

export function BerkforteGuestShell({
  children,
  logoUrl = SITE_LOGO_URL,
  sideTitle,
  sideLead,
  sideImageSrc,
  sideImageClass = "w-100",
}: Props) {
  return (
    <>
      <BerkforteGuestAssets />
      <section
        style={{ minHeight: "100vh" }}
        className="berkforte-guest-auth d-flex align-items-center justify-content-center"
      >
        <div className="berkforte-guest-auth__toolbar">
          <AuthToolbar />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card rounded berkforte-guest-auth__card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-7 d-none d-md-flex align-items-center justify-content-center">
                      <div>
                        <h2 className="mb-0">{sideTitle}</h2>
                        <p>{sideLead}</p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={sideImageSrc} alt="" className={sideImageClass} />
                      </div>
                    </div>
                    <div className="col-md-5 pt-md-4">
                      <div className="text-center mb-3">
                        <Link href="/">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={logoUrl} alt="Logo" className="w-50" />
                        </Link>
                      </div>
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
