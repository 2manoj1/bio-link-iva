import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditorialArticle } from "@/components/site/page-sections";
import { editorial, makeMetadata, siteUrl, creator } from "@/lib/brand-data";
import { JsonLd } from "@/components/site/json-ld";

export function generateStaticParams() {
  return editorial.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = editorial.find((item) => item.slug === slug);

  if (!story) {
    return makeMetadata({
      title: "Stories",
      description: "Lifestyle stories and personal city notes by Iva Chatterjee.",
      path: "/editorial",
    });
  }

  return makeMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/editorial/${story.slug}`,
    keywords: story.keywords,
    image: story.image,
  });
}

export default function EditorialArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <EditorialArticleLoader params={params} />;
}

async function EditorialArticleLoader({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = editorial.find((item) => item.slug === slug);

  if (!story) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: story.excerpt,
    image: `${siteUrl}${story.image}`,
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
    datePublished: new Date(story.date).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/editorial/${story.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <EditorialArticle slug={slug} />
    </>
  );
}

