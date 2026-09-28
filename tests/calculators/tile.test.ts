import { describe, it, expect } from "vitest";
import { calculateTiles } from "@/lib/calculators/tile";

describe("calculateTiles", () => {
  it("computes room and tile area correctly", () => {
    const result = calculateTiles({
      roomLengthFt: 10,
      roomWidthFt: 10,
      tileLengthCm: 30,
      tileWidthCm: 30,
      wastagePercent: 0,
    });
    expect(result.roomAreaSqFt).toBe(100);
    expect(result.tilesToBuy).toBeGreaterThan(0);
  });

  it("adds wastage on top of the exact tile count", () => {
    const noWastage = calculateTiles({ roomLengthFt: 12, roomWidthFt: 10, tileLengthCm: 60, tileWidthCm: 60, wastagePercent: 0 });
    const withWastage = calculateTiles({ roomLengthFt: 12, roomWidthFt: 10, tileLengthCm: 60, tileWidthCm: 60, wastagePercent: 10 });
    expect(withWastage.tilesToBuy).toBeGreaterThanOrEqual(noWastage.tilesToBuy);
  });

  it("throws for zero dimensions", () => {
    expect(() => calculateTiles({ roomLengthFt: 0, roomWidthFt: 10, tileLengthCm: 30, tileWidthCm: 30, wastagePercent: 0 })).toThrow();
  });
});
