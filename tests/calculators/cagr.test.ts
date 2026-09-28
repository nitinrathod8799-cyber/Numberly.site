import { describe, it, expect } from "vitest";
import { calculateCagr } from "@/lib/calculators/cagr";

describe("calculateCagr", () => {
  it("matches a known CAGR example", () => {
    // 100000 -> 200000 over 5 years -> CAGR ~14.87%
    const result = calculateCagr(100000, 200000, 5);
    expect(result.cagrPercent).toBeCloseTo(14.87, 1);
  });

  it("returns 0% for no change", () => {
    const result = calculateCagr(50000, 50000, 3);
    expect(result.cagrPercent).toBe(0);
  });

  it("handles a decline (negative CAGR)", () => {
    const result = calculateCagr(100000, 80000, 2);
    expect(result.cagrPercent).toBeLessThan(0);
  });

  it("throws for zero beginning value", () => {
    expect(() => calculateCagr(0, 1000, 5)).toThrow();
  });
});
