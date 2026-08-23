"use client";

import Image from "next/image";
import { useState } from "react";
import { HeroMock } from "./hero-mocks";
import type { DesignVariant } from "../variants";

/* ---------------------------------------------------------------- */

function BoardSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--v-line)] px-5 py-10 sm:px-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-[10px] tracking-[0.28em] text-[var(--v-accent)] uppercase">
          {label}
        </span>
        <h4 className="text-lg text-[var(--v-text)]">{title}</h4>
      </div>
      {children}
    </section>
  );
}

/* ---------------------------------------------------------------- */

function PaletteGrid({ variant }: { variant: DesignVariant }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(hex: string) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      /* буфер обміну недоступний — не критично */
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {variant.swatches.map((s) => (
        <button
          key={s.hex}
          type="button"
          onClick={() => copy(s.hex)}
          className="group text-left"
          title="Клікніть, щоб скопіювати"
        >
          <div
            className="mb-2 aspect-[4/3] w-full border border-[var(--v-line)] transition-transform group-hover:-translate-y-1"
            style={{ background: s.hex, borderRadius: "var(--v-radius)" }}
          />
          <div className="font-mono text-[11px] text-[var(--v-text)]">
            {copied === s.hex ? "скопійовано" : s.hex}
          </div>
          <div className="text-[11px] text-[var(--v-muted)]">{s.name}</div>
          <div className="text-[10px] text-[var(--v-muted)] opacity-70">{s.role}</div>
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */

function TypeSpecimen({ variant }: { variant: DesignVariant }) {
  const rows = [
    {
      role: "Дисплейний",
      family: variant.typography.display,
      note: variant.typography.displayNote,
      sample: "Відновлення оптики",
      className: "text-[clamp(1.6rem,4.4vw,2.8rem)] leading-[1.05] tracking-[-0.03em]",
      style: { fontFamily: "var(--v-font-display)", fontWeight: 600 },
    },
    {
      role: "Текстовий",
      family: variant.typography.body,
      note: variant.typography.bodyNote,
      sample:
        "Усуваємо запотівання, відновлюємо герметичність корпусу та повертаємо фарі заводську прозорість.",
      className: "text-[15px] leading-relaxed",
      style: { fontFamily: "var(--v-font-body)" },
    },
    {
      role: "Технічний",
      family: variant.typography.accent,
      note: variant.typography.accentNote,
      sample: "[ 04 ] BI-LED · 6000K · IP67 · +380 73 133 56 32",
      className: "font-mono text-[13px] tracking-[0.08em]",
      style: {},
    },
  ];

  return (
    <div className="space-y-8">
      {rows.map((r) => (
        <div
          key={r.role}
          className="grid gap-3 border-b border-[var(--v-line)] pb-8 last:border-0 last:pb-0 lg:grid-cols-[13rem_1fr] lg:gap-8"
        >
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--v-accent)] uppercase">
              {r.role}
            </div>
            <div className="mt-1 text-sm text-[var(--v-text)]">{r.family}</div>
            <p className="mt-1 text-[12px] leading-snug text-[var(--v-muted)]">{r.note}</p>
          </div>
          <p className={`text-[var(--v-text)] ${r.className}`} style={r.style}>
            {r.sample}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */

function UiKit({ variant }: { variant: DesignVariant }) {
  const sharp = variant.id === "workshop";
  const pill = variant.id === "spectrum";
  const radius = pill ? "9999px" : sharp ? "0px" : "var(--v-radius)";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      {/* Кнопки */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="px-6 py-3 text-[13px] font-semibold tracking-[0.04em] text-[var(--v-bg)]"
            style={{
              borderRadius: radius,
              background: pill
                ? "linear-gradient(96deg,var(--v-accent),var(--v-accent-2))"
                : "var(--v-accent)",
              color: pill ? "#fff" : "var(--v-bg)",
              boxShadow: pill ? "0 8px 32px -10px var(--v-glow)" : "none",
            }}
          >
            Записатись
          </button>
          <button
            type="button"
            className="border border-[var(--v-accent)] px-6 py-3 text-[13px] tracking-[0.04em] text-[var(--v-accent)]"
            style={{ borderRadius: radius }}
          >
            Послуги
          </button>
          <button
            type="button"
            className="border border-[var(--v-line)] px-6 py-3 text-[13px] text-[var(--v-muted)]"
            style={{ borderRadius: radius }}
          >
            Детальніше
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {["Bi-LED", "Тюнінг", "Бронювання", "Ambient Light"].map((t) => (
            <span
              key={t}
              className="border border-[var(--v-line)] px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-[var(--v-muted)] uppercase"
              style={{ borderRadius: radius }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Прев'ю повзунка «до/після» */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden border border-[var(--v-line)]"
          style={{ borderRadius: variant.id === "workshop" ? "0px" : "var(--v-radius)" }}
        >
          <Image
            src="/before-after/audi-after-1.webp"
            alt="Audi A5 після роботи студії"
            fill
            sizes="(max-width: 1024px) 100vw, 460px"
            className="object-cover"
          />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            {/* Внутрішня обгортка повертає початкову ширину, щоб кадр не стискався */}
            <div className="absolute inset-y-0 left-0 w-[200%]">
              <Image
                src="/before-after/audi-before-1.webp"
                alt="Audi A5 до роботи студії"
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover"
              />
            </div>
          </div>
          <div
            className="absolute inset-y-0 left-1/2 w-px"
            style={{ background: "var(--v-accent)", boxShadow: "0 0 18px var(--v-glow)" }}
          />
          <div
            className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border font-mono text-[10px]"
            style={{
              borderRadius: variant.id === "workshop" ? "0px" : "9999px",
              borderColor: "var(--v-accent)",
              background: "color-mix(in srgb, var(--v-bg) 70%, transparent)",
              color: "var(--v-accent)",
              backdropFilter: "blur(6px)",
            }}
          >
            ↔
          </div>
          <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] text-[var(--v-muted)] uppercase">
            До
          </span>
          <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.2em] text-[var(--v-accent)] uppercase">
            Після
          </span>
        </div>
      </div>

      {/* Картка послуги */}
      <div className="space-y-4">
        {[
          {
            n: "01",
            t: "Ремонт фар",
            d: "Корпуси, кріплення, коректори, відбивачі — повертаємо працездатність без заміни фари.",
          },
          {
            n: "02",
            t: "Bi-LED / LED",
            d: "Встановлення сучасних лінз із чіткою світлотіньовою межею.",
          },
        ].map((s) => (
          <article
            key={s.n}
            className="group relative overflow-hidden border border-[var(--v-line)] p-6 transition-colors hover:border-[var(--v-accent)]"
            style={{
              borderRadius: variant.id === "workshop" ? "0px" : "var(--v-radius)",
              background: "var(--v-surface)",
              clipPath:
                variant.id === "workshop"
                  ? "polygon(0 0,100% 0,100% 82%,94% 100%,0 100%)"
                  : undefined,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <h5
                className="text-xl tracking-[-0.01em] text-[var(--v-text)]"
                style={{ fontFamily: "var(--v-font-display)", fontWeight: 600 }}
              >
                {s.t}
              </h5>
              <span className="font-mono text-[11px] text-[var(--v-accent)]">{s.n}</span>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--v-muted)]">{s.d}</p>
            <div
              className="mt-5 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: "var(--v-accent)" }}
            />
          </article>
        ))}

        <div
          className="border border-[var(--v-line)] p-6"
          style={{
            borderRadius: variant.id === "workshop" ? "0px" : "var(--v-radius)",
            background:
              "linear-gradient(140deg,color-mix(in srgb,var(--v-accent) 12%,var(--v-surface)),var(--v-surface))",
          }}
        >
          <div className="font-mono text-[10px] tracking-[0.24em] text-[var(--v-accent)] uppercase">
            Блок контакту
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--v-text)]">
            Надішліть фото фар — назвемо рішення й вартість ще до візиту.
          </p>
          <div className="mt-4 font-mono text-lg text-[var(--v-accent-2)]">
            +380 73 133 56 32
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function VariantBoard({ variant }: { variant: DesignVariant }) {
  return (
    <div
      style={
        {
          ...variant.tokens,
          background: "var(--v-bg)",
          color: "var(--v-text)",
        } as React.CSSProperties
      }
      className="overflow-hidden border border-[var(--v-line)]"
    >
      {/* Шапка варіанта */}
      <div className="flex flex-wrap items-end justify-between gap-6 px-5 py-8 sm:px-10 sm:py-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.3em] text-[var(--v-accent)]">
              {variant.index}
            </span>
            <span className="h-px w-10 bg-[var(--v-accent)]" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--v-muted)] uppercase">
              {variant.latin}
            </span>
          </div>
          <h3
            className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] leading-none tracking-[-0.03em] text-[var(--v-text)]"
            style={{ fontFamily: "var(--v-font-display)", fontWeight: 600 }}
          >
            {variant.name}
          </h3>
          <p className="mt-2 text-[15px] text-[var(--v-accent-2)]">{variant.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {variant.mood.map((m) => (
            <span
              key={m}
              className="border border-[var(--v-line)] px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-[var(--v-muted)] uppercase"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Перший екран */}
      <div className="border-y border-[var(--v-line)]">
        <HeroMock variant={variant} />
      </div>

      <BoardSection label="Ідея" title="Про що цей напрям">
        <p className="max-w-3xl text-[15px] leading-[1.75] text-[var(--v-muted)]">
          {variant.concept}
        </p>
        <div className="mt-8 grid gap-6 border-t border-[var(--v-line)] pt-6 lg:grid-cols-2">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--v-accent)] uppercase">
              Композиція
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--v-muted)]">
              {variant.layoutNote}
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--v-accent)] uppercase">
              Анімація
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--v-muted)]">
              {variant.motionNote}
            </p>
          </div>
        </div>
      </BoardSection>

      <BoardSection label="Палітра" title="Кольори та їх ролі">
        <PaletteGrid variant={variant} />
      </BoardSection>

      <BoardSection label="Типографіка" title="Гарнітури та ієрархія">
        <TypeSpecimen variant={variant} />
      </BoardSection>

      <BoardSection label="Елементи" title="Кнопки, картки, повзунок «до/після»">
        <UiKit variant={variant} />
      </BoardSection>
    </div>
  );
}
