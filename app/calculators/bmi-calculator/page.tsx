import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { BmiCalculatorApp } from "@/components/calculator/apps/BmiCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("bmi-calculator")!;
const title = "BMI Calculator – Calculate Your Body Mass Index";
const description =
  "Calculate your Body Mass Index (BMI) from height and weight, in metric or imperial units, with your weight category and a healthy weight range. Informational only, not medical advice.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/bmi-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/bmi-calculator") },
  twitter: { title, description },
};

export default function BmiCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter your height and weight to calculate your BMI, weight category and a healthy weight range for your height."
    >
      <BmiCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the BMI Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Choose metric (cm, kg) or imperial (ft/in, lb) units.</li>
            <li>Enter your height and weight.</li>
            <li>See your BMI, weight category, and a healthy weight range for your height instantly.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a BMI calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            BMI (Body Mass Index) is a simple screening measure that relates your weight to your height. A
            BMI calculator does the arithmetic for you and places the result into one of four general
            categories: underweight, normal weight, overweight, or obese.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            BMI divides your weight by the square of your height, so taller people need proportionally more
            weight to reach the same BMI as someone shorter. The result is compared against standard
            weight-category ranges to show where it falls.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <ul className="mt-2 space-y-2 text-ink-soft">
            <li><strong className="text-ink">Metric:</strong> <code className="tabular-nums">BMI = weight (kg) &divide; height (m)&sup2;</code></li>
            <li><strong className="text-ink">Imperial:</strong> <code className="tabular-nums">BMI = 703 &times; weight (lb) &divide; height (in)&sup2;</code></li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A person who is 175 cm tall and weighs 70 kg has a BMI of about 22.9, which falls in the
            &ldquo;Normal weight&rdquo; category (18.5–24.9).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Underweight:</strong> BMI below 18.5</li>
            <li><strong className="text-ink">Normal weight:</strong> BMI 18.5 to 24.9</li>
            <li><strong className="text-ink">Overweight:</strong> BMI 25 to 29.9</li>
            <li><strong className="text-ink">Obese:</strong> BMI 30 and above</li>
          </ul>
          <p className="mt-2 leading-relaxed text-ink-soft">
            These are general population screening categories, not a diagnosis of your individual health.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            BMI uses only height and weight, so it doesn&rsquo;t distinguish muscle from fat. Athletes and
            very muscular people can show a higher BMI despite low body fat, while older adults can have a
            &ldquo;normal&rdquo; BMI despite reduced muscle mass. Age, sex, ethnicity and body composition
            can all affect how meaningful a given BMI is for an individual.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            BMI is commonly used as a quick, population-level screening tool — by individuals tracking
            general trends over time, and as an initial reference point that healthcare professionals may
            use alongside other measurements.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This result is informational only and is <strong className="text-ink">not a medical diagnosis or
            medical advice</strong>. BMI is a general screening measure, not a direct measurement of body
            fat or overall health. If you have concerns about your weight or health, please consult a
            qualified healthcare professional.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a BMI calculator used for?",
              answer:
                "It's used as a quick, general screening tool to relate your weight to your height, placing the result into a broad weight category for reference.",
            },
            {
              question: "Is BMI an accurate measure of health?",
              answer:
                "BMI is a useful population-level screening tool, but it doesn't measure body fat directly and doesn't account for muscle mass, bone density or body composition. It's one data point, not a complete picture of health.",
            },
            {
              question: "Is a high BMI always a health problem?",
              answer:
                "Not necessarily for every individual — muscular people, for example, can have a higher BMI without excess body fat. This is informational only; consult a healthcare professional for a proper assessment.",
            },
            {
              question: "Does BMI apply the same way to everyone?",
              answer:
                "The standard BMI categories were developed from general adult population data and may be less precise for children, older adults, pregnant women, or very athletic individuals.",
            },
            {
              question: "What's a healthy weight range?",
              answer: "The calculator shows the weight range corresponding to a \"Normal weight\" BMI (18.5–24.9) for your specific height.",
            },
            {
              question: "Can I use this in pounds and inches instead of kg and cm?",
              answer: "Yes — switch to imperial units to enter height in feet/inches and weight in pounds.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
