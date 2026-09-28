"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultStat } from "@/components/calculator/ResultStat";
import { simplifyRatio, scaleRatioFromA } from "@/lib/calculators/ratio";
import { parseNumericInput } from "@/lib/validation";
import { formatNumber } from "@/lib/format";

export function RatioCalculatorApp() {
  const [a, setA] = useState("8");
  const [b, setB] = useState("12");
  const [targetA, setTargetA] = useState("");

  const aVal = parseNumericInput(a);
  const bVal = parseNumericInput(b);
  const targetAVal = parseNumericInput(targetA);

  const { result, error } = useMemo(() => {
    if (aVal === null || bVal === null) return { result: null, error: null };
    if (aVal < 0 || bVal < 0) return { result: null, error: "Ratio values cannot be negative." };
    try {
      return { result: simplifyRatio(aVal, bVal), error: null };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [aVal, bVal]);

  const scaled = useMemo(() => {
    if (aVal === null || bVal === null || targetAVal === null || aVal <= 0) return null;
    try {
      return scaleRatioFromA(aVal, bVal, targetAVal);
    } catch {
      return null;
    }
  }, [aVal, bVal, targetAVal]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="First value (A)" value={a} onChange={setA} />
          <NumberField label="Second value (B)" value={b} onChange={setB} />
        </div>

        <div className="border-t border-line pt-4">
          <NumberField
            label="Scale to A = (optional)"
            value={targetA}
            onChange={setTargetA}
            hint="Enter a new value for A to scale B proportionally."
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
              <ResultStat
                label="Simplified ratio"
                value={`${formatNumber(result.simplified[0])} : ${formatNumber(result.simplified[1])}`}
                emphasis
              />
              <ResultStat label="Decimal equivalent" value={formatNumber(result.decimal)} />
            </div>

            {scaled !== null && targetA.trim() !== "" && (
              <div className="mt-4 rounded-lg bg-brand-soft px-4 py-3">
                <p className="text-sm font-medium text-brand-dark">
                  {formatNumber(aVal ?? 0)} : {formatNumber(bVal ?? 0)} scaled to A = {formatNumber(targetAVal ?? 0)}
                </p>
                <p className="mt-1 text-xl font-bold tabular-nums text-brand-dark">
                  {formatNumber(targetAVal ?? 0)} : {formatNumber(scaled)}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
