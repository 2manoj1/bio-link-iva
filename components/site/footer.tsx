import Link from "next/link";

import { creator, markets, navItems } from "@/lib/brand-data";
import { Container } from "./luxury-ui";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--surface)] py-14 text-[var(--text-body)] md:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-14">
          <div>
            <p className="font-serif text-3xl text-[var(--text-strong)]">{creator.name}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-body)]">
              {creator.positioning} A personal luxury space for cafés, stays,
              fashion, beauty, and city moments that feel worth saving.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
              Platform
            </p>
            <nav aria-label="Footer Platform Navigation" className="mt-4 grid gap-2">
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
              Markets
            </p>
            <nav aria-label="Footer Markets Navigation" className="mt-4 grid gap-2">
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
          <p>© 2026 Iva Chatterjee. Soft luxury lifestyle creator.</p>
          <nav aria-label="Social Links" className="flex gap-4">
            <a href={creator.instagramUrl} rel="noreferrer" target="_blank" aria-label="Iva Chatterjee Instagram">
              Instagram
            </a>
            <a href={creator.youtubeUrl} rel="noreferrer" target="_blank" aria-label="Iva Chatterjee YouTube">
              YouTube
            </a>
            <a href={`mailto:${creator.email}`} aria-label="Contact Iva Chatterjee">Brand Contact</a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
