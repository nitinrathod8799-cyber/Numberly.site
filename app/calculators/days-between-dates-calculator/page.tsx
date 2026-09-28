import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { DaysBetweenDatesApp } from "@/components/calculator/apps/DaysBetweenDatesApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("days-between-dates-calculator")!;
const title = "Days Between Dates – Day Counter";
const description =
  "Count the exact number of days between a start date and an end date, plus total weeks.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/days-between-dates-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/days-between-dates-calculator") },
  twitter: { title, description },
};

export default function DaysBetweenDatesPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter a start and end date to count exactly how many days lie between them."
    >
      <DaysBetweenDatesApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use this calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Choose a start date and an end date.</li>
            <li>Select <strong className="text-ink">Calculate</strong> to see the total number of days.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What does this calculator do?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This is a simple day counter: it tells you the total number of days between a start date and
            an end date, with no year/month/day breakdown — just the single number most people are
            looking for when counting down to (or up from) a date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The calculator finds the exact number of calendar days between the two dates you choose,
            accounting for different month lengths and leap years automatically.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            From 1 January 2024 to 8 January 2024 is exactly 7 days — or 1 full week.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The total is a straightforward day count between the two calendar dates. Total weeks is that
            day count divided by 7 and rounded down to a whole number.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            People use this to count down to a wedding, exam, trip or deadline, check how many days a
            rental or subscription period covers, or work out how many days have passed since an event.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            For a full years/months/days breakdown instead of just a day count, use the{" "}
            <Link href="/calculators/date-difference-calculator" className="font-medium text-brand hover:text-brand-dark">Date Difference Calculator</Link>.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a days-between-dates calculator used for?",
              answer: "It's used to quickly count the exact number of days between a start date and an end date.",
            },
            {
              question: "Does it matter which date I enter first?",
              answer: "No — the calculator works correctly whichever order you enter the two dates in.",
            },
            {
              question: "Does this include or exclude the start date?",
              answer: "The count reflects the number of full days elapsed between the two calendar dates, calculated consistently for any date range you enter.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
