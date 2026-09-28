"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { ResultStat } from "@/components/calculator/ResultStat";
import { YearlyTable } from "@/components/calculator/YearlyTable";
import { EmiChart } from "@/components/charts/EmiChart";
import { calculateEmi } from "@/lib/calculators/emi";
import { parseNumericInput } from "@/lib/validation";
import { formatCurrency, formatCompactCurrency, formatNumber } from "@/lib/format";

const TENURE_PRESETS = [
  { label: "5 yrs", value: "5" },
  { label: "10 yrs", value: "10" },
  { label: "15 yrs", value: "15" },
  { label: "20 yrs", value: "20" },
  { label: "30 yrs", value: "30" },
];

export function EmiCalculatorApp() {
  const [amount, setAmount] = useState("1000000");
  const [rate, setRate] = useState("8.5");
  const [tenure, setTenure] = useState("10");

  const parsedAmount = parseNumericInput(amount);
  const parsedRate = parseNumericInput(rate);
  const parsedTenure = parseNumericInput(tenure);

  const { result, error } = useMemo(() => {
    if (parsedAmount === null || parsedRate === null || parsedTenure === null) {
      return { result: null, error: null };
    }
    if (parsedAmount <= 0) return { result: null, error: "Loan amount must be greater than zero." };
    if (parsedRate < 0) return { result: null, error: "Interest rate cannot be negative." };
    if (parsedTenure <= 0) return { result: null, error: "Tenure must be greater than zero." };

    try {
      return {
        result: calculateEmi({
          principal: parsedAmount,
          annualRatePercent: parsedRate,
          tenureYears: parsedTenure,
        }),
        error: null,
      };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate EMI." };
    }
  }, [parsedAmount, parsedRate, parsedTenure]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <NumberField label="Loan amount" value={amount} onChange={setAmount} unit="₹" />
        <NumberField label="Interest rate (annual)" value={rate} onChange={setRate} unit="%" unitPosition="suffix" step={0.1} />
        <div>
          <NumberField label="Loan tenure" value={tenure} onChange={setTenure} unit="years" unitPosition="suffix" />
          <div className="mt-2.5">
            <ChipGroup options={TENURE_PRESETS} activeValue={tenure} onSelect={setTenure} />
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <ResultStat
                label="Monthly EMI"
                value={formatCurrency(result.monthlyEmi)}
                emphasis
              />
              <ResultStat label="Principal" value={formatCompactCurrency(result.totalPrincipal)} />
              <ResultStat label="Total interest" value={formatCompactCurrency(result.totalInterest)} />
              <ResultStat label="Total payment" value={formatCompactCurrency(result.totalPayment)} />
            </div>

            <div className="mt-6 rounded-xl border border-line bg-surface p-5">
              <h3 className="text-sm font-semibold text-ink">Principal vs. interest</h3>
              <EmiChart principal={result.totalPrincipal} interest={result.totalInterest} />
            </div>

            <div className="mt-6">
              <YearlyTable
                columns={["Year", "Principal paid", "Interest paid", "Remaining balance"]}
                rows={result.yearly.map((row) => [
                  row.year,
                  formatCurrency(row.principalPaid),
                  formatCurrency(row.interestPaid),
                  formatCurrency(row.balance),
                ])}
              />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-faint">
              This is an estimate based on a standard reducing-balance EMI formula. Actual EMI, interest
              rate and charges depend on your lender and loan agreement.{" "}
              {formatNumber(result.yearly.length)} year(s) shown.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
