import { describe, it, expect } from "vitest";
import { simplifyRatio, scaleRatioFromA } from "@/lib/calculators/ratio";

describe("simplifyRatio", () => {
  it("simplifies to lowest terms", () => {
    const result = simplifyRatio(8, 12);
    expect(result.simplified).toEqual([2, 3]);
  });

  it("returns the decimal equivalent", () => {
    const result = simplifyRatio(1, 4);
    expect(result.decimal).toBe(0.25);
  });

  it("throws when second value is zero", () => {
    expect(() => simplifyRatio(5, 0)).toThrow();
  });
});

describe("scaleRatioFromA", () => {
  it("scales the ratio proportionally", () => {
    // 2:3 scaled so the first part is 10 -> second part should be 15
    expect(scaleRatioFromA(2, 3, 10)).toBe(15);
  });
});
