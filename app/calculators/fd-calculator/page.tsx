import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { FdCalculatorApp } from "@/components/calculator/apps/FdCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("fd-calculator")!;
const title = "FD Calculator – Fixed Deposit Maturity Calculator";
const description =
  "Estimate your fixed deposit maturity value and interest earned from the deposit amount, interest rate and tenure, with quarterly, monthly or annual compounding.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/fd-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/fd-calculator") },
  twitter: { title, description },
};

export default function FdCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Estimate what your fixed deposit will be worth at maturity, based on the deposit amount, rate and tenure."
    >
      <FdCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the FD Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter the amount you plan to deposit.</li>
            <li>Enter the annual interest rate your bank is offering.</li>
            <li>Set the tenure, or pick a preset.</li>
            <li>Choose the compounding frequency your bank uses (quarterly is most common in India).</li>
            <li>See the maturity value and interest earned instantly.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is an FD calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            An FD (Fixed Deposit) calculator estimates what a bank fixed deposit will be worth when it
            matures, based on the amount deposited, the interest rate offered, the tenure, and how often
            the bank compounds interest. It helps you compare offers before locking money away.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How FD interest is calculated</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Fixed deposits use the same compound interest formula as any other compounding investment.
            Indian banks most commonly compound FD interest quarterly, though some offer monthly or annual
            options — this calculator lets you choose.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <p className="mt-2 rounded-lg bg-paper p-3 font-mono text-sm text-ink">A = P (1 + r/n)^(n×t)</p>
          <p className="mt-2 text-sm text-ink-soft">
            Where <strong className="text-ink">P</strong> is your deposit, <strong className="text-ink">r</strong> is the annual
            interest rate, <strong className="text-ink">n</strong> is the compounding frequency per year, and{" "}
            <strong className="text-ink">t</strong> is the tenure in years — the same formula used by
            the Compound Interest Calculator, with FD-typical defaults.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A ₹1,00,000 deposit at 7% annual interest, compounded quarterly for 5 years, matures to
            roughly ₹1,41,000 — about ₹41,000 in interest.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Maturity value</strong> is the total amount you&rsquo;ll receive when the FD matures.</li>
            <li><strong className="text-ink">Interest earned</strong> is the growth on top of your original deposit.</li>
            <li>The <strong className="text-ink">year-wise table</strong> shows how the balance builds year by year.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Interest rate</strong> varies by bank, deposit amount and tenure.</li>
            <li><strong className="text-ink">Compounding frequency</strong> changes the maturity value slightly for the same nominal rate.</li>
            <li><strong className="text-ink">Depositor category</strong> — senior citizens are often offered a higher rate (not modelled here; adjust the rate manually to check).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Savers use this calculator to compare FD offers across banks and tenures, check whether a
            longer lock-in genuinely earns meaningfully more, or estimate returns before renewing a
            maturing FD.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Actual FD rates depend on your bank, deposit amount, tenure and depositor category. Tax is
            deducted at source (TDS) on interest above the exempt threshold and is not factored into this
            estimate, and premature withdrawal penalties are not modelled here.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is an FD calculator used for?",
              answer:
                "It's used to estimate how much a fixed deposit will be worth at maturity, so you can compare bank offers or plan around a future lump sum.",
            },
            {
              question: "Is FD interest taxable?",
              answer:
                "Yes, FD interest is added to your taxable income and taxed at your applicable slab rate. Banks deduct TDS if interest exceeds the exempt limit in a financial year.",
            },
            {
              question: "Can I withdraw an FD before maturity?",
              answer:
                "Most banks allow premature withdrawal, usually with a penalty (a reduced interest rate). Check your bank's specific terms — this calculator assumes the FD runs for its full tenure.",
            },
            {
              question: "Why does compounding frequency matter for an FD?",
              answer:
                "More frequent compounding (monthly vs. quarterly vs. annually) means interest starts earning interest sooner, which slightly increases the final maturity value at the same nominal rate.",
            },
            {
              question: "Do senior citizens get a different FD rate?",
              answer:
                "Many banks offer a higher rate for senior citizens. This calculator doesn't apply that automatically — simply enter the higher rate your bank quotes.",
            },
            {
              question: "What's the difference between this and the Compound Interest Calculator?",
              answer:
                "They use the same underlying formula. This one defaults to quarterly compounding and FD-typical framing, since that's how most Indian bank fixed deposits work.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
