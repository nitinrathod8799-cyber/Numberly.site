import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { RatioCalculatorApp } from "@/components/calculator/apps/RatioCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("ratio-calculator")!;
const title = "Ratio Calculator – Simplify & Scale Ratios";
const description =
  "Simplify a ratio to its lowest terms, find its decimal equivalent, or scale it proportionally to a new value.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/ratio-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/ratio-calculator") },
  twitter: { title, description },
};

export default function RatioCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter two values to simplify their ratio, or scale it proportionally to a new value."
    >
      <RatioCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Ratio Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter the two values of your ratio (A and B).</li>
            <li>See the simplified ratio and its decimal equivalent instantly.</li>
            <li>Optionally, enter a new value for A to scale B proportionally.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a ratio calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A ratio calculator reduces a ratio like 8:12 down to its simplest whole-number form (2:3), and
            can also scale a ratio up or down while keeping the same proportion — useful for recipes,
            mixing ratios, or scaling a design.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            To simplify a ratio, both values are divided by their greatest common divisor (GCD) — the
            largest number that divides both evenly. To scale a ratio, the same proportion is preserved by
            multiplying both sides by the same factor.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Simplified ratio = A &divide; GCD(A, B) : B &divide; GCD(A, B). To scale A:B so that A becomes a
            new value, multiply B by (new A &divide; original A).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The ratio 8:12 simplifies to 2:3 (dividing both by their GCD, 4). Scaled so that the first part
            is 10, the second part becomes 15, since 10:15 is the same proportion as 2:3.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The simplified ratio is the smallest whole-number form of your original ratio. The decimal
            equivalent (A &divide; B) is useful for direct comparisons, like checking whether one mixing
            ratio is stronger than another.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The result depends only on the two numbers entered. Non-whole-number inputs are supported and
            simplified proportionally.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            People use this for scaling recipes, mixing paint or concrete ratios, splitting a bill or
            profit in a fixed proportion, or solving ratio problems in school.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Both values must be zero or positive, and the second value cannot be zero (since a ratio can&rsquo;t divide by zero).
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a ratio calculator used for?",
              answer: "It's used to simplify a ratio to its lowest terms, or to scale a ratio proportionally — useful for recipes, mixes, and maths problems.",
            },
            {
              question: "How do you simplify a ratio?",
              answer: "Divide both numbers by their greatest common divisor (GCD). For example, 8:12 has a GCD of 4, so it simplifies to 2:3.",
            },
            {
              question: "What does the decimal equivalent mean?",
              answer: "It's simply A divided by B, useful for comparing ratios directly as a single number rather than as two parts.",
            },
            {
              question: "Can I scale a ratio down as well as up?",
              answer: "Yes — enter any positive value for the new A, larger or smaller than the original, and B will scale proportionally.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
