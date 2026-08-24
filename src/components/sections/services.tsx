"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SERVICES } from "@/content/services";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Послуги подані не сіткою карток, а списком рядків: ліворуч перелік,
 * праворуч закріплене фото, яке змінюється разом з активним рядком.
 * На мобільному той самий список працює як акордеон із фото всередині.
 */
export function Services() {
  const [activeSlug, setActiveSlug] = useState(SERVICES[0].slug);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const active = SERVICES.find((s) => s.slug === activeSlug) ?? SERVICES[0];

  return (
    <section id="services" className="section-x mx-auto max-w-[110rem] py-20 sm:py-28">
      <SectionHeading
        index="01"
        eyebrow="Напрями робіт"
        title={
          <>
            Що ми робимо
            <br />з оптикою
          </>
        }
        description="Від точкового ремонту кріплення до повністю кастомної фари. Наводьте на рядок — побачите приклад роботи."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
        {/* Список напрямів */}
        <ul className="border-t border-line">
          {SERVICES.map((service, i) => {
            const isActive = service.slug === activeSlug;

            return (
              <li key={service.slug} id={service.slug} className="border-b border-line">
                {/* Заголовок обгортає кнопку: назва напряму має бути h3 для пошуку,
                    а вкладати h3 всередину button не дозволяє специфікація HTML. */}
                <h3>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlug(isActive && !isDesktop ? "" : service.slug)
                    }
                    onMouseEnter={() => isDesktop && setActiveSlug(service.slug)}
                    onFocus={() => setActiveSlug(service.slug)}
                    aria-expanded={isActive}
                    aria-controls={`${service.slug}-panel`}
                    className="group flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:py-6"
                  >
                    <span
                      className={cn(
                        "font-mono text-[11px] tracking-[0.2em] transition-colors duration-300",
                        isActive ? "text-magenta" : "text-faint",
                      )}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "flex-1 font-display text-[clamp(1.15rem,3.4vw,2rem)] leading-tight font-extrabold tracking-[-0.012em] uppercase transition-colors duration-300",
                        isActive
                          ? "text-paper"
                          : "text-paper/45 group-hover:text-paper/80",
                      )}
                    >
                      {service.title}
                    </span>

                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[13px] transition-all duration-300",
                        isActive
                          ? "rotate-45 border-magenta text-magenta"
                          : "border-line text-faint group-hover:border-line-strong",
                      )}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={`${service.slug}-panel`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-8 sm:pl-12">
                        <p className="max-w-xl text-[14px] leading-relaxed text-muted sm:text-[15px]">
                          {service.summary}
                        </p>

                        <ul className="mt-5 flex flex-wrap gap-2">
                          {service.items.map((item) => (
                            <li
                              key={item}
                              className="rounded-full border border-line px-3 py-1.5 text-[12px] text-paper/70"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>

                        {/* Фото всередині акордеона — тільки на вузьких екранах */}
                        {!isDesktop && (
                          <div className="relative mt-6 aspect-[16/11] w-full overflow-hidden rounded-sm">
                            <Image
                              src={service.image}
                              alt={service.imageAlt}
                              fill
                              sizes="100vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(5,3,8,0.8))]" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Закріплене фото — тільки на десктопі */}
        {isDesktop && (
          <div className="relative">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-line">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={active.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={active.image}
                      alt={active.imageAlt}
                      fill
                      sizes="42vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(5,3,8,0.92))]" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                  <div className="font-mono text-[10px] tracking-[0.22em] text-cyan uppercase">
                    Приклад роботи
                  </div>
                  <div className="mt-2 font-display text-lg font-bold tracking-[-0.02em]">
                    {active.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
