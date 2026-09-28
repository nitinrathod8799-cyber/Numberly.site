"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultStat } from "@/components/calculator/ResultStat";
import { calculateCagr } from "@/lib/calculators/cagr";
import { parseNumericInput } from "@/lib/validation";

export function CagrCalculatorApp() {
  const [beginning, setBeginning] = useState("100000");
  const [ending, setEnding] = useState("200000");
  const [years, setYears] = useState("5");

  const beginningVal = parseNumericInput(beginning);
  const endingVal = parseNumericInput(ending);
  const yearsVal = parseNumericInput(years);

  const { result, error } = useMemo(() => {
    if (beginningVal === null || endingVal === null || yearsVal === null) return { result: null, error: null };
    if (beginningVal <= 0) return { result: null, error: "Beginning value must be greater than zero." };
    if (endingVal < 0) return { result: null, error: "Ending value cannot be negative." };
    if (yearsVal <= 0) return { result: null, error: "Number of years must be greater than zero." };
    try {
      return { result: calculateCagr(beginningVal, endingVal, yearsVal), error: null };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [beginningVal, endingVal, yearsVal]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <NumberField label="Beginning value" value={beginning} onChange={setBeginning} unit="₹" />
        <NumberField label="Ending value" value={ending} onChange={setEnding} unit="₹" />
        <NumberField label="Number of years" value={years} onChange={setYears} unit="years" unitPosition="suffix" />
      </div>

      <div>
        {error && (
          <p role="alert" className="mb-4 text-sm font-medium text-danger">
            {error}
          </p>
        )}

        {result && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ResultStat label="CAGR" value={`${result.cagrPercent}%`} sub="Annualised growth rate" emphasis />
            <ResultStat label="Total growth" value={`${result.absoluteGrowthPercent}%`} sub="Over the full period" />
          </div>
        )}
      </div>
    </div>
  );
}
