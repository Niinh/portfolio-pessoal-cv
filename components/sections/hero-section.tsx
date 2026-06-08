import { ArrowDown, ArrowRight, Mail, Sparkles } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { ButtonLink } from "@/components/ui/button-link";
import { aboutParagraphs } from "@/lib/profile-data";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  return (
    <section className="hero-section" id="sobre">
      <div className="hero-noise" aria-hidden />
      <div className="hero-signature" aria-hidden>
        Bruno
      </div>

      <Reveal className="hero-content">
        <div className="hero-kicker">
          <span />
          Web systems / SaaS / Visual design
        </div>
        <SplitHeadline
          lines={["Sistemas web", "com presença de", "marca forte."]}
          wordClassName="hero-title-word"
        />
        <p className="hero-subtitle">
          Desenvolvo portfólios, landing pages, SaaS e automações para negócios que precisam
          parecer confiáveis, modernos e prontos para crescer desde a primeira dobra.
        </p>
        <div className="hero-actions">
          <ButtonLink href="#contato">
            <Mail aria-hidden size={18} />
            Iniciar conversa
          </ButtonLink>
          <ButtonLink href="/projetos" variant="secondary">
            Ver projetos
            <ArrowRight aria-hidden size={18} />
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal className="hero-aside" delay={0.15}>
        <div className="hero-portrait-card">
          <div className="portrait-frame">
            <Image
              alt="Bruno Neves"
              src="/images/bruno-avatar.png"
              fill
              priority
              sizes="(max-width: 760px) 112px, 220px"
            />
            <span>Disponível para projetos selecionados</span>
          </div>
          <div className="portrait-meta">
            <strong>{siteConfig.name}</strong>
            <p>{siteConfig.role}</p>
          </div>
        </div>

        <div className="about-panel">
          <div className="panel-heading">
            <Sparkles aria-hidden size={18} />
            <span>Sobre mim</span>
          </div>
          {aboutParagraphs.slice(0, 2).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="signal-row" aria-label="Sinais de entrega profissional">
          <span>estratégia</span>
          <span>interface</span>
          <span>código</span>
        </div>
      </Reveal>

      <a className="scroll-cue" href="#resumo" aria-label="Rolar para resumo">
        <ArrowDown aria-hidden size={18} />
        scroll
      </a>
    </section>
  );
}
