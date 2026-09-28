import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Numberly – Free Online Calculators",
  description:
    "Learn about Numberly, a simple online calculator platform designed to help users perform everyday math, finance, construction and other calculations.",
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <div className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink">About {siteConfig.name}</h1>
        <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
          <p>
            {siteConfig.name} is a free online calculator platform. It brings together everyday math,
            finance and construction calculators in one simple, fast website, so you can get a reliable
            number without digging through a spreadsheet or a search results page full of ads.
          </p>

          <p>
            The site is organised around a few main calculator categories: <strong className="text-ink">Math</strong>{" "}
            (like a basic calculator and percentage calculator), <strong className="text-ink">Finance</strong>{" "}
            (SIP, EMI, GST, compound interest and fixed deposit calculators), <strong className="text-ink">Everyday</strong>{" "}
            (an age calculator, with more everyday tools planned), and <strong className="text-ink">Construction</strong>{" "}
            (tile and concrete estimators). New calculators are added over time, following the same
            approach.
          </p>

          <p>
            Every calculator is built to be <strong className="text-ink">calculator-first</strong>: when you land
            on a page, the calculator itself is right there, above any lengthy explanation, so you can get
            your answer immediately. Educational content — how it works, the formula, a worked example
            — is available below the calculator for anyone who wants it, but it never gets in the way of
            using the tool.
          </p>

          <p>
            You don&rsquo;t need to sign up or create an account to use any calculator on {siteConfig.name}.
            Calculations run in your own browser, and where a calculator keeps a short history (like the
            basic calculator), that history stays on your device rather than in an account tied to you.
          </p>

          <p>
            We aim to keep the calculators on {siteConfig.name} useful, clearly explained and reasonably
            accurate for everyday planning. That said, every result is an estimate based on the numbers and
            assumptions you enter — see our{" "}
            <Link href="/disclaimer" className="font-medium text-brand hover:text-brand-dark">
              Disclaimer
            </Link>{" "}
            for important limitations, especially for financial, health or construction calculations.
          </p>

          <p>
            Spotted an error, or have a calculator you&rsquo;d like to see added? Visit the{" "}
            <Link href="/contact" className="font-medium text-brand hover:text-brand-dark">
              Contact page
            </Link>{" "}
            to get in touch.
          </p>
        </div>
      </div>
    </Container>
  );
}
