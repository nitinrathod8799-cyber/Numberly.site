import { describe, it, expect } from "vitest";
import { calculateCompoundInterest } from "@/lib/calculators/compoundInterest";

describe("calculateCompoundInterest", () => {
  it("matches the standard annual compounding formula", () => {
    const result = calculateCompoundInterest({
      principal: 100000,
      annualRatePercent: 10,
      years: 2,
      frequency: "annually",
    });
    // A = P(1+r)^n = 100000 * 1.1^2 = 121000
    expect(result.maturityAmount).toBeCloseTo(121000, 0);
  });

  it("more frequent compounding yields a higher maturity amount", () => {
    const annual = calculateCompoundInterest({ principal: 100000, annualRatePercent: 8, years: 5, frequency: "annually" });
    const monthly = calculateCompoundInterest({ principal: 100000, annualRatePercent: 8, years: 5, frequency: "monthly" });
    expect(monthly.maturityAmount).toBeGreaterThan(annual.maturityAmount);
  });

  it("produces one yearly row per whole year", () => {
    const result = calculateCompoundInterest({ principal: 50000, annualRatePercent: 6, years: 4, frequency: "quarterly" });
    expect(result.yearly).toHaveLength(4);
  });

  it("throws for zero principal", () => {
    expect(() => calculateCompoundInterest({ principal: 0, annualRatePercent: 6, years: 4, frequency: "annually" })).toThrow();
  });
});
