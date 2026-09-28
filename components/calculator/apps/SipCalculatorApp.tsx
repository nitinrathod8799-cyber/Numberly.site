"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Share2, Printer, Check } from "lucide-react";
import { NumberField } from "@/components/ui/NumberField";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { Toggle } from "@/components/ui/Toggle";
import { ResultStat } from "@/components/calculator/ResultStat";
import { YearlyTable } from "@/components/calculator/YearlyTable";
import { SipChart } from "@/components/charts/SipChart";
import { calculateSip, type StepUpMode, type ContributionTiming } from "@/lib/calculators/sip";
import { parseNumericInput } from "@/lib/validation";
import { formatCurrency, formatCompactCurrency } from "@/lib/format";

const AMOUNT_PRESETS = [
  { label: "₹1,000", value: "1000" },
  { label: "₹2,500", value: "2500" },
  { label: "₹5,000", value: "5000" },
  { label: "₹10,000", value: "10000" },
  { label: "₹25,000", value: "25000" },
  { label: "₹50,000", value: "50000" },
];

const TENURE_PRESETS = [
  { label: "5 yrs", value: "5" },
  { label: "10 yrs", value: "10" },
  { label: "15 yrs", value: "15" },
  { label: "20 yrs", value: "20" },
  { label: "25 yrs", value: "25" },
  { label: "30 yrs", value: "30" },
];

const RETURN_PRESETS = [
  { label: "8%", value: "8" },
  { label: "10%", value: "10" },
  { label: "12%", value: "12" },
  { label: "15%", value: "15" },
];

const STEP_UP_OPTIONS = [
  { label: "Off", value: "none" },
  { label: "Percentage", value: "percent" },
  { label: "Fixed amount", value: "fixed" },
];

export function SipCalculatorApp() {
  const [monthly, setMonthly] = useState("10000");
  const [returnPct, setReturnPct] = useState("12");
  const [years, setYears] = useState("20");

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [stepUpMode, setStepUpMode] = useState<StepUpMode>("none");
  const [stepUpPercent, setStepUpPercent] = useState("10");
  const [stepUpFixed, setStepUpFixed] = useState("1000");

  const [inflationOn, setInflationOn] = useState(false);
  const [inflationRate, setInflationRate] = useState("6");

  const [lumpSum, setLumpSum] = useState("");
  const [timing, setTiming] = useState<ContributionTiming>("end");
  const [copied, setCopied] = useState(false);

  const monthlyVal = parseNumericInput(monthly) ?? 0;
  const returnVal = parseNumericInput(returnPct) ?? 0;
  const yearsVal = parseNumericInput(years) ?? 0;

  const { result, error } = useMemo(() => {
    if (monthlyVal < 0) return { result: null, error: "Monthly amount cannot be negative." };
    if (yearsVal <= 0) return { result: null, error: "Duration must be greater than zero." };
    if (returnVal < 0) return { result: null, error: "Expected return cannot be negative." };

    try {
      const res = calculateSip({
        monthlyAmount: monthlyVal,
        annualReturnPercent: returnVal,
        years: yearsVal,
        initialLumpSum: parseNumericInput(lumpSum) ?? 0,
        timing,
        stepUp: {
          mode: stepUpMode,
          percent: parseNumericInput(stepUpPercent) ?? 0,
          fixedAmount: parseNumericInput(stepUpFixed) ?? 0,
        },
        inflationPercent: inflationOn ? parseNumericInput(inflationRate) ?? 0 : undefined,
      });
      return { result: res, error: null };
    } catch (err) {
      return { result: null, error: err instanceof Error ? err.message : "Could not calculate SIP." };
    }
  }, [monthlyVal, returnVal, yearsVal, lumpSum, timing, stepUpMode, stepUpPercent, stepUpFixed, inflationOn, inflationRate]);

  const growthPercent =
    result && result.totalInvested > 0 ? Math.round((result.estimatedReturns / result.totalInvested) * 1000) / 10 : 0;

  async function handleShare() {
    if (!result) return;
    const text = `SIP Calculator Result\nMonthly SIP: ${formatCurrency(monthlyVal)}\nReturn assumption: ${returnVal}%\nTenure: ${yearsVal} years\nEstimated value: ${formatCurrency(result.futureValue)}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "SIP Calculator Result", text });
        return;
      } catch {
        // user cancelled or share failed; fall back to copy
      }
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,400px)_1fr]">
      {/* ---- Inputs ---- */}
      <div className="space-y-6 rounded-xl border border-line bg-surface p-5 print:hidden">
        <div>
          <NumberField label="Monthly investment" value={monthly} onChange={setMonthly} unit="₹" />
          <div className="mt-2.5">
            <ChipGroup options={AMOUNT_PRESETS} activeValue={monthly} onSelect={setMonthly} />
          </div>
        </div>

        <div>
          <NumberField label="Expected annual return" value={returnPct} onChange={setReturnPct} unit="%" unitPosition="suffix" />
          <div className="mt-2.5">
            <ChipGroup options={RETURN_PRESETS} activeValue={returnPct} onSelect={setReturnPct} />
          </div>
          <p className="mt-1.5 text-xs text-ink-faint">
            An assumption you choose — not a guaranteed or promised return.
          </p>
        </div>

        <div>
          <NumberField label="Investment period" value={years} onChange={setYears} unit="years" unitPosition="suffix" />
          <div className="mt-2.5">
            <ChipGroup options={TENURE_PRESETS} activeValue={years} onSelect={setYears} />
          </div>
        </div>

        <div className="border-t border-line pt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            aria-expanded={showAdvanced}
            className="flex w-full items-center justify-between text-sm font-semibold text-ink"
          >
            Advanced options
            <ChevronDown className={`h-4 w-4 text-ink-soft transition-transform ${showAdvanced ? "rotate-180" : ""}`} aria-hidden />
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-5">
              <div>
                <p className="text-sm font-medium text-ink">Annual step-up</p>
                <p className="text-xs text-ink-faint">Increase your SIP amount every year.</p>
                <div className="mt-2">
                  <ChipGroup
                    options={STEP_UP_OPTIONS}
                    activeValue={stepUpMode}
                    onSelect={(v) => setStepUpMode(v as StepUpMode)}
                  />
                </div>
                {stepUpMode === "percent" && (
                  <div className="mt-2.5">
                    <NumberField label="Annual increase" value={stepUpPercent} onChange={setStepUpPercent} unit="%" unitPosition="suffix" />
                  </div>
                )}
                {stepUpMode === "fixed" && (
                  <div className="mt-2.5">
                    <NumberField label="Annual increase" value={stepUpFixed} onChange={setStepUpFixed} unit="₹" />
                  </div>
                )}
              </div>

              <div className="border-t border-line pt-4">
                <Toggle
                  label="Show value in today's money"
                  description="Adjusts the future value for inflation"
                  checked={inflationOn}
                  onChange={setInflationOn}
                />
                {inflationOn && (
                  <div className="mt-2.5">
                    <NumberField label="Inflation rate" value={inflationRate} onChange={setInflationRate} unit="%" unitPosition="suffix" />
                  </div>
                )}
              </div>

              <div className="border-t border-line pt-4">
                <NumberField
                  label="Initial lump-sum (optional)"
                  value={lumpSum}
                  onChange={setLumpSum}
                  unit="₹"
                  hint="A one-time amount invested on day one, in addition to your monthly SIP."
                />
              </div>

              <div className="border-t border-line pt-4">
                <p className="text-sm font-medium text-ink">Contribution timing</p>
                <p className="text-xs text-ink-faint">
                  &ldquo;Beginning of month&rdquo; gives each contribution one extra month to grow.
                </p>
                <div className="mt-2">
                  <ChipGroup
                    options={[
                      { label: "End of month", value: "end" },
                      { label: "Beginning of month", value: "start" },
                    ]}
                    activeValue={timing}
                    onSelect={(v) => setTiming(v as ContributionTiming)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---- Results ---- */}
      <div>
        {error && (
          <p role="alert" className="mb-4 text-sm font-medium text-danger">
            {error}
          </p>
        )}

        {result && (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <ResultStat label="Future value" value={formatCompactCurrency(result.futureValue)} sub={formatCurrency(result.futureValue)} emphasis />
              <ResultStat label="Total invested" value={formatCompactCurrency(result.totalInvested)} sub={formatCurrency(result.totalInvested)} />
              <ResultStat
                label="Estimated returns"
                value={formatCompactCurrency(result.estimatedReturns)}
                sub={`+${growthPercent}% growth`}
              />
            </div>

            {result.inflationAdjustedValue !== null && (
              <div className="mt-3 rounded-lg border border-gold/30 bg-gold-soft p-4">
                <p className="text-sm font-medium text-ink">Value in today&rsquo;s money</p>
                <p className="mt-1 text-xl font-bold tabular-nums text-ink">
                  {formatCurrency(result.inflationAdjustedValue)}
                </p>
                <p className="mt-1 text-xs text-ink-soft">
                  An estimate of your future corpus expressed in today&rsquo;s purchasing power. This is not
                  a guaranteed figure.
                </p>
              </div>
            )}

            <p className="mt-3 text-xs text-ink-faint">
              Returns are an estimate based on your assumptions, not a guarantee.
            </p>

            <div className="mt-6 rounded-xl border border-line bg-surface p-5 print:hidden">
              <h3 className="text-sm font-semibold text-ink">Investment growth</h3>
              <div className="mt-3">
                <SipChart data={result.yearly} />
              </div>
            </div>

            <div className="mt-6">
              <YearlyTable
                columns={["Year", "Annual investment", "Cumulative investment", "Estimated growth", "Total value"]}
                rows={result.yearly.map((row) => [
                  row.year,
                  formatCurrency(row.annualInvestment),
                  formatCurrency(row.cumulativeInvestment),
                  formatCurrency(row.estimatedGrowth),
                  formatCurrency(row.yearEndValue),
                ])}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2 print:hidden">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-md border border-line-strong px-3.5 py-2 text-sm font-medium text-ink-soft hover:border-brand hover:text-brand"
              >
                {copied ? <Check className="h-4 w-4" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
                {copied ? "Copied" : "Share / Copy result"}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-md border border-line-strong px-3.5 py-2 text-sm font-medium text-ink-soft hover:border-brand hover:text-brand"
              >
                <Printer className="h-4 w-4" aria-hidden />
                Print / Save as PDF
              </button>
            </div>

            <div className="mt-6 rounded-lg bg-paper p-4 text-xs leading-relaxed text-ink-soft">
              <strong className="text-ink">Disclaimer:</strong> Mutual fund returns are market-linked and
              actual returns may differ from these projections. This calculator is for educational and
              planning purposes only and does not provide personalised investment advice.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
