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
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
    >
      <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden>
        <Sun size={16} />
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden>
        <Moon size={16} />
      </span>
      <span className="theme-toggle__thumb" aria-hidden />
    </button>
  );
}
