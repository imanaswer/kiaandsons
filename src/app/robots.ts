import type { MetadataRoute } from "next";

/**
 * Production domain.
 * Keep this the same as layout.tsx and sitemap.ts.
 */
const siteUrl = "https://www.kandkbuilders.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}