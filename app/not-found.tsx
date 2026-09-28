import Link from "next/link";
import { Calculator, Search } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SearchBar } from "@/components/search/SearchBar";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-20 text-center sm:py-28">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
        <Calculator className="h-7 w-7" aria-hidden />
      </span>
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-ink-soft">
        That page doesn&rsquo;t exist — it may have moved, or the URL might be slightly off. Try
        searching for the calculator you need.
      </p>

      <div className="mt-6 w-full max-w-sm">
        <SearchBar variant="hero" />
      </div>

      <Link
        href="/calculators"
        className="mt-6 flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark"
      >
        <Search className="h-4 w-4" aria-hidden />
        Or browse all calculators
      </Link>
    </Container>
  );
}
