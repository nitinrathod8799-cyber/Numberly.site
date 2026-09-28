import { describe, it, expect } from "vitest";
import { calculateBmi, categoryForBmi } from "@/lib/calculators/bmi";

describe("calculateBmi - metric", () => {
  it("matches a known BMI example", () => {
    // 70kg, 175cm -> BMI = 70 / 1.75^2 = 22.86
    const result = calculateBmi({ units: "metric", height: 175, weight: 70 });
    expect(result.bmi).toBeCloseTo(22.9, 1);
    expect(result.category).toBe("Normal weight");
  });
});

describe("calculateBmi - imperial", () => {
  it("matches a known BMI example in pounds/inches", () => {
    // 154 lb, 69 in -> BMI ≈ 22.7
    const result = calculateBmi({ units: "imperial", height: 69, weight: 154 });
    expect(result.bmi).toBeCloseTo(22.7, 1);
  });
});

describe("categoryForBmi", () => {
  it("classifies each BMI band correctly", () => {
    expect(categoryForBmi(17)).toBe("Underweight");
    expect(categoryForBmi(22)).toBe("Normal weight");
    expect(categoryForBmi(27)).toBe("Overweight");
    expect(categoryForBmi(32)).toBe("Obese");
  });
});

describe("calculateBmi - healthy weight range", () => {
  it("returns a sensible healthy weight range for a given height", () => {
    const result = calculateBmi({ units: "metric", height: 175, weight: 70 });
    expect(result.healthyWeightRange.min).toBeLessThan(result.healthyWeightRange.max);
    expect(result.healthyWeightRange.min).toBeGreaterThan(50);
  });
});

describe("calculateBmi - validation", () => {
  it("throws for zero height", () => {
    expect(() => calculateBmi({ units: "metric", height: 0, weight: 70 })).toThrow();
  });

  it("throws for negative weight", () => {
    expect(() => calculateBmi({ units: "metric", height: 175, weight: -5 })).toThrow();
  });
});
