import { describe, it, expect } from "vitest";
import { calculateDateDifference } from "@/lib/calculators/dateDifference";

describe("calculateDateDifference", () => {
  it("calculates the difference between two dates in order", () => {
    const result = calculateDateDifference(new Date(2020, 0, 1), new Date(2023, 5, 15));
    expect(result.years).toBe(3);
    expect(result.months).toBe(5);
    expect(result.days).toBe(14);
    expect(result.isReversed).toBe(false);
  });

  it("handles dates given in reverse order", () => {
    const result = calculateDateDifference(new Date(2023, 5, 15), new Date(2020, 0, 1));
    expect(result.isReversed).toBe(true);
    expect(result.years).toBe(3);
  });

  it("computes total days for a simple one-week gap", () => {
    const result = calculateDateDifference(new Date(2024, 0, 1), new Date(2024, 0, 8));
    expect(result.totalDays).toBe(7);
    expect(result.totalWeeks).toBe(1);
  });

  it("throws for an invalid date", () => {
    expect(() => calculateDateDifference(new Date("invalid"), new Date())).toThrow();
  });
});
