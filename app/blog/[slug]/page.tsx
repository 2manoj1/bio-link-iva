import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticleExperience } from "@/components/site/blog";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { makeMetadata } from "@/lib/brand-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

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
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticleExperience post={post} />;
}
