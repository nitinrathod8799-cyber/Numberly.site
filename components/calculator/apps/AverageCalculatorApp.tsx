"use client";

import { useId, useMemo, useState } from "react";
import { ResultStat } from "@/components/calculator/ResultStat";
import { calculateAverage, parseNumberList } from "@/lib/calculators/average";
import { formatNumber } from "@/lib/format";

export function AverageCalculatorApp() {
  const id = useId();
  const [raw, setRaw] = useState("4, 8, 15, 16, 23, 42");

  const numbers = useMemo(() => parseNumberList(raw), [raw]);

  const { result, error } = useMemo(() => {
    if (numbers.length === 0) return { result: null, error: null };
    try {
      return { result: calculateAverage(numbers), error: null };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [numbers]);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        Enter numbers (comma, space or new line separated)
      </label>
      <textarea
        id={id}
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        rows={3}
        className="mt-1.5 w-full rounded-lg border border-line-strong bg-surface p-3.5 text-base tabular-nums text-ink focus-visible:outline-2 focus-visible:outline-brand"
        placeholder="e.g. 4, 8, 15, 16, 23, 42"
      />

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-danger">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <ResultStat label="Mean (average)" value={formatNumber(result.mean)} emphasis />
            <ResultStat label="Median" value={formatNumber(result.median)} />
            <ResultStat
              label="Mode"
              value={result.mode.length === 0 ? "None" : result.mode.map((m) => formatNumber(m)).join(", ")}
            />
            <ResultStat label="Count" value={formatNumber(result.count)} />
            <ResultStat label="Sum" value={formatNumber(result.sum)} />
            <ResultStat label="Range" value={formatNumber(result.range)} sub={`${formatNumber(result.min)} – ${formatNumber(result.max)}`} />
          </div>
        </div>
      )}
    </div>
  );
}
