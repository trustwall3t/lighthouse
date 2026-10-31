/** Primary member offerings surfaced on the marketing home page and nav. */
export type MarketingProduct = {
  id: string;
  title: string;
  summary: string;
  href: string;
  image: string;
};

export function primaryMarketingProducts(): MarketingProduct[] {
  return [
    {
      id: "live-trading",
      title: "Live trading",
      summary:
        "Charts, live quotes, and timed self-trade positions in the member terminal. Execute market and limit orders from one screen.",
      href: "/livetrading",
      image: "/main/img/start-trading-3.png",
    },
    {
      id: "capital-insurance",
      title: "Capital Insurance Scheme",
      summary:
        "Program terms that define how qualifying wallet balances may be protected against covered operational events, subject to limits and eligibility.",
      href: "/capital-insurance",
      image: "/main/img/5191079.jpg",
    },
    {
      id: "forex",
      title: "Forex trading",
      summary:
        "Major, minor, and APAC currency pairs with risk tools, margin controls, and 24/5 market access from your dashboard.",
      href: "/forex",
      image: "/main/img/platform-bg.png",
    },
    {
      id: "stocks",
      title: "Stock trading",
      summary:
        "Global and Asia-Pacific equities with research-friendly charts, watchlists, and portfolio tracking inside the client area.",
      href: "/stocks",
      image: "/main/img/Stock-Exchange_1.png",
    },
    {
      id: "commodities",
      title: "Commodities",
      summary:
        "Energy, metals, and agricultural exposure through commodity-focused strategies, futures context, and related market education.",
      href: "/advancetrading",
      image: "/main/img/start-trading-2.png",
    },
    {
      id: "copy-trading",
      title: "Copy trading",
      summary:
        "Optional allocation to lead traders when members prefer signals over self-directed live trading. Manage profiles from admin.",
      href: "/optioncopytrading",
      image: "/main/img/start-trading-1.png",
    },
  ];
}
