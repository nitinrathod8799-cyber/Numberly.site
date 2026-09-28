"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { ResultStat } from "@/components/calculator/ResultStat";
import { calculateDiscount } from "@/lib/calculators/discount";
import { parseNumericInput } from "@/lib/validation";
import { formatCurrency } from "@/lib/format";

const DISCOUNT_PRESETS = [
  { label: "10%", value: "10" },
  { label: "20%", value: "20" },
  { label: "30%", value: "30" },
  { label: "50%", value: "50" },
];

export function DiscountCalculatorApp() {
  const [price, setPrice] = useState("1200");
  const [discount, setDiscount] = useState("20");
  const [stackDiscount, setStackDiscount] = useState(false);
  const [secondDiscount, setSecondDiscount] = useState("10");

  const priceVal = parseNumericInput(price);
  const discountVal = parseNumericInput(discount);
  const secondDiscountVal = stackDiscount ? parseNumericInput(secondDiscount) : 0;

  const { result, error } = useMemo(() => {
    if (priceVal === null || discountVal === null) return { result: null, error: null };
    if (priceVal < 0) return { result: null, error: "Price cannot be negative." };
    if (discountVal < 0 || discountVal > 100) return { result: null, error: "Discount must be between 0 and 100%." };
    try {
      return {
        result: calculateDiscount({
          originalPrice: priceVal,
          discountPercent: discountVal,
          secondDiscountPercent: secondDiscountVal ?? 0,
        }),
        error: null,
      };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate." };
    }
  }, [priceVal, discountVal, secondDiscountVal]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
      <div className="space-y-5 rounded-xl border border-line bg-surface p-5">
        <NumberField label="Original price" value={price} onChange={setPrice} unit="₹" />
        <div>
          <NumberField label="Discount" value={discount} onChange={setDiscount} unit="%" unitPosition="suffix" />
          <div className="mt-2.5">
            <ChipGroup options={DISCOUNT_PRESETS} activeValue={discount} onSelect={setDiscount} />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 border-t border-line pt-4 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={stackDiscount}
            onChange={(e) => setStackDiscount(e.target.checked)}
            className="h-4 w-4 rounded border-line-strong accent-brand"
          />
          Add a second, stacked discount
        </label>
        {stackDiscount && (
          <NumberField
            label="Second discount"
            value={secondDiscount}
            onChange={setSecondDiscount}
            unit="%"
            unitPosition="suffix"
            hint="Applied on top of the price after the first discount, not the original price."
          />
        )}
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
              <ResultStat label="Final price" value={formatCurrency(result.finalPrice)} emphasis />
              <ResultStat label="You save" value={formatCurrency(result.amountSaved)} />
              <ResultStat label="Effective discount" value={`${result.effectiveDiscountPercent}%`} />
            </div>

            {stackDiscount && (
              <p className="mt-4 text-sm text-ink-soft">
                Price after the first discount: <strong className="text-ink">{formatCurrency(result.priceAfterFirstDiscount)}</strong>,
                then a further {secondDiscount || 0}% brings it to{" "}
                <strong className="text-ink">{formatCurrency(result.finalPrice)}</strong>.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
