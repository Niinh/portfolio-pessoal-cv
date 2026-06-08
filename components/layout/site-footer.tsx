import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">Disponível para projetos digitais</p>
        <h2>Vamos construir algo que pareça sério desde o primeiro clique.</h2>
      </div>
      <div className="footer-links">
        <Link href={`mailto:${siteConfig.contact.email}`}>Email</Link>
        <Link href={siteConfig.links.github} target="_blank">
          GitHub
        </Link>
        <Link href={siteConfig.links.linkedin} target="_blank">
          LinkedIn
        </Link>
      </div>
    </footer>
  );
}
