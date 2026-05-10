import type { Metadata } from "next";

import { PremiumExperiences } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Iva's Picks",
  description:
    "Iva Chatterjee's picks across Bengaluru, Goa, Mumbai, Pune, and selective heritage-led stay stories.",
  path: "/premium-experiences",
});

export default function PremiumExperiencesPage() {
  return <PremiumExperiences />;
}
