"use client";

import { useEffect, useRef, useState } from "react";
import { CompareSlider } from "@/components/ui/compare-slider";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BEFORE_AFTER } from "@/content/before-after";
import { cn } from "@/lib/utils";

export function BeforeAfter() {
  const [activeId, setActiveId] = useState(BEFORE_AFTER[0].id);
  const active = BEFORE_AFTER.find((p) => p.id === activeId) ?? BEFORE_AFTER[0];

  const switcherRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  /*
   * Підкладка активної кнопки їде за нею, як і раніше. Позицію знімаємо
   * з самої кнопки й пишемо прямо в стиль — без стану, без зайвого
   * перерендеру й без бібліотеки layout-анімацій.
   */
  useEffect(() => {
    const move = () => {
      const switcher = switcherRef.current;
      const pill = pillRef.current;
      if (!switcher || !pill) return;

      const button = switcher.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!button) return;

      pill.style.width = `${button.offsetWidth}px`;
      pill.style.height = `${button.offsetHeight}px`;
      pill.style.transform = `translate3d(${button.offsetLeft}px, ${button.offsetTop}px, 0)`;
      pill.style.opacity = "1";
    };

    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [activeId]);

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
        <div ref={switcherRef} className="relative mb-8 flex flex-wrap gap-2">
          <span
            ref={pillRef}
            aria-hidden
            className="bg-spectrum ease-[var(--ease-out-quint)] absolute top-0 left-0 rounded-full opacity-0 transition-[transform,width,height] duration-400"
          />
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
                <span className="relative z-10">{pair.title}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-center lg:gap-14">
          <Reveal from="scale" className="overflow-hidden rounded-sm border border-line">
            {/* key на пару: зміна пари перемонтовує повзунок, і затухання
                програється заново */}
            <div
              key={active.id}
              className="animate-fade-in"
              style={{ animationDuration: "0.25s" }}
            >
              <CompareSlider
                before={active.before}
                after={active.after}
                beforeAlt={`${active.title} — оптика до роботи студії`}
                afterAlt={`${active.title} — оптика після роботи студії`}
                aspect={active.aspect}
              />
            </div>
          </Reveal>

          <Reveal from="right" delay={0.1}>
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
