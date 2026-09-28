import { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { RelatedCalculators } from "./RelatedCalculators";
import { categoryLabels, type CalculatorMeta } from "@/data/calculators";
import { calculatorJsonLd } from "@/lib/structuredData";

export function CalculatorPageShell({
  calc,
  intro,
  children,
  below,
}: {
  calc: CalculatorMeta;
  intro: string;
  /** The interactive calculator + results (client component). */
  children: ReactNode;
  /** How it works / formula / example / FAQs etc. */
  below?: ReactNode;
}) {
  return (
    <Container className="py-8 sm:py-10">
      <JsonLd data={calculatorJsonLd(calc, intro)} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: categoryLabels[calc.category], href: `/categories/${calc.category}` },
          { label: calc.name },
        ]}
      />

      <div className="mt-4 flex items-start gap-3">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand">
          <calc.icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{calc.name}</h1>
          <p className="mt-1.5 max-w-2xl text-ink-soft">{intro}</p>
        </div>
      </div>

      <div className="mt-8">{children}</div>

      {below && <div className="mt-14 max-w-3xl">{below}</div>}

      <div className="mt-14">
        <RelatedCalculators slug={calc.slug} />
      </div>
    </Container>
  );
}
