"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultStat } from "@/components/calculator/ResultStat";
import { calculateProfitLoss } from "@/lib/calculators/profitLoss";
import { parseNumericInput } from "@/lib/validation";
import { formatCurrency } from "@/lib/format";

export function ProfitLossCalculatorApp() {
  const [costPrice, setCostPrice] = useState("500");
  const [sellingPrice, setSellingPrice] = useState("650");

  const cp = parseNumericInput(costPrice);
  const sp = parseNumericInput(sellingPrice);

  const { result, error } = useMemo(() => {
    if (cp === null || sp === null) return { result: null, error: null };
    if (cp <= 0) return { result: null, error: "Cost price must be greater than zero." };
    if (sp < 0) return { result: null, error: "Selling price cannot be negative." };
    try {
      return { result: calculateProfitLoss(cp, sp), error: null };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [cp, sp]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <NumberField label="Cost price" value={costPrice} onChange={setCostPrice} unit="₹" />
        <NumberField label="Selling price" value={sellingPrice} onChange={setSellingPrice} unit="₹" />
      </div>

      <div>
        {error && (
          <p role="alert" className="mb-4 text-sm font-medium text-danger">
            {error}
          </p>
        )}

        {result && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            <ResultStat
              label={result.type === "loss" ? "Loss" : "Profit"}
              value={formatCurrency(result.amount)}
              emphasis={result.type !== "none"}
            />
            <ResultStat
              label={result.type === "loss" ? "Loss %" : "Profit %"}
              value={`${result.percent}%`}
            />
            {result.type === "none" && (
              <p className="col-span-2 text-sm text-ink-soft">No profit, no loss — sold at cost price.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
