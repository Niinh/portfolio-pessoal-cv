"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SplitHeadlineProps {
  lines: string[];
  className?: string;
  wordClassName?: string;
}

export function SplitHeadline({ lines, className, wordClassName }: SplitHeadlineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <h1 className={cn("split-headline", className)}>
      {lines.map((line, lineIndex) => (
        <span className="split-headline__line" key={line}>
          {line.split(" ").map((word, wordIndex, words) => (
            <motion.span
              className={cn("split-headline__word", wordClassName)}
              initial={prefersReducedMotion ? false : { y: "115%", rotate: 3, opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { y: "0%", rotate: 0, opacity: 1 }}
              transition={{
                duration: 0.86,
                delay: 0.12 + lineIndex * 0.14 + wordIndex * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
              key={`${line}-${word}-${wordIndex}`}
            >
              {word}
              {wordIndex < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
          {lineIndex < lines.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
