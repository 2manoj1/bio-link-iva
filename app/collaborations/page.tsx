import type { Metadata } from "next";

import { CollaborationExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Collaborations",
  description:
    "Paid collaborations with Iva Chatterjee for cafés, boutique hotels, fashion, beauty, restaurants, wellness, and lifestyle brands.",
  path: "/collaborations",
});

export default function CollaborationsPage() {
  return <CollaborationExperience />;
}
