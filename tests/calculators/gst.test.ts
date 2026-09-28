import { describe, it, expect } from "vitest";
import { calculateGst } from "@/lib/calculators/gst";

describe("calculateGst - add mode", () => {
  it("adds GST on top of a base amount", () => {
    const result = calculateGst(1000, 18, "add");
    expect(result.baseAmount).toBe(1000);
    expect(result.gstAmount).toBe(180);
    expect(result.totalAmount).toBe(1180);
    expect(result.cgst).toBe(90);
    expect(result.sgst).toBe(90);
  });
});

describe("calculateGst - remove mode", () => {
  it("extracts the base amount from a GST-inclusive price", () => {
    const result = calculateGst(1180, 18, "remove");
    expect(result.baseAmount).toBeCloseTo(1000, 1);
    expect(result.gstAmount).toBeCloseTo(180, 1);
  });
});

describe("calculateGst - validation", () => {
  it("throws for negative amount", () => {
    expect(() => calculateGst(-1, 18, "add")).toThrow();
  });
});
