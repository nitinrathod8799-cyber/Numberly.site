"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { calculateRequiredSip } from "@/lib/calculators/sip";
import { parseNumericInput } from "@/lib/validation";
import { formatCurrency } from "@/lib/format";

export function SipGoalMode() {
  const [target, setTarget] = useState("5000000");
  const [years, setYears] = useState("15");
  const [returnPct, setReturnPct] = useState("12");

  const targetVal = parseNumericInput(target);
  const yearsVal = parseNumericInput(years);
  const returnVal = parseNumericInput(returnPct);

  const { required, error } = useMemo(() => {
    if (targetVal === null || yearsVal === null || returnVal === null) {
      return { required: null, error: null };
    }
    if (targetVal <= 0) return { required: null, error: "Target amount must be greater than zero." };
    if (yearsVal <= 0) return { required: null, error: "Duration must be greater than zero." };

    try {
      return { required: calculateRequiredSip({ targetAmount: targetVal, years: yearsVal, annualReturnPercent: returnVal }), error: null };
    } catch (err) {
      return { required: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [targetVal, yearsVal, returnVal]);

  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <h3 className="font-semibold text-ink">Plan for a goal</h3>
      <p className="mt-1 text-sm text-ink-soft">
        Work backward from a target amount to see the monthly SIP you&rsquo;d need.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <NumberField label="Target amount" value={target} onChange={setTarget} unit="₹" />
        <NumberField label="Investment period" value={years} onChange={setYears} unit="years" unitPosition="suffix" />
        <NumberField label="Expected return" value={returnPct} onChange={setReturnPct} unit="%" unitPosition="suffix" />
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-danger">
          {error}
        </p>
      )}

      {required !== null && !error && (
        <div className="mt-4 rounded-lg bg-brand-soft px-4 py-3.5">
          <p className="text-sm font-medium text-brand-dark">Required monthly SIP</p>
          <p className="mt-0.5 text-2xl font-bold tabular-nums text-brand-dark">{formatCurrency(required)}</p>
          {required > (targetVal ?? 0) * 0.02 && (
            <p className="mt-2 text-xs text-brand-dark/80">
              That&rsquo;s a large monthly commitment. Try increasing the tenure, or explore a step-up SIP
              above to ease in gradually.
            </p>
          )}
        </div>
      )}

      <p className="mt-3 text-xs text-ink-faint">
        This is an educational estimate, not personalised investment advice.
      </p>
    </div>
  );
}
