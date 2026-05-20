declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const metadata: {
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

  const MDXContent: ComponentType;
  export default MDXContent;
}
