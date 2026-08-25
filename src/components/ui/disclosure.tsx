import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Розкриття блока без анімації height.
 *
 * Анімація `height: 0 → auto` змушує браузер перераховувати layout усієї
 * сторінки нижче на кожному кадрі — на телефоні це і давало відчуття
 * «10 кадрів на секунду». Тут замість неї анімується
 * `grid-template-rows: 0fr → 1fr`, а `contain: layout` (у .disclosure)
 * локалізує перерахунок межами самого блока. JS у кадрах не бере участі.
 *
 * Клас навмисно НЕ називається `collapse`: у Tailwind уже є вбудована
 * утиліта `.collapse { visibility: collapse }`, і збіг назв робив вміст
 * невидимим.
 */
export function Disclosure({
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
    <div id={id} data-open={open} className={cn("disclosure", className)}>
      {/* Обгортка обов'язкова: саме її висоту стискає нульовий рядок сітки */}
      <div>{children}</div>
    </div>
  );
}
