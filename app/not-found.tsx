import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <p className="eyebrow">404</p>
      <h1>Esta rota ainda não virou produto.</h1>
      <p>Volte para a experiência principal ou confira os projetos sincronizados com o GitHub.</p>
      <ButtonLink href="/">Voltar ao início</ButtonLink>
    </main>
  );
}
