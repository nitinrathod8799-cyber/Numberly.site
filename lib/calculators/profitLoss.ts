export type ProfitLossType = "profit" | "loss" | "none";

export interface ProfitLossResult {
  type: ProfitLossType;
  amount: number;
  percent: number;
}

export function calculateProfitLoss(costPrice: number, sellingPrice: number): ProfitLossResult {
  if (costPrice < 0) throw new Error("Cost price cannot be negative.");
  if (sellingPrice < 0) throw new Error("Selling price cannot be negative.");
  if (costPrice === 0) throw new Error("Cost price cannot be zero.");

  const diff = sellingPrice - costPrice;
  const type: ProfitLossType = diff > 0 ? "profit" : diff < 0 ? "loss" : "none";
  const amount = round2(Math.abs(diff));
  const percent = round2((Math.abs(diff) / costPrice) * 100);

  return { type, amount, percent };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
