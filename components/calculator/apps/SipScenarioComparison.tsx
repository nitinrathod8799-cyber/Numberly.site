"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { NumberField } from "@/components/ui/NumberField";
import { calculateSip } from "@/lib/calculators/sip";
import { parseNumericInput } from "@/lib/validation";
import { formatCurrency } from "@/lib/format";

interface Scenario {
  id: string;
  monthly: string;
  returnPct: string;
  years: string;
}

const LETTERS = ["A", "B", "C"];

function makeScenario(monthly: string, returnPct: string, years: string): Scenario {
  return { id: crypto.randomUUID(), monthly, returnPct, years };
}

export function SipScenarioComparison() {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    makeScenario("5000", "12", "10"),
    makeScenario("10000", "12", "10"),
  ]);

  function update(id: string, patch: Partial<Scenario>) {
    setScenarios((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function addScenario() {
    if (scenarios.length >= 3) return;
    setScenarios((prev) => [...prev, makeScenario("10000", "12", "10")]);
  }

  function removeScenario(id: string) {
    setScenarios((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-ink">Compare scenarios</h3>
          <p className="mt-1 text-sm text-ink-soft">Compare up to 3 SIP plans side by side.</p>
        </div>
        {scenarios.length < 3 && (
          <button
            type="button"
            onClick={addScenario}
            className="flex items-center gap-1.5 rounded-md border border-line-strong px-3 py-1.5 text-sm font-medium text-ink-soft hover:border-brand hover:text-brand"
          >
            <Plus className="h-4 w-4" aria-hidden /> Add scenario
          </button>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {scenarios.map((s, i) => (
          <div key={s.id} className="rounded-lg border border-line p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Scenario {LETTERS[i]}</span>
              {scenarios.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeScenario(s.id)}
                  aria-label={`Remove scenario ${LETTERS[i]}`}
                  className="text-ink-faint hover:text-danger"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>
            <div className="mt-3 space-y-3">
              <NumberField label="Monthly SIP" value={s.monthly} onChange={(v) => update(s.id, { monthly: v })} unit="₹" />
              <NumberField label="Return" value={s.returnPct} onChange={(v) => update(s.id, { returnPct: v })} unit="%" unitPosition="suffix" />
              <NumberField label="Tenure" value={s.years} onChange={(v) => update(s.id, { years: v })} unit="yrs" unitPosition="suffix" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 table-scroll overflow-x-auto">
        <table className="w-full min-w-125 border-collapse text-sm">
          <thead>
            <tr className="bg-paper text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-2.5">Scenario</th>
              <th className="px-4 py-2.5">Monthly SIP</th>
              <th className="px-4 py-2.5">Return</th>
              <th className="px-4 py-2.5">Tenure</th>
              <th className="px-4 py-2.5">Invested</th>
              <th className="px-4 py-2.5">Estimated value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {scenarios.map((s, i) => {
              const monthly = parseNumericInput(s.monthly);
              const returnPct = parseNumericInput(s.returnPct);
              const years = parseNumericInput(s.years);
              if (monthly === null || returnPct === null || years === null || monthly < 0 || years <= 0) {
                return (
                  <tr key={s.id}>
                    <td className="px-4 py-2.5 font-medium text-ink">{LETTERS[i]}</td>
                    <td colSpan={5} className="px-4 py-2.5 text-ink-faint">
                      Enter valid values to compare.
                    </td>
                  </tr>
                );
              }
              const result = calculateSip({ monthlyAmount: monthly, annualReturnPercent: returnPct, years });
              return (
                <tr key={s.id}>
                  <td className="px-4 py-2.5 font-medium text-ink">{LETTERS[i]}</td>
                  <td className="px-4 py-2.5 tabular-nums text-ink">{formatCurrency(monthly)}</td>
                  <td className="px-4 py-2.5 tabular-nums text-ink">{returnPct}%</td>
                  <td className="px-4 py-2.5 tabular-nums text-ink">{years} yrs</td>
                  <td className="px-4 py-2.5 tabular-nums text-ink">{formatCurrency(result.totalInvested)}</td>
                  <td className="px-4 py-2.5 tabular-nums font-semibold text-brand-dark">
                    {formatCurrency(result.futureValue)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
