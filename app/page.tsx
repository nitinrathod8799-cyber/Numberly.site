import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Zap, Lock, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SearchBar } from "@/components/search/SearchBar";
import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { calculators, categoryLabels, categoryDescriptions, type CalculatorCategory } from "@/data/calculators";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} – ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
};

const POPULAR_SLUGS = ["normal-calculator", "sip-calculator", "percentage-calculator", "age-calculator", "emi-calculator"];
const HOME_CATEGORIES: CalculatorCategory[] = ["math", "finance", "everyday", "construction"];

const FEATURES = [
  {
    icon: Zap,
    title: "Instant results",
    text: "Every calculator runs in your browser — no waiting on a server, no loading spinner.",
  },
  {
    icon: Lock,
    title: "Nothing you enter leaves your device",
    text: "Your inputs are never sent anywhere. Calculations happen locally, every time.",
  },
  {
    icon: ShieldCheck,
    title: "No account, ever",
    text: "Open a calculator and start using it. No sign-up, no email, no paywall.",
  },
];

export default function HomePage() {
  const popular = POPULAR_SLUGS.map((slug) => calculators.find((c) => c.slug === slug)!).filter(Boolean);
  const comingSoon = calculators.filter((c) => c.comingSoon).slice(0, 4);

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_340px]">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Free Online Calculators
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Simple, fast and accurate calculators for everyday decisions.
              </p>

              <div className="mt-7 max-w-md">
                <SearchBar variant="hero" placeholder="Search calculators… try &ldquo;SIP&rdquo; or &ldquo;loan&rdquo;" />
              </div>

              <p className="mt-3 text-sm text-ink-faint">
                No sign-up. Nothing you type is ever sent to a server.
              </p>
            </div>

            <div className="hidden rounded-xl border border-line bg-paper p-5 lg:block" aria-hidden>
              <p className="text-xs font-medium text-ink-soft">SIP Calculator · sample</p>
              <dl className="mt-4 space-y-3">
                <div className="flex items-baseline justify-between">
                  <dt className="text-sm text-ink-soft">Monthly investment</dt>
                  <dd className="tabular-nums font-semibold text-ink">₹10,000</dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="text-sm text-ink-soft">Duration</dt>
                  <dd className="tabular-nums font-semibold text-ink">20 years</dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="text-sm text-ink-soft">Expected return</dt>
                  <dd className="tabular-nums font-semibold text-ink">12%</dd>
                </div>
              </dl>
              <div className="mt-4 rounded-lg bg-brand-soft px-3.5 py-3">
                <p className="text-xs font-medium text-brand-dark">Estimated value</p>
                <p className="mt-0.5 text-2xl font-bold tabular-nums text-brand-dark">₹91.1 L</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Popular calculators ---- */}
      <section aria-labelledby="popular-heading" className="py-14 sm:py-18">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 id="popular-heading" className="text-2xl font-bold tracking-tight text-ink">
              Popular calculators
            </h2>
            <Link href="/calculators" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark sm:flex">
              View all <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((calc) => (
              <CalculatorCard key={calc.slug} calc={calc} />
            ))}
          </div>
          <Link href="/calculators" className="mt-6 flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark sm:hidden">
            View all calculators <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </Container>
      </section>

      {/* ---- Categories ---- */}
      <section aria-labelledby="categories-heading" className="border-y border-line bg-surface py-14 sm:py-18">
        <Container>
          <h2 id="categories-heading" className="text-2xl font-bold tracking-tight text-ink">
            Browse by category
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_CATEGORIES.map((cat) => {
              const count = calculators.filter((c) => c.category === cat && !c.comingSoon).length;
              return (
                <Link
                  key={cat}
                  href={`/categories/${cat}`}
                  className="rounded-lg border border-line bg-paper p-5 transition-colors hover:border-brand/40"
                >
                  <h3 className="font-semibold text-ink">{categoryLabels[cat]}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft">{categoryDescriptions[cat]}</p>
                  <p className="mt-3 text-xs font-medium text-ink-faint">
                    {count} calculator{count === 1 ? "" : "s"}
                  </p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---- Why use our calculators ---- */}
      <section aria-labelledby="why-heading" className="py-14 sm:py-18">
        <Container>
          <h2 id="why-heading" className="text-2xl font-bold tracking-tight text-ink">
            Why use our calculators
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-soft text-brand">
                  <f.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3 font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Recently added / roadmap ---- */}
      {comingSoon.length > 0 && (
        <section aria-labelledby="roadmap-heading" className="border-t border-line bg-surface py-14 sm:py-18">
          <Container>
            <h2 id="roadmap-heading" className="text-2xl font-bold tracking-tight text-ink">
              Coming soon
            </h2>
            <p className="mt-2 max-w-2xl text-ink-soft">
              We&rsquo;re adding new calculators regularly. Here&rsquo;s what&rsquo;s next.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {comingSoon.map((calc) => (
                <CalculatorCard key={calc.slug} calc={calc} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ---- FAQ ---- */}
      <section className="py-14 sm:py-18">
        <Container className="max-w-3xl">
            <FAQAccordion
              items={[
                {
                  question: "Are these calculators free to use?",
                  answer: "Yes, every calculator on this site is completely free, with no sign-up or hidden limits.",
                },
                {
                  question: "Is my data stored or shared with anyone?",
                  answer:
                    "No. All calculations happen locally in your browser. Nothing you type into a calculator is sent to a server or stored by us.",
                },
                {
                  question: "Can I suggest a new calculator?",
                  answer: "Yes — reach out through the Contact page and we'll consider it for the roadmap.",
                },
                {
                  question: "Are the financial calculators (SIP, EMI) a substitute for professional advice?",
                  answer:
                    "No. They are educational planning tools based on the assumptions you enter, not personalised financial or investment advice.",
                },
              ]}
            />
        </Container>
      </section>
    </>
  );
}
