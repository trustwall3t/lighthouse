import Link from "next/link";
import { PublicNavToggle } from "@/components/public/PublicNavToggle";
import { authLoginUrl, authSignupUrl } from "@/lib/public/auth-links";
import { SITE_LOGO_URL } from "@/lib/public/site-logo";

type Props = {
  brandName: string;
};

export function PublicHeader({ brandName }: Props) {
  return (
    <>
      <header className="sr-header">
        <div className="sr-wrap sr-header-inner">
          <Link className="sr-brand" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE_LOGO_URL} alt={brandName} />
          </Link>
          <button
            type="button"
            className="sr-nav-toggle"
            aria-expanded="false"
            aria-controls="sr-nav"
            aria-label="Menu"
          >
            ☰
          </button>
          <nav className="sr-nav" id="sr-nav">
            <Link href="/about">About us</Link>
            <details>
              <summary>Platform</summary>
              <div className="sr-drop">
                <Link href="/livetrading">Live trading</Link>
                <Link href="/capital-insurance">Capital Insurance Scheme</Link>
                <Link href="/softwares">Trading software</Link>
                <Link href="/optioncopytrading">Copy trading (optional)</Link>
              </div>
            </details>
            <details>
              <summary>Markets</summary>
              <div className="sr-drop">
                <Link href="/stocks">Stock trading</Link>
                <Link href="/forex">Forex trading</Link>
                <Link href="/advancetrading">Commodities</Link>
                <Link href="/futures">Futures</Link>
                <Link href="/oilandgas">Oil &amp; gas</Link>
              </div>
            </details>
            <Link href="/investments">Insight</Link>
            <Link href="/softwares">Software</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contacts</Link>
            <a href={authLoginUrl}>Log in</a>
            <a className="sr-nav-cta" href={authSignupUrl}>
              Registration
            </a>
          </nav>
        </div>
      </header>
      <PublicNavToggle />
    </>
  );
}
