import { describe, it, expect } from "vitest";
import { calculateConcrete } from "@/lib/calculators/concrete";

describe("calculateConcrete", () => {
  it("computes wet volume correctly", () => {
    const result = calculateConcrete({ lengthFt: 10, widthFt: 10, depthFt: 0.33, grade: "M20" });
    expect(result.wetVolumeCft).toBeCloseTo(33, 0);
  });

  it("a richer mix (more cement) uses more cement bags for the same volume", () => {
    const m15 = calculateConcrete({ lengthFt: 10, widthFt: 10, depthFt: 1, grade: "M15" });
    const m25 = calculateConcrete({ lengthFt: 10, widthFt: 10, depthFt: 1, grade: "M25" });
    expect(m25.cementBags).toBeGreaterThan(m15.cementBags);
  });

  it("throws for zero depth", () => {
    expect(() => calculateConcrete({ lengthFt: 10, widthFt: 10, depthFt: 0, grade: "M20" })).toThrow();
  });
});
