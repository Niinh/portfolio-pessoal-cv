import type { MetadataRoute } from "next";

import { getPortfolioProjects } from "@/lib/projects/get-projects";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPortfolioProjects();
  const staticRoutes = ["", "/projetos"].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects
    .filter((project) => project.hasCase)
    .map((project) => ({
      url: `${siteConfig.siteUrl}/projetos/${project.slug}`,
      lastModified: project.pushedAt ? new Date(project.pushedAt) : new Date(),
    }));

  return [...staticRoutes, ...projectRoutes];
}
