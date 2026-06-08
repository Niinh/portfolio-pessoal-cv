import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { getPortfolioProjects, getProjectBySlug } from "@/lib/projects/get-projects";
import { formatDate } from "@/lib/utils";

export const revalidate = 1800;

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();

  return projects.filter((project) => project.hasCase).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case não encontrado",
    };
  }

  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="case-page">
      <Link className="back-link" href="/projetos">
        <ArrowLeft aria-hidden size={18} />
        Voltar para projetos
      </Link>

      <section className="case-hero">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
        <aside className="case-summary">
          <span>Status: {project.status}</span>
          <span>Atualizado: {formatDate(project.pushedAt)}</span>
          <span>Stack: {project.stack.length ? project.stack.join(", ") : "GitHub"}</span>
        </aside>
      </section>

      <section className="case-content">
        <article>
          <span>01</span>
          <h2>Problema</h2>
          <p>{project.caseStudy.problem}</p>
        </article>
        <article>
          <span>02</span>
          <h2>Solução</h2>
          <p>{project.caseStudy.solution}</p>
        </article>
        <article>
          <span>03</span>
          <h2>Decisões técnicas</h2>
          <ul>
            {project.caseStudy.technicalDecisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </article>
        <article>
          <span>04</span>
          <h2>Resultado esperado</h2>
          <p>{project.caseStudy.expectedImpact}</p>
        </article>
      </section>

      <div className="case-actions">
        <ButtonLink href={project.url} target="_blank" variant="secondary">
          <GitBranch aria-hidden size={18} />
          Ver repositório
        </ButtonLink>
        {project.homepage ? (
          <ButtonLink href={project.homepage} target="_blank">
            <ExternalLink aria-hidden size={18} />
            Abrir projeto
          </ButtonLink>
        ) : null}
      </div>
    </main>
  );
}
