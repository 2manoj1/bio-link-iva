import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { CollaborationExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

const fallbackMetadata: Metadata = makeMetadata({
  title: "Collaborations",
  description:
    "Paid collaborations with Iva Chatterjee for cafés, boutique hotels, fashion, beauty, restaurants, wellness, and lifestyle brands.",
  path: "/collaborations",
  keywords: [
    "Iva Chatterjee brand collaboration",
    "Bengaluru influencer collaboration",
    "Bangalore digital creator for brands",
    "India lifestyle influencer campaign",
    "Bengaluru hospitality influencer",
    "hotel and cafe influencer Bangalore",
    "beauty and fashion creator India",
    "paid Instagram collaboration Bengaluru",
    "social media content creator Bangalore",
  ],
});

export default function CollaborationsPage() {
  return <CollaborationExperience />;
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/collaborations", fallbackMetadata);
}
