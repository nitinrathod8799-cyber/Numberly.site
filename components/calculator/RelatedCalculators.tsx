import { getRelatedCalculators } from "@/data/calculators";
import { CalculatorCard } from "./CalculatorCard";

export function RelatedCalculators({ slug }: { slug: string }) {
  const related = getRelatedCalculators(slug);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-lg font-semibold text-ink">
        Related calculators
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((calc) => (
          <CalculatorCard key={calc.slug} calc={calc} />
        ))}
      </div>
    </section>
  );
}
