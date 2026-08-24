"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { VariantBoard } from "./variant-board";
import { DESIGN_VARIANTS } from "../variants";

export function DesignLab() {
  const [activeId, setActiveId] = useState(DESIGN_VARIANTS[0].id);
  const active = DESIGN_VARIANTS.find((v) => v.id === activeId) ?? DESIGN_VARIANTS[0];

  return (
    <div className="min-h-dvh bg-void">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-void/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[100rem] flex-col gap-4 px-4 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-sm font-semibold tracking-[-0.02em] text-paper">
              L.D_Studio
            </span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-faint uppercase">
              вибір дизайн-напряму
            </span>
          </div>

          <nav
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0 lg:pb-0"
            aria-label="Варіанти дизайну"
          >
            {DESIGN_VARIANTS.map((v) => {
              const isActive = v.id === activeId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveId(v.id)}
                  aria-pressed={isActive}
                  className={`relative shrink-0 rounded-full border px-4 py-2 text-[13px] whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-transparent text-void"
                      : "border-white/12 text-muted hover:border-white/30 hover:text-paper"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="lab-tab"
                      className="absolute inset-0 rounded-full"
                      style={{ background: v.tokens["--v-accent"] }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10 font-mono text-[10px] tracking-[0.18em] opacity-70">
                    {v.index}
                  </span>{" "}
                  <span className="relative z-10">{v.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[100rem] px-4 py-8 sm:px-8 sm:py-12">
        <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-muted">
          Чотири різні напрями для сайту студії. Це не одна верстка в різних
          кольорах — у кожного своя композиція першого екрана, своя типографічна
          ієрархія та своя логіка анімації. Оберіть один, і я розгорну повний сайт
          саме в цьому напрямі.
        </p>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <VariantBoard variant={active} />
        </motion.div>

        <footer className="mt-10 border-t border-white/10 pt-8 pb-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="font-display text-lg text-paper">Як обрати</h2>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted">
                Напишіть номер напряму — <span className="font-mono">01</span>,{" "}
                <span className="font-mono">02</span>,{" "}
                <span className="font-mono">03</span> або{" "}
                <span className="font-mono">04</span>. Можна змішувати: наприклад
                «база 01, але акцент бурштиновий з 03» або «01, тільки шрифт як у
                04». Далі я зберу повний сайт: перший екран, послуги, галерея робіт,
                повзунок «до/після», етапи роботи, карта, контакти, SEO та мобільна
                версія.
              </p>
            </div>
            <div className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
              /design · чернетка
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
