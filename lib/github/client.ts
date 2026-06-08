import { siteConfig } from "@/lib/site-config";
import type { GitHubSearchResponse } from "@/types/project";

const GITHUB_API_URL = "https://api.github.com/search/repositories";
const REVALIDATE_SECONDS = 60 * 30;

function getGitHubSearchQuery() {
  const username = siteConfig.githubUsername;
  const syncMode = process.env.GITHUB_SYNC_MODE ?? "all";
  const topic = process.env.GITHUB_PROJECT_TOPIC ?? "portfolio";
  const includeForks = process.env.GITHUB_INCLUDE_FORKS === "true";
  const queryParts = [`user:${username}`, "is:public"];

  if (syncMode === "topic" && topic) queryParts.push(`topic:${topic}`);
  if (!includeForks) queryParts.push("fork:false");

  return queryParts.join(" ");
}

function getExcludedRepos() {
  return (process.env.GITHUB_EXCLUDED_REPOS ?? "Niinh")
    .split(",")
    .map((repo) => repo.trim().toLowerCase())
    .filter(Boolean);
}

export async function fetchPortfolioRepositories() {
  const query = encodeURIComponent(getGitHubSearchQuery());
  const token = process.env.GITHUB_TOKEN;

  const response = await fetch(`${GITHUB_API_URL}?q=${query}&sort=updated&order=desc&per_page=50`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: {
      revalidate: REVALIDATE_SECONDS,
      tags: ["github-projects"],
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as GitHubSearchResponse;
  const excludedRepos = getExcludedRepos();

  return data.items.filter((repository) => !excludedRepos.includes(repository.name.toLowerCase()));
}
