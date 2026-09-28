const CM_PER_FOOT = 30.48;

export interface TileInput {
  /** Room dimensions in feet. */
  roomLengthFt: number;
  roomWidthFt: number;
  /** Tile dimensions in centimetres. */
  tileLengthCm: number;
  tileWidthCm: number;
  /** Extra tiles to account for cutting/breakage, e.g. 10 for 10%. */
  wastagePercent: number;
}

export interface TileResult {
  roomAreaSqFt: number;
  tileAreaSqFt: number;
  tilesRequiredExact: number;
  tilesToBuy: number;
}

export function calculateTiles(input: TileInput): TileResult {
  const { roomLengthFt, roomWidthFt, tileLengthCm, tileWidthCm, wastagePercent } = input;

  if (roomLengthFt <= 0 || roomWidthFt <= 0) throw new Error("Room dimensions must be greater than zero.");
  if (tileLengthCm <= 0 || tileWidthCm <= 0) throw new Error("Tile dimensions must be greater than zero.");
  if (wastagePercent < 0) throw new Error("Wastage cannot be negative.");

  const roomAreaSqFt = roomLengthFt * roomWidthFt;
  const tileAreaSqFt = (tileLengthCm / CM_PER_FOOT) * (tileWidthCm / CM_PER_FOOT);

  const exact = roomAreaSqFt / tileAreaSqFt;
  const withWastage = exact * (1 + wastagePercent / 100);

  return {
    roomAreaSqFt: round2(roomAreaSqFt),
    tileAreaSqFt: round2(tileAreaSqFt),
    tilesRequiredExact: round2(exact),
    tilesToBuy: Math.ceil(withWastage),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
