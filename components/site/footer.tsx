"use client";
import { usePageCopy } from "./content-provider";

import Link from "next/link";

import { useSiteContent } from "./content-provider";
import { Container } from "./luxury-ui";

export function Footer() {
  const copy = usePageCopy("Footer");

  const { creator, markets, navItems } = useSiteContent();
  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--surface)] py-14 text-[var(--text-body)] md:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-14">
          <div>
            <p className="font-serif text-3xl text-[var(--text-strong)]">{creator.name}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-body)]">
              {creator.positioning}{copy("t_6a3471782d")}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">{copy("t_123a7f2fcc")}</p>
            <nav aria-label={copy("t_a39b37337f")} className="mt-4 grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  className="text-sm text-[var(--text-body)] transition hover:text-[var(--text-strong)]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">{copy("t_c3c49d3e83")}</p>
            <nav aria-label={copy("t_bf5319a49f")} className="mt-4 grid gap-2">
              {markets.slice(0, 5).map((market) => (
                <Link
                  key={market.name}
                  className="text-sm text-[var(--text-body)] transition hover:text-[var(--text-strong)]"
                  href={market.href}
                >
                  {market.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[var(--border-soft)] pt-6 text-xs text-[var(--text-muted)] md:flex-row">
          <p>{copy("t_0109e559e9")}</p>
          <nav aria-label={copy("t_339c1ea94b")} className="flex gap-4">
            <a href={creator.instagramUrl} rel="noreferrer" target="_blank" aria-label={copy("t_ef51e5927c")}>{copy("t_5721bbef40")}</a>
            <a href={creator.youtubeUrl} rel="noreferrer" target="_blank" aria-label={copy("t_84c46b15e2")}>{copy("t_558865a16f")}</a>
            <a href={`mailto:${creator.email}`} aria-label={copy("t_bf7c945204")}>{copy("t_8d27f9560f")}</a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
