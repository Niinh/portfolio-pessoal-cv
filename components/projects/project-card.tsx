import { ArrowUpRight, CalendarDays, GitFork, Star } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";
import type { PortfolioProject } from "@/types/project";

interface ProjectCardProps {
  project: PortfolioProject;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const caseHref = `/projetos/${project.slug}`;
  const primaryHref = project.hasCase ? caseHref : project.url;

  return (
    <Reveal className="project-card" delay={index * 0.05}>
      <Link
        aria-label={`Abrir projeto ${project.name}`}
        href={primaryHref}
        target={project.hasCase ? undefined : "_blank"}
      >
        <div className="project-card__top">
          <span className="project-type">{project.category}</span>
          <ArrowUpRight aria-hidden size={18} />
        </div>
        <div className="project-visual" aria-hidden>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <i />
            <i />
            <i />
          </div>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-meta">
          <span>{project.status}</span>
          <span>
            <CalendarDays aria-hidden size={14} />
            {formatDate(project.pushedAt)}
          </span>
        </div>
        <ul className="stack-list">
          {(project.stack.length ? project.stack : ["GitHub"]).map((stack) => (
            <li key={stack}>{stack}</li>
          ))}
        </ul>
        <div className="repo-stats">
          <span>
            <Star aria-hidden size={14} />
            {project.stars}
          </span>
          <span>
            <GitFork aria-hidden size={14} />
            {project.forks}
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
