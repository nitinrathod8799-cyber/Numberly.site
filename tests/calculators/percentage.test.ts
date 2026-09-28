import { describe, it, expect } from "vitest";
import { percentOf, whatPercent, percentChange } from "@/lib/calculators/percentage";

describe("percentOf", () => {
  it("calculates X% of Y correctly", () => {
    expect(percentOf(25, 500)).toBe(125);
    expect(percentOf(0, 500)).toBe(0);
    expect(percentOf(150, 200)).toBe(300);
  });
});

describe("whatPercent", () => {
  it("calculates what percentage X is of Y", () => {
    expect(whatPercent(50, 200)).toBe(25);
    expect(whatPercent(200, 200)).toBe(100);
  });

  it("throws when dividing by zero", () => {
    expect(() => whatPercent(10, 0)).toThrow();
  });
});

describe("percentChange", () => {
  it("detects an increase", () => {
    expect(percentChange(500, 600)).toBe(20);
  });

  it("detects a decrease", () => {
    expect(percentChange(500, 400)).toBe(-20);
  });

  it("throws when original value is zero", () => {
    expect(() => percentChange(0, 100)).toThrow();
  });
});
