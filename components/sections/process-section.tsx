import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    title: "Diagnóstico",
    text: "Entendo objetivo, público, fluxo comercial e restrições antes de desenhar qualquer tela.",
  },
  {
    title: "Direção",
    text: "Defino narrativa visual, hierarquia, componentes e uma experiência com cara de produto.",
  },
  {
    title: "Construção",
    text: "Transformo o design em código responsivo, performático e pronto para manutenção.",
  },
  {
    title: "Evolução",
    text: "Ajusto, publico, sincronizo projetos e preparo a base para novas versões.",
  },
];

export function ProcessSection() {
  return (
    <section className="process-section">
      <Reveal className="process-heading">
        <p className="eyebrow">Processo</p>
        <h2>Do primeiro briefing ao deploy, sem perder intenção no caminho.</h2>
      </Reveal>
      <div className="process-rail">
        {steps.map((step, index) => (
          <Reveal className="process-step" delay={index * 0.05} key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
