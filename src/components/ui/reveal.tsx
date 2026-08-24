"use client";

import { motion, type Transition } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Затримка появи — для каскаду сусідніх елементів. */
  delay?: number;
  /** Звідки «виїжджає» блок. */
  from?: "bottom" | "left" | "right" | "none";
  className?: string;
  as?: "div" | "li" | "article" | "section";
};

const OFFSET = {
  bottom: { y: 28, x: 0 },
  left: { y: 0, x: -28 },
  right: { y: 0, x: 28 },
  none: { y: 0, x: 0 },
} as const;

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
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ ...TRANSITION, delay }}
    >
      {children}
    </MotionTag>
  );
}
