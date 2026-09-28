import { calculateCompoundInterest, type CompoundingFrequency, type CompoundInterestResult } from "./compoundInterest";

export interface FdInput {
  principal: number;
  annualRatePercent: number;
  years: number;
  /** Indian banks typically compound FDs quarterly. */
  frequency?: CompoundingFrequency;
}

export function calculateFd(input: FdInput): CompoundInterestResult {
  return calculateCompoundInterest({
    principal: input.principal,
    annualRatePercent: input.annualRatePercent,
    years: input.years,
    frequency: input.frequency ?? "quarterly",
  });
}
