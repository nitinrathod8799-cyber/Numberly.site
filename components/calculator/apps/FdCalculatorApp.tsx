"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { ResultStat } from "@/components/calculator/ResultStat";
import { YearlyTable } from "@/components/calculator/YearlyTable";
import { calculateFd } from "@/lib/calculators/fd";
import type { CompoundingFrequency } from "@/lib/calculators/compoundInterest";
import { parseNumericInput } from "@/lib/validation";
import { formatCurrency, formatCompactCurrency } from "@/lib/format";

const TENURE_PRESETS = [
  { label: "1 yr", value: "1" },
  { label: "3 yrs", value: "3" },
  { label: "5 yrs", value: "5" },
  { label: "10 yrs", value: "10" },
];

const FREQUENCY_OPTIONS: { label: string; value: CompoundingFrequency }[] = [
  { label: "Quarterly", value: "quarterly" },
  { label: "Monthly", value: "monthly" },
  { label: "Annually", value: "annually" },
];

export function FdCalculatorApp() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("5");
  const [frequency, setFrequency] = useState<CompoundingFrequency>("quarterly");

  const principalVal = parseNumericInput(principal);
  const rateVal = parseNumericInput(rate);
  const yearsVal = parseNumericInput(years);

  const { result, error } = useMemo(() => {
    if (principalVal === null || rateVal === null || yearsVal === null) return { result: null, error: null };
    if (principalVal <= 0) return { result: null, error: "Deposit amount must be greater than zero." };
    if (rateVal < 0) return { result: null, error: "Interest rate cannot be negative." };
    if (yearsVal <= 0) return { result: null, error: "Tenure must be greater than zero." };
    try {
      return { result: calculateFd({ principal: principalVal, annualRatePercent: rateVal, years: yearsVal, frequency }), error: null };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate FD maturity." };
    }
  }, [principalVal, rateVal, yearsVal, frequency]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <NumberField label="Deposit amount" value={principal} onChange={setPrincipal} unit="₹" />
        <NumberField label="Annual interest rate" value={rate} onChange={setRate} unit="%" unitPosition="suffix" />
        <div>
          <NumberField label="Tenure" value={years} onChange={setYears} unit="years" unitPosition="suffix" />
          <div className="mt-2.5">
            <ChipGroup options={TENURE_PRESETS} activeValue={years} onSelect={setYears} />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-ink">Compounding frequency</p>
          <div className="mt-2">
            <ChipGroup options={FREQUENCY_OPTIONS} activeValue={frequency} onSelect={(v) => setFrequency(v as CompoundingFrequency)} />
          </div>
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <ResultStat label="Maturity value" value={formatCompactCurrency(result.maturityAmount)} sub={formatCurrency(result.maturityAmount)} emphasis />
              <ResultStat label="Deposit amount" value={formatCompactCurrency(result.principal)} sub={formatCurrency(result.principal)} />
              <ResultStat label="Interest earned" value={formatCompactCurrency(result.interestEarned)} sub={formatCurrency(result.interestEarned)} />
            </div>

            <div className="mt-6">
              <YearlyTable
                columns={["Year", "Opening balance", "Interest earned", "Closing balance"]}
                rows={result.yearly.map((row) => [
                  row.year,
                  formatCurrency(row.openingBalance),
                  formatCurrency(row.interestEarned),
                  formatCurrency(row.closingBalance),
                ])}
              />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-faint">
              Actual FD rates vary by bank, tenure and depositor category (e.g. senior citizens often get a
              higher rate). TDS on interest above the exempt limit is not accounted for here.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
