import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { LinksExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

const fallbackMetadata: Metadata = makeMetadata({
  title: "Links",
  description:
    "Official links for Iva Chatterjee including Instagram, YouTube, media kit, city guide, and collaboration inquiry.",
  path: "/links",
});

export default function LinksPage() {
  return <LinksExperience />;
}

export async function generateMetadata(): Promise<Metadata> { return getPageMetadata("/links", fallbackMetadata); }
