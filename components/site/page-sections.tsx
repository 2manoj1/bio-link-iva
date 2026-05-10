import {
  ArrowRight,
  AtSign,
  BadgeCheck,
  Camera,
  Mail,
  MapPin,
  Music,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  trustedBrands,
  visualStories,
} from "@/lib/brand-data";
import {
  Container,
  CTAButton,
  EditorialHeader,
  ImageCard,
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
          alt={`${creator.name} - Luxury Lifestyle Creator in Bengaluru`}
          className="object-cover object-[58%_36%] brightness-[0.84] contrast-[1.08] saturate-[0.92] md:object-[62%_34%]"
          fill
          priority
          sizes="100vw"
          src={creator.heroImage}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(201,169,106,0.10),transparent_35%),linear-gradient(180deg,rgba(17,16,14,0.02),rgba(17,16,14,0.45))] md:bg-[radial-gradient(circle_at_74%_18%,rgba(201,169,106,0.10),transparent_35%),linear-gradient(90deg,rgba(17,16,14,0.55),rgba(53,39,29,0.28),rgba(17,16,14,0.05))]" />
        <Container className="relative grid min-h-[calc(100svh-4rem)] gap-10 pb-12 pt-24 md:pb-16 md:pt-28 lg:grid-cols-[1.02fr_0.68fr] lg:items-end">
          <div className="max-w-4xl">
            <EditorialHeader
              eyebrow="Iva Chatterjee · Bengaluru"
              title="Soft luxury, through Iva’s eyes."
              description="Beautiful cafés, rooftop nights, boutique stays, fashion moments, and city plans shared with taste, warmth, and trust."
            />
            <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-12 rounded-full bg-white px-8 text-sm font-semibold text-black shadow-luxury-md transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--gold)] hover:text-[var(--matte)]"
              >
                <Link href="/collaborations">Collaborate with Iva</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto min-h-12 rounded-full border-white/25 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-md transition duration-500 ease-luxury hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white"
              >
                <Link href="/media-kit">Explore Media Kit</Link>
              </Button>
            </Reveal>
            <Reveal
              delay={0.16}
              className="mt-9 flex flex-wrap gap-2 border-y border-white/15 py-5 text-xs uppercase tracking-[0.2em] text-stone-300"
            >
              {["Rooftops", "Saree editorials", "Cafés", "Boutique stays"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-2"
                  >
                    {item}
                  </span>
                ),
              )}
            </Reveal>
            <Reveal
              delay={0.2}
              className="mt-8 max-w-md font-serif text-2xl italic leading-snug text-[var(--beige)]"
            >
              “I share what feels beautiful, useful, and real.”
            </Reveal>
          </div>

          <Reveal delay={0.14} className="relative justify-self-center lg:justify-self-end">
            <div className="cinematic-vignette relative aspect-[4/5] w-full max-w-[430px] overflow-hidden rounded-md border border-white/15 bg-stone-950 shadow-luxury-lg ring-1 ring-[var(--gold)]/20">
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
                  Fashion, cafés, stays, and city nights she truly loves.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-[var(--border-soft)] bg-[var(--surface-glass)] py-8 backdrop-blur-md">
        <Container>
          <StatGrid stats={stats} />
        </Container>
      </section>

      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Featured Collaborations"
              title="Stories people save. Brands remember."
              description="A few high-performing moments that show how Iva turns a real experience into desire."
            />
            <CTAButton href="/premium-experiences" variant="outline">
              Explore Experiences
            </CTAButton>
          </div>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {topContent.map((item) => (
              <StaggerItem key={item.title}>
                <ImageCard
                  href={item.href}
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

      <BrandTrustCarousel />

      <VisualStoriesSection />
      <MarketSection />
      <InquiryFunnel />
    </PageShell>
  );
}

export function BrandTrustCarousel() {
  return (
    <section className="bg-[var(--surface-muted)]/70 py-[var(--spacing-editorial-section)] text-[var(--text-strong)]">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between select-none">
          <div>
            <SectionHeader
              eyebrow="Trusted By"
              title="Brands that choose Iva for authentic reach."
              description="A carefully selected lineup of partner campaigns and 130+ partnerships showing how genuine storytelling and premium taste build trust with her audience."
            />
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] p-4 shadow-luxury-sm">
          <Carousel
            className="relative"
            opts={{ align: "start", containScroll: "trimSnaps", dragFree: true }}
          >
            <CarouselContent className="-ml-4">
              {trustedBrands.map((brand) => (
                <CarouselItem
                  key={brand.name}
                  className="basis-[92%] pl-4 sm:basis-[55%] lg:basis-[32%]"
                >
                  <div className="mx-auto min-h-full max-w-[96vw] overflow-hidden rounded-[1.75rem] border border-white/10 bg-stone-950/95 p-6 shadow-lg shadow-black/10 select-none sm:max-w-none">
                    <div className="flex items-start gap-4">
                      <div className="grid h-16 w-16 place-items-center rounded-3xl bg-[var(--gold)]/15 text-[var(--gold)] font-semibold uppercase tracking-[0.22em] shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
                        {brand.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-[var(--gold)]">
                          {brand.name}
                        </p>
                        <p className="mt-2 max-w-[11rem] text-sm leading-6 text-[var(--text-body)]">
                          {brand.focus}
                        </p>
                      </div>
                    </div>
                    <p className="mt-6 text-sm leading-6 text-[var(--text-body)]">
                      {brand.metric}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 top-1/2 hidden md:inline-flex" />
            <CarouselNext className="right-3 top-1/2 hidden md:inline-flex" />
          </Carousel>
        </div>
      </Container>
    </section>
  );
}

export function VisualStoriesSection() {
  const featureStory = visualStories[1];
  const worldSignals = [
    { label: "Instagram-first", value: "Saveable", icon: Camera },
    { label: "Personal taste", value: "Iva’s lens", icon: Sparkles },
    { label: "Creator reach", value: "50K+ IG", icon: TrendingUp },
  ];

  return (
    <section className="overflow-hidden border-y border-[var(--border-soft)] bg-[var(--page)] py-[var(--spacing-editorial-section)] text-[var(--text-strong)]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-14">
          <div>
            <SectionHeader
              eyebrow="Iva’s World"
              title="A moodboard of places, outfits, and nights out."
              description="A visual archive of the moods her audience remembers: arrival light, dressed-up details, table stories, and city nights."
            />
          </div>
          <Reveal className="grid gap-3 sm:grid-cols-3">
            {worldSignals.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="border-t border-[var(--border-soft)] pt-4 text-sm text-[var(--text-body)]"
              >
                <Icon className="mb-4 size-4 text-[var(--gold)]" />
                <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {label}
                </p>
                <p className="mt-2 font-serif text-3xl leading-none text-[var(--text-strong)]">
                  {value}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>

      <Container className="mt-12 grid gap-5 lg:grid-cols-[0.74fr_1.26fr] lg:items-stretch">
        <Reveal className="cinematic-vignette relative min-h-[500px] overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)] shadow-luxury-lg">
          <Image
            alt={featureStory.title}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            src={featureStory.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
            <Badge className="h-7 rounded-full bg-[var(--gold)] px-3 text-[11px] uppercase tracking-[0.16em] text-[var(--matte)]">
              Current Mood
            </Badge>
            <h3 className="mt-5 max-w-md font-serif text-5xl font-medium leading-[0.95] text-stone-50">
              {featureStory.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-stone-200">
              {featureStory.mood}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0">
          <Carousel
            className="px-1"
            opts={{ align: "start", containScroll: "trimSnaps", dragFree: true }}
          >
            <CarouselContent className="-ml-3">
              {visualStories.map((story, index) => (
                <CarouselItem
                  key={story.title}
                  className="basis-[84%] pl-3 sm:basis-[48%] xl:basis-[35%]"
                >
                  <article className="group cinematic-vignette relative min-h-[500px] overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)] shadow-luxury-lg transition duration-700 ease-luxury hover:-translate-y-1 hover:border-[var(--gold)]/45">
                    <Image
                      alt={story.title}
                      className="object-cover transition duration-[1000ms] ease-luxury group-hover:scale-[1.035]"
                      fill
                      priority={index < 2}
                      sizes="(max-width: 640px) 84vw, (max-width: 1280px) 48vw, 28vw"
                      src={story.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/12 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-100 backdrop-blur-md">
                      {story.format}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                        {story.category}
                      </p>
                      <h3 className="mt-3 font-serif text-3xl font-medium leading-tight text-stone-50">
                        {story.title}
                      </h3>
                      <p className="mt-3 max-w-xs text-sm leading-6 text-stone-300">
                        {story.mood}
                      </p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 top-[calc(100%+2.25rem)] hidden border-white/15 bg-white/10 text-white hover:bg-white hover:text-stone-950 md:inline-flex" />
            <CarouselNext className="left-16 right-auto top-[calc(100%+2.25rem)] hidden border-white/15 bg-white/10 text-white hover:bg-white hover:text-stone-950 md:inline-flex" />
          </Carousel>
        </Reveal>
      </Container>
    </section>
  );
}

export function MarketSection() {
  return (
    <section className="bg-[var(--surface)] py-[var(--spacing-editorial-section)]">
      <Container>
        <SectionHeader
          eyebrow="Where The Mood Travels"
          title="Bengaluru first, with selective escapes."
          description="A simple map of the cities and stays that naturally fit Iva’s visual world."
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
    <section className="py-[var(--spacing-editorial-section)]">
      <Container>
        <SectionHeader
          eyebrow="What Iva Shares"
          title="The rituals her audience comes back for."
          description="Cafés, stays, fashion, dining, and city culture shared as real moments, not generic recommendations."
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
    <section className="bg-[var(--surface-muted)]/70 py-[var(--spacing-editorial-section)] text-[var(--text-strong)]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-14">
          <div>
            <SectionHeader
              eyebrow="Iva’s Notes"
              title="Simple notes from beautiful days."
              description="Short stories for cafés, stays, fashion, food, and the small rituals that make a day feel special."
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
              className="group block overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)] shadow-luxury-md"
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
      <section className="relative overflow-hidden py-[var(--spacing-editorial-section)]">
        <Image
          alt="Iva Chatterjee - Bengaluru based Bengali lifestyle creator in a saree"
          className="object-cover object-[42%_18%] opacity-45 scale-105 saturate-[0.9] md:opacity-60"
          fill
          priority
          sizes="100vw"
          src={ivaImages.editorialSaree}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(201,169,106,0.2),transparent_28%),linear-gradient(180deg,rgba(17,16,14,0.58),rgba(17,16,14,0.92)),linear-gradient(90deg,rgba(17,16,14,0.88),rgba(17,16,14,0.66),rgba(17,16,14,0.32))] md:bg-[radial-gradient(circle_at_16%_8%,rgba(201,169,106,0.2),transparent_28%),linear-gradient(180deg,rgba(17,16,14,0.32),rgba(17,16,14,0.9)),linear-gradient(90deg,rgba(17,16,14,0.94)_0%,rgba(17,16,14,0.76)_42%,rgba(17,16,14,0.18)_100%)]" />
        <Container className="relative grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-end lg:gap-16">
          <Reveal className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--gold)]">
              About Iva
            </p>
            <h1 className="mt-5 max-w-5xl text-balance font-serif text-6xl font-medium leading-[0.88] text-[var(--text-strong)] sm:text-7xl md:text-8xl xl:text-[7.5rem]">
              Iva Chatterjee, in her own light.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-[var(--text-body)] md:text-lg md:leading-9">
              A Bengaluru-based Bengali creator with a soft eye for style,
              music, beautiful spaces, and small moments that feel cinematic
              without trying too hard.
            </p>
            <p className="mt-8 max-w-xl border-l border-[var(--gold)]/55 pl-5 font-serif text-3xl italic leading-tight text-[var(--champagne)] md:text-4xl">
              “Soft, expressive, and a little old-world at heart.”
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/70 bg-[var(--gold)] px-6 text-sm font-semibold text-[var(--matte)] shadow-gold-glow transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--text-strong)] hover:text-[var(--page)]"
                href={creator.instagramUrl}
                rel="noreferrer"
                target="_blank"
              >
                <AtSign className="size-4" />
                Follow Instagram
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/45 bg-[var(--gold)]/10 px-6 text-sm font-semibold text-[var(--text-strong)] transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--gold)] hover:text-[var(--matte)]"
                href={creator.youtubeUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Play className="size-4" />
                Watch YouTube
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:justify-self-end">
            <div className="relative mx-auto max-w-[520px]">
              <div className="absolute -left-5 top-10 hidden h-28 w-28 border-l border-t border-[var(--gold)]/45 md:block" />
              <div className="absolute -bottom-5 -right-5 hidden h-28 w-28 border-b border-r border-[var(--gold)]/45 md:block" />
              <div className="cinematic-vignette relative aspect-[3/4] overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)] shadow-luxury-lg">
                <Image
                  alt={creator.name}
                  className="object-cover object-top"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  src={ivaImages.heritageSaree}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
                    Bengaluru · Bengal
                  </p>
                  <p className="mt-2 font-serif text-3xl leading-none text-stone-50">
                    Soft luxury, music, and city mood.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>

        <Container className="relative mt-12">
          <Reveal className="grid gap-0 overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface-glass)] shadow-luxury-md backdrop-blur-md md:grid-cols-3">
            {[
              { icon: MapPin, label: "Home town", value: "Bengaluru" },
              { icon: Sparkles, label: "Roots", value: "Bengal · Bengali" },
              { icon: Music, label: "Interest", value: "Singing" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="border-b border-[var(--border-soft)] p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <Icon className="mb-5 size-4 text-[var(--gold)]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  {label}
                </p>
                <p className="mt-2 font-serif text-3xl leading-tight text-[var(--text-strong)]">
                  {value}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="py-[var(--spacing-editorial-section)]">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
          <SectionHeader
            eyebrow="Who She Is"
            title="Elegant, expressive, and quietly magnetic."
            description="Iva’s world is built on personal taste: dressed-up evenings, soft glam, warm details, music, food, and the feeling of finding a place that matches your mood."
          />
          <div className="grid gap-6">
            {[
              [
                "01",
                "A city mood, not a checklist.",
                "Bengaluru shapes her rhythm: dressed-up rooftops, quiet tables, café corners, and evenings that feel easy but considered.",
              ],
              [
                "02",
                "Bengali softness.",
                "Her roots bring emotion, warmth, and a little old-world romance to the way she sees fashion, food, beauty, and home.",
              ],
              [
                "03",
                "Music in the background.",
                "Singing is part of her inner world: expressive, feminine, and intimate. It gives her presence a gentler note.",
              ],
            ].map(([number, title, description]) => (
              <Reveal
                key={number}
                className="grid gap-4 border-t border-[var(--border-soft)] pt-6 md:grid-cols-[88px_1fr]"
              >
                <span className="font-serif text-5xl leading-none text-[var(--gold)]/80">
                  {number}
                </span>
                <div>
                  <h3 className="font-serif text-4xl leading-tight text-[var(--text-strong)]">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-body)]">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="lg:col-start-2">
            <div className="flex flex-col gap-3 border-t border-[var(--border-soft)] pt-8 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/45 bg-[var(--gold)]/10 px-6 text-sm font-semibold text-[var(--text-strong)] transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--gold)] hover:text-[var(--matte)]"
                href={`mailto:${creator.email}`}
              >
                <Mail className="size-4" />
                {creator.email}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}

export function CollaborationExperience() {
  return (
    <PageShell>
      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <EditorialHeader
            eyebrow="Collaborations"
            title="For brands that belong in her world."
            description="Iva works best with places and products that care about beauty, service, design, and the feeling people carry after the moment."
          />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-4">
            {collaborationTypes.map((type) => (
              <StaggerItem
              key={type}
                className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm"
              >
                <ShieldCheck className="mb-5 size-5 text-[var(--gold)]" />
                <p className="font-medium text-[var(--text-strong)]">{type}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      <BrandTrustCarousel />
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
      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <SectionHeader
            eyebrow="How Iva Shares It"
            title="The feeling comes before the post."
            description="Iva looks for arrival, atmosphere, service, table details, wardrobe, and one honest reason a moment feels worth saving."
          />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "Beautiful venue mood",
              "Couple and lifestyle context",
              "Natural brand recall",
              "Audience trust",
              "Easy to save",
              "Clear next step",
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
    </PageShell>
  );
}

export function MediaKitExperience() {
  return (
    <PageShell>
      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-14">
            <EditorialHeader
              eyebrow="Media Kit"
              title="A personal brand with real influence."
              description="A clear look at Iva’s audience, strongest content, city presence, and best-fit brand categories."
            />
            <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm">
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

      <section className="bg-[var(--surface-muted)]/55 py-[var(--spacing-editorial-breath)]">
        <Container className="grid gap-6 lg:grid-cols-3">
          <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-luxury-sm lg:col-span-2">
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
          <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-luxury-sm">
            <h2 className="text-2xl font-semibold text-[var(--text-strong)]">
              City Distribution
            </h2>
            <div className="mt-6 space-y-5">
              {demographics.geography.map((item) => (
                <ProgressRow key={item.label} {...item} />
              ))}
            </div>
          </Reveal>
          <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-luxury-sm lg:col-span-3">
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

      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <SectionHeader
            eyebrow="Loved Content"
            title="High-performing moments that still feel personal."
            description="Reach matters most when the work feels credible, warm, and natural to Iva’s audience."
          />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {topContent.map((item) => (
              <StaggerItem key={item.title}>
                <ImageCard
                  image={item.image}
                  href={item.href}
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
            Soft luxury, city nights, cafés, stays, and fashion moments from Bengaluru.
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
      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <EditorialHeader
            eyebrow="Iva’s Notes"
            title="Stories from Iva’s world."
            description="City notes, café picks, stay stories, and small moments written in a personal voice."
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
    </PageShell>
  );
}

export function PremiumExperiences() {
  return (
    <PageShell>
      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <EditorialHeader
            eyebrow="Iva’s Picks"
            title="Beautiful places worth saving."
            description="Cafés, rooftops, boutique stays, couple plans, and slower travel stories Iva would actually share."
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
      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
            <EditorialHeader
              eyebrow="Contact"
              title="Put your brand inside a beautiful moment."
              description="For paid collaborations with cafés, stays, fashion, beauty, restaurants, wellness, and lifestyle brands that fit Iva’s world."
            />
            <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-luxury-sm">
              <div className="flex items-center gap-3">
                <BadgeCheck className="size-5 text-[var(--gold)]" />
                <p className="font-semibold text-[var(--text-strong)]">
                  Paid brand collaborations only.
                </p>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--text-body)]">
                Best-fit partners include cafés, boutique hotels, restaurants,
                fashion labels, beauty brands, wellness spaces, and lifestyle
                products she can share with natural warmth.
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
      <article className="py-[var(--spacing-editorial-section)]">
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
    </PageShell>
  );
}
