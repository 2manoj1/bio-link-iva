import type { Metadata } from "next";

import { MediaKitExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Media Kit & Audience",
  description:
    "Premium media kit for Iva Chatterjee, Bangalore influencer and digital creator across beauty, food, travel, lifestyle, hospitality, salons, fashion, and paid collaborations.",
  path: "/media-kit",
  keywords: [
    "Iva Chatterjee media kit",
    "Bengaluru lifestyle creator media kit",
    "luxury creator India audience insights",
    "premium creator collaborations Bengaluru",
  ],
});

export default function MediaKitPage() {
  return <MediaKitExperience />;
}
