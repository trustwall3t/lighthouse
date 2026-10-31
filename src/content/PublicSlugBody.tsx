import { MarketingPageContent } from "@/components/public/MarketingPageContent";
import { TradingViewRegionalMarkets } from "@/components/public/TradingViewRegionalMarkets";
import type { PublicSlug } from "@/content/public-slugs";
import {
  getMarketingPageProps,
  getPublicPage,
  getStaticFaqItems,
} from "@/lib/public/public-page-content";
import type { HomeStats, SiteInfo } from "@/types/site";
import Link from "next/link";

type Props = {
  slug: PublicSlug;
  site: SiteInfo;
  stats?: HomeStats | null;
};

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

export function PublicSlugBody({ slug, site, stats = null }: Props) {
  const name = site.siteName;
  const email = site.contactEmail ?? "support@example.com";

  if (slug === "contact") {
    const page = getPublicPage(slug, name);
    return (
      <>
        <header className="sr-page-hero">
          <div className="sr-wrap">
            <p className="sr-kicker">
              <Link href="/">Home</Link>
            </p>
            <h1>{page.title ?? "Contacts"}</h1>
          </div>
        </header>
        <section className="sr-section">
          <div className="sr-wrap sr-contact-grid">
            <article className="sr-card">
              <h3>{page.subtitle ?? "SUPPORT SERVICE"}</h3>
              <p>{page.support_lead ?? ""}</p>
              <p>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            </article>
            <article className="sr-card">
              <h3>FIND US</h3>
              <p>{page.address ?? ""}</p>
            </article>
            <article className="sr-card">
              <h3>HOTLINE</h3>
              <p>Reach us by phone or mail if you need quick advice on general questions:</p>
              {page.phone ? (
                <p>
                  <a href={page.phone_href ?? "#"}>{page.phone}</a>
                </p>
              ) : null}
            </article>
          </div>
        </section>
      </>
    );
  }

  if (slug === "faq") {
    const staticFaqs = getStaticFaqItems(name);
    return (
      <>
        <header className="sr-page-hero">
          <div className="sr-wrap">
            <p className="sr-kicker">
              <Link href="/">Home</Link>
            </p>
            <h1>FAQ</h1>
            <p className="sr-section-lead mb-0">
              General questions, financial questions, and verification.
            </p>
          </div>
        </header>
        <section className="sr-section">
          <div className="sr-wrap">
            <div className="sr-grid">
              {staticFaqs.map((faq) => (
                <article className="sr-card" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (slug === "terms" || slug === "privacy") {
    const page = getPublicPage(slug, name);
    return (
      <>
        <header className="sr-page-hero">
          <div className="sr-wrap">
            <p className="sr-kicker">
              <Link href="/">Home</Link>
            </p>
            <h1>{page.title ?? slug}</h1>
          </div>
        </header>
        <section className="sr-section">
          <div className="sr-wrap sr-prose">
            {page.intro ? <p>{page.intro}</p> : null}
            {(page.paragraphs ?? []).map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            <p>
              For questions, please <Link href="/contact">contact support</Link>.
            </p>
          </div>
        </section>
      </>
    );
  }

  if (slug === "statistic") {
    const page = getPublicPage(slug, name);
    const cur = site.currency;
    return (
      <>
        <header className="sr-page-hero">
          <div className="sr-wrap">
            <p className="sr-kicker">
              <Link href="/">Home</Link>
            </p>
            <h1>{page.title ?? "Statistics"}</h1>
            {page.intro ? <p className="sr-section-lead mb-0">{page.intro}</p> : null}
          </div>
        </header>
        <section className="sr-section">
          <div className="sr-wrap sr-stats">
            <div className="sr-stat">
              <strong>{fmt(stats?.totalUsers ?? 0)}</strong>
              <span>Registered users</span>
            </div>
            <div className="sr-stat">
              <strong>
                {cur}
                {fmt(stats?.totalDeposits ?? 0)}
              </strong>
              <span>Processed deposits</span>
            </div>
            <div className="sr-stat">
              <strong>
                {cur}
                {fmt(stats?.totalWithdrawals ?? 0)}
              </strong>
              <span>Processed withdrawals</span>
            </div>
          </div>
        </section>
        <TradingViewRegionalMarkets
          sectionTitle="Live market charts"
          sectionLead="Americas, Europe, Asia and Pacific markets, crypto, and forex, updated continuously via TradingView."
          softBackground
        />
      </>
    );
  }

  const marketing = getMarketingPageProps(slug, name);
  return <MarketingPageContent {...marketing} />;
}
