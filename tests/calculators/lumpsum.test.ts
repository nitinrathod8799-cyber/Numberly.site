import { describe, it, expect } from "vitest";
import { calculateLumpsum } from "@/lib/calculators/lumpsum";

describe("calculateLumpsum", () => {
  it("matches the standard lumpsum compounding example", () => {
    const result = calculateLumpsum({ investment: 100000, annualReturnPercent: 12, years: 10 });
    // A = P(1+r)^t = 100000 * 1.12^10 ≈ 310,585
    expect(result.maturityAmount).toBeCloseTo(310585, -1);
  });

  it("a longer duration yields a higher maturity amount", () => {
    const shorter = calculateLumpsum({ investment: 50000, annualReturnPercent: 10, years: 5 });
    const longer = calculateLumpsum({ investment: 50000, annualReturnPercent: 10, years: 10 });
    expect(longer.maturityAmount).toBeGreaterThan(shorter.maturityAmount);
  });

  it("throws for zero investment", () => {
    expect(() => calculateLumpsum({ investment: 0, annualReturnPercent: 10, years: 5 })).toThrow();
  });
});
