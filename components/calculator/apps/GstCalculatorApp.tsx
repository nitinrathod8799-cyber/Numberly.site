"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { ResultStat } from "@/components/calculator/ResultStat";
import { calculateGst, type GstMode } from "@/lib/calculators/gst";
import { parseNumericInput } from "@/lib/validation";
import { formatCurrency } from "@/lib/format";

const RATE_PRESETS = [
  { label: "5%", value: "5" },
  { label: "12%", value: "12" },
  { label: "18%", value: "18" },
  { label: "28%", value: "28" },
];

export function GstCalculatorApp() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState<GstMode>("add");

  const amountVal = parseNumericInput(amount);
  const rateVal = parseNumericInput(rate);

  const { result, error } = useMemo(() => {
    if (amountVal === null || rateVal === null) return { result: null, error: null };
    if (amountVal < 0) return { result: null, error: "Amount cannot be negative." };
    if (rateVal < 0) return { result: null, error: "GST rate cannot be negative." };
    try {
      return { result: calculateGst(amountVal, rateVal, mode), error: null };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate GST." };
    }
  }, [amountVal, rateVal, mode]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <div>
          <p className="text-sm font-medium text-ink">Calculation type</p>
          <div className="mt-2">
            <ChipGroup
              options={[
                { label: "Add GST", value: "add" },
                { label: "Remove GST", value: "remove" },
              ]}
              activeValue={mode}
              onSelect={(v) => setMode(v as GstMode)}
            />
          </div>
          <p className="mt-1.5 text-xs text-ink-faint">
            {mode === "add"
              ? "Enter the base amount — GST will be added on top."
              : "Enter the GST-inclusive amount — GST will be extracted from it."}
          </p>
        </div>

        <NumberField
          label={mode === "add" ? "Amount (before GST)" : "Amount (GST-inclusive)"}
          value={amount}
          onChange={setAmount}
          unit="₹"
        />

        <div>
          <NumberField label="GST rate" value={rate} onChange={setRate} unit="%" unitPosition="suffix" />
          <div className="mt-2.5">
            <ChipGroup options={RATE_PRESETS} activeValue={rate} onSelect={setRate} />
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <ResultStat label="Base amount" value={formatCurrency(result.baseAmount)} />
              <ResultStat label="GST amount" value={formatCurrency(result.gstAmount)} />
              <ResultStat label="Total amount" value={formatCurrency(result.totalAmount)} emphasis />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:w-1/2">
              <ResultStat label="CGST" value={formatCurrency(result.cgst)} sub="For intra-state supply" />
              <ResultStat label="SGST" value={formatCurrency(result.sgst)} sub="For intra-state supply" />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-faint">
              For inter-state supply, the full GST amount is charged as IGST instead of a CGST + SGST
              split.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
