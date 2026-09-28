"use client";

import { useId, useState } from "react";
import { calculateAge, type AgeResult } from "@/lib/calculators/age";
import { ResultStat } from "@/components/calculator/ResultStat";
import { formatNumber } from "@/lib/format";

export function AgeCalculatorApp() {
  const id = useId();
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dob) {
      setError("Please choose a date of birth.");
      setResult(null);
      return;
    }
    try {
      const parsed = new Date(dob);
      const age = calculateAge(parsed, new Date());
      setResult(age);
      setError(null);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Please enter a valid date.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor={id} className="block text-sm font-medium text-ink">
            Date of birth
          </label>
          <input
            id={id}
            type="date"
            value={dob}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-lg border border-line-strong bg-surface px-3.5 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand"
          />
        </div>
        <button
          type="submit"
          className="h-12 shrink-0 rounded-lg bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Calculate age
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
            <p className="text-sm font-medium text-brand-dark">Your age</p>
            <p className="mt-1 tabular-nums text-3xl font-bold text-brand-dark">
              {result.years} <span className="text-lg font-medium">years</span> {result.months}{" "}
              <span className="text-lg font-medium">months</span> {result.days}{" "}
              <span className="text-lg font-medium">days</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ResultStat label="Total months" value={formatNumber(result.totalMonths)} />
            <ResultStat label="Total weeks" value={formatNumber(result.totalWeeks)} />
            <ResultStat label="Total days" value={formatNumber(result.totalDays)} />
            <ResultStat
              label="Next birthday"
              value={
                result.nextBirthday.daysAway === 0
                  ? "Today 🎉"
                  : `${formatNumber(result.nextBirthday.daysAway)} days`
              }
              sub={result.nextBirthday.date.toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
