import { authSignupUrl } from "@/lib/public/auth-links";
import Link from "next/link";
import type { HomeStats, SiteInfo } from "@/types/site";

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

export function HomePageWhyChooseSection({ site }: { site: SiteInfo }) {
  const name = site.siteName;

  return (
    <section className="sr-section">
      <div className="sr-wrap sr-split">
        <div>
          <h2 className="sr-section-title">Why clients choose {name}</h2>
          <p className="sr-section-lead">
            The public site is the front door; the dashboard is where work happens. Live trading,
            forex, stocks, and commodities sit alongside wallet funding, investment plans, and the
            Capital Insurance Scheme for qualifying balances.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/main/img/about-us-modern.png" alt="" />
      </div>
      <div className="sr-wrap sr-grid" style={{ marginTop: "2rem" }}>
        <article className="sr-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sr-card-icon" src="/main/img/dignity-1.png" alt="" />
          <h3>Live trading terminal</h3>
          <p>Charts, quotes, and self-trade execution without leaving the member dashboard.</p>
        </article>
        <article className="sr-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sr-card-icon" src="/main/img/dignity-2.png" alt="" />
          <h3>Forex &amp; stocks</h3>
          <p>Currency pairs and equity markets with APAC and global coverage from the main menu.</p>
        </article>
        <article className="sr-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sr-card-icon" src="/main/img/dignity-3.png" alt="" />
          <h3>Commodities &amp; protection</h3>
          <p>Energy and commodity routes plus Capital Insurance Scheme terms for eligible wallets.</p>
        </article>
      </div>
    </section>
  );
}

export function HomePageLiveTradingSpotlight() {
  return (
    <section className="sr-section sr-section-soft">
      <div className="sr-wrap sr-split">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/main/img/start-trading-3.png" alt="" />
        <div>
          <h2 className="sr-section-title">Live trading interface</h2>
          <p className="sr-section-lead">
            Place and monitor self-directed trades with live pricing, chart context, and timed
            positions. Members use the same terminal for forex, stocks, and crypto-style symbols
            supported in your configuration.
          </p>
          <Link className="sr-btn sr-btn-solid" href="/livetrading">
            Explore live trading
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomePageCapitalInsuranceSpotlight() {
  return (
    <section className="sr-section">
      <div className="sr-wrap sr-split">
        <div>
          <h2 className="sr-section-title">Capital Insurance Scheme</h2>
          <p className="sr-section-lead">
            The scheme describes how qualifying member funds may be covered against defined
            operational risks, including published limits, exclusions, and verification steps. Review
            the full program before you fund an account.
          </p>
          <Link className="sr-btn sr-btn-solid" href="/capital-insurance">
            Read scheme overview
          </Link>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/main/img/5191079.jpg" alt="" />
      </div>
    </section>
  );
}

export function HomePageStatsSection({
  site,
  stats,
}: {
  site: SiteInfo;
  stats: HomeStats | null;
}) {
  if (!stats) return null;
  const cur = site.currency;

  return (
    <section className="sr-section" style={{ paddingTop: 0 }}>
      <div className="sr-wrap sr-stats">
        <div className="sr-stat">
          <strong>{fmt(stats.totalUsers)}</strong>
          <span>Accounts</span>
        </div>
        <div className="sr-stat">
          <strong>
            {cur}
            {fmt(stats.totalDeposits)}
          </strong>
          <span>Deposits processed</span>
        </div>
        <div className="sr-stat">
          <strong>
            {cur}
            {fmt(stats.totalWithdrawals)}
          </strong>
          <span>Withdrawals processed</span>
        </div>
      </div>
    </section>
  );
}

export function HomePageCtaBand() {
  return (
    <section className="sr-cta-band">
      <div className="sr-wrap">
        <h2>Ready to open an account?</h2>
        <p>Registration is free. Complete verification when you are ready to fund and trade.</p>
        <a className="sr-btn sr-btn-primary" href={authSignupUrl}>
          Get started
        </a>
      </div>
    </section>
  );
}
