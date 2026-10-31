"use client";

import {
  marketOverviewConfig,
  marketQuotesConfig,
  tickerTapeConfig,
} from "@/lib/public/trading-view-markets";
import { useEffect, useRef } from "react";

type Props = {
  sectionTitle?: string;
  sectionLead?: string;
  softBackground?: boolean;
  showTicker?: boolean;
  showOverview?: boolean;
  showQuotes?: boolean;
};

function mountTradingViewWidget(
  host: HTMLDivElement,
  scriptSrc: string,
  config: object,
) {
  host.innerHTML = "";
  const widget = document.createElement("div");
  widget.className = "tradingview-widget-container__widget";
  host.appendChild(widget);

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = scriptSrc;
  script.async = true;
  script.text = JSON.stringify(config);
  host.appendChild(script);
}

export function TradingViewRegionalMarkets({
  sectionTitle = "Global markets",
  sectionLead = "Live charts and quotes for Americas and Europe, plus an Asia and Pacific tab with regional banks, tech leaders, and indices.",
  softBackground = true,
  showTicker = true,
  showOverview = true,
  showQuotes = true,
}: Props) {
  const tickerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTicker && tickerRef.current) {
      mountTradingViewWidget(
        tickerRef.current,
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
        tickerTapeConfig(),
      );
    }
    if (showOverview && overviewRef.current) {
      mountTradingViewWidget(
        overviewRef.current,
        "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js",
        marketOverviewConfig(),
      );
    }
    if (showQuotes && quotesRef.current) {
      mountTradingViewWidget(
        quotesRef.current,
        "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js",
        marketQuotesConfig(),
      );
    }
  }, [showTicker, showOverview, showQuotes]);

  return (
    <section
      className={`sr-section ${softBackground ? "sr-section-soft" : ""} sr-markets-section`}
    >
      <div className="sr-wrap">
        <h2 className="sr-section-title">{sectionTitle}</h2>
        <p className="sr-section-lead">{sectionLead}</p>

        <div className="sr-market-stack">
          {showTicker ? (
            <div className="sr-market-widget sr-market-widget--ticker">
              <div className="tradingview-widget-container" ref={tickerRef} />
            </div>
          ) : null}

          {showOverview ? (
            <div className="sr-market-widget sr-market-widget--overview">
              <h3 className="sr-market-widget-title">Regional charts</h3>
              <p className="sr-market-widget-lead">
                Switch tabs for Americas, Europe, Asia and Pacific, or crypto. Each symbol
                includes an interactive chart.
              </p>
              <div className="tradingview-widget-container" ref={overviewRef} />
            </div>
          ) : null}

          {showQuotes ? (
            <div className="sr-market-widget sr-market-widget--quotes">
              <h3 className="sr-market-widget-title">Live quotes</h3>
              <div className="tradingview-widget-container" ref={quotesRef} />
            </div>
          ) : null}
        </div>

        <p className="sr-market-attribution">
          Charts and market data by{" "}
          <a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer">
            TradingView
          </a>
          . Symbols are indicative; trade inside your client dashboard for platform pricing.
        </p>
      </div>
    </section>
  );
}
