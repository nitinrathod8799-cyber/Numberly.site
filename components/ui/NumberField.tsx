"use client";

import { useId } from "react";

export function NumberField({
  label,
  value,
  onChange,
  unit,
  unitPosition = "prefix",
  min,
  max,
  step,
  error,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  unitPosition?: "prefix" | "suffix";
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  hint?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative mt-1.5">
        {unit && unitPosition === "prefix" && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft">
            {unit}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`h-12 w-full rounded-lg border bg-surface text-base tabular-nums text-ink transition-colors focus-visible:outline-2 focus-visible:outline-brand ${
            unit && unitPosition === "prefix" ? "pl-8" : "pl-3.5"
          } ${unit && unitPosition === "suffix" ? "pr-10" : "pr-3.5"} ${
            error ? "border-danger" : "border-line-strong"
          }`}
        />
        {unit && unitPosition === "suffix" && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft">
            {unit}
          </span>
        )}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-ink-faint">{hint}</p>
      ) : null}
    </div>
  );
}
