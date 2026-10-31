import type { CorporateCertificate } from "@/lib/public/corporate-document";
import Script from "next/script";

export function CorporateCertificateSection({ cert }: { cert: CorporateCertificate }) {
  return (
    <>
      <section className="sr-section sr-corporate-cert" id="corporate-certificate" aria-labelledby="sr-corp-cert-title">
        <div className="sr-wrap">
          <div className="sr-corporate-cert-intro">
            <p className="sr-corporate-cert-kicker">{cert.entityLabel}</p>
            <h2 className="sr-section-title" id="sr-corp-cert-title">
              {cert.title}
            </h2>
            {cert.lead ? <p className="sr-section-lead">{cert.lead}</p> : null}
          </div>

          {cert.exists && cert.url ? (
            <div className="sr-pdf-shell">
              <div
                className="sr-pdf-viewer"
                data-sr-pdf-viewer
                data-pdf-url={cert.url}
                tabIndex={0}
                aria-label={`${cert.title} document viewer`}
              >
                <div className="sr-pdf-toolbar sr-pdf-toolbar--custom">
                  <div className="sr-pdf-nav" role="group" aria-label="Page navigation">
                    <button type="button" className="sr-pdf-icon-btn" data-sr-pdf-prev aria-label="Previous page">
                      ‹
                    </button>
                    <span className="sr-pdf-page-info" data-sr-pdf-page-info aria-live="polite">
                      Page
                    </span>
                    <button type="button" className="sr-pdf-icon-btn" data-sr-pdf-next aria-label="Next page">
                      ›
                    </button>
                  </div>
                  <div className="sr-pdf-zoom" role="group" aria-label="Zoom">
                    <button type="button" className="sr-pdf-icon-btn" data-sr-pdf-zoom-out aria-label="Zoom out">
                      −
                    </button>
                    <button type="button" className="sr-pdf-text-btn" data-sr-pdf-fit-width>
                      Fit width
                    </button>
                    <button type="button" className="sr-pdf-icon-btn" data-sr-pdf-zoom-in aria-label="Zoom in">
                      +
                    </button>
                  </div>
                  <div className="sr-pdf-toolbar-actions">
                    <a
                      className="sr-btn sr-btn-solid sr-btn-sm"
                      href={cert.url}
                      download={cert.filename ?? undefined}
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
                <div className="sr-pdf-stage" data-sr-pdf-stage>
                  <p className="sr-pdf-loading" data-sr-pdf-loading>
                    Loading document…
                  </p>
                  <p className="sr-pdf-error" data-sr-pdf-error hidden />
                  <canvas data-sr-pdf-canvas className="sr-pdf-canvas" />
                </div>
                <p className="sr-pdf-hint">
                  Use Previous and Next to move through pages, or the arrow keys when this panel is focused.
                </p>
              </div>
            </div>
          ) : (
            <div className="sr-pdf-placeholder" role="status">
              <p>
                <strong>PDF not uploaded yet.</strong>
              </p>
              <p>
                Place your certificate at <code>public/documents/certificate-of-incorporation.pdf</code> or set{" "}
                <code>CORPORATE_CERTIFICATE_PATH</code> in the environment.
              </p>
            </div>
          )}
        </div>
      </section>

      {cert.exists && cert.url ? (
        <>
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" strategy="lazyOnload" />
          <Script src="/main/js/corporate-pdf-viewer.js" strategy="lazyOnload" />
        </>
      ) : null}
    </>
  );
}
