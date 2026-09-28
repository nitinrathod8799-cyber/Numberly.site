export interface RatioResult {
  simplified: [number, number];
  decimal: number;
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

/** Simplifies a:b to its lowest terms. */
export function simplifyRatio(a: number, b: number): RatioResult {
  if (a < 0 || b < 0) throw new Error("Ratio values cannot be negative.");
  if (a === 0 && b === 0) throw new Error("At least one value must be greater than zero.");
  if (b === 0) throw new Error("Second value cannot be zero.");

  const divisor = gcd(a, b);
  return {
    simplified: [round4(a / divisor), round4(b / divisor)],
    decimal: round4(a / b),
  };
}

/** Scales a:b so that the "a" side equals targetA, keeping the ratio constant. */
export function scaleRatioFromA(a: number, b: number, targetA: number): number {
  if (a <= 0) throw new Error("First ratio value must be greater than zero.");
  if (b < 0) throw new Error("Second ratio value cannot be negative.");
  return round4((b / a) * targetA);
}

function round4(value: number): number {
  return Math.round(value * 10000) / 10000;
}
