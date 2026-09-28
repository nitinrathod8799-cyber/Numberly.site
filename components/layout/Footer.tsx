import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { categoryLabels, calculators, type CalculatorCategory } from "@/data/calculators";
import { siteConfig } from "@/lib/site";

const CATEGORIES: CalculatorCategory[] = ["math", "finance", "everyday", "construction"];

const LEGAL_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
              <span className="text-base font-bold text-ink">{siteConfig.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              {siteConfig.description}
            </p>
          </div>

          {CATEGORIES.map((cat) => (
            <div key={cat}>
              <h3 className="text-sm font-semibold text-ink">{categoryLabels[cat]}</h3>
              <ul className="mt-3 space-y-2">
                {calculators
                  .filter((c) => c.category === cat && !c.comingSoon)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/calculators/${c.slug}`}
                        className="text-sm text-ink-soft hover:text-brand"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-ink">Company</h3>
            <ul className="mt-3 space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-soft hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {siteConfig.name}. All calculations run in your browser.</p>
          <p>Results are estimates for planning purposes and are not financial advice.</p>
        </div>
      </Container>
    </footer>
  );
}
