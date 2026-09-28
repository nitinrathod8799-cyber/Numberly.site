export interface CagrResult {
  cagrPercent: number;
  absoluteGrowthPercent: number;
}

/** Compound Annual Growth Rate between a beginning and ending value over a number of years. */
export function calculateCagr(beginningValue: number, endingValue: number, years: number): CagrResult {
  if (beginningValue <= 0) throw new Error("Beginning value must be greater than zero.");
  if (endingValue < 0) throw new Error("Ending value cannot be negative.");
  if (years <= 0) throw new Error("Number of years must be greater than zero.");

  const cagr = (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
  const absoluteGrowth = ((endingValue - beginningValue) / beginningValue) * 100;

  return {
    cagrPercent: round2(cagr),
    absoluteGrowthPercent: round2(absoluteGrowth),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
