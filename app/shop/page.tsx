import type { Metadata } from "next";

import { ShopExperience } from "@/components/site/shop";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Shop Iva's Products",
  description:
    "Shop Iva Chatterjee's day-to-day beauty, cafe, travel, creator, and home product picks through an affiliate-ready Amazon product shelf.",
  path: "/shop",
  keywords: [
    "Iva Chatterjee products",
    "Iva Chatterjee Amazon",
    "influencer product recommendations India",
    "Bangalore influencer shopping",
    "beauty and lifestyle affiliate store",
  ],
});

export default function ShopPage() {
  return <ShopExperience />;
}
