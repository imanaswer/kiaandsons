import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kjasons.com/sitemap.xml",
    host: "https://kjasons.com",
  };
}
