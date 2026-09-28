import { describe, it, expect } from "vitest";
import { calculateSip, calculateRequiredSip, annualToMonthlyRate } from "@/lib/calculators/sip";

describe("annualToMonthlyRate", () => {
  it("compounds monthly to reach the annual rate", () => {
    const monthly = annualToMonthlyRate(12);
    const compounded = Math.pow(1 + monthly, 12) - 1;
    expect(compounded).toBeCloseTo(0.12, 6);
  });
});

describe("calculateSip - standard SIP", () => {
  it("matches a hand-computed value for a simple case", () => {
    const result = calculateSip({ monthlyAmount: 10000, annualReturnPercent: 12, years: 20 });
    expect(result.totalInvested).toBe(2_400_000);
    expect(result.futureValue).toBeGreaterThan(result.totalInvested);
    // Sanity range around the known outcome (~91 lakh) for this classic example.
    expect(result.futureValue).toBeGreaterThan(9_000_000);
    expect(result.futureValue).toBeLessThan(9_300_000);
  });

  it("produces one yearly row per year", () => {
    const result = calculateSip({ monthlyAmount: 5000, annualReturnPercent: 10, years: 5 });
    expect(result.yearly).toHaveLength(5);
    expect(result.yearly[4].cumulativeInvestment).toBe(result.totalInvested);
  });
});

describe("calculateSip - zero return", () => {
  it("future value equals total invested when return is 0%", () => {
    const result = calculateSip({ monthlyAmount: 1000, annualReturnPercent: 0, years: 10 });
    expect(result.futureValue).toBeCloseTo(result.totalInvested, 2);
    expect(result.estimatedReturns).toBeCloseTo(0, 2);
  });
});

describe("calculateSip - one year SIP", () => {
  it("invests exactly 12 months of contributions", () => {
    const result = calculateSip({ monthlyAmount: 2000, annualReturnPercent: 8, years: 1 });
    expect(result.totalInvested).toBe(24000);
    expect(result.yearly).toHaveLength(1);
  });
});

describe("calculateSip - contribution timing", () => {
  it("beginning-of-month timing yields a higher future value than end-of-month", () => {
    const start = calculateSip({ monthlyAmount: 5000, annualReturnPercent: 12, years: 10, timing: "start" });
    const end = calculateSip({ monthlyAmount: 5000, annualReturnPercent: 12, years: 10, timing: "end" });
    expect(start.futureValue).toBeGreaterThan(end.futureValue);
    expect(start.totalInvested).toBe(end.totalInvested);
  });
});

describe("calculateSip - step-up SIP", () => {
  it("percentage step-up invests more than a flat SIP over time", () => {
    const flat = calculateSip({ monthlyAmount: 10000, annualReturnPercent: 12, years: 10 });
    const steppedUp = calculateSip({
      monthlyAmount: 10000,
      annualReturnPercent: 12,
      years: 10,
      stepUp: { mode: "percent", percent: 10 },
    });
    expect(steppedUp.totalInvested).toBeGreaterThan(flat.totalInvested);
    expect(steppedUp.futureValue).toBeGreaterThan(flat.futureValue);
  });

  it("fixed step-up increases the annual investment linearly", () => {
    const result = calculateSip({
      monthlyAmount: 5000,
      annualReturnPercent: 10,
      years: 3,
      stepUp: { mode: "fixed", fixedAmount: 1200 },
    });
    // Year 1: 5000/mo, Year 2: 6200/mo, Year 3: 7400/mo
    expect(result.yearly[0].annualInvestment).toBeCloseTo(60000, 0);
    expect(result.yearly[1].annualInvestment).toBeCloseTo(74400, 0);
    expect(result.yearly[2].annualInvestment).toBeCloseTo(88800, 0);
  });
});

describe("calculateSip - inflation adjustment", () => {
  it("inflation-adjusted value is lower than the nominal future value", () => {
    const result = calculateSip({
      monthlyAmount: 10000,
      annualReturnPercent: 12,
      years: 15,
      inflationPercent: 6,
    });
    expect(result.inflationAdjustedValue).not.toBeNull();
    expect(result.inflationAdjustedValue!).toBeLessThan(result.futureValue);
  });

  it("is null when inflation is not requested", () => {
    const result = calculateSip({ monthlyAmount: 10000, annualReturnPercent: 12, years: 15 });
    expect(result.inflationAdjustedValue).toBeNull();
  });
});

describe("calculateSip - validation", () => {
  it("throws for zero/negative duration", () => {
    expect(() => calculateSip({ monthlyAmount: 1000, annualReturnPercent: 10, years: 0 })).toThrow();
  });

  it("throws for negative monthly amount", () => {
    expect(() => calculateSip({ monthlyAmount: -100, annualReturnPercent: 10, years: 5 })).toThrow();
  });
});

describe("calculateRequiredSip - goal mode", () => {
  it("required SIP grows the corpus to (approximately) the target", () => {
    const years = 10;
    const annualReturnPercent = 12;
    const targetAmount = 5_000_000;

    const required = calculateRequiredSip({ targetAmount, years, annualReturnPercent });
    const check = calculateSip({ monthlyAmount: required, annualReturnPercent, years });

    expect(check.futureValue).toBeCloseTo(targetAmount, -2); // within a rounding-friendly tolerance
  });

  it("handles a zero-return goal as a simple division", () => {
    const required = calculateRequiredSip({ targetAmount: 120000, years: 10, annualReturnPercent: 0 });
    expect(required).toBeCloseTo(1000, 2);
  });
});
