import { ArrowRight, BadgeCheck, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  collaborationTypes,
  creator,
  demographics,
  editorial,
  experiencePillars,
  ivaImages,
  markets,
  stats,
  topContent,
  visualStories,
} from "@/lib/brand-data";
import {
  Container,
  CTAButton,
  EditorialHeader,
  ImageCard,
  NewsletterBlock,
  PageShell,
  ProgressRow,
  SectionHeader,
  StatGrid,
} from "./luxury-ui";
import { InquiryFunnel } from "./inquiry-funnel";
import { Reveal, Stagger, StaggerItem } from "./reveal";

export function HomeExperience() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-stone-950 text-stone-50 [--border-soft:rgba(255,255,255,0.14)] [--surface:rgba(255,255,255,0.08)] [--text-body:#eadfce] [--text-muted:#c9b89f] [--text-strong:#fff7ed]">
        <Image
          alt=""
          className="object-cover object-[58%_36%] opacity-62 saturate-[0.9] md:object-[62%_34%]"
          fill
          priority
          sizes="100vw"
          src={creator.heroImage}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,0.18),rgba(17,16,14,0.86))] md:bg-[linear-gradient(90deg,rgba(17,16,14,0.92),rgba(53,39,29,0.66),rgba(17,16,14,0.18))]" />
        <Container className="relative grid min-h-[92svh] gap-10 pb-12 pt-24 md:pb-16 md:pt-28 lg:grid-cols-[0.92fr_0.78fr] lg:items-end">
          <div className="max-w-3xl">
            <EditorialHeader
              eyebrow="Iva Chatterjee · Bengaluru"
              title="Step into Iva’s soft luxury lifestyle world."
              description="Rooftop evenings, beautiful cafés, boutique stays, fashion moments, and Bengaluru plans she would actually save, visit, and share."
            />
            <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/collaborations">Work With Iva</CTAButton>
              <CTAButton href="/media-kit" variant="outline">
                View Iva’s Reach
              </CTAButton>
            </Reveal>
            <Reveal
              delay={0.16}
              className="mt-10 grid gap-4 border-y border-white/15 py-5 text-sm text-stone-300 sm:grid-cols-3"
            >
              <span>Bengaluru rooftops</span>
              <span>Beautiful cafés</span>
              <span>Fashion-led evenings</span>
            </Reveal>
            <Reveal
              delay={0.2}
              className="mt-8 max-w-md font-serif text-2xl italic leading-snug text-[var(--beige)]"
            >
              “I share places and moments that feel beautiful enough to remember.”
            </Reveal>
          </div>

          <Reveal delay={0.14} className="relative justify-self-center lg:justify-self-end">
            <div className="relative aspect-[4/5] w-full max-w-[430px] overflow-hidden rounded-md border border-white/15 bg-stone-950 shadow-2xl shadow-black/40 ring-1 ring-[var(--gold)]/20">
              <Image
                alt="Iva Chatterjee editorial portrait"
                className="object-cover object-top"
                fill
                priority
                sizes="(min-width: 1024px) 430px, 92vw"
                src={ivaImages.editorialSaree}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/20 to-transparent p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
                  Iva Chatterjee
                </p>
                <p className="mt-2 font-serif text-3xl text-stone-50">
                  Fashion, stays, cafés, and the city moments she loves.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-[var(--border-soft)] bg-[var(--surface)] py-8">
        <Container>
          <StatGrid stats={stats} />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Featured Collaborations"
              title="Beautiful brand moments, shared in Iva’s voice."
              description="From fashion launches to rooftop evenings and staycation stories, every collaboration should feel natural to her life and useful to her audience."
            />
            <CTAButton href="/premium-experiences" variant="outline">
              Explore Experiences
            </CTAButton>
          </div>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {topContent.map((item) => (
              <StaggerItem key={item.title}>
                <ImageCard
                  image={item.image}
                  meta={`${item.views} views · ${item.category}`}
                  subtitle={`${item.city} moment`}
                  title={item.title}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <VisualStoriesSection />
      <BlogPreviewSection />
      <NewsletterBlock />
    </PageShell>
  );
}

export function VisualStoriesSection() {
  return (
    <section className="overflow-hidden border-y border-[var(--border-soft)] bg-[var(--surface-muted)]/45 py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeader
            eyebrow="Iva’s World"
            title="A personal style diary of places, moods, and moments."
            description="Fashion, rooftops, dining tables, boutique stays, and real creator moments from Iva’s own archive."
          />
          <Reveal className="text-sm leading-7 text-[var(--text-body)]">
            The site now feels like Iva because the imagery is hers: real
            places, real collaborations, and a visual language rooted in her
            Bengaluru lifestyle.
          </Reveal>
        </div>
      </Container>
      <div className="mt-10 flex gap-4 overflow-x-auto px-4 pb-4 md:px-8">
        {visualStories.map((story, index) => (
          <div
            key={story.title}
            className="relative h-[420px] w-[280px] shrink-0 overflow-hidden rounded-md border border-white/10 bg-stone-950 md:h-[520px] md:w-[360px]"
          >
            <Image
              alt={story.title}
              className="object-cover"
              fill
              priority={index < 2}
              sizes="360px"
              src={story.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                {story.category}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-stone-50">
                {story.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MarketSection() {
  return (
    <section className="bg-[var(--surface)] py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Places Iva Covers"
          title="Bengaluru first, with a few beautiful escapes."
          description="Each destination is framed as a personal recommendation, a mood, and a reason to dress up and go."
        />
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {markets.map((market) => (
            <StaggerItem key={market.name}>
              <ImageCard
                href={market.href}
                image={market.image}
                meta={market.role}
                subtitle={market.positioning}
                title={market.name}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

export function PillarsSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Content Pillars"
          title="The recurring rituals of Iva’s world."
          description="Cafés, stays, fashion, dining, and city culture are shared as lived moments, not generic recommendations."
        />
        <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {experiencePillars.map((pillar) => (
            <StaggerItem
              key={pillar}
              className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-4 text-sm text-[var(--text-body)] shadow-sm"
            >
              {pillar}
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

export function BlogPreviewSection() {
  const featured = editorial[0];
  const secondary = editorial.slice(1, 4);

  return (
    <section className="bg-[var(--surface-muted)]/70 py-20 text-[var(--text-strong)] md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <SectionHeader
              eyebrow="Iva’s Notes"
              title="Personal city notes with a polished point of view."
              description="Short stories for cafés, stays, fashion, hospitality, and the small rituals that make a day feel special."
            />
          </div>
          <Reveal className="flex justify-start lg:justify-end">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border-soft)] px-6 text-sm font-semibold text-[var(--text-strong)] transition hover:border-[var(--gold)] hover:bg-[var(--surface)]"
              href="/blog"
            >
              Read the Blog
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Link
              className="group block overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)] shadow-2xl shadow-black/10"
              href={`/editorial/${featured.slug}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  alt={featured.title}
                  className="object-cover transition duration-700 group-hover:scale-105"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  src={featured.image}
                />
              </div>
              <div className="p-5 md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                  {featured.category} · {featured.readTime}
                </p>
                <h3 className="mt-4 font-serif text-4xl leading-tight">
                  {featured.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-body)]">
                  {featured.excerpt}
                </p>
              </div>
            </Link>
          </Reveal>

          <Stagger className="grid gap-4">
            {secondary.map((story) => (
              <StaggerItem key={story.slug}>
                <Link
                  className="grid gap-4 rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-4 transition hover:border-[var(--gold)] sm:grid-cols-[140px_1fr]"
                  href={`/editorial/${story.slug}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image
                      alt={story.title}
                      className="object-cover"
                      fill
                      sizes="140px"
                      src={story.image}
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                      {story.category} · {story.readTime}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight">
                      {story.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-body)]">
                      {story.excerpt}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

export function AboutExperience() {
  return (
    <PageShell>
      <section className="py-20 md:py-32">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-[var(--border-soft)] shadow-2xl shadow-black/10">
              <Image
                alt={creator.name}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                src={creator.profileImage}
              />
            </div>
          </Reveal>
          <EditorialHeader
            eyebrow="About Iva"
            title="A Bengaluru creator with a love for beautiful places."
            description="Iva shares the cafés, stays, outfits, tables, and city moments that feel polished, warm, and worth remembering."
          />
        </Container>
      </section>
      <PillarsSection />
      <NewsletterBlock />
    </PageShell>
  );
}

export function CollaborationExperience() {
  return (
    <PageShell>
      <section className="py-20 md:py-32">
        <Container>
          <EditorialHeader
            eyebrow="Collaborations"
            title="For brands that want to feel personal, polished, and memorable."
            description="Iva works best with spaces and brands that care about ambiance, trust, service, design, and the feeling people carry after the visit."
          />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-4">
            {collaborationTypes.map((type) => (
              <StaggerItem
              key={type}
                className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-sm"
              >
                <ShieldCheck className="mb-5 size-5 text-[var(--gold)]" />
                <p className="font-medium text-[var(--text-strong)]">{type}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      <InquiryFunnel />
    </PageShell>
  );
}

export function CityExperience({
  name,
  role,
  positioning,
  image,
  href,
}: {
  name: string;
  role: string;
  positioning: string;
  image: string;
  href: string;
}) {
  return (
    <PageShell>
      <section className="relative min-h-[78vh] overflow-hidden [--text-body:#ddd0bd] [--text-muted:#b8aa98] [--text-strong:#f8f1e6]">
        <Image
          alt={name}
          className="object-cover opacity-70"
          fill
          priority
          sizes="100vw"
          src={image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,16,14,0.95),rgba(17,16,14,0.68),rgba(17,16,14,0.38))]" />
        <Container className="relative flex min-h-[78vh] flex-col justify-end pb-14 md:pb-20">
          <EditorialHeader
            eyebrow={role}
            title={`${name}, through Iva’s personal lens.`}
            description={positioning}
          />
        </Container>
      </section>
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="How Iva Shares It"
            title="The story begins before the recommendation."
            description="Iva looks for arrival, atmosphere, service, table details, wardrobe, and the reason a moment feels worth saving."
          />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "Beautiful venue mood",
              "Couple and lifestyle context",
              "Natural brand memory",
              "Creator trust",
              "Easy discovery",
              "Clear contact path",
            ].map((item) => (
              <StaggerItem
                key={item}
                className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 text-[var(--text-body)] shadow-sm"
              >
                {item}
              </StaggerItem>
            ))}
          </Stagger>
          {href === "/bengaluru-guide" ? (
            <div className="mt-10">
              <CTAButton href="/bengaluru-guide/indiranagar" variant="outline">
                Explore Iva’s Indiranagar Evening
              </CTAButton>
            </div>
          ) : null}
        </Container>
      </section>
      <BlogPreviewSection />
      <NewsletterBlock />
    </PageShell>
  );
}

export function MediaKitExperience() {
  return (
    <PageShell>
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <EditorialHeader
              eyebrow="Media Kit"
              title="A beautiful personal brand, with reach brands can trust."
              description="A softer look at Iva’s audience, loved content, city presence, and best-fit collaboration categories."
            />
            <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-sm">
              <p className="text-sm text-[var(--text-muted)]">Brand contact</p>
              <a
                className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-[var(--text-strong)]"
                href={`mailto:${creator.email}`}
              >
                <Mail className="size-4 text-[var(--gold)]" />
                {creator.email}
              </a>
            </Reveal>
          </div>
          <div className="mt-10">
            <StatGrid stats={stats} />
          </div>
        </Container>
      </section>

      <section className="bg-[var(--surface-muted)]/55 py-20">
        <Container className="grid gap-6 lg:grid-cols-3">
          <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-[var(--text-strong)]">
              Audience Demographics
            </h2>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                {demographics.age.map((item) => (
                  <ProgressRow key={item.label} {...item} />
                ))}
              </div>
              <div className="space-y-5">
                {demographics.gender.map((item) => (
                  <ProgressRow key={item.label} {...item} />
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl font-semibold text-[var(--text-strong)]">
              City Distribution
            </h2>
            <div className="mt-6 space-y-5">
              {demographics.geography.map((item) => (
                <ProgressRow key={item.label} {...item} />
              ))}
            </div>
          </Reveal>
          <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-6 lg:col-span-3">
            <h2 className="text-2xl font-semibold text-[var(--text-strong)]">
              Content Performance
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {demographics.content.map((item) => (
                <ProgressRow key={item.label} {...item} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="Loved Content"
            title="High-performing moments that still feel like Iva."
            description="Reach matters most when the work feels credible, warm, and natural to Iva’s audience."
          />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {topContent.map((item) => (
              <StaggerItem key={item.title}>
                <ImageCard
                  image={item.image}
                  meta={`${item.views} views`}
                  subtitle={item.category}
                  title={item.title}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      <InquiryFunnel />
    </PageShell>
  );
}

export function LinksExperience() {
  return (
    <PageShell>
      <section className="mx-auto flex min-h-[88vh] max-w-md flex-col px-5 py-12 text-center">
        <Reveal>
          <div className="relative mx-auto size-32 overflow-hidden rounded-full border border-[var(--gold)]/60">
            <Image
              alt={creator.name}
              className="object-cover"
              fill
              priority
              sizes="128px"
              src={creator.profileImage}
            />
          </div>
          <h1 className="mt-6 font-serif text-4xl text-[var(--text-strong)]">
            {creator.name}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{creator.handle}</p>
          <p className="mx-auto mt-5 max-w-xs text-sm leading-7 text-[var(--text-body)]">
            Sharing beautiful cafés, stays, fashion, and city moments from Bengaluru.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-3">
          {[
            ["Instagram", creator.instagramUrl],
            ["YouTube: Maniva", creator.youtubeUrl],
            ["Work With Iva", "/contact"],
            ["Media Kit", "/media-kit"],
            ["Bengaluru Guide", "/bengaluru-guide"],
          ].map(([label, href]) => (
            <Link
              key={label}
              className="flex min-h-14 items-center justify-between rounded-md border border-[var(--border-soft)] bg-[var(--surface)] px-5 text-left text-sm font-semibold text-[var(--text-strong)] transition hover:border-[var(--gold)]"
              href={href}
            >
              {label}
              <ArrowRight className="size-4 text-[var(--gold)]" />
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export function EditorialExperience() {
  return (
    <PageShell>
      <section className="py-20 md:py-32">
        <Container>
          <EditorialHeader
            eyebrow="Iva’s Notes"
            title="Stories from Iva’s lifestyle world."
            description="Guides, campaign notes, neighborhood picks, and city stories written in a personal voice."
          />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {editorial.map((story) => (
              <StaggerItem key={story.slug}>
                <ImageCard
                  href={`/editorial/${story.slug}`}
                  image={story.image}
                  meta={`${story.category} · ${story.readTime}`}
                  subtitle={story.excerpt}
                  title={story.title}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      <NewsletterBlock />
    </PageShell>
  );
}

export function PremiumExperiences() {
  return (
    <PageShell>
      <section className="py-20 md:py-32">
        <Container>
          <EditorialHeader
            eyebrow="Iva’s Picks"
            title="Beautiful places, stays, and city moments worth sharing."
            description="Cafés, rooftops, boutique hospitality, staycations, couple plans, and selective heritage-led travel stories."
          />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {markets.map((market) => (
              <StaggerItem key={market.name}>
                <ImageCard
                  href={market.href}
                  image={market.image}
                  meta={market.role}
                  subtitle={market.positioning}
                  title={market.name}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      <InquiryFunnel />
    </PageShell>
  );
}

export function ContactExperience() {
  return (
    <PageShell>
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <EditorialHeader
              eyebrow="Contact"
              title="Bring Iva into a story your audience will want to save."
              description="For paid collaborations with cafés, stays, fashion, beauty, restaurants, wellness, and beautiful city experiences."
            />
            <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <BadgeCheck className="size-5 text-[var(--gold)]" />
                <p className="font-semibold text-[var(--text-strong)]">
                  Paid brand collaborations only.
                </p>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--text-body)]">
                Best-fit partners include luxury cafés, boutique hotels, premium
                restaurants, fashion labels, beauty brands, wellness spaces, and
                lifestyle products she can share naturally.
              </p>
              <a
                className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[var(--text-strong)] px-6 text-sm font-semibold text-[var(--page)] transition hover:bg-[var(--gold)] hover:text-[var(--matte)]"
                href={`mailto:${creator.email}`}
              >
                Email {creator.email}
              </a>
            </Reveal>
          </div>
        </Container>
      </section>
      <InquiryFunnel />
    </PageShell>
  );
}

export function EditorialArticle({ slug }: { slug: string }) {
  const story = editorial.find((item) => item.slug === slug) ?? editorial[0];

  return (
    <PageShell>
      <article className="py-20 md:py-32">
        <Container className="max-w-4xl">
          <EditorialHeader
            eyebrow={story.category}
            title={story.title}
            description={story.excerpt}
          />
          <Reveal className="relative mt-10 aspect-[16/10] overflow-hidden rounded-md border border-[var(--border-soft)]">
            <Image
              alt={story.title}
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src={story.image}
            />
          </Reveal>
          <Reveal className="mt-10 space-y-6 text-lg leading-9 text-[var(--text-body)]">
            <div className="flex flex-wrap gap-3 border-y border-[var(--border-soft)] py-5 text-sm text-[var(--text-muted)]">
              <span>{story.date}</span>
              <span>·</span>
              <span>{story.readTime}</span>
              <span>·</span>
              <span>{story.category}</span>
            </div>
            {story.body.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="font-serif text-3xl leading-tight text-[var(--text-strong)] md:text-4xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </Reveal>
        </Container>
      </article>
      <NewsletterBlock />
    </PageShell>
  );
}
