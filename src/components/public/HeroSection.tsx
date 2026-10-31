import { HERO_CAROUSEL_SLIDES } from "@/lib/public/hero-carousel";
import { authLoginUrl, authSignupUrl } from "@/lib/public/auth-links";

export function HeroSection({ siteName }: { siteName: string }) {
  return (
    <section className="sr-hero" data-sr-hero-carousel data-hero-interval="5500">
      <div className="sr-hero-bg" aria-hidden="true">
        {HERO_CAROUSEL_SLIDES.map((slide, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            className={`sr-hero-bg-slide${i === 0 ? " is-active" : ""}`}
            src={slide.src}
            alt=""
            width={slide.width}
            height={slide.height}
            decoding="async"
            loading={i === 0 ? undefined : "lazy"}
            fetchPriority={i === 0 ? "high" : undefined}
          />
        ))}
      </div>
      <div className="sr-wrap sr-hero-layout">
        <div>
          <p className="sr-hero-eyebrow">{siteName}</p>
          <h1>Live trading, forex, stocks, and commodities in one place</h1>
          <p className="sr-hero-lead">
            Open an account for the live trading terminal, multi-asset markets, investment plans,
            and the Capital Insurance Scheme for qualifying balances. Optional copy trading is
            available when members want to follow a lead trader.
          </p>
          <div className="sr-hero-pills" aria-label="Platform highlights">
            <a className="sr-hero-pill" href="/livetrading">
              Live trading
            </a>
            <a className="sr-hero-pill" href="/forex">
              Forex
            </a>
            <a className="sr-hero-pill" href="/stocks">
              Stocks
            </a>
            <a className="sr-hero-pill" href="/advancetrading">
              Commodities
            </a>
            <a className="sr-hero-pill" href="/capital-insurance">
              Capital Insurance
            </a>
          </div>
          <div className="sr-actions">
            <a className="sr-btn sr-btn-primary" href={authSignupUrl}>
              Create account
            </a>
            <a className="sr-btn sr-btn-ghost" href={authLoginUrl}>
              Sign in
            </a>
          </div>
        </div>
        <aside className="sr-hero-aside">
          <div className="sr-hero-panel">
            <strong>What you get after registration</strong>
            Fund with regional payment options where available, trade from the live terminal, or
            allocate to a plan. Forex, stocks, and commodity routes are linked from your dashboard
            menu alongside scheme documentation for eligible capital protection.
          </div>
        </aside>
      </div>
    </section>
  );
}
