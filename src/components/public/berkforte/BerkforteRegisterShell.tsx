import { BerkforteGuestAssets } from "@/components/public/berkforte/BerkforteGuestAssets";
import { SITE_LOGO_URL } from "@/lib/public/site-logo";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  logoUrl?: string;
};

export function BerkforteRegisterShell({ children, logoUrl = SITE_LOGO_URL }: Props) {
  return (
    <>
      <BerkforteGuestAssets />
      <section
        style={{ height: "auto" }}
        className="d-flex align-items-center bg-white justify-content-center"
      >
        <div className="container">
          <div className="row p-md-5 py-5">
            <div className="col-lg-12">
              <div className="card rounded bg-white login-page">
                <div className="card-body">
                  <div className="row pl-md-3">
                    <div className="col-md-5 d-none d-lg-flex align-items-center justify-content-center rounded">
                      <div className="text-center">
                        <h2 className="text-white mb-0">Let&apos;s get you set up</h2>
                        <p className="text-white p-2">
                          It should only take a couple of minutes to create your account.
                        </p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/dash2/img/account.webp" alt="" className="w-75" />
                      </div>
                    </div>
                    <div className="col-lg-7">
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
