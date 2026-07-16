"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { navItems, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    closeMenu();

    if (pathname === "/") {
      event.preventDefault();
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function getNavHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") return `/${href}`;
    return href;
  }

  function isActive(href: string) {
    return href === "/projetos" ? pathname.startsWith("/projetos") : false;
  }

  return (
    <header className="site-header">
      <Link className="brand-mark" href="/" onClick={handleLogoClick} aria-label="Ir para o topo">
        <span className="brand-logo" aria-hidden>
          <Image src="/images/logo-b.png" alt="" width={38} height={38} priority />
        </span>
        <strong>{siteConfig.name}</strong>
      </Link>

      <nav className={cn("site-nav", isOpen && "site-nav--open")} aria-label="Navegação principal">
        {navItems.map((item) => (
          <Link
            key={item.href}
            className={cn(isActive(item.href) && "active")}
            href={getNavHref(item.href)}
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <button
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          className="icon-button menu-toggle"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden size={18} /> : <Menu aria-hidden size={18} />}
        </button>
      </div>
    </header>
  );
}
