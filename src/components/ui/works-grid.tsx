"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Lightbox } from "@/components/ui/lightbox";
import { Reveal } from "@/components/ui/reveal";
import type { Work } from "@/content/works";

/**
 * «Цегляна» сітка робіт із повноекранним переглядом.
 *
 * Спільна для головної (де показуємо частину робіт) і для сторінки
 * /roboty (де показуємо всі) — щоб верстка й поведінка не розповзались
 * між двома місцями.
 */
export function WorksGrid({
  works,
  /** Пріоритетне завантаження перших кадрів — для сторінки, де сітка вгорі. */
  priorityCount = 0,
}: {
  works: Work[];
  priorityCount?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  /* Стабільне посилання — щоб ефекти всередині Lightbox не перезапускались дарма */
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
        {works.map((work, i) => (
          <Reveal
            key={work.id}
            from="scale"
            delay={(i % 3) * 0.07}
            className="mb-3 break-inside-avoid sm:mb-4"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block w-full overflow-hidden rounded-sm border border-line text-left transition-colors duration-300 hover:border-line-strong"
              aria-label={`Відкрити роботу: ${work.title}`}
            >
              <Image
                src={work.image}
                alt={`${work.title}: ${work.caption}`}
                width={work.width}
                height={work.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={i < priorityCount}
                className="ease-[var(--ease-out-quint)] w-full transition-transform duration-700 group-hover:scale-[1.04]"
              />

              <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,3,8,0.92)_100%)]" />

              <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <span className="flex flex-wrap gap-1.5">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-void/50 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-paper/70 uppercase backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="font-display mt-3 block text-base font-bold tracking-[-0.02em]">
                  {work.title}
                </span>
                <span className="ease-[var(--ease-out-quint)] mt-1 block max-h-0 overflow-hidden text-[13px] leading-snug text-muted opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
                  {work.caption}
                </span>
              </span>

              <span
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-void/50 text-sm text-paper/70 backdrop-blur-sm transition-colors duration-300 group-hover:border-magenta group-hover:text-magenta"
                aria-hidden
              >
                ↗
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox
        works={works}
        index={openIndex}
        onClose={closeLightbox}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
