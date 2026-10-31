import { featuredAsianFinancialInstitutions } from "@/lib/public/asian-financial-institutions";

export function HomePageAsiaPacificSection({ siteName }: { siteName: string }) {
  const marks = featuredAsianFinancialInstitutions();

  return (
    <section className="sr-section sr-section-soft" aria-labelledby="sr-apac-heading">
      <div className="sr-wrap">
        <h2 id="sr-apac-heading" className="sr-section-title">
          Built for Asia-Pacific investors
        </h2>
        <p className="sr-section-lead sr-apac-lead">
          {siteName} highlights liquid names from Singapore, Hong Kong, Tokyo, Mumbai, Kuala Lumpur,
          Bangkok, and Seoul. Fund in local rails where available, then trade regional equities and
          FX from the same dashboard you use for live trading, investment plans, and the Capital Insurance Scheme.
        </p>
        <ul className="sr-apac-highlights">
          <li>Singapore, Hong Kong, and Tokyo index charts alongside global benchmarks</li>
          <li>Regional bank and tech leaders on major APAC listings</li>
          <li>Asian payment methods including Alipay, GrabPay, PayNow, and UPI</li>
        </ul>
        <div className="sr-apac-inst-grid" role="list" aria-label="Featured Asia-Pacific institutions">
          {marks.map((mark) => (
            <div className="sr-apac-inst-cell" role="listitem" key={mark.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mark.src}
                alt={`${mark.name}, ${mark.region}`}
                width={mark.width}
                height={mark.height}
                loading="lazy"
                decoding="async"
              />
              <span className="sr-apac-inst-region">{mark.region}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
