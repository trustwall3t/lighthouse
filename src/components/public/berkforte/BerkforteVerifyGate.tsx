"use client";

import { BerkforteGuestAssets } from "@/components/public/berkforte/BerkforteGuestAssets";
import { authSignupUrl } from "@/lib/public/auth-links";
import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  logoUrl: string;
  initialCode: string;
};

export function BerkforteVerifyGate({ logoUrl, initialCode }: Props) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const hint = useMemo(() => initialCode, [initialCode]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toUpperCase() !== hint.trim().toUpperCase()) {
      setError("Code does not match. Copy the code shown above exactly.");
      return;
    }
    window.location.href = authSignupUrl;
  }

  return (
    <>
      <BerkforteGuestAssets />
      <section
        style={{ minHeight: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="container">
          <div className="pb-3 row justify-content-center">
            <div className="col-12 col-md-6 col-lg-6 col-sm-10 col-xl-6">
              <Link href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoUrl} alt="" className="mb-3 img-fluid auth__logo" />
              </Link>
              <div className="shadow card bg-black border login-page roundedd border-1">
                <div className="card-body">
                  <h6 className="text-center text-white">
                    Please confirm you are not a Robot by verifying the auto-generated code below.
                    This will enable you to register.
                  </h6>
                  <form onSubmit={onSubmit} className="mt-4 login-form">
                    <div className="form-group">
                      <input
                        type="text"
                        readOnly
                        style={{ backgroundColor: "#3792cb" }}
                        className="form-control border-none text-center text-white"
                        value={hint}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ color: "#fff" }}>
                        Enter code<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          setError(null);
                        }}
                        required
                      />
                    </div>
                    {error ? <p className="text-danger small">{error}</p> : null}
                    <button type="submit" className="btn btn-primary w-100">
                      Verify &amp; continue
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
