/**
 * Investment tiers from marketing `/investments` (src/content/berkforte/pages/investments.html).
 */
export type MarketingInvestmentPlanSeed = {
  name: string;
  minPrice: number;
  maxPrice: number;
  incrementAmount: string;
  incrementInterval: string;
  incrementType: string;
  planType: string;
  expiration: string;
  gift: number;
};

export const MARKETING_INVESTMENT_PLANS: MarketingInvestmentPlanSeed[] = [
  {
    name: "Starter Plan",
    minPrice: 50,
    maxPrice: 999,
    incrementAmount: "8",
    incrementInterval: "1 day",
    incrementType: "Percentage",
    planType: "Main",
    expiration: "1 day",
    gift: 5,
  },
  {
    name: "Standard Plan",
    minPrice: 1000,
    maxPrice: 2999,
    incrementAmount: "10",
    incrementInterval: "1 day",
    incrementType: "Percentage",
    planType: "Main",
    expiration: "1 day",
    gift: 5,
  },
  {
    name: "PRO Plan",
    minPrice: 3000,
    maxPrice: 4999,
    incrementAmount: "12",
    incrementInterval: "2 days",
    incrementType: "Percentage",
    planType: "Main",
    expiration: "2 days",
    gift: 5,
  },
  {
    name: "Premuim Plan",
    minPrice: 5000,
    maxPrice: 9999,
    incrementAmount: "15",
    incrementInterval: "4 days",
    incrementType: "Percentage",
    planType: "Main",
    expiration: "4 days",
    gift: 5,
  },
  {
    name: "VIP Plan",
    minPrice: 10000,
    maxPrice: 10_000_000,
    incrementAmount: "20",
    incrementInterval: "6 days",
    incrementType: "Percentage",
    planType: "Main",
    expiration: "6 days",
    gift: 5,
  },
];
