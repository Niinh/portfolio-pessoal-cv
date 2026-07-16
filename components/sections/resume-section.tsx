import { GraduationCap, Sparkles, Trophy } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { education, experiences, skills } from "@/lib/profile-data";

export function ResumeSection() {
  return (
    <section className="page-section resume-section" id="resumo">
      <Reveal>
        <SectionHeading
          eyebrow="Resumo"
          title="Experiência comercial, base técnica e evolução constante."
          description="As informações do currículo foram preservadas e reorganizadas para leitura mais rápida, com foco em trajetória, formação e competências."
        />
      </Reveal>

      <div className="resume-grid">
        <Reveal className="timeline-column" delay={0.05}>
          <div className="timeline-title">
            <GraduationCap aria-hidden size={20} />
            <h3>Educação</h3>
          </div>
          <ol className="timeline-list">
            {education.map((item, index) => (
              <li key={`${item.title}-${item.period}`}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <span>{item.period}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="timeline-column" delay={0.1}>
          <div className="timeline-title">
            <Trophy aria-hidden size={20} />
            <h3>Experiências</h3>
          </div>
          <ol className="timeline-list timeline-list--plain">
            {experiences.map((item) => (
              <li key={`${item.title}-${item.period}`}>
                <span>{item.period}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <Reveal className="skills-band">
        <div>
          <Sparkles aria-hidden size={18} />
          <strong>Competências</strong>
        </div>
        <ul>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
