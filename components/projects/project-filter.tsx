"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import type { PortfolioProject, ProjectCategory } from "@/types/project";

interface ProjectFilterProps {
  projects: PortfolioProject[];
}

const allLabel = "Todos";

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | typeof allLabel>(allLabel);

  const categories = useMemo(() => {
    const uniqueCategories = new Set<ProjectCategory>();
    projects.forEach((project) => uniqueCategories.add(project.category));
    return [allLabel, ...Array.from(uniqueCategories)] as const;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === allLabel) return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  if (projects.length === 0) {
    return (
      <div className="empty-state empty-state--wide">
        <h2>Nenhum projeto com topic portfolio encontrado.</h2>
        <p>
          Adicione o topic <strong>portfolio</strong> aos repositórios públicos no GitHub para
          ativar a sincronização automática desta página.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="filter-bar" aria-label="Filtros de projetos">
        {categories.map((category) => (
          <button
            aria-pressed={activeCategory === category}
            className={activeCategory === category ? "active" : undefined}
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="projects-grid projects-grid--page">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </>
  );
}
