"use client";

import { motion, type Transition } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealFrom = "bottom" | "left" | "right" | "scale" | "none";

type RevealProps = {
  children: ReactNode;
  /** Затримка появи — для каскаду сусідніх елементів. */
  delay?: number;
  /** Характер появи блока. */
  from?: RevealFrom;
  className?: string;
  as?: "div" | "li" | "article" | "section" | "figure";
};

const OFFSET: Record<RevealFrom, { x: number; y: number; scale: number }> = {
  bottom: { x: 0, y: 28, scale: 1 },
  left: { x: -28, y: 0, scale: 1 },
  right: { x: 28, y: 0, scale: 1 },
  /** Для плиток галереї та карток: легкий наплив замість зсуву. */
  scale: { x: 0, y: 20, scale: 0.965 },
  none: { x: 0, y: 0, scale: 1 },
};

const TRANSITION: Transition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1],
};

/**
 * Поява блока при прокрутці. Спрацьовує один раз, щоб сторінка не
 * «мерехтіла» при русі вгору-вниз. Користувачам із prefers-reduced-motion
 * motion сам віддасть кінцевий стан без руху.
 */
export function Reveal({
  children,
  delay = 0,
  from = "bottom",
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  const offset = OFFSET[from];

  return (
    <MotionTag
      /* js-reveal — щоб CSS міг показати блок, якщо скрипти вимкнені */
      className={cn("js-reveal", className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ ...TRANSITION, delay }}
    >
      {children}
    </MotionTag>
  );
}
