import { describe, it, expect } from "vitest";
import { calculateAge } from "@/lib/calculators/age";

describe("calculateAge - normal date", () => {
  it("calculates exact years/months/days between two dates", () => {
    const dob = new Date(2000, 5, 15); // 15 Jun 2000
    const today = new Date(2024, 5, 10); // 10 Jun 2024 (5 days before birthday)
    const result = calculateAge(dob, today);
    expect(result.years).toBe(23);
    expect(result.months).toBe(11);
  });

  it("counts a full year immediately on the birthday", () => {
    const dob = new Date(2000, 5, 15);
    const today = new Date(2024, 5, 15);
    const result = calculateAge(dob, today);
    expect(result.years).toBe(24);
    expect(result.months).toBe(0);
    expect(result.days).toBe(0);
  });
});

describe("calculateAge - leap year", () => {
  it("handles a Feb 29 birthday and shows Feb 28 as next birthday in a non-leap year", () => {
    const dob = new Date(2000, 1, 29); // 29 Feb 2000 (leap year)
    const today = new Date(2025, 2, 1); // 1 Mar 2025 (non-leap year, just after Feb 28)
    const result = calculateAge(dob, today);
    expect(result.years).toBe(25);
    // Next birthday should land on Feb 28, 2026 (non-leap year)
    expect(result.nextBirthday.date.getMonth()).toBe(1);
    expect(result.nextBirthday.date.getDate()).toBe(28);
  });
});

describe("calculateAge - future date", () => {
  it("throws when the date of birth is in the future", () => {
    const dob = new Date(2999, 0, 1);
    expect(() => calculateAge(dob, new Date(2024, 0, 1))).toThrow();
  });
});

describe("calculateAge - totals", () => {
  it("computes total days/weeks/months consistently", () => {
    const dob = new Date(2020, 0, 1);
    const today = new Date(2020, 0, 8); // exactly one week later
    const result = calculateAge(dob, today);
    expect(result.totalDays).toBe(7);
    expect(result.totalWeeks).toBe(1);
  });
});
