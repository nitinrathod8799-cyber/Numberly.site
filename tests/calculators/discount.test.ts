import { describe, it, expect } from "vitest";
import { calculateDiscount } from "@/lib/calculators/discount";

describe("calculateDiscount - single discount", () => {
  it("calculates a straightforward percentage-off discount", () => {
    const result = calculateDiscount({ originalPrice: 1200, discountPercent: 17 });
    expect(result.finalPrice).toBeCloseTo(996, 0);
    expect(result.amountSaved).toBeCloseTo(204, 0);
  });
});

describe("calculateDiscount - stacked discount", () => {
  it("applies a second discount on top of the first, not on the original price", () => {
    const result = calculateDiscount({ originalPrice: 1000, discountPercent: 30, secondDiscountPercent: 10 });
    // After 30%: 700. After further 10%: 630. Effective discount: 37%.
    expect(result.priceAfterFirstDiscount).toBe(700);
    expect(result.finalPrice).toBe(630);
    expect(result.effectiveDiscountPercent).toBeCloseTo(37, 0);
  });
});

describe("calculateDiscount - validation", () => {
  it("throws for a discount over 100%", () => {
    expect(() => calculateDiscount({ originalPrice: 100, discountPercent: 150 })).toThrow();
  });

  it("throws for negative price", () => {
    expect(() => calculateDiscount({ originalPrice: -10, discountPercent: 10 })).toThrow();
  });
});
