export function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function parseNumericInput(raw: string): number | null {
  if (raw.trim() === "") return null;
  const cleaned = raw.replace(/,/g, "");
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}
