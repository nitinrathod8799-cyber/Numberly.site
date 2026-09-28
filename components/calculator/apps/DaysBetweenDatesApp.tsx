"use client";

import { useId, useState } from "react";
import { calculateDateDifference } from "@/lib/calculators/dateDifference";
import { ResultStat } from "@/components/calculator/ResultStat";
import { formatNumber } from "@/lib/format";

export function DaysBetweenDatesApp() {
  const idA = useId();
  const idB = useId();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState<number | null>(null);
  const [totalWeeks, setTotalWeeks] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Please choose both dates.");
      setTotalDays(null);
      return;
    }
    try {
      const res = calculateDateDifference(new Date(startDate), new Date(endDate));
      setTotalDays(res.totalDays);
      setTotalWeeks(res.totalWeeks);
      setError(null);
    } catch (err) {
      setTotalDays(null);
      setError(err instanceof Error ? err.message : "Please enter valid dates.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor={idA} className="block text-sm font-medium text-ink">
            Start date
          </label>
          <input
            id={idA}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-lg border border-line-strong bg-surface px-3.5 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand"
          />
        </div>
        <div className="flex-1">
          <label htmlFor={idB} className="block text-sm font-medium text-ink">
            End date
          </label>
          <input
            id={idB}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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

      {totalDays !== null && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-brand/30 bg-brand-soft p-5">
            <p className="text-sm font-medium text-brand-dark">Total days</p>
            <p className="mt-1 tabular-nums text-4xl font-bold text-brand-dark">{formatNumber(totalDays)}</p>
          </div>
          {totalWeeks !== null && <ResultStat label="Total weeks" value={formatNumber(totalWeeks)} sub="Rounded down to whole weeks" />}
        </div>
      )}
    </div>
  );
}
