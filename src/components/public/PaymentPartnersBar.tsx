import { featuredPaymentPartners } from "@/lib/public/payment-partners";

function PartnerList({
  partners,
  duplicate,
}: {
  partners: ReturnType<typeof featuredPaymentPartners>;
  duplicate?: boolean;
}) {
  return (
    <ul className={`sr-partner-marklist${duplicate ? " sr-partner-marklist--clone" : ""}`} aria-label={duplicate ? undefined : "Payment partners"} aria-hidden={duplicate ? true : undefined}>
      {partners.map((partner) => (
        <li key={`${duplicate ? "clone-" : ""}${partner.name}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={partner.wide ? "sr-partner-mark--wide" : undefined}
            src={partner.src}
            alt={duplicate ? "" : partner.name}
            width={partner.width}
            height={partner.height}
            loading="lazy"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  );
}

export function PaymentPartnersBar() {
  const partners = featuredPaymentPartners();

  return (
    <div className="sr-trust-bar sr-trust-bar--partners">
      <div className="sr-wrap sr-trust-bar-strip">
        <p className="sr-trust-bar-tagline">Asia-Pacific payment rails</p>
        <div className="sr-partner-marquee">
          <div className="sr-partner-marquee__fade sr-partner-marquee__fade--start" aria-hidden="true" />
          <div className="sr-partner-marquee__fade sr-partner-marquee__fade--end" aria-hidden="true" />
          <div className="sr-partner-marquee__viewport">
            <div className="sr-partner-marquee__track">
              <PartnerList partners={partners} />
              <PartnerList partners={partners} duplicate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
