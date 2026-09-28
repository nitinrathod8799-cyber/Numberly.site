"use client";

import { useId, useState } from "react";
import { calculateDateDifference, type DateDifferenceResult } from "@/lib/calculators/dateDifference";
import { ResultStat } from "@/components/calculator/ResultStat";
import { formatNumber } from "@/lib/format";

export function DateDifferenceCalculatorApp() {
  const idA = useId();
  const idB = useId();
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [result, setResult] = useState<DateDifferenceResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dateA || !dateB) {
      setError("Please choose both dates.");
      setResult(null);
      return;
    }
    try {
      const res = calculateDateDifference(new Date(dateA), new Date(dateB));
      setResult(res);
      setError(null);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Please enter valid dates.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor={idA} className="block text-sm font-medium text-ink">
            First date
          </label>
          <input
            id={idA}
            type="date"
            value={dateA}
            onChange={(e) => setDateA(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-lg border border-line-strong bg-surface px-3.5 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand"
          />
        </div>
        <div className="flex-1">
          <label htmlFor={idB} className="block text-sm font-medium text-ink">
            Second date
          </label>
          <input
            id={idB}
            type="date"
            value={dateB}
            onChange={(e) => setDateB(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-lg border border-line-strong bg-surface px-3.5 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand"
          />
        </div>
        <button
          type="submit"
          className="h-12 shrink-0 rounded-lg bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Calculate
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-danger">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-brand/30 bg-brand-soft p-5">
            <p className="text-sm font-medium text-brand-dark">Difference</p>
            <p className="mt-1 tabular-nums text-3xl font-bold text-brand-dark">
              {result.years} <span className="text-lg font-medium">years</span> {result.months}{" "}
              <span className="text-lg font-medium">months</span> {result.days}{" "}
              <span className="text-lg font-medium">days</span>
            </p>
            {result.isReversed && (
              <p className="mt-1 text-xs text-brand-dark/80">Dates were entered out of order — shown from the earlier to the later date.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <ResultStat label="Total days" value={formatNumber(result.totalDays)} />
            <ResultStat label="Total weeks" value={formatNumber(result.totalWeeks)} />
            <ResultStat label="Total months" value={formatNumber(result.totalMonths)} />
          </div>
        </div>
      )}
    </div>
  );
}
