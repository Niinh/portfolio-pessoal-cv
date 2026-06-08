"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { navItems, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <Link className="brand-mark" href="/" onClick={closeMenu} aria-label="Ir para início">
        <span>BN</span>
        <strong>{siteConfig.name}</strong>
      </Link>

      <nav className={cn("site-nav", isOpen && "site-nav--open")} aria-label="Navegação principal">
        {navItems.map((item) => (
          <Link
            key={item.href}
            className={cn(pathname === item.href && "active")}
            href={item.href}
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
