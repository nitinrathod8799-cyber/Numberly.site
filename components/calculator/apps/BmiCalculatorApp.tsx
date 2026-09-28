"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { ResultStat } from "@/components/calculator/ResultStat";
import { calculateBmi } from "@/lib/calculators/bmi";
import type { BmiUnits } from "@/lib/calculators/bmi";
import { parseNumericInput } from "@/lib/validation";

const CATEGORY_STYLES: Record<string, string> = {
  Underweight: "text-ink",
  "Normal weight": "text-brand-dark",
  Overweight: "text-ink",
  Obese: "text-danger",
};

export function BmiCalculatorApp() {
  const [units, setUnits] = useState<BmiUnits>("metric");
  const [heightCm, setHeightCm] = useState("175");
  const [weightKg, setWeightKg] = useState("70");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [weightLb, setWeightLb] = useState("154");

  const { result, error } = useMemo(() => {
    try {
      if (units === "metric") {
        const h = parseNumericInput(heightCm);
        const w = parseNumericInput(weightKg);
        if (h === null || w === null) return { result: null, error: null };
        if (h <= 0) return { result: null, error: "Height must be greater than zero." };
        if (w <= 0) return { result: null, error: "Weight must be greater than zero." };
        return { result: calculateBmi({ units, height: h, weight: w }), error: null };
      } else {
        const ft = parseNumericInput(heightFt) ?? 0;
        const inch = parseNumericInput(heightIn) ?? 0;
        const w = parseNumericInput(weightLb);
        const totalInches = ft * 12 + inch;
        if (w === null) return { result: null, error: null };
        if (totalInches <= 0) return { result: null, error: "Height must be greater than zero." };
        if (w <= 0) return { result: null, error: "Weight must be greater than zero." };
        return { result: calculateBmi({ units, height: totalInches, weight: w }), error: null };
      }
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [units, heightCm, weightKg, heightFt, heightIn, weightLb]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <div>
          <p className="text-sm font-medium text-ink">Units</p>
          <div className="mt-2">
            <ChipGroup
              options={[
                { label: "Metric (cm, kg)", value: "metric" },
                { label: "Imperial (ft/in, lb)", value: "imperial" },
              ]}
              activeValue={units}
              onSelect={(v) => setUnits(v as BmiUnits)}
            />
          </div>
        </div>

        {units === "metric" ? (
          <>
            <NumberField label="Height" value={heightCm} onChange={setHeightCm} unit="cm" unitPosition="suffix" />
            <NumberField label="Weight" value={weightKg} onChange={setWeightKg} unit="kg" unitPosition="suffix" />
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <NumberField label="Height (ft)" value={heightFt} onChange={setHeightFt} unit="ft" unitPosition="suffix" />
              <NumberField label="Height (in)" value={heightIn} onChange={setHeightIn} unit="in" unitPosition="suffix" />
            </div>
            <NumberField label="Weight" value={weightLb} onChange={setWeightLb} unit="lb" unitPosition="suffix" />
          </>
        )}
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
              <ResultStat label="Your BMI" value={result.bmi.toString()} emphasis />
              <div className="rounded-lg border border-line bg-surface p-4">
                <p className="text-xs font-medium text-ink-soft">Category</p>
                <p className={`mt-1 text-xl font-bold ${CATEGORY_STYLES[result.category]}`}>{result.category}</p>
              </div>
              <ResultStat
                label="Healthy weight range"
                value={`${result.healthyWeightRange.min}–${result.healthyWeightRange.max}`}
                sub={units === "metric" ? "kg" : "lb"}
              />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-faint">
              BMI is a general screening measure and doesn&rsquo;t account for muscle mass, bone density, or
              body composition. This result is informational only and is not a medical diagnosis —
              consult a qualified healthcare professional for personal health guidance.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
