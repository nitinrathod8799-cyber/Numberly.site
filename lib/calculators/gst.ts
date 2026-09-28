export type GstMode = "add" | "remove";

export interface GstResult {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  cgst: number;
  sgst: number;
}

/**
 * Adds or removes GST from an amount.
 * "add": amount is treated as the pre-GST (base) value.
 * "remove": amount is treated as GST-inclusive; the base is extracted from it.
 */
export function calculateGst(amount: number, ratePercent: number, mode: GstMode): GstResult {
  if (amount < 0) throw new Error("Amount cannot be negative.");
  if (ratePercent < 0) throw new Error("GST rate cannot be negative.");

  let baseAmount: number;
  let gstAmount: number;

  if (mode === "add") {
    baseAmount = amount;
    gstAmount = round2(amount * (ratePercent / 100));
  } else {
    baseAmount = round2(amount / (1 + ratePercent / 100));
    gstAmount = round2(amount - baseAmount);
  }

  const totalAmount = round2(baseAmount + gstAmount);

  return {
    baseAmount: round2(baseAmount),
    gstAmount,
    totalAmount,
    cgst: round2(gstAmount / 2),
    sgst: round2(gstAmount / 2),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
