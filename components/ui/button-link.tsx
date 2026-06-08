import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: "primary" | "secondary" | "ghost";
}

export function ButtonLink({ className, variant = "primary", ...props }: ButtonLinkProps) {
  return <Link className={cn("button-link", `button-link--${variant}`, className)} {...props} />;
}
