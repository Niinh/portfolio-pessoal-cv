"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { navItems, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionId = sessionStorage.getItem("portfolio-scroll-target");
    if (!sectionId) return;

    sessionStorage.removeItem("portfolio-scroll-target");
    requestAnimationFrame(() => {
      scrollToSection(sectionId);
    });
  }, [pathname]);

  function closeMenu() {
    setIsOpen(false);
  }

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "/");
  }

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    closeMenu();

    if (pathname === "/") {
      event.preventDefault();
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function isActive(href: string) {
    return href === "/projetos" ? pathname.startsWith("/projetos") : false;
  }

  function handleSectionClick(sectionId: string) {
    closeMenu();

    if (pathname === "/") {
      scrollToSection(sectionId);
      return;
    }

    sessionStorage.setItem("portfolio-scroll-target", sectionId);
    router.push("/");
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
        {navItems.map((item) =>
          item.href.startsWith("#") ? (
            <button key={item.href} type="button" onClick={() => handleSectionClick(item.href.slice(1))}>
              {item.label}
            </button>
          ) : (
            <Link
              key={item.href}
              className={cn(isActive(item.href) && "active")}
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ),
        )}
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
