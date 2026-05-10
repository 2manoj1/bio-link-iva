import type { Metadata } from "next";

import { LinksExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Links",
  description:
    "Official links for Iva Chatterjee including Instagram, YouTube, media kit, city guide, and collaboration inquiry.",
  path: "/links",
});

export default function LinksPage() {
  return <LinksExperience />;
}
