"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { ResultStat } from "@/components/calculator/ResultStat";
import { YearlyTable } from "@/components/calculator/YearlyTable";
import { SipChart } from "@/components/charts/SipChart";
import { calculateLumpsum } from "@/lib/calculators/lumpsum";
import { parseNumericInput } from "@/lib/validation";
import { formatCurrency, formatCompactCurrency } from "@/lib/format";

const TENURE_PRESETS = [
  { label: "5 yrs", value: "5" },
  { label: "10 yrs", value: "10" },
  { label: "15 yrs", value: "15" },
  { label: "20 yrs", value: "20" },
];

const RETURN_PRESETS = [
  { label: "8%", value: "8" },
  { label: "10%", value: "10" },
  { label: "12%", value: "12" },
  { label: "15%", value: "15" },
];

export function LumpsumCalculatorApp() {
  const [investment, setInvestment] = useState("100000");
  const [returnPct, setReturnPct] = useState("12");
  const [years, setYears] = useState("10");

  const investmentVal = parseNumericInput(investment);
  const returnVal = parseNumericInput(returnPct);
  const yearsVal = parseNumericInput(years);

  const { result, error } = useMemo(() => {
    if (investmentVal === null || returnVal === null || yearsVal === null) return { result: null, error: null };
    if (investmentVal <= 0) return { result: null, error: "Investment amount must be greater than zero." };
    if (returnVal < 0) return { result: null, error: "Expected return cannot be negative." };
    if (yearsVal <= 0) return { result: null, error: "Duration must be greater than zero." };
    try {
      return { result: calculateLumpsum({ investment: investmentVal, annualReturnPercent: returnVal, years: yearsVal }), error: null };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [investmentVal, returnVal, yearsVal]);

  const chartData = result
    ? result.yearly.map((row) => ({
        year: row.year,
        annualInvestment: row.year === 1 ? investmentVal ?? 0 : 0,
        cumulativeInvestment: investmentVal ?? 0,
        yearEndValue: row.closingBalance,
        estimatedGrowth: row.closingBalance - (investmentVal ?? 0),
      }))
    : [];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <NumberField label="Lumpsum investment" value={investment} onChange={setInvestment} unit="₹" />
        <div>
          <NumberField label="Expected annual return" value={returnPct} onChange={setReturnPct} unit="%" unitPosition="suffix" />
          <div className="mt-2.5">
            <ChipGroup options={RETURN_PRESETS} activeValue={returnPct} onSelect={setReturnPct} />
          </div>
          <p className="mt-1.5 text-xs text-ink-faint">An assumption you choose — not a guaranteed return.</p>
        </div>
        <div>
          <NumberField label="Investment period" value={years} onChange={setYears} unit="years" unitPosition="suffix" />
          <div className="mt-2.5">
            <ChipGroup options={TENURE_PRESETS} activeValue={years} onSelect={setYears} />
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
              <ResultStat label="Invested amount" value={formatCompactCurrency(result.principal)} sub={formatCurrency(result.principal)} />
              <ResultStat label="Estimated returns" value={formatCompactCurrency(result.interestEarned)} sub={formatCurrency(result.interestEarned)} />
            </div>

            <p className="mt-3 text-xs text-ink-faint">Returns are an estimate based on your assumptions, not a guarantee.</p>

            <div className="mt-6 rounded-xl border border-line bg-surface p-5">
              <h3 className="text-sm font-semibold text-ink">Investment growth</h3>
              <div className="mt-3">
                <SipChart data={chartData} />
              </div>
            </div>

            <div className="mt-6">
              <YearlyTable
                columns={["Year", "Opening balance", "Growth", "Closing balance"]}
                rows={result.yearly.map((row) => [
                  row.year,
                  formatCurrency(row.openingBalance),
                  formatCurrency(row.interestEarned),
                  formatCurrency(row.closingBalance),
                ])}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
