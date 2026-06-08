import type { CaseStudy, ProjectCategory, ProjectStatus } from "@/types/project";

export interface ProjectCuration {
  featured?: boolean;
  order?: number;
  category?: ProjectCategory;
  status?: ProjectStatus;
  description?: string;
  stack?: string[];
  caseStudy?: Partial<CaseStudy> & { enabled?: boolean };
}

export const projectCuration: Record<string, ProjectCuration> = {
  "portfolio-pessoal-cv": {
    featured: true,
    order: 1,
    category: "Sistema Web",
    status: "Em evolução",
    description:
      "Portfólio profissional reconstruído como produto digital, com motion design, GitHub sync, cases dinâmicos e narrativa visual premium.",
    stack: ["Next.js", "React", "Framer Motion", "GitHub API"],
    caseStudy: {
      enabled: true,
      problem:
        "Transformar um currículo estático em uma vitrine digital com estética de produto, prova técnica e sincronização automática com o GitHub.",
      solution:
        "Recriar a experiência com App Router, animações suaves, camada de integração GitHub e uma narrativa visual focada em prospecção.",
      technicalDecisions: [
        "Separar a integração GitHub em uma camada normalizada e cacheada.",
        "Usar ISR para atualizar projetos sem rebuild manual.",
        "Adicionar curação local para priorizar cases e categorias comerciais.",
      ],
      expectedImpact:
        "Aumentar percepção de maturidade técnica, reduzir manutenção manual do portfólio e facilitar descoberta de projetos recentes.",
    },
  },
  "vet-smart-care-main": {
    featured: true,
    order: 2,
    category: "SaaS",
    status: "Em evolução",
    description:
      "Sistema completo de gerenciamento para clínicas veterinárias, pensado como SaaS operacional com dashboard e fluxos internos.",
    stack: ["TypeScript", "React", "Sistema Web", "Dashboard"],
    caseStudy: {
      enabled: true,
      problem:
        "Clínicas veterinárias precisam centralizar atendimentos, dados e rotinas operacionais em uma experiência clara para equipe e gestão.",
      solution:
        "Construir uma plataforma de gerenciamento com foco em organização, leitura rápida de informações e base preparada para módulos futuros.",
      technicalDecisions: [
        "Organizar a interface por fluxos operacionais de clínica.",
        "Priorizar componentes reutilizáveis para telas de gestão.",
        "Tratar o projeto como SaaS evolutivo, com navegação e estrutura escaláveis.",
      ],
      expectedImpact:
        "Reduzir fricção operacional e demonstrar capacidade de criar sistemas de negócio, não apenas páginas visuais.",
    },
  },
  "tattoo-morten": {
    featured: true,
    order: 3,
    category: "Landing Page",
    status: "Online",
    description:
      "Portfólio digital para artista de tatuagem Fine Line, com foco em identidade, presença visual e conversão por contato.",
    stack: ["TypeScript", "React", "Design", "Landing Page"],
    caseStudy: {
      enabled: true,
      problem:
        "Uma artista de tatuagem precisa apresentar repertório autoral, estilo visual e canal de contato de forma memorável.",
      solution:
        "Criar um portfólio digital com narrativa visual, foco em estética Fine Line e experiência direta para descoberta do trabalho.",
      technicalDecisions: [
        "Priorizar hierarquia visual e leitura mobile.",
        "Criar linguagem de marca alinhada ao segmento criativo.",
        "Manter estrutura leve para carregamento rápido.",
      ],
      expectedImpact:
        "Aumentar percepção de profissionalismo e facilitar conversão de visitantes em contatos.",
    },
  },
  psico: {
    featured: true,
    order: 4,
    category: "Landing Page",
    status: "Em evolução",
    description:
      "Experiência digital para psicologia com estética acolhedora, leitura clara e pontos de contato objetivos.",
    stack: ["TypeScript", "React", "UX", "Landing Page"],
    caseStudy: {
      enabled: true,
      problem:
        "Serviços de psicologia precisam transmitir acolhimento, confiança e clareza sem perder seriedade profissional.",
      solution:
        "Estruturar uma presença digital com narrativa clara, visual limpo e pontos de contato acessíveis.",
      technicalDecisions: [
        "Trabalhar contraste, ritmo e legibilidade como prioridade.",
        "Organizar blocos de conteúdo para descoberta gradual.",
        "Preparar experiência responsiva para visitantes mobile.",
      ],
      expectedImpact:
        "Gerar confiança em poucos segundos e orientar o visitante até o contato.",
    },
  },
  afrozrep: {
    featured: false,
    order: 5,
    category: "Sistema Web",
    status: "Em evolução",
    description:
      "Projeto digital com identidade visual forte, estrutura moderna e base preparada para evolução de interface.",
    stack: ["TypeScript", "React", "Design System"],
    caseStudy: {
      enabled: true,
      problem:
        "Projetos digitais com identidade forte precisam equilibrar expressão visual, organização e funcionamento técnico.",
      solution:
        "Construir uma interface com direção visual própria, componentes reutilizáveis e estrutura pronta para expansão.",
      technicalDecisions: [
        "Separar composição visual de dados e conteúdo.",
        "Criar base responsiva para múltiplos contextos de uso.",
        "Usar stack moderna para facilitar manutenção e evolução.",
      ],
      expectedImpact:
        "Transformar identidade em experiência utilizável e tecnicamente sustentável.",
    },
  },
};

export function getProjectCuration(repoName: string) {
  return projectCuration[repoName] ?? {};
}
