"use client";

import { useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { searchCalculators } from "@/data/calculators";

export function SearchBar({
  variant = "hero",
  placeholder = "Search calculators…",
  autoFocus = false,
  onNavigate,
}: {
  variant?: "hero" | "compact";
  placeholder?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const results = useMemo(() => searchCalculators(query).slice(0, 6), [query]);
  const open = query.trim().length > 0 && !dismissed;

  function handleChange(value: string) {
    setQuery(value);
    setDismissed(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setDismissed(true);
      inputRef.current?.blur();
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      setDismissed(true);
      router.push(`/calculators/${results[activeIndex].slug}`);
      onNavigate?.();
    }
  }

  const sizeClasses =
    variant === "hero"
      ? "h-14 pl-13 pr-4 text-base rounded-xl"
      : "h-10 pl-10 pr-3 text-sm rounded-lg";

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-faint ${
            variant === "hero" ? "left-4.5 h-5 w-5" : "left-3 h-4 w-4"
          }`}
          aria-hidden
        />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label="Search calculators"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setDismissed(false)}
          placeholder={placeholder}
          className={`w-full border border-line bg-surface text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-brand ${sizeClasses}`}
        />
      </div>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-lg border border-line bg-surface shadow-lg shadow-black/5"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-ink-soft">
              No calculators found for &ldquo;{query}&rdquo;.
            </li>
          ) : (
            results.map((calc, i) => (
              <li key={calc.slug} role="option" aria-selected={i === activeIndex}>
                <Link
                  href={`/calculators/${calc.slug}`}
                  onClick={() => {
                    setDismissed(true);
                    onNavigate?.();
                  }}
                  className={`flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors ${
                    i === activeIndex ? "bg-brand-soft" : "hover:bg-paper"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <calc.icon className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                    <span>
                      <span className="block font-medium text-ink">{calc.name}</span>
                      <span className="block text-xs text-ink-soft">{calc.description}</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
