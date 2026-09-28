import { describe, it, expect } from "vitest";
import { calculateProfitLoss } from "@/lib/calculators/profitLoss";

describe("calculateProfitLoss", () => {
  it("detects a profit", () => {
    const result = calculateProfitLoss(500, 650);
    expect(result.type).toBe("profit");
    expect(result.amount).toBe(150);
    expect(result.percent).toBe(30);
  });

  it("detects a loss", () => {
    const result = calculateProfitLoss(500, 400);
    expect(result.type).toBe("loss");
    expect(result.amount).toBe(100);
    expect(result.percent).toBe(20);
  });

  it("detects break-even", () => {
    const result = calculateProfitLoss(500, 500);
    expect(result.type).toBe("none");
    expect(result.amount).toBe(0);
  });

  it("throws for zero cost price", () => {
    expect(() => calculateProfitLoss(0, 100)).toThrow();
  });
});
