"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
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

const FROM_CLASS: Record<RevealFrom, string> = {
  bottom: "reveal-bottom",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  none: "",
};

/**
 * Один спостерігач на всю сторінку.
 *
 * Раніше кожен блок мав власну motion-анімацію і власний
 * IntersectionObserver — при шести десятках блоків це помітна робота
 * на етапі гідратації. Тепер JS лише додає клас, а рух робить CSS
 * на композиторі.
 */
let sharedObserver: IntersectionObserver | null = null;
const pending = new WeakMap<Element, () => void>();

function observe(element: Element, onEnter: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    onEnter();
    return () => {};
  }

  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        pending.get(entry.target)?.();
        pending.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
      }
    },
    { rootMargin: "-12% 0px -8% 0px", threshold: 0.01 },
  );

  pending.set(element, onEnter);
  sharedObserver.observe(element);

  return () => {
    pending.delete(element);
    sharedObserver?.unobserve(element);
  };
}

/** Поява блока при прокрутці. Спрацьовує один раз. */
export function Reveal({
  children,
  delay = 0,
  from = "bottom",
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const Tag = as as ElementType;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    /*
     * Якщо блок уже у в'юпорті на момент монтування, показуємо його самі —
     * спостерігач у цьому випадку може не спрацювати. Клас додаємо
     * наступним кадром, щоб CSS-перехід справді програвся: поведінка
     * така сама, як була раніше.
     */
    const box = element.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    return observe(element, () => setVisible(true));
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", FROM_CLASS[from], visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
