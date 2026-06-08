import { ArrowDownRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const principles = [
  "clareza antes de efeito",
  "interface como produto",
  "performance como reputação",
  "design que vende sem gritar",
];

export function ManifestoSection() {
  return (
    <section className="manifesto-section" aria-label="Manifesto profissional">
      <Reveal className="manifesto-copy">
        <p className="eyebrow">Método</p>
        <h2>
          Eu projeto experiências digitais como sistemas vivos: bonitas na superfície,
          consistentes por dentro e úteis no dia a dia.
        </h2>
      </Reveal>
      <Reveal className="manifesto-panel" delay={0.08}>
        <ArrowDownRight aria-hidden size={28} />
        <ol>
          {principles.map((principle, index) => (
            <li key={principle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {principle}
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
