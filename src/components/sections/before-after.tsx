"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CompareSlider } from "@/components/ui/compare-slider";
import { SectionHeading } from "@/components/ui/section-heading";
import { BEFORE_AFTER } from "@/content/before-after";
import { cn } from "@/lib/utils";

export function BeforeAfter() {
  const [activeId, setActiveId] = useState(BEFORE_AFTER[0].id);
  const active = BEFORE_AFTER.find((p) => p.id === activeId) ?? BEFORE_AFTER[0];

  return (
    <section
      id="before-after"
      className="relative isolate overflow-hidden bg-surface/40 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-cyan/10 blur-[130px]"
      />

      <div className="section-x mx-auto max-w-[110rem]">
        <SectionHeading
          index="02"
          eyebrow="Результат"
          title="До / Після"
          description="Один і той самий автомобіль. Потягніть смугу вбік — межа рухається разом із нею."
        />

        {/* Перемикач пар */}
        <div className="mb-8 flex flex-wrap gap-2">
          {BEFORE_AFTER.map((pair) => {
            const isActive = pair.id === activeId;
            return (
              <button
                key={pair.id}
                type="button"
                onClick={() => setActiveId(pair.id)}
                aria-pressed={isActive}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-[13px] transition-colors duration-300",
                  isActive ? "text-white" : "text-muted hover:text-paper",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="ba-pill"
                    className="absolute inset-0 rounded-full bg-spectrum"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{pair.title}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-center lg:gap-14">
          <div className="overflow-hidden rounded-sm border border-line">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <CompareSlider
                  before={active.before}
                  after={active.after}
                  beforeAlt={`${active.title} — оптика до роботи студії`}
                  afterAlt={`${active.title} — оптика після роботи студії`}
                  aspect={active.aspect}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-[0.24em] text-magenta uppercase">
              {active.title}
            </div>
            <p className="mt-4 font-display text-[clamp(1.2rem,2.6vw,1.75rem)] leading-tight font-bold tracking-[-0.02em]">
              {active.subtitle}
            </p>
            <hr className="rule-spectrum my-7" />
            <p className="text-[14px] leading-relaxed text-muted">
              Перед роботою ми фіксуємо стан оптики, а після — показуємо
              результат при вимкненому світлі в боксі. Різницю видно одразу, без
              обробки кадрів.
            </p>
            <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
              Керування: перетягніть · стрілки ← → · Home / End
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
