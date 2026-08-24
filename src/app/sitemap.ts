import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/**
 * Карта сайту. Коли з'являться окремі сторінки послуг або блог —
 * додайте їх у масив.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/roboty`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
