"use client";

import { useId, useMemo, useState } from "react";
import { calculateTimeDuration } from "@/lib/calculators/timeDuration";
import { ResultStat } from "@/components/calculator/ResultStat";

export function TimeDurationCalculatorApp() {
  const idA = useId();
  const idB = useId();
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:30");

  const { result, error } = useMemo(() => {
    try {
      return { result: calculateTimeDuration(startTime, endTime), error: null };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [startTime, endTime]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <div>
          <label htmlFor={idA} className="block text-sm font-medium text-ink">
            Start time
          </label>
          <input
            id={idA}
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-lg border border-line-strong bg-surface px-3.5 text-base tabular-nums text-ink focus-visible:outline-2 focus-visible:outline-brand"
          />
        </div>
        <div>
          <label htmlFor={idB} className="block text-sm font-medium text-ink">
            End time
          </label>
          <input
            id={idB}
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-lg border border-line-strong bg-surface px-3.5 text-base tabular-nums text-ink focus-visible:outline-2 focus-visible:outline-brand"
          />
        </div>
        <p className="text-xs text-ink-faint">
          If the end time is earlier than the start time, it&rsquo;s assumed to be the next day.
        </p>
      </div>

      <div>
        {error && (
          <p role="alert" className="mb-4 text-sm font-medium text-danger">
            {error}
          </p>
        )}

        {result && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <ResultStat
              label="Duration"
              value={`${result.hours}h ${result.minutes}m`}
              emphasis
            />
            <ResultStat label="Total minutes" value={result.totalMinutes.toString()} />
            <ResultStat label="Decimal hours" value={result.totalHoursDecimal.toString()} />
          </div>
        )}
      </div>
    </div>
  );
}
