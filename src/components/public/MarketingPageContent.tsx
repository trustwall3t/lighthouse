import { TradingViewRegionalMarkets } from "@/components/public/TradingViewRegionalMarkets";
import { authSignupUrl } from "@/lib/public/auth-links";
import Link from "next/link";

type Section = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

type Props = {
  pageTitle: string;
  subtitle?: string;
  intro?: string;
  bullets?: string[];
  sections?: Section[];
  softwareItems?: { name: string; body: string }[];
  image: string;
  isLogo?: boolean;
  showRegionalMarkets?: boolean;
  marketsTitle?: string;
  marketsLead?: string;
};

export function MarketingPageContent({
  pageTitle,
  subtitle,
  intro,
  bullets = [],
  sections = [],
  softwareItems = [],
  image,
  isLogo,
  showRegionalMarkets,
  marketsTitle,
  marketsLead,
}: Props) {
  return (
    <>
      <header className="sr-page-hero">
        <div className="sr-wrap">
          <p className="sr-kicker">
            <Link href="/">Home</Link>
          </p>
          <h1>{pageTitle}</h1>
          {subtitle ? <p className="sr-section-lead mb-0">{subtitle}</p> : null}
        </div>
      </header>
      <section className="sr-section">
        <div className="sr-wrap sr-split">
          <div className="sr-prose">
            {intro ? <p>{intro}</p> : null}
            {bullets.length > 0 ? (
              <ul>
                {bullets.map((bullet) => (
                  <li key={bullet.slice(0, 48)}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            {sections.map((section) => (
              <div key={section.heading ?? section.paragraphs?.[0]?.slice(0, 40)}>
                {section.heading ? (
                  <h2 className="sr-section-title h4-size">{section.heading}</h2>
                ) : null}
                {(section.paragraphs ?? []).map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
                {(section.bullets ?? []).length > 0 ? (
                  <ul>
                    {(section.bullets ?? []).map((bullet) => (
                      <li key={bullet.slice(0, 48)}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            {softwareItems.length > 0 ? (
              <div className="sr-hl-software-list">
                {softwareItems.map((item) => (
                  <article className="sr-card" style={{ marginBottom: "1rem" }} key={item.name}>
                    <h3>{item.name}</h3>
                    <p className="mb-0">{item.body}</p>
                  </article>
                ))}
              </div>
            ) : null}
            <p className="mt-4 sr-actions">
              <a className="sr-btn sr-btn-solid" href={authSignupUrl}>
                Start trading
              </a>
              <Link className="sr-btn sr-btn-outline" href="/contact">
                Contact us
              </Link>
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className={isLogo ? "sr-media-logo" : undefined}
            style={
              isLogo
                ? undefined
                : {
                    borderRadius: "var(--sr-radius-lg)",
                    boxShadow: "var(--sr-shadow)",
                  }
            }
          />
        </div>
      </section>
      {showRegionalMarkets ? (
        <TradingViewRegionalMarkets
          sectionTitle={marketsTitle ?? "Market charts"}
          sectionLead={
            marketsLead ??
            "Americas, Europe, and Asia-Pacific stocks, crypto, and FX with live TradingView charts."
          }
        />
      ) : null}
    </>
  );
}
