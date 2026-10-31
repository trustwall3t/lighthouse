import { authSignupUrl } from "@/lib/public/auth-links";
import type { Plan, SiteInfo } from "@/types/site";

function formatMoney(currency: string, amount: number) {
  return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

const PREVIEW_PLANS: Plan[] = [
  {
    id: 9001,
    type: "Main",
    name: "Starter",
    incrementAmount: "6",
    incrementInterval: "Weekly",
    minPrice: 100,
    maxPrice: 2499,
    expiration: "30 days",
  },
  {
    id: 9002,
    type: "Main",
    name: "Growth",
    incrementAmount: "10",
    incrementInterval: "Weekly",
    minPrice: 2500,
    maxPrice: 9999,
    expiration: "60 days",
  },
  {
    id: 9003,
    type: "Main",
    name: "Premium",
    incrementAmount: "14",
    incrementInterval: "Weekly",
    minPrice: 10000,
    maxPrice: 50000,
    expiration: "90 days",
  },
];

export function InvestmentPlans({
  plans,
  site,
}: {
  plans: Plan[];
  site: SiteInfo;
}) {
  const usingPreview = plans.length === 0;
  const displayPlans = (usingPreview ? PREVIEW_PLANS : plans).slice(0, 6);
  if (!displayPlans.length) return null;

  const featuredPlanId = [...displayPlans].sort(
    (a, b) =>
      parseFloat(String(b.incrementAmount)) - parseFloat(String(a.incrementAmount)),
  )[0]?.id;

  return (
    <section className="sr-section sr-section-soft sr-plans-section" id="investment-plans">
      <div className="sr-wrap sr-plans-intro">
        <h2 className="sr-section-title">Investment plans</h2>
        <p className="sr-section-lead">
          Compare tiers side by side. Amounts and returns come from your admin; clients activate
          after they register and fund.
        </p>
        {usingPreview ? (
          <p className="sr-plans-preview-note" role="status">
            Preview layout. Publish plans in admin to replace these examples.
          </p>
        ) : null}
      </div>
      <div className="sr-wrap">
        <div className="sr-plan-grid">
          {displayPlans.map((plan) => {
            const isFeatured = featuredPlanId != null && plan.id === featuredPlanId;
            return (
              <article
                key={plan.id}
                className={`sr-plan-card${isFeatured ? " is-featured" : ""}`}
              >
                {isFeatured ? <span className="sr-plan-badge">Popular</span> : null}
                <header className="sr-plan-card-head">
                  <h3>{plan.name}</h3>
                </header>
                <div className="sr-plan-rate" aria-label="Return rate">
                  <span className="sr-plan-rate-value">{plan.incrementAmount}%</span>
                  <span className="sr-plan-rate-label">{plan.incrementInterval}</span>
                </div>
                <ul className="sr-plan-specs">
                  <li>
                    <span className="sr-plan-spec-label">Minimum deposit</span>
                    <strong>{formatMoney(site.currency, plan.minPrice)}</strong>
                  </li>
                  <li>
                    <span className="sr-plan-spec-label">Maximum deposit</span>
                    <strong>{formatMoney(site.currency, plan.maxPrice)}</strong>
                  </li>
                  {plan.expiration ? (
                    <li>
                      <span className="sr-plan-spec-label">Duration</span>
                      <strong>{plan.expiration}</strong>
                    </li>
                  ) : null}
                </ul>
                <div className="sr-plan-card-foot">
                  <a className="sr-btn sr-btn-solid sr-btn-block" href={authSignupUrl}>
                    Choose plan
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
