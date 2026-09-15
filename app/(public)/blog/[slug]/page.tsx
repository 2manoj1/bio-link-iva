import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticleExperience } from "@/components/site/blog";
import { getPublishedBlogPost } from "@/lib/cms-blog";
import { makeMetadata } from "@/lib/brand-data";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);

  if (!post) {
    return makeMetadata({
      title: "Creator Journal",
      description:
        "Editorial stories and soft luxury city notes from Iva Chatterjee.",
      path: "/blog",
    });
  }

  const metadata = makeMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    image: post.image,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: ["Iva Chatterjee"],
      tags: post.keywords,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticleExperience post={post} />;
}
