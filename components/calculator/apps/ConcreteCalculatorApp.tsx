"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { ResultStat } from "@/components/calculator/ResultStat";
import { calculateConcrete, MIX_RATIOS, type MixGrade } from "@/lib/calculators/concrete";
import { parseNumericInput } from "@/lib/validation";
import { formatNumber } from "@/lib/format";

const GRADE_OPTIONS: { label: string; value: MixGrade }[] = [
  { label: "M15 (1:2:4)", value: "M15" },
  { label: "M20 (1:1.5:3)", value: "M20" },
  { label: "M25 (1:1:2)", value: "M25" },
];

export function ConcreteCalculatorApp() {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("0.33");
  const [grade, setGrade] = useState<MixGrade>("M20");

  const l = parseNumericInput(length);
  const wd = parseNumericInput(width);
  const d = parseNumericInput(depth);

  const { result, error } = useMemo(() => {
    if (l === null || wd === null || d === null) return { result: null, error: null };
    if (l <= 0 || wd <= 0 || d <= 0) return { result: null, error: "All dimensions must be greater than zero." };
    try {
      return { result: calculateConcrete({ lengthFt: l, widthFt: wd, depthFt: d, grade }), error: null };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [l, wd, d, grade]);

  const ratio = MIX_RATIOS[grade];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <p className="text-sm font-semibold text-ink">Slab dimensions (feet)</p>
        <div className="grid grid-cols-3 gap-3">
          <NumberField label="Length" value={length} onChange={setLength} unit="ft" unitPosition="suffix" />
          <NumberField label="Width" value={width} onChange={setWidth} unit="ft" unitPosition="suffix" />
          <NumberField label="Depth" value={depth} onChange={setDepth} unit="ft" unitPosition="suffix" hint="4 in ≈ 0.33 ft" />
        </div>

        <div className="border-t border-line pt-5">
          <p className="text-sm font-medium text-ink">Concrete mix grade</p>
          <div className="mt-2">
            <ChipGroup options={GRADE_OPTIONS} activeValue={grade} onSelect={(v) => setGrade(v as MixGrade)} />
          </div>
          <p className="mt-1.5 text-xs text-ink-faint">
            Cement : Sand : Aggregate ratio — {ratio[0]} : {ratio[1]} : {ratio[2]}
          </p>
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
              <ResultStat label="Wet volume" value={`${formatNumber(result.wetVolumeCft)} cu ft`} sub={`${result.wetVolumeCum} m³`} emphasis />
              <ResultStat label="Cement bags" value={`${formatNumber(result.cementBags)}`} sub="50 kg each" />
              <ResultStat label="Sand" value={`${result.sandCum} m³`} />
              <ResultStat label="Aggregate" value={`${result.aggregateCum} m³`} />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink-faint">
              Includes a standard 1.54× dry-volume factor for bulking and wastage during mixing. Actual
              material needs vary with aggregate size, mixing method and site wastage — use this as a
              planning estimate, and confirm quantities with your contractor or supplier.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
