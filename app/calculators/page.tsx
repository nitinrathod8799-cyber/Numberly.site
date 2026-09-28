import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SearchBar } from "@/components/search/SearchBar";
import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { calculators, categoryLabels, type CalculatorCategory } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Calculators",
  description: "Browse every free calculator, organised by category — math, finance and everyday tools.",
  alternates: { canonical: absoluteUrl("/calculators") },
};

const ORDER: CalculatorCategory[] = ["math", "finance", "everyday", "construction"];

export default function AllCalculatorsPage() {
  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Calculators" }]} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">All Calculators</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Every calculator on the site, organised by category. More are added regularly.
      </p>

      <div className="mt-6 max-w-md">
        <SearchBar variant="hero" />
      </div>

      <div className="mt-12 space-y-12">
        {ORDER.map((cat) => {
          const items = calculators.filter((c) => c.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} aria-labelledby={`${cat}-heading`}>
              <h2 id={`${cat}-heading`} className="text-xl font-bold tracking-tight text-ink">
                {categoryLabels[cat]}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((calc) => (
                  <CalculatorCard key={calc.slug} calc={calc} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
