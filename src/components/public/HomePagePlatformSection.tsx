import { primaryMarketingProducts } from "@/lib/public/marketing-products";
import Link from "next/link";

export function HomePagePlatformSection({ siteName }: { siteName: string }) {
  const products = primaryMarketingProducts();

  return (
    <section className="sr-section" aria-labelledby="sr-platform-heading">
      <div className="sr-wrap">
        <h2 id="sr-platform-heading" className="sr-section-title">
          One platform for trading and protection
        </h2>
        <p className="sr-section-lead">
          {siteName} combines live trading, forex, stocks, and commodities with investment plans and
          an optional Capital Insurance Scheme. Copy trading is available, but it is not the only
          way members participate.
        </p>
        <div className="sr-product-grid">
          {products.map((product) => (
            <article className="sr-card sr-product-card" key={product.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="sr-product-card__thumb"
                src={product.image}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <h3>{product.title}</h3>
              <p className="sr-product-card__summary">{product.summary}</p>
              <Link className="sr-btn sr-btn-outline sr-product-card__link" href={product.href}>
                Learn more
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
