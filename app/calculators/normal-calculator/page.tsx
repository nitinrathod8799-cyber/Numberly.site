import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { NormalCalculatorApp } from "@/components/calculator/apps/NormalCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("normal-calculator")!;
const title = "Normal Calculator – Free Online Basic Calculator";
const description =
  "A fast, free online calculator for addition, subtraction, multiplication, division and percentages. Full keyboard support, local history, no sign-up.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/normal-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/normal-calculator") },
  twitter: { title, description },
};

export default function NormalCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Add, subtract, multiply and divide instantly — works with your keyboard, keeps a private history, and never sends your numbers anywhere."
    >
      <NormalCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use this calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Click the number and operator buttons, or type directly using your keyboard.</li>
            <li>
              Use <kbd className="rounded border border-line-strong bg-paper px-1.5 py-0.5 text-xs">Enter</kbd> or the{" "}
              <strong className="text-ink">=</strong> button to calculate the result.
            </li>
            <li>
              Press <kbd className="rounded border border-line-strong bg-paper px-1.5 py-0.5 text-xs">Backspace</kbd>{" "}
              to remove the last character, or <strong className="text-ink">AC</strong> to start over.
            </li>
            <li>Your last 20 calculations are saved as history in this browser only.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a normal calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A normal (or basic) calculator handles the four core arithmetic operations — addition,
            subtraction, multiplication and division — along with decimals and percentages. It&rsquo;s
            the everyday tool for quick sums that don&rsquo;t need a spreadsheet or a scientific calculator.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Behind the scenes, your input is parsed into numbers and operators and evaluated using standard
            order of operations — multiplication and division before addition and subtraction, and
            anything in parentheses first. The calculator never uses a raw text-to-code shortcut to evaluate
            your expression, so unusual input simply shows a clear error instead of an unpredictable result.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked examples</h2>
          <ul className="mt-2 space-y-1 tabular-nums text-ink-soft">
            <li>25 + 50 = 75</li>
            <li>100 × 5 = 500</li>
            <li>18 ÷ 4 = 4.5</li>
            <li>250 − 18% = 205 <span className="text-ink-faint">(18% treated as 0.18)</span></li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The top line of the display shows the expression you&rsquo;ve typed so far; the larger number
            below shows the live result once you press equals. Every calculation you complete is also added
            to the history list on the right, so you can revisit or reuse a recent result without retyping
            it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Results depend only on the expression you enter. Dividing by zero, an incomplete expression, or
            a result too large to display cleanly will show a clear error message instead of a broken or
            misleading number.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            People use this calculator for everyday arithmetic — splitting a bill, checking a total at
            checkout, quick homework sums, or any calculation that&rsquo;s faster to type here than to work
            out on paper.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Very large results (beyond 10<sup>15</sup>) are rejected to keep numbers accurate and readable.
            History is stored only in your browser&rsquo;s local storage and is never sent to a server.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a normal calculator used for?",
              answer:
                "It's used for everyday arithmetic — addition, subtraction, multiplication, division and percentages — without needing a physical calculator or spreadsheet.",
            },
            {
              question: "Does this calculator store my numbers on a server?",
              answer:
                "No. Every calculation runs in your browser. Only your calculation history is saved, and it stays in this browser's local storage — it is never sent anywhere.",
            },
            {
              question: "Can I use my keyboard instead of clicking?",
              answer:
                "Yes. Number keys, + − × ÷, the decimal point, parentheses, Enter, Backspace and Escape all work.",
            },
            {
              question: "What happens if I divide by zero?",
              answer: "The calculator shows a clear “Cannot divide by zero” error instead of an invalid result.",
            },
            {
              question: "Does it follow the correct order of operations?",
              answer: "Yes — multiplication and division are calculated before addition and subtraction, and anything inside parentheses is calculated first.",
            },
            {
              question: "How many past calculations does the history keep?",
              answer: "The most recent 20 calculations are kept, stored only in your browser. You can clear them at any time.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
