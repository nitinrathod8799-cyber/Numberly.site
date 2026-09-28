export interface AverageResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  mode: number[];
  min: number;
  max: number;
  range: number;
}

/** Parses a free-text list of numbers separated by commas, spaces or newlines. */
export function parseNumberList(raw: string): number[] {
  return raw
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map(Number)
    .filter((n) => Number.isFinite(n));
}

export function calculateAverage(numbers: number[]): AverageResult {
  if (numbers.length === 0) throw new Error("Enter at least one number.");

  const sorted = [...numbers].sort((a, b) => a - b);
  const count = numbers.length;
  const sum = numbers.reduce((a, b) => a + b, 0);
  const mean = sum / count;

  const mid = Math.floor(count / 2);
  const median = count % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

  const frequency = new Map<number, number>();
  for (const n of numbers) frequency.set(n, (frequency.get(n) ?? 0) + 1);
  const maxFreq = Math.max(...frequency.values());
  const mode =
    maxFreq === 1 ? [] : [...frequency.entries()].filter(([, f]) => f === maxFreq).map(([n]) => n).sort((a, b) => a - b);

  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  return {
    count,
    sum: round2(sum),
    mean: round2(mean),
    median: round2(median),
    mode,
    min,
    max,
    range: round2(max - min),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
