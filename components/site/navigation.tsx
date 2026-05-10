"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { creator, navItems } from "@/lib/brand-data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const allItems = [
    { label: "Home", href: "/" },
    ...navItems,
    { label: "Links", href: "/links" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--nav-bg)] text-[var(--text-strong)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 md:px-8">
        <Link className="group flex items-center gap-3" href="/">
          <span className="relative block size-10 overflow-hidden rounded-full border border-[var(--gold)]/50 bg-[var(--ivory)]">
            <Image
              alt={creator.name}
              className="object-cover object-top"
              fill
              priority
              sizes="40px"
              src={creator.profileImage}
            />
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-wide">
              {creator.name}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Bengaluru
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-[var(--text-muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text-strong)]",
                pathname === item.href &&
                  "bg-[var(--surface)] text-[var(--text-strong)]",
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            className="hidden h-10 rounded-full bg-[var(--text-strong)] px-4 text-sm font-semibold text-[var(--page)] hover:bg-[var(--gold)] hover:text-[var(--matte)] md:inline-flex"
          >
            <Link href="/contact">Partnership Inquiry</Link>
          </Button>
          <Button
            aria-label="Open menu"
            className="size-10 rounded-full border-[var(--border-soft)] bg-[var(--surface)] text-[var(--text-strong)] hover:bg-[var(--surface-muted)] lg:hidden"
            size="icon"
            variant="outline"
            type="button"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </nav>

      {open ? (
        <div className="mobile-safe-bottom fixed inset-0 z-50 min-h-dvh overflow-y-auto bg-[var(--page)] px-4 pb-6 pt-4 text-[var(--text-strong)] lg:hidden">
          <div className="flex items-center justify-between rounded-full border border-[var(--border-soft)] bg-[var(--surface)] p-2 shadow-xl shadow-black/10">
            <Link
              className="flex items-center gap-3 pl-1"
              href="/"
              onClick={() => setOpen(false)}
            >
              <span className="relative block size-10 overflow-hidden rounded-full border border-[var(--gold)]/50">
                <Image
                  alt={creator.name}
                  className="object-cover object-top"
                  fill
                  sizes="40px"
                  src={creator.profileImage}
                />
              </span>
              <span>
                <span className="block text-sm font-semibold">{creator.name}</span>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Bengaluru Lifestyle
                </span>
              </span>
            </Link>
            <Button
              aria-label="Close menu"
              className="size-10 rounded-full"
              size="icon"
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </Button>
          </div>

          <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)] shadow-2xl shadow-black/10">
            <Image
              alt="Iva Chatterjee at a rooftop experience"
              className="object-cover object-[50%_30%]"
              fill
              sizes="100vw"
              src={creator.heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                Iva’s world
              </p>
              <p className="mt-2 font-serif text-3xl leading-none text-stone-50">
                Bengaluru rooftops, stays, and city rituals.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-md border border-[var(--border-soft)] bg-[var(--surface)] px-4 shadow-2xl shadow-black/10">
            {allItems.map((item) => (
              <Link
                key={item.href}
                className={cn(
                  "flex min-h-14 items-center justify-between border-b border-[var(--border-soft)] py-4 text-2xl font-light last:border-b-0",
                  pathname === item.href && "text-[var(--gold)]",
                )}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
                <ArrowUpRight className="size-4 text-[var(--text-muted)]" />
              </Link>
            ))}
          </div>

          <div className="mt-5 rounded-md bg-[var(--surface-contrast)] p-5 text-[var(--page)] shadow-2xl shadow-black/15">
            <p className="font-serif text-3xl leading-tight">
              Collaboration begins with the experience, not the post.
            </p>
            <Button
              asChild
              className="mt-5 h-12 w-full rounded-full bg-[var(--gold)] text-[var(--matte)] hover:bg-[var(--ivory)]"
            >
              <Link href="/contact" onClick={() => setOpen(false)}>
                Start Partnership Inquiry
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
