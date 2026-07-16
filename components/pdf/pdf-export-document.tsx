import { ArrowUpRight, BriefcaseBusiness, Code2, GraduationCap, Mail, Phone, Sparkles } from "lucide-react";
import Image from "next/image";

import { aboutParagraphs, education, experiences, services, skills } from "@/lib/profile-data";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";
import type { PortfolioProject } from "@/types/project";

interface PdfExportDocumentProps {
  projects: PortfolioProject[];
}

const projectPageSize = 4;

function chunkProjects(projects: PortfolioProject[]) {
  const curatedProjects = projects.slice(0, 8);
  const chunks: PortfolioProject[][] = [];

  for (let index = 0; index < curatedProjects.length; index += projectPageSize) {
    chunks.push(curatedProjects.slice(index, index + projectPageSize));
  }

  return chunks;
}

export function PdfExportDocument({ projects }: PdfExportDocumentProps) {
  const projectPages = chunkProjects(projects);

  return (
    <div className="pdf-document" id="portfolio-pdf-document">
      <section className="pdf-page pdf-page--cover">
        <div className="pdf-page__chrome" aria-hidden />
        <header className="pdf-cover-header">
          <Image src="/images/logo-b.png" alt="" width={52} height={52} priority unoptimized />
          <div>
            <span>Currículo - Portfólio</span>
            <strong className="pdf-cover-name" aria-label={siteConfig.name}>
              <span>Bruno</span>
              <span>Neves</span>
            </strong>
          </div>
        </header>

        <div className="pdf-cover-grid">
          <div className="pdf-cover-copy">
            <p className="pdf-kicker">Sistemas web / SaaS / Design digital</p>
            <h1>
              Soluções digitais modernas para vender, operar e crescer.
            </h1>
            <p>
              Desenvolvedor web e designer digital com foco em interfaces premium, sites de alta
              conversão, produtos SaaS, automações e experiências visuais para negócios.
            </p>
          </div>

          <aside className="pdf-profile-card">
            <div className="pdf-profile-card__image">
              <Image
                src="/images/bruno-avatar.png"
                alt="Bruno Neves"
                width={220}
                height={220}
                priority
                unoptimized
              />
            </div>
            <div>
              <strong>{siteConfig.name}</strong>
              <span>{siteConfig.role}</span>
            </div>
          </aside>
        </div>

        <div className="pdf-about-panel">
          <span>Sobre</span>
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className="pdf-contact-strip">
          <div>
            <dt>Email</dt>
            <dd>
              <Mail aria-hidden size={14} />
              {siteConfig.contact.email}
            </dd>
          </div>
          <div>
            <dt>Telefone</dt>
            <dd>
              <Phone aria-hidden size={14} />
              {siteConfig.contact.phone}
            </dd>
          </div>
          <div>
            <dt>Portfólio</dt>
            <dd>{siteConfig.siteUrl.replace("https://", "")}</dd>
          </div>
        </dl>
      </section>

      <section className="pdf-page pdf-page--resume">
        <div className="pdf-page__chrome" aria-hidden />
        <header className="pdf-page-heading pdf-page-heading--split">
          <div>
            <span>01 / Currículo</span>
            <h2>Experiência comercial, base técnica e evolução constante.</h2>
          </div>
        </header>

        <div className="pdf-resume-layout">
          <article className="pdf-timeline-card">
            <div className="pdf-card-title">
              <BriefcaseBusiness aria-hidden size={17} />
                <h3>Experiências</h3>
            </div>
            <ol className="pdf-timeline-list pdf-timeline-list--plain">
              {experiences.map((item) => (
                <li key={`${item.title}-${item.period}`}>
                  <span>{item.period}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </article>

          <aside className="pdf-side-stack">
            <article className="pdf-timeline-card pdf-timeline-card--compact">
              <div className="pdf-card-title">
                <GraduationCap aria-hidden size={17} />
                <h3>Educação</h3>
              </div>
              <ol className="pdf-timeline-list pdf-timeline-list--compact">
                {education.map((item, index) => (
                  <li key={`${item.title}-${item.period}`}>
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                    <span>{item.period}</span>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ol>
            </article>

            <article className="pdf-skills-card">
              <div className="pdf-card-title">
                <Sparkles aria-hidden size={17} />
                <h3>Competências</h3>
              </div>
              <ul>
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          </aside>
        </div>
      </section>

      {(projectPages.length ? projectPages : [[]]).map((pageProjects, pageIndex) => (
        <section className="pdf-page pdf-page--projects" key={`projects-${pageIndex}`}>
          <div className="pdf-page__chrome" aria-hidden />
          <header className="pdf-page-heading pdf-page-heading--split">
            <div>
              <span>{String(pageIndex + 2).padStart(2, "0")} / Projetos</span>
              <h2>Cases sincronizados com GitHub, tratados como produto.</h2>
            </div>
            <p>Repositórios públicos com curadoria, stack, status e contexto técnico.</p>
          </header>

          {pageProjects.length > 0 ? (
            <div className="pdf-project-grid">
              {pageProjects.map((project, index) => (
                <article className="pdf-project-card" key={project.id}>
                  <div className="pdf-project-card__visual" aria-hidden>
                    <span>{String(pageIndex * projectPageSize + index + 1).padStart(2, "0")}</span>
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="pdf-project-card__content">
                    <div className="pdf-project-card__top">
                      <span>{project.category}</span>
                      <small>{project.status}</small>
                    </div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <ul>
                      {(project.stack.length ? project.stack : ["GitHub"]).slice(0, 5).map((stack) => (
                        <li key={stack}>{stack}</li>
                      ))}
                    </ul>
                    <footer>
                      <span>Atualizado em {formatDate(project.pushedAt)}</span>
                      <ArrowUpRight aria-hidden size={15} />
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="pdf-empty-projects">
              <h3>Projetos em sincronização</h3>
              <p>
                A vitrine está preparada para buscar repositórios públicos do GitHub marcados com o
                tópico portfolio.
              </p>
            </div>
          )}
        </section>
      ))}

      <section className="pdf-page pdf-page--services">
        <div className="pdf-page__chrome" aria-hidden />
        <header className="pdf-page-heading pdf-page-heading--split">
          <div>
            <span>{String(projectPages.length + 2).padStart(2, "0")} / Serviços</span>
            <h2>Soluções digitais com estética de produto e mentalidade de escala.</h2>
          </div>
        </header>

        <div className="pdf-services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article className="pdf-service-card" key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden size={20} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>

        <footer className="pdf-final-strip">
          <div>
            <Code2 aria-hidden size={18} />
            <strong>{siteConfig.siteUrl.replace("https://", "")}</strong>
          </div>
        </footer>
      </section>
    </div>
  );
}
