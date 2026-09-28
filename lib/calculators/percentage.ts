/** What is X% of Y? */
export function percentOf(percent: number, of: number): number {
  return round2((percent / 100) * of);
}

/** X is what percentage of Y? */
export function whatPercent(x: number, of: number): number {
  if (of === 0) throw new Error("Cannot divide by zero.");
  return round2((x / of) * 100);
}

/** Percentage change from an original value to a new value. Positive = increase. */
export function percentChange(original: number, updated: number): number {
  if (original === 0) throw new Error("Original value cannot be zero.");
  return round2(((updated - original) / original) * 100);
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
