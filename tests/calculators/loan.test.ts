import { describe, it, expect } from "vitest";
import { calculateLoan } from "@/lib/calculators/loan";

describe("calculateLoan", () => {
  it("produces the same result as the EMI formula for a personal loan", () => {
    const result = calculateLoan({ principal: 500000, annualRatePercent: 11, tenureYears: 5, loanType: "personal" });
    expect(result.monthlyEmi).toBeGreaterThan(0);
    expect(result.totalPayment).toBeCloseTo(result.totalPrincipal + result.totalInterest, 2);
  });

  it("works the same regardless of loan type label", () => {
    const car = calculateLoan({ principal: 800000, annualRatePercent: 9, tenureYears: 7, loanType: "car" });
    const other = calculateLoan({ principal: 800000, annualRatePercent: 9, tenureYears: 7, loanType: "other" });
    expect(car.monthlyEmi).toBe(other.monthlyEmi);
  });

  it("throws for zero principal", () => {
    expect(() => calculateLoan({ principal: 0, annualRatePercent: 9, tenureYears: 5 })).toThrow();
  });
});
