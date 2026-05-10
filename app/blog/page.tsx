import type { Metadata } from "next";

import { EditorialExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Blog",
  description:
    "Lifestyle notes by Iva Chatterjee covering cafés, rooftops, boutique stays, travel, fashion, and beautiful city plans.",
  path: "/blog",
  keywords: [
    "Bengaluru luxury cafés",
    "Bangalore premium experiences",
    "premium Goa staycation",
    "luxury lifestyle creator India",
  ],
});

export default function BlogPage() {
  return <EditorialExperience />;
}
