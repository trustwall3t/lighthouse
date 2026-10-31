export const FOOTER_TAGLINE_TEMPLATE =
  ":brand: Innovation Platform Digital Asset Trading";

export const FOOTER_RISK_WARNING =
  "Risk Warning: Trading Forex and Leveraged Financial Instruments involves significant risk and can result in the loss of your invested capital. You should not invest more than you can afford to lose and should ensure that you fully understand the risks involved. Trading leveraged products may not be suitable for all investors.";

export function withBrand(template: string, brand: string): string {
  return template.replaceAll(":brand", brand);
}
