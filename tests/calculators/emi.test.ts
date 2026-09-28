import { describe, it, expect } from "vitest";
import { calculateEmi } from "@/lib/calculators/emi";

describe("calculateEmi - standard loan", () => {
  it("matches a well-known EMI example", () => {
    const result = calculateEmi({ principal: 1_000_000, annualRatePercent: 8.5, tenureYears: 10 });
    expect(result.monthlyEmi).toBeCloseTo(12399, 0);
    expect(result.totalPrincipal).toBe(1_000_000);
    expect(result.totalPayment).toBeCloseTo(result.totalPrincipal + result.totalInterest, 2);
  });

  it("produces a yearly schedule that ends near zero balance", () => {
    const result = calculateEmi({ principal: 500_000, annualRatePercent: 9, tenureYears: 5 });
    const lastRow = result.yearly[result.yearly.length - 1];
    expect(lastRow.balance).toBeCloseTo(0, 0);
  });
});

describe("calculateEmi - zero interest", () => {
  it("EMI equals principal divided evenly across months", () => {
    const result = calculateEmi({ principal: 120000, annualRatePercent: 0, tenureYears: 1 });
    expect(result.monthlyEmi).toBeCloseTo(10000, 2);
    expect(result.totalInterest).toBeCloseTo(0, 2);
  });
});

describe("calculateEmi - different tenures", () => {
  it("a longer tenure lowers the EMI but raises total interest", () => {
    const short = calculateEmi({ principal: 1_000_000, annualRatePercent: 9, tenureYears: 5 });
    const long = calculateEmi({ principal: 1_000_000, annualRatePercent: 9, tenureYears: 20 });
    expect(long.monthlyEmi).toBeLessThan(short.monthlyEmi);
    expect(long.totalInterest).toBeGreaterThan(short.totalInterest);
  });
});

describe("calculateEmi - validation", () => {
  it("throws for zero or negative principal", () => {
    expect(() => calculateEmi({ principal: 0, annualRatePercent: 8, tenureYears: 5 })).toThrow();
  });

  it("throws for zero tenure", () => {
    expect(() => calculateEmi({ principal: 100000, annualRatePercent: 8, tenureYears: 0 })).toThrow();
  });
});
