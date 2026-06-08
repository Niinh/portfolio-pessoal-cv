import { readFileSync, existsSync } from "node:fs";

const API_URL = "https://api.github.com";
const API_VERSION = "2026-03-10";

function loadDotEnv() {
  if (!existsSync(".env")) return;

  const content = readFileSync(".env", "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function getExcludedRepos() {
  return (process.env.GITHUB_EXCLUDED_REPOS ?? "Niinh")
    .split(",")
    .map((repo) => repo.trim().toLowerCase())
    .filter(Boolean);
}

function getSearchQuery(username) {
  const syncMode = process.env.GITHUB_SYNC_MODE ?? "all";
  const topic = process.env.GITHUB_PROJECT_TOPIC ?? "portfolio";
  const includeForks = process.env.GITHUB_INCLUDE_FORKS === "true";
  const queryParts = [`user:${username}`, "is:public"];

  if (syncMode === "topic" && topic) queryParts.push(`topic:${topic}`);
  if (!includeForks) queryParts.push("fork:false");

  return queryParts.join(" ");
}

async function githubFetch(path, options = {}) {
  const token = process.env.GITHUB_WEBHOOK_TOKEN || process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("Missing required environment variable: GITHUB_WEBHOOK_TOKEN or GITHUB_TOKEN");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": API_VERSION,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub API error ${response.status} on ${path}: ${detail}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

async function fetchRepos(username) {
  const query = encodeURIComponent(getSearchQuery(username));
  const data = await githubFetch(`/search/repositories?q=${query}&sort=updated&order=desc&per_page=100`);
  const excludedRepos = getExcludedRepos();

  return data.items.filter((repository) => !excludedRepos.includes(repository.name.toLowerCase()));
}

async function upsertWebhook(repository, webhookUrl, secret) {
  const hooks = await githubFetch(`/repos/${repository.full_name}/hooks?per_page=100`);
  const existingHook = hooks.find((hook) => hook.config?.url === webhookUrl);
  const body = {
    name: "web",
    active: true,
    events: ["push"],
    config: {
      url: webhookUrl,
      content_type: "json",
      secret,
      insecure_ssl: "0",
    },
  };

  if (existingHook) {
    await githubFetch(`/repos/${repository.full_name}/hooks/${existingHook.id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    return "updated";
  }

  await githubFetch(`/repos/${repository.full_name}/hooks`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return "created";
}

function getWebhookUrl() {
  if (process.env.GITHUB_WEBHOOK_URL) return process.env.GITHUB_WEBHOOK_URL;

  const siteUrl = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || requireEnv("SITE_URL")).replace(
    /\/$/,
    "",
  );
  return `${siteUrl}/.netlify/functions/revalidate-github`;
}

async function main() {
  loadDotEnv();

  const username = requireEnv("GITHUB_USERNAME");
  const webhookUrl = getWebhookUrl();
  const secret = requireEnv("GITHUB_REVALIDATE_SECRET");
  const repos = await fetchRepos(username);

  console.log(`Webhook URL: ${webhookUrl}`);
  console.log(`Repositories found: ${repos.length}`);

  for (const repo of repos) {
    const action = await upsertWebhook(repo, webhookUrl, secret);
    console.log(`${action}: ${repo.full_name}`);
  }

  console.log("GitHub webhooks configured.");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
