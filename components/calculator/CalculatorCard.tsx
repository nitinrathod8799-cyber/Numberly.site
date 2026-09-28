import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CalculatorMeta } from "@/data/calculators";

export function CalculatorCard({ calc }: { calc: CalculatorMeta }) {
  if (calc.comingSoon) {
    return (
      <div className="flex flex-col justify-between rounded-lg border border-dashed border-line-strong bg-paper p-5 opacity-70">
        <div>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-surface text-ink-faint">
            <calc.icon className="h-4.5 w-4.5" aria-hidden />
          </span>
          <h3 className="mt-3 font-semibold text-ink-soft">{calc.name}</h3>
          <p className="mt-1 text-sm text-ink-faint">{calc.description}</p>
        </div>
        <span className="mt-4 inline-block w-fit rounded-full bg-line px-2.5 py-1 text-xs font-medium text-ink-soft">
          Coming soon
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/calculators/${calc.slug}`}
      className="group flex flex-col justify-between rounded-lg border border-line bg-surface p-5 transition-colors hover:border-brand/40 hover:bg-brand-soft/40"
    >
      <div>
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-soft text-brand">
          <calc.icon className="h-4.5 w-4.5" aria-hidden />
        </span>
        <h3 className="mt-3 font-semibold text-ink">{calc.name}</h3>
        <p className="mt-1 text-sm text-ink-soft">{calc.description}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
        Open calculator
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
