import { describe, it, expect } from "vitest";
import { calculateTimeDuration, parseTimeToMinutes } from "@/lib/calculators/timeDuration";

describe("parseTimeToMinutes", () => {
  it("parses a valid HH:MM time", () => {
    expect(parseTimeToMinutes("09:30")).toBe(9 * 60 + 30);
  });

  it("throws for an invalid format", () => {
    expect(() => parseTimeToMinutes("9.30")).toThrow();
  });

  it("throws for an out-of-range hour", () => {
    expect(() => parseTimeToMinutes("25:00")).toThrow();
  });
});

describe("calculateTimeDuration", () => {
  it("calculates a same-day duration", () => {
    const result = calculateTimeDuration("09:00", "17:30");
    expect(result.hours).toBe(8);
    expect(result.minutes).toBe(30);
  });

  it("rolls over to the next day when end is before start", () => {
    const result = calculateTimeDuration("22:00", "02:00");
    expect(result.hours).toBe(4);
    expect(result.minutes).toBe(0);
  });
});
