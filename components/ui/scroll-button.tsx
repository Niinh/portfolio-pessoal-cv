"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ScrollButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  targetId: string;
  variant?: "primary" | "secondary" | "ghost" | "unstyled";
}

export function ScrollButton({
  children,
  className,
  targetId,
  variant = "primary",
  ...props
}: ScrollButtonProps) {
  function handleClick() {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "/");
  }

  return (
    <button
      className={cn(variant !== "unstyled" && ["button-link", `button-link--${variant}`], className)}
      type="button"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
