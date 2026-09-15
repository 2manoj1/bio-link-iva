import { getSiteContent } from '@/lib/site-content';
import type { MetadataRoute } from "next";

import { getPublishedBlogPosts } from "@/lib/cms-blog";
import { siteUrl } from "@/lib/brand-data";

const staticRoutes = [
  "",
  "/about",
  "/collaborations",
  "/bengaluru-guide",
  "/goa-escapes",
  "/goa-escapes/boutique-stays",
  "/mumbai-experiences",
  "/mumbai-experiences/cafes",
  "/pune-discoveries",
  "/pune-discoveries/cafes",
  "/media-kit",
  "/contact",
  "/links",
  "/shop",
  "/blog",
  "/premium-experiences",
  "/kolkata-experiences",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getPublishedBlogPosts();
  const { neighborhoods } = await getSiteContent();
  const now = new Date();
  const routes = [
    ...staticRoutes,
    ...neighborhoods.map((area) => `/bengaluru-guide/${area.slug}`),
    ...blogPosts.map((story) => `/blog/${story.slug}`),

  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
