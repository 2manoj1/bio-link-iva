import type { Metadata } from "next";

import { ContactExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Contact",
  description:
    "Contact Iva Chatterjee for paid lifestyle collaborations across Bengaluru, Goa, Mumbai, Pune, and selective stay partnerships.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactExperience />;
}
