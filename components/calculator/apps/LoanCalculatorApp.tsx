"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { ResultStat } from "@/components/calculator/ResultStat";
import { YearlyTable } from "@/components/calculator/YearlyTable";
import { EmiChart } from "@/components/charts/EmiChart";
import { calculateLoan } from "@/lib/calculators/loan";
import type { LoanType } from "@/lib/calculators/loan";
import { parseNumericInput } from "@/lib/validation";
import { formatCurrency, formatCompactCurrency } from "@/lib/format";

const LOAN_TYPES: { label: string; value: LoanType }[] = [
  { label: "Personal", value: "personal" },
  { label: "Car", value: "car" },
  { label: "Home", value: "home" },
  { label: "Other", value: "other" },
];

const TENURE_PRESETS = [
  { label: "1 yr", value: "1" },
  { label: "3 yrs", value: "3" },
  { label: "5 yrs", value: "5" },
  { label: "10 yrs", value: "10" },
  { label: "20 yrs", value: "20" },
];

export function LoanCalculatorApp() {
  const [loanType, setLoanType] = useState<LoanType>("personal");
  const [amount, setAmount] = useState("300000");
  const [rate, setRate] = useState("11");
  const [tenure, setTenure] = useState("5");

  const amountVal = parseNumericInput(amount);
  const rateVal = parseNumericInput(rate);
  const tenureVal = parseNumericInput(tenure);

  const { result, error } = useMemo(() => {
    if (amountVal === null || rateVal === null || tenureVal === null) return { result: null, error: null };
    if (amountVal <= 0) return { result: null, error: "Loan amount must be greater than zero." };
    if (rateVal < 0) return { result: null, error: "Interest rate cannot be negative." };
    if (tenureVal <= 0) return { result: null, error: "Tenure must be greater than zero." };
    try {
      return {
        result: calculateLoan({ principal: amountVal, annualRatePercent: rateVal, tenureYears: tenureVal, loanType }),
        error: null,
      };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [amountVal, rateVal, tenureVal, loanType]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <div>
          <p className="text-sm font-medium text-ink">Loan type</p>
          <div className="mt-2">
            <ChipGroup options={LOAN_TYPES} activeValue={loanType} onSelect={(v) => setLoanType(v as LoanType)} />
          </div>
        </div>
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
              <ResultStat label="Monthly payment" value={formatCurrency(result.monthlyEmi)} emphasis />
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
              This is an estimate based on a standard reducing-balance loan formula. Actual terms, interest
              rate and charges depend on your lender and loan agreement.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
