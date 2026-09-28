// Currency + number formatting.
// Built as a small abstraction so more locales/currencies can be added later
// without touching every calculator.

export type CurrencyCode = "INR" | "USD";

const LOCALE_BY_CURRENCY: Record<CurrencyCode, string> = {
  INR: "en-IN",
  USD: "en-US",
};

/** Full, exact currency value, e.g. ₹1,00,000 or $100,000. Always accessible. */
export function formatCurrency(value: number, currency: CurrencyCode = "INR"): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(LOCALE_BY_CURRENCY[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, currency: CurrencyCode = "INR"): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(LOCALE_BY_CURRENCY[currency]).format(Math.round(value));
}

/**
 * Compact Indian-style value: ₹23.23 L, ₹1.02 Cr.
 * Falls back to a compact international form (K/M/B) for other currencies.
 */
export function formatCompactCurrency(value: number, currency: CurrencyCode = "INR"): string {
  if (!Number.isFinite(value)) return "—";
  const symbol = currency === "INR" ? "₹" : "$";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (currency === "INR") {
    if (abs >= 1_00_00_000) return `${sign}${symbol}${(abs / 1_00_00_000).toFixed(2)} Cr`;
    if (abs >= 1_00_000) return `${sign}${symbol}${(abs / 1_00_000).toFixed(2)} L`;
    if (abs >= 1_000) return `${sign}${symbol}${(abs / 1_000).toFixed(1)} K`;
    return formatCurrency(value, currency);
  }

  if (abs >= 1_000_000_000) return `${sign}${symbol}${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${sign}${symbol}${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}${symbol}${(abs / 1_000).toFixed(1)}K`;
  return formatCurrency(value, currency);
}

export function formatPercent(value: number, fractionDigits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(fractionDigits)}%`;
}
