import { calculateCompoundInterest, type CompoundInterestResult } from "./compoundInterest";

export interface LumpsumInput {
  investment: number;
  annualReturnPercent: number;
  years: number;
}

/**
 * A lumpsum investment is a single upfront amount invested at once (as
 * opposed to a SIP's recurring monthly contributions). It uses the same
 * compound-growth math as the Compound Interest calculator, compounded
 * annually by default — the convention most Indian mutual-fund lumpsum
 * tools use for illustration.
 */
export function calculateLumpsum(input: LumpsumInput): CompoundInterestResult {
  return calculateCompoundInterest({
    principal: input.investment,
    annualRatePercent: input.annualReturnPercent,
    years: input.years,
    frequency: "annually",
  });
}
