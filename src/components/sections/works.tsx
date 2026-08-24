"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Lightbox } from "@/components/ui/lightbox";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WORKS } from "@/content/works";

export function Works() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  /* Стабільне посилання — щоб ефекти всередині Lightbox не перезапускались дарма */
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  return (
    <section id="works" className="section-x mx-auto max-w-[110rem] py-20 sm:py-28">
      <SectionHeading
        index="03"
        eyebrow="Портфоліо"
        title="Роботи студії"
        description={`Реальні кадри з боксу, без стоку й рендерів. Усього робіт у галереї — ${WORKS.length}.`}
      />

      {/* «Цегляна» сітка: вертикальні й горизонтальні кадри без порожнеч */}
      <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
        {WORKS.map((work, i) => (
          <Reveal
            key={work.id}
            delay={(i % 3) * 0.06}
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
                className="w-full transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.04]"
              />

              {/* Затемнення й підпис */}
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
                <span className="mt-3 block font-display text-base font-bold tracking-[-0.02em]">
                  {work.title}
                </span>
                <span className="mt-1 block max-h-0 overflow-hidden text-[13px] leading-snug text-muted opacity-0 transition-all duration-500 ease-[var(--ease-out-quint)] group-hover:max-h-16 group-hover:opacity-100">
                  {work.caption}
                </span>
              </span>

              {/* Кутовий маркер */}
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
        works={WORKS}
        index={openIndex}
        onClose={closeLightbox}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
