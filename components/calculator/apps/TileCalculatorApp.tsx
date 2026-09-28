"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { ResultStat } from "@/components/calculator/ResultStat";
import { calculateTiles } from "@/lib/calculators/tile";
import { parseNumericInput } from "@/lib/validation";
import { formatNumber } from "@/lib/format";

const TILE_SIZE_PRESETS = [
  { label: "30 × 30 cm", value: "30x30" },
  { label: "60 × 60 cm", value: "60x60" },
  { label: "60 × 120 cm", value: "60x120" },
  { label: "80 × 80 cm", value: "80x80" },
];

export function TileCalculatorApp() {
  const [roomLength, setRoomLength] = useState("12");
  const [roomWidth, setRoomWidth] = useState("10");
  const [tileLength, setTileLength] = useState("60");
  const [tileWidth, setTileWidth] = useState("60");
  const [wastage, setWastage] = useState("10");

  const rL = parseNumericInput(roomLength);
  const rW = parseNumericInput(roomWidth);
  const tL = parseNumericInput(tileLength);
  const tW = parseNumericInput(tileWidth);
  const w = parseNumericInput(wastage);

  const { result, error } = useMemo(() => {
    if (rL === null || rW === null || tL === null || tW === null || w === null) {
      return { result: null, error: null };
    }
    if (rL <= 0 || rW <= 0) return { result: null, error: "Room dimensions must be greater than zero." };
    if (tL <= 0 || tW <= 0) return { result: null, error: "Tile dimensions must be greater than zero." };
    try {
      return {
        result: calculateTiles({ roomLengthFt: rL, roomWidthFt: rW, tileLengthCm: tL, tileWidthCm: tW, wastagePercent: w }),
        error: null,
      };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [rL, rW, tL, tW, w]);

  function applyTileSize(value: string) {
    const [l, wd] = value.split("x");
    setTileLength(l);
    setTileWidth(wd);
  }

  const activeSizePreset = TILE_SIZE_PRESETS.find((p) => p.value === `${tileLength}x${tileWidth}`)?.value;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <div>
          <p className="text-sm font-semibold text-ink">Room size (feet)</p>
          <div className="mt-2.5 grid grid-cols-2 gap-3">
            <NumberField label="Length" value={roomLength} onChange={setRoomLength} unit="ft" unitPosition="suffix" />
            <NumberField label="Width" value={roomWidth} onChange={setRoomWidth} unit="ft" unitPosition="suffix" />
          </div>
        </div>

        <div className="border-t border-line pt-5">
          <p className="text-sm font-semibold text-ink">Tile size (cm)</p>
          <div className="mt-2.5 grid grid-cols-2 gap-3">
            <NumberField label="Length" value={tileLength} onChange={setTileLength} unit="cm" unitPosition="suffix" />
            <NumberField label="Width" value={tileWidth} onChange={setTileWidth} unit="cm" unitPosition="suffix" />
          </div>
          <div className="mt-2.5">
            <ChipGroup options={TILE_SIZE_PRESETS} activeValue={activeSizePreset} onSelect={applyTileSize} />
          </div>
        </div>

        <div className="border-t border-line pt-5">
          <NumberField
            label="Wastage / cutting allowance"
            value={wastage}
            onChange={setWastage}
            unit="%"
            unitPosition="suffix"
            hint="10% is a common default for straight-lay patterns."
          />
        </div>
      </div>

      <div>
        {error && (
          <p role="alert" className="mb-4 text-sm font-medium text-danger">
            {error}
          </p>
        )}

        {result && (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <ResultStat label="Room area" value={`${formatNumber(result.roomAreaSqFt)} sq ft`} />
              <ResultStat label="Tile area" value={`${formatNumber(result.tileAreaSqFt)} sq ft`} />
              <ResultStat label="Tiles to buy" value={formatNumber(result.tilesToBuy)} emphasis />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink-faint">
              Exact coverage needs {formatNumber(result.tilesRequiredExact)} tiles; the tiles-to-buy figure
              rounds up and includes your wastage allowance. Always confirm final quantities with your
              tile supplier, especially for patterned or diagonal layouts.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
