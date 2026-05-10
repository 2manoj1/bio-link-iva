import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, Stagger, StaggerItem } from "./reveal";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="mobile-safe-bottom min-h-screen bg-[var(--page)] pt-16 text-[var(--text-strong)]">
      {children}
    </main>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)}>
      {children}
    </div>
  );
}

export function EditorialHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--gold)]">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-balance font-serif text-4xl leading-[0.98] text-[var(--text-strong)] sm:text-5xl md:text-7xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-[var(--text-body)] md:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--gold)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance font-serif text-3xl leading-tight text-[var(--text-strong)] sm:text-4xl md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-[var(--text-body)]">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function CTAButton({
  href,
  children,
  variant = "ivory",
}: {
  href: string;
  children: ReactNode;
  variant?: "ivory" | "outline" | "ghost";
}) {
  return (
    <Button
      asChild
      className={cn(
        "h-auto min-h-12 rounded-full px-6 text-sm font-semibold shadow-sm",
        variant === "ivory" &&
          "bg-[var(--text-strong)] text-[var(--page)] hover:bg-[var(--gold)] hover:text-[var(--matte)]",
        variant === "outline" &&
          "border border-[var(--border-soft)] bg-transparent text-[var(--text-strong)] hover:border-[var(--gold)] hover:bg-[var(--surface)] hover:text-[var(--text-strong)]",
        variant === "ghost" &&
          "text-[var(--text-body)] hover:bg-[var(--surface)] hover:text-[var(--text-strong)]",
      )}
      variant={variant === "ghost" ? "ghost" : "outline"}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export function StatGrid({
  stats,
}: {
  stats: Array<{ label: string; value: string; note: string }>;
}) {
  return (
    <Stagger className="grid gap-3 md:grid-cols-4">
      {stats.map((stat) => (
        <StaggerItem
          key={stat.label}
          className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface)]/86 p-5 shadow-xl shadow-black/5"
        >
          <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
          <p className="mt-3 text-3xl font-semibold text-[var(--text-strong)]">
            {stat.value}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--gold)]">
            {stat.note}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function ImageCard({
  title,
  subtitle,
  image,
  href,
  meta,
}: {
  title: string;
  subtitle: string;
  image: string;
  href?: string;
  meta?: string;
}) {
  const content = (
    <article className="group relative min-h-[420px] overflow-hidden rounded-xl border border-[var(--border-soft)] bg-stone-950 shadow-2xl shadow-black/15">
      <Image
        alt={title}
        className="object-cover transition duration-700 group-hover:scale-105"
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        src={image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        {meta ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            {meta}
          </p>
        ) : null}
        <h3 className="text-2xl font-semibold text-stone-50">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-300">{subtitle}</p>
      </div>
    </article>
  );

  if (!href) return content;

  return <Link href={href}>{content}</Link>;
}

export function FeatureBand({
  eyebrow,
  title,
  description,
  image,
  reverse,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <section className="py-20 md:py-28">
      <Container
        className={cn(
          "grid gap-10 md:grid-cols-2 md:items-center",
          reverse && "md:[&>*:first-child]:order-2",
        )}
      >
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--border-soft)]">
            <Image
              alt={title}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              src={image}
            />
          </div>
        </Reveal>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      </Container>
    </section>
  );
}

export function ProgressRow({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-medium text-[var(--text-strong)]">{label}</p>
          {note ? (
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {note}
            </p>
          ) : null}
        </div>
        <p className="text-sm font-semibold text-[var(--text-strong)]">
          {value.toFixed(1)}%
        </p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]/75">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--gold),#fff4d8)]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function NewsletterBlock() {
  return (
    <section className="border-y border-[var(--border-soft)] bg-[var(--surface-muted)]/50 py-16">
      <Container className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-center">
        <SectionHeader
          eyebrow="Private List"
          title="Iva’s private city list."
          description="A quiet note for beautiful cafés, boutique stays, new city finds, and collaboration updates from Iva."
        />
        <Reveal>
          <form className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-3 shadow-xl shadow-black/5">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                className="min-h-12 flex-1 rounded-xl border border-[var(--border-soft)] bg-[var(--page)] px-4 text-sm text-[var(--text-strong)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--gold)]"
                id="newsletter-email"
                name="email"
                placeholder="brand@company.com"
                type="email"
              />
              <Button
                className="h-auto min-h-12 rounded-xl bg-[var(--text-strong)] px-5 text-sm font-semibold text-[var(--page)] hover:bg-[var(--gold)] hover:text-[var(--matte)]"
                type="button"
              >
                Request Access
              </Button>
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
