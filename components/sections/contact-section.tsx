import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    "Olá, Bruno! Quero conversar sobre um projeto digital.",
  )}`;

  return (
    <section className="contact-section" id="contato">
      <Reveal className="contact-intro">
        <div className="contact-marker">
          <span />
          <small>[06]</small>
          <strong>Contato</strong>
        </div>

        <h2>
          Vamos <em>conversar.</em>
        </h2>
        <p>
          Linha direta comigo, sem gerente de conta no meio. Conte o que você quer construir e eu
          retorno com próximos passos claros para seu projeto digital.
        </p>

        <dl className="contact-details">
          <div>
            <dt>Email</dt>
            <dd>
              <Link href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</Link>
            </dd>
          </div>
          <div>
            <dt>Telefone</dt>
            <dd>
              <Link href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}>
                {siteConfig.contact.phone}
              </Link>
            </dd>
          </div>
          <div>
            <dt>Base</dt>
            <dd>{siteConfig.contact.location}</dd>
          </div>
        </dl>

        <nav className="contact-quick-actions" aria-label="Atalhos de contato">
          <Link href={whatsappUrl} target="_blank" aria-label="Chamar no WhatsApp">
            <MessageCircle aria-hidden size={21} />
          </Link>
          <Link
            href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}
            aria-label="Ligar para Bruno"
          >
            <Phone aria-hidden size={20} />
          </Link>
          <Link href={`mailto:${siteConfig.contact.email}`} aria-label="Enviar email">
            <Mail aria-hidden size={20} />
          </Link>
        </nav>

        <p className="contact-availability">Resposta em até 24h · Projetos selecionados</p>
      </Reveal>

      <Reveal className="briefing-card" delay={0.08}>
        <p className="eyebrow">Briefing</p>
        <h3>
          Envie um <em>briefing curto.</em>
        </h3>

        <form action={`https://formsubmit.co/${siteConfig.contact.formEmail}`} method="POST">
          <input type="hidden" name="_subject" value="Novo briefing pelo portfólio" />
          <input type="hidden" name="_template" value="table" />

          <div className="form-row">
            <label>
              Primeiro nome <span>*</span>
              <input name="first_name" placeholder="Bruno" required type="text" />
            </label>
            <label>
              Sobrenome <span>*</span>
              <input name="last_name" placeholder="Neves" required type="text" />
            </label>
          </div>

          <label>
            Email <span>*</span>
            <input name="email" placeholder="voce@empresa.com" required type="email" />
          </label>

          <label>
            WhatsApp <span>*</span>
            <input name="phone" placeholder="+55 11 96332-0624" required type="tel" />
          </label>

          <div className="form-row">
            <label>
              Empresa <em>opcional</em>
              <input name="company" placeholder="Studio Inc." type="text" />
            </label>
            <label>
              Site atual <em>opcional</em>
              <input name="website" placeholder="https://seu-dominio.com" type="url" />
            </label>
          </div>

          <label>
            Mensagem <em>opcional</em>
            <textarea
              name="message"
              placeholder="Ideia, indústria, prazo, orçamento ou o que devo saber."
              rows={5}
            />
          </label>

          <label className="consent-field">
            <input required type="checkbox" name="consent" value="accepted" />
            <span>Concordo com o processamento dos meus dados para retorno de contato.</span>
          </label>

          <button className="briefing-submit" type="submit">
            Enviar briefing →
          </button>
        </form>
      </Reveal>
    </section>
  );
}
