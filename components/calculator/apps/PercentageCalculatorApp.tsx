"use client";

import { useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { percentOf, whatPercent, percentChange } from "@/lib/calculators/percentage";
import { parseNumericInput } from "@/lib/validation";
import { formatNumber } from "@/lib/format";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <h3 className="font-semibold text-ink">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ResultLine({ text }: { text: string }) {
  return (
    <p className="mt-4 rounded-lg bg-brand-soft px-4 py-3 text-lg font-semibold tabular-nums text-brand-dark">
      {text}
    </p>
  );
}

export function PercentageCalculatorApp() {
  // Section 1: X% of Y
  const [pctA, setPctA] = useState("25");
  const [ofA, setOfA] = useState("500");

  // Section 2: X is what % of Y
  const [xB, setXB] = useState("50");
  const [ofB, setOfB] = useState("200");

  // Section 3: increase/decrease
  const [origC, setOrigC] = useState("500");
  const [newC, setNewC] = useState("600");

  const a1 = parseNumericInput(pctA);
  const a2 = parseNumericInput(ofA);
  const resultA = a1 !== null && a2 !== null ? percentOf(a1, a2) : null;

  const b1 = parseNumericInput(xB);
  const b2 = parseNumericInput(ofB);
  const resultB = b1 !== null && b2 !== null && b2 !== 0 ? whatPercent(b1, b2) : null;

  const c1 = parseNumericInput(origC);
  const c2 = parseNumericInput(newC);
  const resultC = c1 !== null && c2 !== null && c1 !== 0 ? percentChange(c1, c2) : null;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <Card title="What is X% of Y?">
        <div className="space-y-4">
          <NumberField label="Percentage" value={pctA} onChange={setPctA} unit="%" unitPosition="suffix" />
          <NumberField label="Of value" value={ofA} onChange={setOfA} />
        </div>
        {resultA !== null && (
          <ResultLine text={`${pctA || 0}% of ${formatNumber(a2 ?? 0)} = ${formatNumber(resultA)}`} />
        )}
      </Card>

      <Card title="X is what percentage of Y?">
        <div className="space-y-4">
          <NumberField label="Value (X)" value={xB} onChange={setXB} />
          <NumberField label="Of value (Y)" value={ofB} onChange={setOfB} />
        </div>
        {resultB !== null ? (
          <ResultLine text={`${formatNumber(b1 ?? 0)} is ${resultB}% of ${formatNumber(b2 ?? 0)}`} />
        ) : b2 === 0 ? (
          <p className="mt-4 text-sm font-medium text-danger">&ldquo;Of value&rdquo; cannot be zero.</p>
        ) : null}
      </Card>

      <Card title="Percentage increase or decrease">
        <div className="space-y-4">
          <NumberField label="Original value" value={origC} onChange={setOrigC} />
          <NumberField label="New value" value={newC} onChange={setNewC} />
        </div>
        {resultC !== null ? (
          <ResultLine
            text={`${resultC >= 0 ? "Increase" : "Decrease"} of ${Math.abs(resultC)}%`}
          />
        ) : c1 === 0 ? (
          <p className="mt-4 text-sm font-medium text-danger">Original value cannot be zero.</p>
        ) : null}
      </Card>
    </div>
  );
}
