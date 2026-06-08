export type ProjectCategory =
  | "SaaS"
  | "Automacao"
  | "Landing Page"
  | "IA"
  | "Design"
  | "Sistema Web";

export type ProjectStatus = "Em evolução" | "Online" | "Protótipo" | "Arquivado";

export interface CaseStudy {
  enabled: boolean;
  problem: string;
  solution: string;
  technicalDecisions: string[];
  expectedImpact: string;
}

export interface PortfolioProject {
  id: number;
  name: string;
  slug: string;
  description: string;
  url: string;
  homepage?: string;
  category: ProjectCategory;
  stack: string[];
  status: ProjectStatus;
  topics: string[];
  language?: string;
  stars: number;
  forks: number;
  pushedAt?: string;
  featured: boolean;
  order: number;
  hasCase: boolean;
  caseStudy: CaseStudy;
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepository[];
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  homepage?: string | null;
  description?: string | null;
  topics?: string[];
  language?: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at?: string;
  updated_at?: string;
  archived?: boolean;
}
