import type { Metadata } from "next";

import { PremiumExperiences } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Iva's Picks",
  description:
    "Iva Chatterjee's picks across cafés, rooftops, boutique stays, city nights, and slower travel stories.",
  path: "/premium-experiences",
});

export default function PremiumExperiencesPage() {
  return <PremiumExperiences />;
}
