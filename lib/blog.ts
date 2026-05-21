import type { ComponentType } from "react";

import BengaluruRooftopCulture, {
  metadata as bengaluruRooftopCultureMetadata,
} from "@/content/blog/bengaluru-rooftop-culture.mdx";
import IndiranagarEveningEdit, {
  metadata as indiranagarEveningEditMetadata,
} from "@/content/blog/indiranagar-evening-edit.mdx";
import BengaluruCafeRitualsIva, {
  metadata as bengaluruCafeRitualsIvaMetadata,
} from "@/content/blog/bengaluru-cafe-rituals-iva.mdx";
import PremiumCafeLanguage, {
  metadata as premiumCafeLanguageMetadata,
} from "@/content/blog/premium-cafe-language.mdx";
import SoftLuxuryDiaries, {
  metadata as softLuxuryDiariesMetadata,
} from "@/content/blog/soft-luxury-diaries.mdx";

export type BlogPostMetadata = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  date: string;
  publishedAt: string;
  readTime: string;
  image: string;
  keywords: string[];
  mood: string;
  toc: Array<{ id: string; title: string }>;
  related?: string[];
};

export type BlogPost = BlogPostMetadata & {
  Content: ComponentType;
};

const posts: BlogPost[] = [
  {
    ...bengaluruCafeRitualsIvaMetadata,
    Content: BengaluruCafeRitualsIva,
  },
  {
    ...softLuxuryDiariesMetadata,
    Content: SoftLuxuryDiaries,
  },
  {
    ...indiranagarEveningEditMetadata,
    Content: IndiranagarEveningEdit,
  },
  {
    ...premiumCafeLanguageMetadata,
    Content: PremiumCafeLanguage,
  },
  {
    ...bengaluruRooftopCultureMetadata,
    Content: BengaluruRooftopCulture,
  },
];

export const blogPosts = posts.sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  const relatedSlugs = post.related ?? [];
  const explicit = relatedSlugs
    .map((slug) => getBlogPost(slug))
    .filter((item): item is BlogPost => Boolean(item));
  const fallback = blogPosts.filter(
    (item) =>
      item.slug !== post.slug &&
      !explicit.some((related) => related.slug === item.slug),
  );

  return [...explicit, ...fallback].slice(0, limit);
}
