/** Credibility strip at the bottom of service / inner pages. */
export function PublicServiceTrustBar({ brandName }: { brandName: string }) {
  return (
    <div className="gg-trust-bar" role="complementary" aria-label="Why members choose us">
      <div className="gg-trust-bar-item">
        <strong>APAC market access</strong>
        <span>Charts and quotes for Singapore, Hong Kong, Tokyo, and regional listings.</span>
      </div>
      <div className="gg-trust-bar-item">
        <strong>Live trading hub</strong>
        <span>
          Forex, stocks, commodities, trading history, and wallet funding in one secure area.
        </span>
      </div>
      <div className="gg-trust-bar-item">
        <strong>Dedicated support</strong>
        <span>
          {brandName} responds to account and verification questions within one business day.
        </span>
      </div>
    </div>
  );
}
