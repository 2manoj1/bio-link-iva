import { getPageCopy } from "@/lib/page-copy";
import { getSiteContent } from '@/lib/site-content';
import { ArrowRight, BookOpen, Clock, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ArticleProgress } from "@/components/site/article-progress";
import { JsonLd } from "@/components/site/json-ld";
import type { BlogPost } from "@/lib/blog";
import { getPublishedBlogPosts, getPublishedRelatedPosts } from "@/lib/cms-blog";
import { siteUrl } from "@/lib/brand-data";
import { Container, EditorialHeader, PageShell, SectionHeader } from "./luxury-ui";
import { Reveal, Stagger, StaggerItem } from "./reveal";

export async function BlogIndexExperience() {
  const copy = await getPageCopy("BlogIndexExperience");

  const blogPosts = await getPublishedBlogPosts();
  const [featured, ...rest] = blogPosts;
  const moods = [
    "Soft Luxury Diaries",
    "The Iva Edit",
    "Bengaluru Luxury Edit",
    "Creator Lifestyle Stories",
  ];

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-[var(--border-soft)] bg-[var(--page)] py-[var(--spacing-editorial-section)]">
        <div className="pointer-events-none absolute inset-0 bg-[var(--luxury-vignette)] opacity-90" />
        <Container className="relative grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <EditorialHeader
              eyebrow={copy("t_bbe78cb383")}
              title={copy("t_66b8b6a531")}
              description={copy("t_7e914f4a4b")}
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {moods.map((mood) => (
                <span
                  className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-glass)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  key={mood}
                >
                  {mood}
                </span>
              ))}
            </div>
          </div>

          {featured && <Reveal delay={0.1}>
            <Link
              className="group grid overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)] shadow-luxury-lg md:grid-cols-[0.94fr_1.06fr]"
              href={`/blog/${featured.slug}`}
            >
              <div className="relative min-h-[420px] overflow-hidden">
                <Image
                  alt={featured.title}
                  className="object-cover transition-transform duration-700 ease-luxury will-change-transform group-hover:scale-[1.025]"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  src={featured.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent" />
              </div>
              <div className="flex flex-col justify-end p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">{copy("t_485f4c200b")}</p>
                <h2 className="mt-5 font-serif text-5xl font-medium leading-[0.96] text-[var(--text-strong)] md:text-6xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-[var(--text-body)]">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  <span>{featured.category}</span>
                  <span>{copy("t_1fdf0d90c3")}</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </Link>
          </Reveal>}
        </Container>
      </section>

      <section className="py-[var(--spacing-editorial-section)]">
        <Container>
          <SectionHeader
            eyebrow={copy("t_3b037feb67")}
            title={copy("t_39cd304ccb")}
            description={copy("t_78b2e53571")}
          />
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post) => (
              <StaggerItem key={post.slug}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <JournalHabitSection />
    </PageShell>
  );
}

export async function BlogArticleExperience({ post }: { post: BlogPost }) {
  const copy = await getPageCopy("BlogArticleExperience");

  const { creator } = await getSiteContent();
  const relatedPosts = await getPublishedRelatedPosts(post);
  const Content = post.Content;
  const articleUrl = `${siteUrl}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: new URL(post.image, siteUrl).href,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.publishedAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Person",
      name: creator.name,
      url: creator.websiteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: creator.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.png`,
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <PageShell>
      <ArticleProgress />
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />
      <article>
        <section className="relative min-h-[86svh] overflow-hidden border-b border-[var(--border-soft)] [--text-body:#eadfce] [--text-muted:#c9b89f] [--text-strong:#fff7ed]">
          <Image
            alt={post.title}
            className="object-cover opacity-72 saturate-[0.9]"
            fill
            priority
            sizes="100vw"
            src={post.image}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,0.16),rgba(17,16,14,0.84)),linear-gradient(90deg,rgba(17,16,14,0.88),rgba(17,16,14,0.48),rgba(17,16,14,0.18))]" />
          <Container className="relative flex min-h-[86svh] flex-col justify-end pb-12 md:pb-16">
            <div className="max-w-5xl">
              <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--champagne)]">
                <span>{post.category}</span>
                <span>{copy("t_1fdf0d90c3")}</span>
                <span>{post.date}</span>
                <span>{copy("t_1fdf0d90c3")}</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="max-w-5xl text-balance font-serif text-6xl font-medium leading-[0.88] text-[var(--text-strong)] sm:text-7xl md:text-8xl xl:text-[8rem]">
                {post.title}
              </h1>
              <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-[var(--text-body)] md:text-lg md:leading-9">
                {post.description}
              </p>
            </div>
          </Container>
        </section>

        <Container className="grid gap-12 py-[var(--spacing-editorial-breath)] lg:grid-cols-[220px_minmax(0,780px)_260px] lg:items-start">
          <aside className="hidden lg:sticky lg:top-28 lg:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">{copy("t_f5cbdf6bfb")}</p>
            <nav className="mt-5 grid gap-3">
              {post.toc.map((item) => (
                <a
                className="border-l border-[var(--border-soft)] pl-4 text-sm leading-6 text-[var(--text-muted)] transition-colors duration-300 ease-luxury hover:border-[var(--gold)] hover:text-[var(--text-strong)]"
                  href={`#${item.id}`}
                  key={item.id}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">
            <div className="mb-10 flex flex-wrap gap-3 border-y border-[var(--border-soft)] py-5 text-sm text-[var(--text-muted)] lg:hidden">
              {post.toc.map((item) => (
                <a
                  className="rounded-full border border-[var(--border-soft)] px-3 py-2"
                  href={`#${item.id}`}
                  key={item.id}
                >
                  {item.title}
                </a>
              ))}
            </div>
            <div className="space-y-7">
              <Content />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <AuthorCard />
          </aside>
        </Container>
      </article>

      <RelatedStories posts={relatedPosts} />
      <NewsletterSection />
    </PageShell>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      className="group block transform-gpu overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)] shadow-luxury-md transition-[transform,border-color,box-shadow] duration-500 ease-luxury will-change-transform hover:-translate-y-0.5 hover:border-[var(--gold)]/50 hover:shadow-luxury-lg"
      href={`/blog/${post.slug}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          alt={post.title}
          className="object-cover transition-transform duration-700 ease-luxury will-change-transform group-hover:scale-[1.025]"
          fill
          sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
          src={post.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
            {post.category}
          </p>
          <h3 className="mt-3 font-serif text-4xl font-medium leading-[0.98] text-stone-50">
            {post.title}
          </h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-7 text-[var(--text-body)]">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
          <span>{post.readTime}</span>
          <ArrowRight className="size-4 text-[var(--gold)] transition-transform duration-300 ease-luxury group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

async function AuthorCard() {
  const copy = await getPageCopy("AuthorCard");

  const { creator } = await getSiteContent();
  return (
    <div className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-sm">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <Image
          alt={creator.name}
          className="object-cover object-top"
          fill
          sizes="260px"
          src={creator.profileImage}
        />
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">{copy("t_d04c53e6f7")}</p>
      <h2 className="mt-2 font-serif text-3xl leading-none text-[var(--text-strong)]">
        {creator.name}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[var(--text-body)]">{copy("t_84f61d0714")}</p>
      <a
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--champagne)] transition-colors duration-300 ease-luxury hover:text-[var(--gold)]"
        href={creator.instagramUrl}
        rel="noreferrer"
        target="_blank"
      >
        {creator.handle}
      </a>
    </div>
  );
}

async function RelatedStories({ posts }: { posts: BlogPost[] }) {
  const copy = await getPageCopy("RelatedStories");

  return (
    <section className="border-y border-[var(--border-soft)] bg-[var(--surface-muted)]/55 py-[var(--spacing-editorial-breath)]">
      <Container>
        <SectionHeader
          eyebrow={copy("t_cded45c4b9")}
          title={copy("t_9ed38ac774")}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}

async function JournalHabitSection() {
  const copy = await getPageCopy("JournalHabitSection");

  return (
    <section className="border-t border-[var(--border-soft)] bg-[var(--surface-muted)]/50 py-[var(--spacing-editorial-breath)]">
      <Container className="grid gap-8 md:grid-cols-3">
        {[
          {
            icon: BookOpen,
            title: copy("t_cb1c30719e"),
            text: copy("t_9a1d700f2b"),
          },
          {
            icon: Sparkles,
            title: copy("t_f5fbf46dca"),
            text: copy("t_f75af4bb67"),
          },
          {
            icon: Clock,
            title: copy("t_538e6af56d"),
            text: copy("t_8d7b13a77a"),
          },
        ].map(({ icon: Icon, title, text }) => (
          <div className="border-t border-[var(--border-soft)] pt-6" key={title}>
            <Icon className="mb-5 size-5 text-[var(--gold)]" />
            <h2 className="font-serif text-4xl leading-tight text-[var(--text-strong)]">
              {title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-body)]">{text}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

async function NewsletterSection() {
  const copy = await getPageCopy("NewsletterSection");

  const { creator } = await getSiteContent();
  return (
    <section className="py-[var(--spacing-editorial-breath)]">
      <Container className="grid gap-8 rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-luxury-md md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">{copy("t_1e0ad8bc80")}</p>
          <h2 className="mt-4 max-w-2xl font-serif text-5xl font-medium leading-[0.96] text-[var(--text-strong)]">{copy("t_95c823b8db")}</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-body)]">{copy("t_a6a56acf11")}</p>
        </div>
        <a
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/70 bg-[var(--gold)] px-6 text-sm font-semibold text-[var(--matte)] shadow-gold-glow transition duration-500 ease-luxury hover:-translate-y-0.5 hover:bg-[var(--text-strong)]"
          href={`mailto:${creator.email}`}
        >
          <Mail className="size-4" />
          {creator.email}
        </a>
      </Container>
    </section>
  );
}