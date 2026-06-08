import { getProjectCuration } from "@/lib/projects/curation";
import { slugify } from "@/lib/utils";
import type {
  CaseStudy,
  GitHubRepository,
  PortfolioProject,
  ProjectCategory,
} from "@/types/project";

const topicCategoryMap: Record<string, ProjectCategory> = {
  saas: "SaaS",
  automation: "Automacao",
  automacao: "Automacao",
  landing: "Landing Page",
  "landing-page": "Landing Page",
  ai: "IA",
  ia: "IA",
  design: "Design",
  frontend: "Sistema Web",
  web: "Sistema Web",
};

const languageStackMap: Record<string, string[]> = {
  TypeScript: ["TypeScript"],
  JavaScript: ["JavaScript"],
  HTML: ["HTML", "CSS", "JavaScript"],
  CSS: ["CSS"],
  PHP: ["PHP"],
};

function inferCategory(topics: string[], repoName: string): ProjectCategory {
  const normalizedTopics = topics.map((topic) => topic.toLowerCase());
  const categoryTopic = normalizedTopics.find((topic) => topicCategoryMap[topic]);

  if (categoryTopic) return topicCategoryMap[categoryTopic];
  if (repoName.toLowerCase().includes("landing")) return "Landing Page";
  if (repoName.toLowerCase().includes("design")) return "Design";

  return "Sistema Web";
}

function inferStack(repository: GitHubRepository) {
  const topics = repository.topics ?? [];
  const stackFromTopics = topics
    .filter((topic) =>
      ["nextjs", "react", "typescript", "tailwind", "node", "php", "figma", "ai"].includes(
        topic.toLowerCase(),
      ),
    )
    .map((topic) => (topic.toLowerCase() === "nextjs" ? "Next.js" : topic));

  const languageStack = repository.language ? languageStackMap[repository.language] ?? [repository.language] : [];
  return [...new Set([...stackFromTopics, ...languageStack])].slice(0, 5);
}

function buildCaseStudy(repository: GitHubRepository, category: ProjectCategory): CaseStudy {
  const productType = category === "Automacao" ? "automação" : category.toLowerCase();

  return {
    enabled: true,
    problem:
      repository.description ??
      `Criar uma solução digital do tipo ${productType} com clareza, performance e experiência profissional.`,
    solution:
      "Estruturar uma aplicação com interface objetiva, componentes reutilizáveis e base técnica preparada para evolução contínua.",
    technicalDecisions: [
      "Priorizar arquitetura simples de manter e fácil de escalar.",
      "Organizar a entrega em camadas visuais, dados e navegação.",
      "Usar boas práticas de performance, responsividade e SEO técnico.",
    ],
    expectedImpact:
      "Gerar uma experiência mais clara para usuários finais e demonstrar domínio técnico em projetos reais.",
  };
}

export function normalizeRepository(repository: GitHubRepository): PortfolioProject {
  const topics = repository.topics ?? [];
  const curation = getProjectCuration(repository.name);
  const category = curation.category ?? inferCategory(topics, repository.name);
  const defaultCaseStudy = buildCaseStudy(repository, category);
  const caseStudy = {
    ...defaultCaseStudy,
    ...curation.caseStudy,
    technicalDecisions:
      curation.caseStudy?.technicalDecisions ?? defaultCaseStudy.technicalDecisions,
    enabled: curation.caseStudy?.enabled ?? defaultCaseStudy.enabled,
  };

  return {
    id: repository.id,
    name: repository.name.replace(/[-_]/g, " "),
    slug: slugify(repository.name),
    description:
      curation.description ??
      repository.description ??
      "Projeto público sincronizado pelo GitHub. Adicione uma descrição no repositório para enriquecer o case.",
    url: repository.html_url,
    homepage: repository.homepage ?? undefined,
    category,
    stack: curation.stack ?? inferStack(repository),
    status: curation.status ?? (repository.archived ? "Arquivado" : "Em evolução"),
    topics,
    language: repository.language ?? undefined,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    pushedAt: repository.pushed_at ?? repository.updated_at,
    featured: curation.featured ?? false,
    order: curation.order ?? 100,
    hasCase: caseStudy.enabled,
    caseStudy,
  };
}
