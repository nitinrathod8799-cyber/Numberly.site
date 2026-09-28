import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { calculators, categoryLabels, categoryDescriptions, type CalculatorCategory } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculator Categories",
  description: "Browse Numberly calculators by category — Math, Finance, Everyday and Construction.",
  alternates: { canonical: absoluteUrl("/categories") },
};

const ALL_CATEGORIES: CalculatorCategory[] = ["math", "finance", "everyday", "construction"];

export default function CategoriesIndexPage() {
  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">Calculator Categories</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Every calculator on Numberly belongs to one of these categories. Pick one to see everything
        available in it.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ALL_CATEGORIES.map((cat) => {
          const count = calculators.filter((c) => c.category === cat && !c.comingSoon).length;
          return (
            <Link
              key={cat}
              href={`/categories/${cat}`}
              className="rounded-lg border border-line bg-surface p-5 transition-colors hover:border-brand/40 hover:bg-brand-soft/40"
            >
              <h2 className="text-lg font-semibold text-ink">{categoryLabels[cat]}</h2>
              <p className="mt-1.5 text-sm text-ink-soft">{categoryDescriptions[cat]}</p>
              <p className="mt-3 text-xs font-medium text-ink-faint">
                {count} calculator{count === 1 ? "" : "s"}
              </p>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
