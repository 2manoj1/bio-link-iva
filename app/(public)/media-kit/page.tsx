import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { MediaKitExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

const fallbackMetadata: Metadata = makeMetadata({
  title: "Media Kit & Audience",
  description:
    "Premium media kit for Iva Chatterjee, Bangalore influencer and digital creator across beauty, food, travel, lifestyle, hospitality, salons, fashion, and paid collaborations.",
  path: "/media-kit",
  keywords: [
    "Iva Chatterjee media kit",
    "Bengaluru lifestyle creator media kit",
    "luxury creator India audience insights",
    "premium creator collaborations Bengaluru",
    "Bangalore influencer media kit",
    "India digital creator for brand partnerships",
    "Bengaluru beauty food travel influencer",
    "hospitality creator media kit India",
    "Instagram creator for hotel collaboration",
  ],
});

export default function MediaKitPage() {
  return <MediaKitExperience />;
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/media-kit", fallbackMetadata);
}
