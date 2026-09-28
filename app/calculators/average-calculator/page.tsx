import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { AverageCalculatorApp } from "@/components/calculator/apps/AverageCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("average-calculator")!;
const title = "Average Calculator – Mean, Median & Mode";
const description =
  "Find the mean, median, mode, sum and range of a set of numbers. Paste or type numbers separated by commas, spaces or new lines.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/average-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/average-calculator") },
  twitter: { title, description },
};

export default function AverageCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter a list of numbers to instantly see the mean, median, mode and other summary statistics."
    >
      <AverageCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Average Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Type or paste your numbers into the box, separated by commas, spaces or new lines.</li>
            <li>Results update instantly — mean, median, mode, count, sum and range.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is an average calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            An average calculator summarises a list of numbers using several common statistics at once:
            the mean (what most people mean by &ldquo;average&rdquo;), the median (the middle value), and
            the mode (the most frequently repeated value), along with the count, sum and range of the data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How each calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The mean adds every number together and divides by how many there are. The median sorts the
            numbers and picks the middle one (or averages the two middle values if there&rsquo;s an even
            count). The mode finds whichever value (or values) appear most often — if every value is
            unique, there is no mode.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formulas</h2>
          <ul className="mt-2 space-y-2 text-ink-soft">
            <li><strong className="text-ink">Mean:</strong> <code className="tabular-nums">Sum of values &divide; Count of values</code></li>
            <li><strong className="text-ink">Median:</strong> the middle value once sorted (or the average of the two middle values)</li>
            <li><strong className="text-ink">Mode:</strong> the most frequently occurring value(s)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            For the numbers 4, 8, 15, 16, 23, 42: the mean is 18, the median is 15.5 (the average of 15 and
            16), and since every value is unique, there is no mode.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The mean is sensitive to very large or small outliers; the median is not, which is why the
            median often better represents a &ldquo;typical&rdquo; value in skewed data (like household
            incomes). The mode is most useful for categorical or repeated data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            All three statistics depend entirely on the numbers you enter. A single unusually large or
            small value can shift the mean noticeably, while the median stays much more stable.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Students use this to average test scores or grades, professionals use it to summarise a small
            dataset without opening a spreadsheet, and anyone can use it to quickly settle questions like
            &ldquo;what&rsquo;s the average of these numbers?&rdquo;
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Non-numeric text in your input is ignored automatically. If every number you enter is unique,
            the mode will show as &ldquo;None&rdquo;, since no value repeats.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is an average calculator used for?",
              answer:
                "It's used to quickly find the mean, median and mode of a set of numbers — useful for grades, survey data, or any quick statistical summary.",
            },
            {
              question: "What's the difference between mean, median and mode?",
              answer:
                "The mean is the sum divided by the count. The median is the middle value when sorted. The mode is the value that appears most often. They can all differ, especially in skewed data.",
            },
            {
              question: "Why is my mean so different from my median?",
              answer:
                "A large gap usually means your data has outliers — one or more values much higher or lower than the rest — which pull the mean away from the middle of the data.",
            },
            {
              question: "What happens if there's no repeated number?",
              answer: "The mode is shown as \"None\", since mode only applies when at least one value repeats.",
            },
            {
              question: "Can I paste numbers from a spreadsheet?",
              answer: "Yes — numbers separated by spaces, commas or new lines (as most spreadsheets paste them) are all recognised automatically.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
