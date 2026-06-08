import { GitBranch, RefreshCw } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import type { PortfolioProject } from "@/types/project";

interface ProjectsPreviewSectionProps {
  projects: PortfolioProject[];
}

export function ProjectsPreviewSection({ projects }: ProjectsPreviewSectionProps) {
  return (
    <section className="page-section projects-section" id="projetos">
      <Reveal>
        <SectionHeading
          eyebrow="Projetos"
          title="Cases sincronizados com GitHub, tratados como produto."
          description="A vitrine busca seus repositórios públicos, aplica cache inteligente e permite curadoria local para destacar os projetos que melhor vendem sua capacidade técnica."
        />
      </Reveal>

      <Reveal className="sync-panel">
        <div>
          <RefreshCw aria-hidden size={18} />
          <span>Sincronização automática via GitHub API e ISR</span>
        </div>
        <ButtonLink href="/projetos" variant="ghost">
          Abrir todos
        </ButtonLink>
      </Reveal>

      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <Reveal className="empty-state">
          <GitBranch aria-hidden size={28} />
          <h3>Pronto para sincronizar seus projetos.</h3>
          <p>
            Nenhum repositório público de {siteConfig.githubUsername} foi encontrado agora.
            Verifique <strong>GITHUB_USERNAME</strong>, <strong>GITHUB_SYNC_MODE</strong> e, em
            produção, configure <strong>GITHUB_TOKEN</strong> no ambiente.
          </p>
          <ButtonLink href={siteConfig.links.github} target="_blank" variant="secondary">
            Ver GitHub
          </ButtonLink>
        </Reveal>
      )}
    </section>
  );
}
