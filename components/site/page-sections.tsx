import { CreatorFaq } from "./creator-faq";
import { getPageCopy } from "@/lib/page-copy";
import { getSiteContent, getFullMediaKit } from '@/lib/site-content';
import {
  ArrowRight,
  AtSign,
  BadgeCheck,
  BookOpen,
  Camera,
  Mail,
  MapPin,
  Music,
  Play,
  ShieldCheck,
  ShoppingBag,
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
  getCreatorProfile,
  getLiveStats,
  getPremiumExperiences,
  getMediaKitData,
  getInstagramStats,
  getTrustedBrands,
  getVisualStories,
  getMarkets,
} from "@/lib/brand-data-fetch";
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
import { getPublishedBlogPosts } from "@/lib/cms-blog";
import { SocialVideos } from "./social-videos";
export async function HomeExperience() {
  const copy = await getPageCopy("HomeExperience");

  const { creator, ivaImages } = await getSiteContent();

  const liveStats = await getLiveStats();
  const liveTopContent = await getPremiumExperiences();

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-stone-950 text-stone-50 [--border-soft:rgba(255,255,255,0.14)] [--surface:rgba(255,255,255,0.08)] [--text-body:#eadfce] [--text-muted:#c9b89f] [--text-strong:#fff7ed]">
        <Image
          alt={`${creator.name} - ${creator.title} in Bengaluru`}
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
              eyebrow={copy("t_09f72a7c22")}
              title={copy("t_8ff2b726a2")}
              description={copy("t_b549d23e5f")}
            />
            <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-12 rounded-full bg-white px-8 text-sm font-semibold text-black shadow-luxury-md transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--gold)] hover:text-[var(--matte)]"
              >
                <Link href="/collaborations">{copy("t_344c4ef4ee")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto min-h-12 rounded-full border-white/25 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-md transition duration-500 ease-luxury hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white"
              >
                <Link href="/media-kit">{copy("t_c3f730be52")}</Link>
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
            >{copy("t_d600a8e584")}</Reveal>
          </div>

          <Reveal delay={0.14} className="relative justify-self-center lg:justify-self-end">
            <div className="cinematic-vignette relative aspect-[4/5] w-full max-w-[430px] overflow-hidden rounded-md border border-white/15 bg-stone-950 shadow-luxury-lg ring-1 ring-[var(--gold)]/20">
              <Image
                alt={copy("t_e8c9eeaaa4")}
                className="object-cover object-top"
                fill
                priority
                sizes="(min-width: 1024px) 430px, 92vw"
                src={ivaImages.editorialSaree}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/20 to-transparent p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">{copy("t_6f05922b6e")}</p>
                <p className="mt-2 font-serif text-3xl text-stone-50">{copy("t_a9efd49f2b")}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-[var(--border-soft)] bg-[var(--surface-glass)] py-8 backdrop-blur-md">
        <Container>
          <StatGrid stats={liveStats} />
        </Container>
      </section>

      <OwnedChannelsSection />

      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader
              eyebrow={copy("t_e0233de721")}
              title={copy("t_7465c3cc81")}
              description={copy("t_b74af3c3ea")}
            />
            <CTAButton href="/premium-experiences" variant="outline">{copy("t_b816fbfa9d")}</CTAButton>
          </div>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {liveTopContent.map((item) => (
              <StaggerItem key={item.title}>
                <ImageCard
                  href={item.href || "#"}
                  image={item.image || ivaImages.heritageSaree}
                  meta={`${item.views || "100K+"} views · ${item.category || "Moment"}`}
                  subtitle={`${item.city || "Bengaluru"} moment`}
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
    <SocialVideos />
      <BlogPreviewSection />
    </PageShell>
  );
}

async function OwnedChannelsSection() {
  const { ivaImages } = await getSiteContent();
  const copy = await getPageCopy("OwnedChannelsSection");

  const channels = [
    {
      title: copy("t_e25d22e0af"),
      text: copy("t_030ab39ad7"),
      href: "/blog",
      image: ivaImages.hiltonChef,
      cta: copy("t_8b561eb6b1"),
      icon: BookOpen,
      imageClassName: "object-cover object-[50%_50%]",
    },
    {
      title: copy("t_743c99ed5f"),
      text: copy("t_a114849966"),
      href: "/shop",
      image: ivaImages.fineDining,
      cta: copy("t_3995565d8b"),
      icon: ShoppingBag,
      imageClassName: "object-cover object-[50%_42%]",
    },
  ];

  return (
    <section className="border-b border-[var(--border-soft)] bg-[var(--surface-muted)]/45 py-[var(--spacing-editorial-breath)]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <SectionHeader
            eyebrow={copy("t_5f6f062ece")}
            title={copy("t_2496942ac9")}
            description={copy("t_f96a7fac03")}
          />
          <Stagger className="grid gap-5 md:grid-cols-2">
            {channels.map(({ title, text, href, image, cta, icon: Icon, imageClassName }) => (
              <StaggerItem key={title}>
                <Link
                  className="group grid min-h-[360px] overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)] shadow-luxury-md transition duration-500 ease-luxury hover:-translate-y-0.5 hover:border-[var(--gold)]/55 hover:shadow-luxury-lg"
                  href={href}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      alt={title}
                      className={`${imageClassName} transition duration-700 ease-luxury group-hover:scale-[1.025]`}
                      fill
                      sizes="(min-width: 1024px) 32vw, 100vw"
                      src={image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <Icon className="mb-4 size-5 text-[var(--gold)]" />
                      <h3 className="font-serif text-4xl leading-none text-stone-50">
                        {title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-5 p-5">
                    <p className="text-sm leading-7 text-[var(--text-body)]">
                      {text}
                    </p>
                    <span className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--champagne)]">
                      {cta}
                      <ArrowRight className="size-4 transition-transform duration-300 ease-luxury group-hover:translate-x-1" />
                    </span>
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

export async function BrandTrustCarousel() {
  const copy = await getPageCopy("BrandTrustCarousel");



  const trustedBrands = await getTrustedBrands();
  return (
    <section className="bg-[var(--surface-muted)]/70 py-[var(--spacing-editorial-section)] text-[var(--text-strong)]">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between select-none">
          <div>
            <SectionHeader
              eyebrow={copy("t_5f8e03e379")}
              title={copy("t_fe8b1a5217")}
              description={copy("t_9e5d4c9a8b")}
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
                          .map((word: string) => word[0])
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

export async function VisualStoriesSection() {
  const copy = await getPageCopy("VisualStoriesSection");



  const instagramProfile = await getCreatorProfile();
  const visualStories = await getVisualStories();
  const featureStory = visualStories[1] || visualStories[0];
  const worldSignals = [
    { label: copy("t_140ff85fa3"), value: copy("t_3d88c5a1b3"), icon: Camera },
    { label: copy("t_77874a8787"), value: copy("t_6a1247402d"), icon: Sparkles },
    {
      label: copy("t_0671664bed"),
      value: `${instagramProfile.followers} IG`,
      icon: TrendingUp,
    },
  ];

  return (
    <section className="overflow-hidden border-y border-[var(--border-soft)] bg-[var(--page)] py-[var(--spacing-editorial-section)] text-[var(--text-strong)]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-14">
          <div>
            <SectionHeader
              eyebrow={copy("t_dda21e039a")}
              title={copy("t_9d33b6506a")}
              description={copy("t_6477798d8a")}
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
            <Badge className="h-7 rounded-full bg-[var(--gold)] px-3 text-[11px] uppercase tracking-[0.16em] text-[var(--matte)]">{copy("t_898d1311dd")}</Badge>
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

export async function MarketSection() {
  const copy = await getPageCopy("MarketSection");



  const markets = await getMarkets();
  return (
    <section className="bg-[var(--surface)] py-[var(--spacing-editorial-section)]">
      <Container>
        <SectionHeader
          eyebrow={copy("t_0a43d11f79")}
          title={copy("t_abd95a9b32")}
          description={copy("t_53eb10e620")}
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

export async function PillarsSection() {
  const copy = await getPageCopy("PillarsSection");

  const { experiencePillars } = await getSiteContent();

  return (
    <section className="py-[var(--spacing-editorial-section)]">
      <Container>
        <SectionHeader
          eyebrow={copy("t_8df68e4b25")}
          title={copy("t_4e8024665e")}
          description={copy("t_06fc9672cd")}
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

export async function BlogPreviewSection() {
  const copy = await getPageCopy("BlogPreviewSection");



  const blogPosts = await getPublishedBlogPosts();
  if (!blogPosts.length) return null;
  const featured = blogPosts[0];
  const secondary = blogPosts.slice(1, 4);

  return (
    <section className="bg-[var(--surface-muted)]/70 py-[var(--spacing-editorial-section)] text-[var(--text-strong)]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-14">
          <div>
            <SectionHeader
              eyebrow={copy("t_5a085d4d2d")}
              title={copy("t_51f1bf8f85")}
              description={copy("t_7b6feb6772")}
            />
          </div>
          <Reveal className="flex justify-start lg:justify-end">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border-soft)] px-6 text-sm font-semibold text-[var(--text-strong)] transition hover:border-[var(--gold)] hover:bg-[var(--surface)]"
              href="/blog"
            >{copy("t_e469ed1b1a")}</Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Link
              className="group block overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)] shadow-luxury-md"
              href={`/blog/${featured.slug}`}
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
                  {featured.category}{copy("t_d3dacf895c")}{featured.readTime}
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
                  href={`/blog/${story.slug}`}
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
                      {story.category}{copy("t_d3dacf895c")}{story.readTime}
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

export async function AboutExperience() {
  const copy = await getPageCopy("AboutExperience");

  const { creator, ivaImages } = await getSiteContent();

  return (
    <PageShell>
      <section className="relative overflow-hidden py-[var(--spacing-editorial-section)]">
        <Image
          alt={copy("t_0c17cc6bf4")}
          className="object-cover object-[42%_18%] opacity-45 scale-105 saturate-[0.9] md:opacity-60"
          fill
          priority
          sizes="100vw"
          src={ivaImages.editorialSaree}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(201,169,106,0.2),transparent_28%),linear-gradient(180deg,rgba(17,16,14,0.58),rgba(17,16,14,0.92)),linear-gradient(90deg,rgba(17,16,14,0.88),rgba(17,16,14,0.66),rgba(17,16,14,0.32))] md:bg-[radial-gradient(circle_at_16%_8%,rgba(201,169,106,0.2),transparent_28%),linear-gradient(180deg,rgba(17,16,14,0.32),rgba(17,16,14,0.9)),linear-gradient(90deg,rgba(17,16,14,0.94)_0%,rgba(17,16,14,0.76)_42%,rgba(17,16,14,0.18)_100%)]" />
        <Container className="relative grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-end lg:gap-16">
          <Reveal className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--gold)]">{copy("t_44e9f5e025")}</p>
            <h1 className="mt-5 max-w-5xl text-balance font-serif text-6xl font-medium leading-[0.88] text-[var(--text-strong)] sm:text-7xl md:text-8xl xl:text-[7.5rem]">{copy("t_d3fcbade1c")}</h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-[var(--text-body)] md:text-lg md:leading-9">{creator.description}</p>
            <p className="mt-8 max-w-xl border-l border-[var(--gold)]/55 pl-5 font-serif text-3xl italic leading-tight text-[var(--champagne)] md:text-4xl">{copy("t_7d1f71c26a")}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/70 bg-[var(--gold)] px-6 text-sm font-semibold text-[var(--matte)] shadow-gold-glow transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--text-strong)] hover:text-[var(--page)]"
                href={creator.instagramUrl}
                rel="noreferrer"
                target="_blank"
              >
                <AtSign className="size-4" />{copy("t_23092a48ba")}</a>
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/45 bg-[var(--gold)]/10 px-6 text-sm font-semibold text-[var(--text-strong)] transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--gold)] hover:text-[var(--matte)]"
                href={creator.youtubeUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Play className="size-4" />{copy("t_5344fc46d2")}</a>
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
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">{copy("t_cf1b964ef1")}</p>
                  <p className="mt-2 font-serif text-3xl leading-none text-stone-50">{copy("t_e8c7e34210")}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>

        <Container className="relative mt-12">
          <Reveal className="grid gap-0 overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface-glass)] shadow-luxury-md backdrop-blur-md md:grid-cols-3">
            {[
              { icon: MapPin, label: copy("t_92f3c59ede"), value: creator.location },
              { icon: Sparkles, label: copy("t_4d78ec7d11"), value: copy("t_d68d5a3205") },
              { icon: Music, label: copy("t_3a12015d49"), value: copy("t_0c97242665") },
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
            eyebrow={copy("t_0c9135a44c")}
            title={copy("t_11d5547b8f")}
            description={copy("t_055ea0b3b0")}
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
      <CreatorFaq />
    </PageShell>
  );
}

export async function CollaborationExperience() {
  const copy = await getPageCopy("CollaborationExperience");

  const { collaborationTypes } = await getSiteContent();

  return (
    <PageShell>
      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <EditorialHeader
            eyebrow={copy("t_afd29f87f9")}
            title={copy("t_0da4cd4a25")}
            description={copy("t_1f7a274201")}
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

export async function CityExperience({
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
  const copy = await getPageCopy("CityExperience");



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
            eyebrow={copy("t_f33cce830e")}
            title={copy("t_189cffb51e")}
            description={copy("t_f5a02c0017")}
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
              <CTAButton href="/bengaluru-guide/indiranagar" variant="outline">{copy("t_a30c758fc2")}</CTAButton>
            </div>
          ) : null}
        </Container>
      </section>
      <BlogPreviewSection />
    </PageShell>
  );
}

export async function MediaKitExperience() {
  const copy = await getPageCopy("MediaKitExperience");

  const { creator, ivaImages } = await getSiteContent();
  const mediaKit = await getFullMediaKit();

  const profile = await getCreatorProfile();
  const mediaKitData = await getMediaKitData();
  const instaStats = await getInstagramStats();
  const liveExperiences = await getPremiumExperiences();

  const ageShare = (labels: string[]) => {
    const rows = instaStats.demographicsAge.filter(item => labels.includes(item.label));
    return rows.length === labels.length
      ? `${Number(rows.reduce((sum, item) => sum + item.value, 0).toFixed(1))}%`
      : "—";
  };
  const youthShare = ageShare(["13-17", "18-24"]);
  const millennialShare = ageShare(["25-34"]);
  const mediaKitHighlights = [
    { label: copy("t_24be61285e"), value: instaStats.views, note: copy("t_cf1d6ff2b0"), icon: TrendingUp },
    { label: copy("t_0b3583ecaa"), value: mediaKitData.interactions, note: copy("t_e8f73c0294"), icon: Sparkles },
    { label: copy("t_834fdb728d"), value: mediaKitData.contentShared, note: copy("t_1284cbac37"), icon: Camera },
    {
      label: copy("t_a19b5baeec"),
      value: copy("t_dead336b84"),
      note: copy("t_6a5bb51183"),
      icon: MapPin,
    },
  ];
  const audienceHighlights = [
    {
      label: copy("t_56e8a809f0"),
      value: instaStats.followers,
      note: copy("t_946c80cb30"),
    },
    {
      label: copy("t_9aab9918a9"),
      value: instaStats.posts,
      note: copy("t_42ff6f7603"),
    },
    {
      label: copy("t_27f3fd585e"),
      value: youthShare,
      note: copy("t_f30c6ebe3b"),
    },
    {
      label: copy("t_784944e3e9"),
      value: copy("t_66394966b2"),
      note: copy("t_490ea818ae"),
    },
    {
      label: copy("t_8cd5cd4c74"),
      value: mediaKit.profileActivity[1].value,
      note: `${mediaKit.profileActivity[1].note} vs previous window`,
    },
    {
      label: copy("t_f9a98c8737"),
      value: mediaKit.profileActivity[0].value,
      note: `${mediaKit.profileActivity[0].note} vs previous window`,
    },
  ];
  const brandFit = mediaKit.brandFit;
  const collaborationMenu = mediaKit.collaborationMenu;

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-[var(--border-soft)] bg-stone-950 [--border-soft:rgba(255,255,255,0.14)] [--surface:rgba(255,255,255,0.08)] [--text-body:#eadfce] [--text-muted:#c9b89f] [--text-strong:#fff7ed]">
        <Image
          alt={copy("t_56368cbd02")}
          className="object-cover object-[50%_18%] opacity-54 saturate-[0.92] md:object-[56%_24%] md:opacity-72"
          fill
          priority
          sizes="100vw"
          src={ivaImages.heritageSaree}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(201,169,106,0.16),transparent_32%),linear-gradient(180deg,rgba(17,16,14,0.18),rgba(17,16,14,0.92)),linear-gradient(90deg,rgba(17,16,14,0.96),rgba(17,16,14,0.64),rgba(17,16,14,0.22))]" />
        <Container className="relative grid gap-7 pb-8 pt-20 sm:pt-24 md:min-h-[68vh] md:pb-10 md:pt-24 lg:grid-cols-[1fr_0.68fr] lg:items-end">
          <div>
            <Reveal className="max-w-4xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--gold)] sm:text-xs sm:tracking-[0.32em]">{copy("t_1665cce0dc")}</p>
              <h1 className="mt-4 max-w-3xl text-balance font-serif text-5xl font-medium leading-[0.9] text-[var(--text-strong)] min-[380px]:text-6xl sm:text-7xl md:text-[5.9rem] xl:text-[6.7rem]">{copy("t_05b99559ce")}</h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--text-body)] sm:text-base sm:leading-8">{copy("t_8643bf4693")}</p>
              <div className="mt-6 grid max-w-xl gap-2 sm:grid-cols-2">
                {mediaKit.brandPromise.map((item) => (
                  <div
                    className="border-l border-[var(--gold)]/55 bg-white/[0.04] px-3 py-2 text-xs leading-5 text-[var(--text-body)] backdrop-blur-md sm:text-sm sm:leading-6"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08} className="mt-6 grid gap-3 sm:flex">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/70 bg-[var(--gold)] px-5 text-sm font-semibold text-[var(--matte)] shadow-gold-glow transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--text-strong)] hover:text-[var(--page)] sm:px-6"
                href={`mailto:${creator.email}?subject=Media%20Kit%20%26%20Collaboration%20Inquiry`}
              >
                <Mail className="size-4" />{copy("t_b06f45868f")}</a>
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-md transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-white hover:text-stone-950 sm:px-6"
                href={creator.instagramUrl}
                rel="noreferrer"
                target="_blank"
              >
                <AtSign className="size-4" />{copy("t_23092a48ba")}</a>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="rounded-md border border-white/15 bg-black/38 p-4 shadow-luxury-lg backdrop-blur-xl sm:p-5">
              <div className="flex items-center gap-3">
                <BadgeCheck className="size-5 text-[var(--gold)]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--champagne)]">{copy("t_6b32985251")}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-body)]">
                {mediaKitData.dashboardWindow}{copy("t_d3dacf895c")}{mediaKit.source}
              </p>
              <div className="mt-5 grid gap-3">
                {mediaKitHighlights.map(({ label, value, note, icon: Icon }) => (
                  <div
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-white/12 pt-3"
                    key={label}
                  >
                    <Icon className="size-4 text-[var(--gold)]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] sm:text-[11px]">
                        {label}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[var(--text-body)] sm:text-sm sm:leading-6">
                        {note}
                      </p>
                    </div>
                    <p className="font-serif text-3xl leading-none text-[var(--text-strong)]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionHeader
              eyebrow={copy("t_25385dc976")}
              title={copy("t_c810bc1b5b")}
              description={copy("t_357621cd75")}
            />
            <div className="grid gap-4">
              <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">{copy("t_80fd33d856")}</p>
                <p className="mt-4 font-serif text-4xl leading-tight text-[var(--text-strong)] sm:text-5xl">{copy("t_49006aac3a")}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {audienceHighlights.map((stat) => (
                    <div
                      className="border-t border-[var(--border-soft)] pt-4"
                      key={stat.label}
                    >
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        {stat.label}
                      </p>
                      <p className="mt-2 font-serif text-4xl leading-none text-[var(--text-strong)]">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--gold)]">
                        {stat.note}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Stagger className="grid gap-3 md:grid-cols-3">
                {mediaKit.whyBrandsCare.map((item) => (
                  <StaggerItem
                    className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-4 shadow-luxury-sm transition-[transform,border-color,box-shadow] duration-500 ease-luxury hover:-translate-y-0.5 hover:border-[var(--gold)]/45 hover:shadow-luxury-md"
                    key={item.title}
                  >
                    <Sparkles className="mb-4 size-4 text-[var(--gold)]" />
                    <h2 className="font-serif text-3xl leading-tight text-[var(--text-strong)]">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-body)]">
                      {item.text}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-[var(--spacing-editorial-breath)]">
        <Container className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm sm:p-6">
            <div className="flex flex-col gap-2 border-b border-[var(--border-soft)] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">{copy("t_ee94d63272")}</p>
                <h2 className="mt-3 font-serif text-4xl leading-tight text-[var(--text-strong)] sm:text-5xl">{copy("t_e7b749642e")}</h2>
              </div>
              <p className="text-sm leading-6 text-[var(--text-muted)]">
                {mediaKitData.reportingWindow}
              </p>
            </div>
            <div className="mt-6 space-y-5">
              {instaStats.demographicsAge.map((item) => (
                <ProgressRow key={item.label} {...item} />
              ))}
            </div>
            <div className="mt-8 grid gap-3 border-t border-[var(--border-soft)] pt-5 sm:grid-cols-3">
              {[
                ["13-24", youthShare, "youth audience"],
                ["25-34", millennialShare, "young millennials"],
                ["India", "96.8%", "country reach"],
              ].map(([label, value, note]) => (
                <div key={label}>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {label}
                  </p>
                  <p className="mt-2 font-serif text-4xl leading-none text-[var(--text-strong)]">
                    {value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--gold)]">
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4">
            <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm sm:p-6">
              <h2 className="font-serif text-4xl leading-tight text-[var(--text-strong)]">{copy("t_ef4098326d")}</h2>
              <div className="mt-6 space-y-5">
                {instaStats.demographicsGender.map((item) => (
                  <ProgressRow key={item.label} {...item} />
                ))}
              </div>
            </Reveal>
            <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm sm:p-6">
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-[var(--gold)]" />
                <h2 className="font-serif text-4xl leading-tight text-[var(--text-strong)]">{copy("t_b80b5b6190")}</h2>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--text-body)]">{copy("t_a92972747f")}</p>
              <div className="mt-6 grid gap-2">
                {mediaKit.audience.topCities.map((item) => (
                  <div
                    className="flex items-center justify-between gap-4 border-t border-[var(--border-soft)] py-3"
                    key={item.label}
                  >
                    <p className="text-sm font-medium text-[var(--text-strong)]">
                      {item.label}
                    </p>
                    <p className="rounded-full border border-[var(--gold)]/35 bg-[var(--gold)]/10 px-3 py-1 text-xs font-semibold text-[var(--gold)]">
                      {item.value.toFixed(1)}{copy("t_4345cb1fa2")}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm sm:p-6">
              <h2 className="font-serif text-4xl leading-tight text-[var(--text-strong)]">{copy("t_113745ec99")}</h2>
              <div className="mt-6 space-y-5">
                {mediaKit.audience.topCountries.map((item) => (
                  <ProgressRow key={item.label} {...item} />
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border-soft)] bg-[var(--surface-muted)]/55 py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <SectionHeader
              eyebrow={copy("t_15bc2856b9")}
              title={copy("t_88b1f9379f")}
              description={copy("t_886760229f")}
            />
            <div className="grid gap-4">
              <Stagger className="grid gap-3">
                {mediaKit.partnershipAngles.map((item) => (
                  <StaggerItem
                    className="grid gap-4 rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm sm:grid-cols-[0.34fr_0.66fr] sm:items-start"
                    key={item.title}
                  >
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                        {item.label}
                      </p>
                      <h2 className="mt-3 font-serif text-3xl leading-tight text-[var(--text-strong)] sm:text-4xl">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-sm leading-7 text-[var(--text-body)]">
                      {item.text}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">{copy("t_35aafe517f")}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {brandFit.map((item) => (
                    <span
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-muted)]/50 px-4 py-2 text-sm leading-6 text-[var(--text-body)]"
                      key={item}
                    >
                      <ShieldCheck className="size-4 text-[var(--gold)]" />
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">{copy("t_613dca9deb")}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {profile.collaborationHighlights.map((item) => (
                    <span
                      className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-muted)]/50 px-4 py-2 text-sm leading-6 text-[var(--text-body)]"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Stagger className="grid gap-3 md:grid-cols-3">
                {collaborationMenu.map((item) => (
                  <StaggerItem
                    className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm"
                    key={item.title}
                  >
                    <h3 className="font-serif text-3xl leading-tight text-[var(--text-strong)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-body)]">
                      {item.text}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow={copy("t_0fbac7e502")}
            title={copy("t_c35d4e50e3")}
            description={copy("t_5c2581335e")}
          />
          <Stagger className="mt-8 grid gap-4 md:grid-cols-3">
            {liveExperiences.map((item) => (
              <StaggerItem key={item.title}>
                <a
                  href={item.href || "#"}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group block relative min-h-[430px] overflow-hidden rounded-md border border-[var(--border-soft)] bg-stone-950 shadow-luxury-lg sm:min-h-[470px] transition duration-500 ease-luxury hover:-translate-y-1 hover:border-[var(--gold)]/50"
                >
                  <Image
                    alt={item.title}
                    className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.025]"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={item.image || ivaImages.heritageSaree}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                    {item.views || "100K+"}{copy("t_81f3318714")}</div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                      {item.category || "Featured Moment"}
                    </p>
                    <h3 className="mt-3 font-serif text-4xl leading-tight text-white">
                      {item.title}
                    </h3>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/70 bg-[var(--gold)] px-6 text-sm font-semibold text-[var(--matte)] shadow-gold-glow transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--text-strong)] hover:text-[var(--page)]"
              href={`mailto:${creator.email}?subject=Media%20Kit%20%26%20Collaboration%20Inquiry`}
            >
              <Mail className="size-4" />{copy("t_56839cc7e7")}</a>
            <CTAButton href="/contact" variant="outline">{copy("t_c0b8400213")}</CTAButton>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}

export async function LinksExperience() {
  const copy = await getPageCopy("LinksExperience");

  const { creator } = await getSiteContent();

  const profile = await getCreatorProfile();
  return (
    <PageShell>
      <section className="mx-auto flex min-h-[88vh] max-w-md flex-col px-5 py-12 text-center">
        <Reveal>
          <div className="relative mx-auto size-32 overflow-hidden rounded-full border border-[var(--gold)]/60">
            <Image
              alt={profile.displayName}
              className="object-cover"
              fill
              priority
              sizes="128px"
              src={creator.profileImage}
            />
          </div>
          <h1 className="mt-6 font-serif text-4xl text-[var(--text-strong)]">
            {profile.displayName}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{copy("t_9a78211436")}{profile.username}</p>
          <p className="mx-auto mt-5 max-w-xs text-sm leading-7 text-[var(--text-body)]">
            {profile.profileLine}
          </p>
          <p className="mt-3 text-sm text-[var(--text-muted)]">{profile.category}{copy("t_d3dacf895c")}{profile.location}{copy("t_d3dacf895c")}{profile.identity}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{copy("t_9e97b5ba8a")}{profile.birthday}</p>
          <p className="mt-3 text-sm text-[var(--text-body)]">{profile.followers}{copy("t_1adcafca7e")}{profile.following}{copy("t_ceb51335b5")}{profile.posts}{copy("t_7ddf0bf3ac")}</p>
          <p className="mt-3 text-sm text-[var(--text-body)]">{profile.collaborationCta}</p>
        </Reveal>
        <div className="mt-8 grid gap-3">
          {[
            ["Instagram", profile.instagramUrl],
            ["Threads", `https://www.threads.net/@${profile.threadsHandle.replace(/^@/, "")}`],
            ...profile.links.map(link => [link.label, link.href]),
            ["YouTube: Maniva", creator.youtubeUrl],
            ["Shop Iva's Products", "/shop"],
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
        {profile.collaborationHighlights.length > 0 && <div className="mt-8">
          <h2 className="font-serif text-2xl">{copy("t_84158b0456")}</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {profile.collaborationHighlights.map(highlight => <span key={highlight} className="rounded-full border border-[var(--border-soft)] px-3 py-2 text-sm">{highlight}</span>)}
          </div>
        </div>}
        {profile.featuredReels.length > 0 && <div className="mt-8 text-left">
          <h2 className="font-serif text-2xl">{copy("t_37a2ef239f")}</h2>
          {profile.featuredReels.map(reel => <article key={reel._key} className="mt-4 rounded-md border border-[var(--border-soft)] p-4">
            <h3 className="font-semibold">{reel.href ? <a href={reel.href}>{reel.title}</a> : reel.title}</h3>
            {reel.description && <p className="mt-2 text-sm text-[var(--text-muted)]">{reel.description}</p>}
          </article>)}
        </div>}
      </section>
      <SocialVideos />
    </PageShell>
  );
}

export async function EditorialExperience() {
  const copy = await getPageCopy("EditorialExperience");



  const blogPosts = await getPublishedBlogPosts();
  return (
    <PageShell>
      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <EditorialHeader
            eyebrow={copy("t_5a085d4d2d")}
            title={copy("t_792388ff63")}
            description={copy("t_bec73e4ee4")}
          />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {blogPosts.map((story) => (
              <StaggerItem key={story.slug}>
                <ImageCard
                  href={`/blog/${story.slug}`}
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

export async function PremiumExperiences() {
  const copy = await getPageCopy("PremiumExperiences");



  const markets = await getMarkets();
  return (
    <PageShell>
      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <EditorialHeader
            eyebrow={copy("t_2bfc3d55dd")}
            title={copy("t_25da6d7f9a")}
            description={copy("t_4ec648295d")}
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

export async function ContactExperience() {
  const copy = await getPageCopy("ContactExperience");

  const { creator, ivaImages } = await getSiteContent();

  const contactSignals = [
    { label: copy("t_0de20918c6"), value: copy("t_a19b5baeec"), note: copy("t_eeca18df8b") },
    { label: copy("t_6d7ae87f78"), value: copy("t_cfd2e47bd1"), note: copy("t_246b83edd1") },
    { label: copy("t_086f6a10b6"), value: copy("t_84add5b295"), note: copy("t_1344f4e23e") },
  ];
  const partnershipFit = [
    "A stay that feels warm, pretty, and worth saving",
    "A cafe, rooftop, or table I would actually tell a friend about",
    "Beauty, fashion, or lifestyle products that fit my everyday mood",
    "A launch or experience with a real story behind it",
  ];
  const process = [
    {
      step: "01",
      title: copy("t_0f23a6177f"),
      text: copy("t_0827af39df"),
    },
    {
      step: "02",
      title: copy("t_f7b1b7d52a"),
      text: copy("t_a766db6d4c"),
    },
    {
      step: "03",
      title: copy("t_73c483ef5b"),
      text: copy("t_1856c10173"),
    },
  ];

  return (
    <PageShell>
      <section className="relative overflow-visible border-b border-[var(--border-soft)] bg-stone-950 [--border-soft:rgba(255,255,255,0.14)] [--surface:rgba(255,255,255,0.08)] [--text-body:#eadfce] [--text-muted:#c9b89f] [--text-strong:#fff7ed] md:overflow-hidden">
        <Image
          alt={copy("t_558073d1cd")}
          className="object-cover object-[56%_18%] opacity-62 saturate-[0.9] sm:object-[52%_28%] md:opacity-70"
          fill
          priority
          sizes="100vw"
          src={ivaImages.rooftopBlue}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,0.28),rgba(17,16,14,0.92)),linear-gradient(90deg,rgba(17,16,14,0.92),rgba(17,16,14,0.66),rgba(17,16,14,0.28))]" />
        <Container className="relative grid gap-8 pb-8 pt-20 sm:pb-10 sm:pt-24 md:min-h-[calc(100svh-4rem)] md:pb-16 md:pt-28 lg:grid-cols-[1fr_0.78fr] lg:items-end">
          <div className="max-w-5xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--gold)] sm:text-xs sm:tracking-[0.32em]">{copy("t_7b0a0d109b")}</p>
              <h1 className="mt-4 max-w-5xl text-balance font-serif text-5xl font-medium leading-[0.9] text-[var(--text-strong)] min-[380px]:text-6xl sm:mt-5 sm:text-7xl md:text-8xl xl:text-[8rem]">{copy("t_5873a0c2c8")}</h1>
              <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-[var(--text-body)] sm:text-base sm:leading-8 md:mt-7 md:text-lg md:leading-9">{copy("t_d89c21e36e")}</p>
            </Reveal>
            <Reveal delay={0.08} className="mt-6 grid gap-3 sm:mt-8 sm:flex sm:flex-row">
              <a
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--gold)]/70 bg-[var(--gold)] px-5 text-sm font-semibold text-[var(--matte)] shadow-gold-glow transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--text-strong)] hover:text-[var(--page)] sm:w-auto sm:px-6"
                href={`mailto:${creator.email}?subject=Paid%20Collaboration%20Inquiry%20for%20Iva`}
              >
                <Mail className="size-4" />{copy("t_56839cc7e7")}</a>
              <Link
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-md transition duration-500 ease-luxury hover:-translate-y-0.5 hover:border-white/40 hover:bg-white hover:text-stone-950 sm:w-auto sm:px-6"
                href="/media-kit"
              >{copy("t_3927d523f6")}<ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:justify-self-end">
            <div className="rounded-md border border-white/15 bg-black/38 p-4 shadow-luxury-lg backdrop-blur-xl sm:p-5 md:p-6">
              <div className="flex items-center gap-3">
                <BadgeCheck className="size-5 text-[var(--gold)]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--champagne)] sm:text-sm sm:tracking-[0.18em]">{copy("t_f08b783f0b")}</p>
              </div>
              <a
                className="mt-5 block max-w-full break-all font-serif text-2xl leading-tight text-white transition hover:text-[var(--champagne)] min-[380px]:text-[1.75rem] sm:break-words sm:text-4xl sm:[overflow-wrap:anywhere]"
                href={`mailto:${creator.email}`}
              >
                {creator.email}
              </a>
              <p className="mt-4 text-sm leading-7 text-[var(--text-body)]">{copy("t_37eac9ad95")}</p>
              <div className="mt-5 grid gap-3">
                {contactSignals.map((signal) => (
                  <div
                    className="grid gap-2 border-t border-white/12 pt-4 sm:grid-cols-[1fr_auto] sm:gap-4"
                    key={signal.label}
                  >
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        {signal.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[var(--text-body)]">
                        {signal.note}
                      </p>
                    </div>
                    <p className="font-serif text-2xl leading-none text-[var(--text-strong)] sm:text-right sm:text-3xl">
                      {signal.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 sm:py-[var(--spacing-editorial-breath)]">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
          <SectionHeader
            eyebrow={copy("t_77c5086b3d")}
            title={copy("t_48714c23ba")}
            description={copy("t_5f6bda8a63")}
          />
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {partnershipFit.map((item) => (
              <StaggerItem
                className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-4 shadow-luxury-sm transition-[transform,border-color,box-shadow] duration-500 ease-luxury hover:-translate-y-0.5 hover:border-[var(--gold)]/45 hover:shadow-luxury-md sm:p-5"
                key={item}
              >
                <Sparkles className="mb-5 size-5 text-[var(--gold)]" />
                <p className="font-serif text-2xl leading-tight text-[var(--text-strong)] min-[380px]:text-3xl">
                  {item}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="border-y border-[var(--border-soft)] bg-[var(--surface-muted)]/55 py-14 sm:py-[var(--spacing-editorial-breath)]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeader
              eyebrow={copy("t_3e1fdb1ee3")}
              title={copy("t_b402ffea14")}
            />
            <Reveal className="max-w-xl text-sm leading-7 text-[var(--text-body)] lg:justify-self-end">{copy("t_1648af1728")}</Reveal>
          </div>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {process.map((item) => (
              <StaggerItem
                className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm sm:p-6"
                key={item.step}
              >
                <p className="font-serif text-4xl leading-none text-[var(--gold)]/85 sm:text-5xl">
                  {item.step}
                </p>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-[var(--text-strong)] sm:mt-6 sm:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-body)]">
                  {item.text}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <InquiryFunnel />
    </PageShell>
  );
}

export async function EditorialArticle({ slug }: { slug: string }) {
  const { editorial } = await getSiteContent();
  const copy = await getPageCopy("EditorialArticle");



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
              <span>{copy("t_1fdf0d90c3")}</span>
              <span>{story.readTime}</span>
              <span>{copy("t_1fdf0d90c3")}</span>
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
