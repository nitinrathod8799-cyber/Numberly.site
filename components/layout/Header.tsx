"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import { Container } from "./Container";
import { SearchBar } from "@/components/search/SearchBar";
import { siteConfig } from "@/lib/site";

const NAV_LINKS = [
  { href: "/calculators", label: "Calculators" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close transient UI state on navigation
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur supports-backdrop-blur:bg-surface/80">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${siteConfig.name} home`}>
            <Image
              src="/logo.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-full"
              priority
            />
            <span className="text-lg font-bold tracking-tight text-ink">{siteConfig.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden w-64 md:block">
              <SearchBar variant="compact" />
            </div>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-md text-ink-soft hover:bg-paper md:hidden"
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
            >
              {searchOpen ? <X className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-md text-ink-soft hover:bg-paper md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-line py-3 md:hidden">
            <SearchBar variant="compact" autoFocus onNavigate={() => setSearchOpen(false)} />
          </div>
        )}

        {menuOpen && (
          <nav className="border-t border-line py-2 md:hidden" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-2 py-2.5 text-sm font-medium text-ink-soft hover:bg-paper hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </Container>
    </header>
  );
}
