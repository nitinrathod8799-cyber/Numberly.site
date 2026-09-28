import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { calculators, categoryLabels, categoryDescriptions, type CalculatorCategory } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const VALID: CalculatorCategory[] = ["math", "finance", "everyday", "construction"];

export function generateStaticParams() {
  return VALID.map((slug) => ({ slug }));
}

function isValidCategory(slug: string): slug is CalculatorCategory {
  return (VALID as string[]).includes(slug);
}

type CategoryPageParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidCategory(slug)) return {};

  const label = categoryLabels[slug];
  return {
    title: `${label} Calculators`,
    description: categoryDescriptions[slug],
    alternates: { canonical: absoluteUrl(`/categories/${slug}`) },
  };
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  const { slug } = await params;
  if (!isValidCategory(slug)) notFound();

  const items = calculators.filter((c) => c.category === slug);

  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/calculators" },
          { label: categoryLabels[slug] },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">{categoryLabels[slug]} Calculators</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">{categoryDescriptions[slug]}</p>

      {items.length === 0 ? (
        <p className="mt-10 text-ink-soft">
          No calculators in this category yet — check back soon, or browse{" "}
          <a href="/calculators" className="font-medium text-brand hover:text-brand-dark">
            all calculators
          </a>
          .
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((calc) => (
            <CalculatorCard key={calc.slug} calc={calc} />
          ))}
        </div>
      )}
    </Container>
  );
}
