import type { Metadata } from "next";

import { ProjectFilter } from "@/components/projects/project-filter";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPortfolioProjects } from "@/lib/projects/get-projects";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos e cases sincronizados com o GitHub, filtrados por repositórios públicos com topic portfolio.",
};

export const revalidate = 1800;

export default async function ProjectsPage() {
  const projects = await getPortfolioProjects();

  return (
    <main className="inner-page">
      <Reveal>
        <SectionHeading
          eyebrow="Projetos"
          title="Repositórios públicos sincronizados e apresentados como cases."
          description="A listagem usa a GitHub API, filtra somente topic portfolio e revalida periodicamente para refletir novos projetos, commits e pushes."
        />
      </Reveal>
      <ProjectFilter projects={projects} />
    </main>
  );
}
