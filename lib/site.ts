export const siteConfig = {
  name: "Numberly",
  tagline: "Free Online Calculators",
  description:
    "Simple, fast and accurate calculators for everyday decisions — SIP, EMI, percentage, age and more.",
  // Update this to the real production domain before deploying.
  url: "https://numberly.site",
  // Real, monitored inbox for Numberly.
  contactEmail: "numberly.site@gmail.com",
  // Date the legal pages content below was last written/reviewed. Update
  // this whenever privacy-policy, terms or disclaimer content changes.
  legalLastUpdated: "20 September 2026",
};

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}
