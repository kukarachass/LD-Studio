import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Розкриття блока без анімації height.
 *
 * Анімація `height: 0 → auto` змушує браузер перераховувати layout усієї
 * сторінки нижче на кожному кадрі — на телефоні це і давало відчуття
 * «10 кадрів на секунду». Тут замість неї анімується
 * `grid-template-rows: 0fr → 1fr`, а `contain: layout` (у .collapse)
 * локалізує перерахунок межами самого блока. JS у кадрах не бере участі.
 */
export function Collapse({
  open,
  id,
  children,
  className,
}: {
  open: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div id={id} data-open={open} className={cn("collapse", className)}>
      {/* Обгортка обов'язкова: саме її висоту стискає нульовий рядок сітки */}
      <div>{children}</div>
    </div>
  );
}
