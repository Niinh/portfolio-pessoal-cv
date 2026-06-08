import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/profile-data";

export function ServicesSection() {
  return (
    <section className="page-section services-section" id="servicos">
      <Reveal>
        <SectionHeading
          eyebrow="Serviços"
          title="Soluções digitais com estética de produto e mentalidade de escala."
          description="Cada entrega nasce para resolver um problema de negócio, comunicar valor com clareza e sustentar evolução técnica depois do lançamento."
        />
      </Reveal>

      <div className="services-stack">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <Reveal className="service-card" key={service.title} delay={index * 0.04}>
              <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="service-title-row">
                <div className="service-icon">
                  <Icon aria-hidden size={22} />
                </div>
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
