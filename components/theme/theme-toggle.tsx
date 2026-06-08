"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export function ThemeToggle() {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      document.documentElement.dataset.theme = storedTheme;
    }
  }, []);

  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      aria-label="Alternar tema claro ou escuro"
      className="icon-button theme-toggle"
      type="button"
      onClick={toggleTheme}
    >
      <Sun aria-hidden className="theme-toggle__sun" size={18} />
      <Moon aria-hidden className="theme-toggle__moon" size={18} />
    </button>
  );
}
