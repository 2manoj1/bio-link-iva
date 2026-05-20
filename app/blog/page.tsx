import type { Metadata } from "next";

import { BlogIndexExperience } from "@/components/site/blog";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Creator Journal",
  description:
    "Iva Chatterjee's editorial creator journal for soft luxury, Bengaluru culture, beautiful cafes, rooftops, fashion, stays, and premium city rituals.",
  path: "/blog",
  keywords: [
    "Bengaluru luxury cafés",
    "Bangalore premium experiences",
    "premium Goa staycation",
    "luxury lifestyle creator India",
  ],
});

export default function BlogPage() {
  return <BlogIndexExperience />;
}
