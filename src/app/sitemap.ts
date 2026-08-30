import type { MetadataRoute } from "next";

import { services } from "@/lib/content";
import { getProjects, getPosts } from "@/lib/data";

/**
 * Production domain.
 * Keep this consistent with layout.tsx and robots.ts.
 */
const siteUrl = "https://www.kandkbuilders.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [projects, posts] = await Promise.all([
    getProjects(),
    getPosts(),
  ]);

  /**
   * Main website pages.
   */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/book`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  /**
   * Individual service pages.
   */
  const serviceRoutes: MetadataRoute.Sitemap = services.map(
    (service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  /**
   * Individual project pages.
   */
  const projectRoutes: MetadataRoute.Sitemap = projects.map(
    (project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  /**
   * Individual blog posts.
   * Uses the real published date when available.
   */
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,

    lastModified: post.published_at
      ? new Date(post.published_at)
      : now,

    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...postRoutes,
  ];
}