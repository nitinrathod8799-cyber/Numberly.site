import { describe, it, expect } from "vitest";
import { calculateAverage, parseNumberList } from "@/lib/calculators/average";

describe("parseNumberList", () => {
  it("parses comma, space and newline separated numbers", () => {
    expect(parseNumberList("1, 2, 3\n4 5")).toEqual([1, 2, 3, 4, 5]);
  });

  it("ignores non-numeric junk", () => {
    expect(parseNumberList("1, abc, 3")).toEqual([1, 3]);
  });
});

describe("calculateAverage", () => {
  it("computes mean, median and mode for an odd-length list", () => {
    const result = calculateAverage([1, 2, 2, 3, 4]);
    expect(result.mean).toBeCloseTo(2.4, 5);
    expect(result.median).toBe(2);
    expect(result.mode).toEqual([2]);
  });

  it("computes median as the average of the two middle values for an even-length list", () => {
    const result = calculateAverage([1, 2, 3, 4]);
    expect(result.median).toBe(2.5);
  });

  it("returns no mode when every value is unique", () => {
    const result = calculateAverage([1, 2, 3]);
    expect(result.mode).toEqual([]);
  });

  it("handles multiple modes", () => {
    const result = calculateAverage([1, 1, 2, 2, 3]);
    expect(result.mode).toEqual([1, 2]);
  });

  it("throws for an empty list", () => {
    expect(() => calculateAverage([])).toThrow();
  });
});
