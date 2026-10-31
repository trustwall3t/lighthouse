export type AsianFinancialMark = {
  name: string;
  src: string;
  width: number;
  height: number;
  region: string;
  wide?: boolean;
};

/** Major Asia-Pacific banks and exchanges referenced on marketing (text-style wordmarks). */
export function featuredAsianFinancialInstitutions(): AsianFinancialMark[] {
  return [
    {
      name: "DBS",
      src: "/main/img/institutions/dbs.svg",
      width: 56,
      height: 28,
      region: "Singapore",
    },
    {
      name: "OCBC",
      src: "/main/img/institutions/ocbc.svg",
      width: 72,
      height: 28,
      region: "Singapore",
    },
    {
      name: "UOB",
      src: "/main/img/institutions/uob.svg",
      width: 56,
      height: 28,
      region: "Singapore",
    },
    {
      name: "HSBC",
      src: "/main/img/institutions/hsbc.svg",
      width: 72,
      height: 28,
      region: "Hong Kong",
    },
    {
      name: "Standard Chartered",
      src: "/main/img/institutions/standard-chartered.svg",
      width: 148,
      height: 28,
      region: "Hong Kong",
      wide: true,
    },
    {
      name: "MUFG",
      src: "/main/img/institutions/mufg.svg",
      width: 64,
      height: 28,
      region: "Japan",
    },
    {
      name: "SMBC",
      src: "/main/img/institutions/smbc.svg",
      width: 72,
      height: 28,
      region: "Japan",
    },
    {
      name: "ICBC",
      src: "/main/img/institutions/icbc.svg",
      width: 64,
      height: 28,
      region: "China",
    },
    {
      name: "Bank of China",
      src: "/main/img/institutions/boc.svg",
      width: 120,
      height: 28,
      region: "China",
      wide: true,
    },
    {
      name: "HDFC Bank",
      src: "/main/img/institutions/hdfc.svg",
      width: 108,
      height: 28,
      region: "India",
    },
    {
      name: "Maybank",
      src: "/main/img/institutions/maybank.svg",
      width: 96,
      height: 28,
      region: "Malaysia",
    },
    {
      name: "CIMB",
      src: "/main/img/institutions/cimb.svg",
      width: 64,
      height: 28,
      region: "Malaysia",
    },
    {
      name: "KBank",
      src: "/main/img/institutions/kbank.svg",
      width: 72,
      height: 28,
      region: "Thailand",
    },
    {
      name: "Singapore Exchange",
      src: "/main/img/institutions/sgx.svg",
      width: 56,
      height: 28,
      region: "Singapore",
    },
    {
      name: "Hong Kong Exchanges",
      src: "/main/img/institutions/hkex.svg",
      width: 64,
      height: 28,
      region: "Hong Kong",
    },
  ];
}
