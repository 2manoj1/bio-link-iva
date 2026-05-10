import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditorialArticle } from "@/components/site/page-sections";
import { editorial, makeMetadata } from "@/lib/brand-data";

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

  if (!editorial.some((item) => item.slug === slug)) {
    notFound();
  }

  return <EditorialArticle slug={slug} />;
}
