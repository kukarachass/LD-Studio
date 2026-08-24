import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  /** Порядковий індекс секції у моношрифті. */
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  /** Дія праворуч від заголовка (кнопка, лічильник). */
  aside?: ReactNode;
};

/**
 * Єдиний заголовок для всіх секцій: індекс + короткий рубрикатор ліворуч,
 * великий заголовок нижче. Індекс навмисно винесений у поле — так сторінка
 * читається як каталог робіт, а не як типовий лендинг.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  aside,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 sm:mb-16", className)}>
      <Reveal from="left">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-magenta">
            {index}
          </span>
          <span className="h-px w-10 bg-spectrum sm:w-16" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase">
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,5.2vw,3.6rem)] leading-[0.98] font-extrabold tracking-[-0.012em] text-balance uppercase">
            {title}
          </h2>
        </Reveal>

        {(description || aside) && (
          <Reveal delay={0.12} className="lg:max-w-sm lg:shrink-0">
            {description && (
              <p className="text-[15px] leading-relaxed text-muted">{description}</p>
            )}
            {aside && <div className="mt-5">{aside}</div>}
          </Reveal>
        )}
      </div>
    </div>
  );
}
