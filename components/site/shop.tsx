import { ExternalLink, Heart, Mail, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  amazonAffiliate,
  creator,
  dailyProductShelves,
  makeAmazonAffiliateUrl,
  shopQuickLinks,
} from "@/lib/brand-data";
import { Container, PageShell, SectionHeader } from "./luxury-ui";
import { Reveal, Stagger, StaggerItem } from "./reveal";

export function ShopExperience() {
  const featuredShelf = dailyProductShelves[0];

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-[var(--border-soft)] bg-stone-950 [--border-soft:rgba(255,255,255,0.14)] [--surface:rgba(255,255,255,0.08)] [--text-body:#eadfce] [--text-muted:#c9b89f] [--text-strong:#fff7ed]">
        <Image
          alt="Iva Chatterjee soft luxury product shelf"
          className="object-cover object-[52%_20%] opacity-70 saturate-[0.92]"
          fill
          priority
          sizes="100vw"
          src={featuredShelf.image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,0.12),rgba(17,16,14,0.9)),linear-gradient(90deg,rgba(17,16,14,0.95),rgba(17,16,14,0.58),rgba(17,16,14,0.14))]" />
        <Container className="relative grid min-h-[82svh] gap-10 pb-12 pt-24 md:pb-16 md:pt-28 lg:grid-cols-[0.95fr_0.72fr] lg:items-end">
          <div>
            <Reveal className="max-w-4xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                <ShoppingBag className="size-4" />
                Iva&apos;s Shelf
              </p>
              <h1 className="mt-5 max-w-4xl text-balance font-serif text-5xl font-medium leading-[0.9] text-[var(--text-strong)] sm:text-6xl md:text-8xl xl:text-[7rem]">
                Know what Iva uses, loves, and keeps close.
              </h1>
              <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-[var(--text-body)] md:text-lg md:leading-9">
                A personal shelf for Iva&apos;s day-to-day beauty, cafe, travel,
                creator, and home finds. Browse the little things that shape her
                routines, reels, stays, and soft luxury city days.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/70 bg-[var(--gold)] px-6 text-sm font-semibold text-[var(--matte)] shadow-gold-glow transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--text-strong)]"
                  href={amazonAffiliate.storefrontUrl}
                  rel="sponsored nofollow noreferrer"
                  target="_blank"
                >
                  Open Amazon Storefront
                  <ExternalLink className="size-4" />
                </a>
                <Link
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-white hover:text-stone-950"
                  href="/contact"
                >
                  Partner with Iva
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="rounded-md border border-white/15 bg-black/40 p-5 shadow-luxury-lg backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <Heart className="size-5 text-[var(--gold)]" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--champagne)]">
                  How Iva curates
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--text-body)]">
                Nothing here is meant to feel random. Each shelf starts from a
                real moment: getting ready, stepping out for coffee, packing for
                a stay, filming content, or resetting at home.
              </p>
              <a
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--champagne)] transition-colors duration-300 ease-luxury hover:text-[var(--gold)]"
                href={amazonAffiliate.storefrontUrl}
                rel="sponsored nofollow noreferrer"
                target="_blank"
              >
                Visit Iva&apos;s Amazon Storefront
                <ExternalLink className="size-4" />
              </a>
              <div className="mt-5 grid gap-3">
                {[
                  ["Daily mood", "Products grouped by how Iva would use them"],
                  ["Easy to save", "Simple finds for beauty, travel, and creator days"],
                  ["Clearly marked", "Shopping links may earn a small commission"],
                ].map(([label, text]) => (
                  <div className="border-t border-white/12 pt-3" key={label}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                      {label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-body)]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-[var(--spacing-editorial-breath)]" id="daily-shelves">
        <Container>
          <div className="mb-12">
            <SectionHeader
              eyebrow="Shop By Mood"
              title="Start with the kind of day you are planning."
              description="Quick edits for the products followers usually ask about first: beauty minis, cafe looks, creator tools, travel pouches, home details, and easy gifts."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {shopQuickLinks.map((link) => (
                <a
                  className="group flex min-h-32 items-start justify-between gap-5 rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm transition duration-500 ease-luxury hover:-translate-y-0.5 hover:border-[var(--gold)]/55 hover:shadow-luxury-md"
                  href={makeAmazonAffiliateUrl(link.search)}
                  key={link.label}
                  rel="sponsored nofollow noreferrer"
                  target="_blank"
                >
                  <span>
                    <span className="block font-serif text-3xl leading-tight text-[var(--text-strong)]">
                      {link.label}
                    </span>
                    <span className="mt-3 block text-sm leading-6 text-[var(--text-body)]">
                      {link.description}
                    </span>
                  </span>
                  <ExternalLink className="mt-1 size-4 shrink-0 text-[var(--gold)] transition-transform duration-300 ease-luxury group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>

          <SectionHeader
            eyebrow="Day-To-Day Products"
            title="Products followers ask about, organized by Iva moments."
            description="A softer product edit for the beauty, travel, cafe, creator, and home details that naturally fit Iva's world."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-2">
            {dailyProductShelves.map((shelf) => (
              <StaggerItem key={shelf.slug}>
                <ProductShelfCard shelf={shelf} />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 rounded-md border border-[var(--border-soft)] bg-[var(--surface-muted)] p-5 text-sm leading-7 text-[var(--text-muted)]">
            Some links may be affiliate links. Iva may earn a small commission
            when you shop through them, at no extra cost to you.
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border-soft)] bg-[var(--surface-muted)]/50 py-[var(--spacing-editorial-breath)]">
        <Container className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <SectionHeader
            eyebrow="The Shelf Rule"
            title="Only the things that fit Iva's everyday world."
            description="This edit is for followers who want the small details behind the look: the getting-ready products, cafe-day accessories, travel pouch finds, creator tools, and home rituals."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Actually useful",
                text: "Each product belongs to a real routine, not a random shopping list.",
              },
              {
                icon: ShoppingBag,
                title: "Easy to revisit",
                text: "Save the page before a brunch, trip, event, shoot day, or quiet reset at home.",
              },
              {
                icon: Sparkles,
                title: "Softly curated",
                text: "The mood stays polished, feminine, practical, and close to Iva's personal taste.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm"
                key={title}
              >
                <Icon className="mb-5 size-5 text-[var(--gold)]" />
                <h2 className="font-serif text-3xl leading-tight text-[var(--text-strong)]">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-body)]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-[var(--spacing-editorial-breath)]">
        <Container className="grid gap-8 rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-luxury-md md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
              Brand Notes
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-5xl font-medium leading-[0.96] text-[var(--text-strong)]">
              Want Iva to try something beautiful?
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-body)]">
              For gifting, beauty launches, fashion finds, travel essentials,
              home rituals, and product-led stories, reach Iva&apos;s team with the
              details.
            </p>
          </div>
          <div className="grid gap-3 sm:flex md:grid md:min-w-60">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/70 bg-[var(--gold)] px-6 text-sm font-semibold text-[var(--matte)] shadow-gold-glow transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--text-strong)]"
              href={`mailto:${creator.email}?subject=Product%20Collaboration%20for%20Iva%27s%20Shelf`}
            >
              <Mail className="size-4" />
              Pitch a product
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--page)] px-6 text-sm font-semibold text-[var(--text-strong)] transition duration-500 ease-luxury hover:-translate-y-0.5 hover:border-[var(--gold)]"
              href={amazonAffiliate.storefrontUrl}
              rel="sponsored nofollow noreferrer"
              target="_blank"
            >
              <ExternalLink className="size-4" />
              Amazon Storefront
            </a>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

function ProductShelfCard({
  shelf,
}: {
  shelf: (typeof dailyProductShelves)[number];
}) {
  return (
    <article className="overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)] shadow-luxury-md transition duration-500 ease-luxury hover:-translate-y-0.5 hover:border-[var(--gold)]/45 hover:shadow-luxury-lg">
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4] lg:aspect-[4/3]">
        <Image
          alt={`${shelf.title} by ${creator.name}`}
          className="object-cover transition duration-700 ease-luxury hover:scale-[1.025]"
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          src={shelf.image}
          style={{ objectPosition: shelf.imagePosition ?? "50% 22%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/14 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
            Iva&apos;s Products
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-none text-stone-50">
            {shelf.title}
          </h2>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 border-b border-[var(--border-soft)] pb-4 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-sm leading-7 text-[var(--text-body)]">
            {shelf.moment}
          </p>
          <a
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--champagne)] transition duration-300 ease-luxury hover:border-[var(--gold)] hover:text-[var(--gold)]"
            href={makeAmazonAffiliateUrl(`${shelf.title} women`)}
            rel="sponsored nofollow noreferrer"
            target="_blank"
          >
            Shop shelf
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {shelf.products.map((product) => (
            <a
              className="group min-h-28 rounded-sm border border-[var(--border-soft)] bg-[var(--page)] p-3 transition duration-300 ease-luxury hover:border-[var(--gold)]/55 hover:bg-[var(--surface-muted)]"
              href={makeAmazonAffiliateUrl(product.search)}
              key={product.name}
              rel="sponsored nofollow noreferrer"
              target="_blank"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-5 text-[var(--text-strong)]">
                    {product.name}
                  </span>
                  <span className="mt-1.5 block text-xs leading-5 text-[var(--text-body)]">
                    {product.note}
                  </span>
                </span>
                <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-[var(--gold)] transition-transform duration-300 ease-luxury group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Amazon
              </span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
