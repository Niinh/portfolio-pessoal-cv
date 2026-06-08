import { fetchPortfolioRepositories } from "@/lib/github/client";
import { normalizeRepository } from "@/lib/github/normalize";
import type { PortfolioProject } from "@/types/project";

function sortProjects(projects: PortfolioProject[]) {
  return projects.sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    if (a.order !== b.order) return a.order - b.order;
    return new Date(b.pushedAt ?? 0).getTime() - new Date(a.pushedAt ?? 0).getTime();
  });
}

export async function getPortfolioProjects() {
  try {
    const repositories = await fetchPortfolioRepositories();
    return sortProjects(repositories.map(normalizeRepository));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFeaturedProjects(limit = 4) {
  const projects = await getPortfolioProjects();
  const featured = projects.filter((project) => project.featured);

  return (featured.length ? featured : projects).slice(0, limit);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getPortfolioProjects();
  return projects.find((project) => project.slug === slug && project.hasCase);
}
