import type { CalculatorMeta } from "@/data/calculators";
import { siteConfig, absoluteUrl } from "./site";

/** Site-wide Organization schema — rendered once, in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

/** Site-wide WebSite schema — rendered once, in the root layout. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

/** BreadcrumbList schema, generated from the same items the visible <Breadcrumb> renders. */
export function breadcrumbJsonLd(items: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

/**
 * WebApplication schema for a calculator page. Reflects only what the page
 * actually offers (a free, browser-based calculation tool) — no fake
 * ratings, reviews or prices.
 */
export function calculatorJsonLd(calc: CalculatorMeta, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calc.name,
    url: absoluteUrl(`/calculators/${calc.slug}`),
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
