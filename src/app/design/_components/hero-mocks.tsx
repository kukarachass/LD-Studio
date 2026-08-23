"use client";

import Image from "next/image";
import type { DesignVariant } from "../variants";

/**
 * Чотири прев'ю першого екрана. Це не просто перефарбування одного макета —
 * у кожного варіанта своя композиція, бо саме компоновку ми й обираємо.
 */

const IMAGE_SIZES = "(max-width: 1024px) 100vw, 900px";

/* ---------------------------------------------------------------- 01 */

function ColdLightHero({ variant }: { variant: DesignVariant }) {
  return (
    <div className="relative isolate min-h-[26rem] overflow-hidden sm:min-h-[34rem]">
      <Image
        src={variant.heroImage}
        alt="BMW X3 з відновленою оптикою"
        fill
        sizes={IMAGE_SIZES}
        className="object-cover object-[60%_center]"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--v-bg)_8%,rgba(4,5,10,0.72)_42%,rgba(4,5,10,0.15)_82%)]" />

      <div className="relative flex min-h-[26rem] flex-col justify-between p-5 sm:min-h-[34rem] sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <span className="font-mono text-[10px] tracking-[0.32em] text-[var(--v-muted)] uppercase">
            L.D_Studio / Odesa
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.32em] text-[var(--v-muted)] uppercase sm:block">
            46.47°N 30.73°E
          </span>
        </div>

        <div className="max-w-[46rem]">
          <p className="mb-5 max-w-md font-mono text-[11px] leading-relaxed tracking-[0.16em] text-[var(--v-accent-2)] uppercase">
            Ремонт · Відновлення · Bi-LED
          </p>
          <h3
            className="text-[clamp(2.1rem,7vw,4.6rem)] leading-[0.92] font-light tracking-[-0.03em] text-[var(--v-text)]"
            style={{ fontFamily: "var(--v-font-display)" }}
          >
            Світло, яке
            <br />
            <span className="font-semibold">помічають</span>
          </h3>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--v-muted)]">
            Оптика, зібрана під конкретний автомобіль — від відновлення
            герметичності до повністю кастомної архітектури променя.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[var(--v-line)] pt-5">
          <button
            type="button"
            className="border border-[var(--v-accent)] px-6 py-3 font-mono text-[11px] tracking-[0.22em] text-[var(--v-accent)] uppercase transition-colors hover:bg-[var(--v-accent)] hover:text-[var(--v-bg)]"
          >
            Розрахувати
          </button>
          {[
            ["6000", "K температура"],
            ["12", "місяців гарантії"],
            ["8+", "років практики"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="font-mono text-lg text-[var(--v-text)]">{value}</div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-[var(--v-muted)] uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 02 */

function SpectrumHero({ variant }: { variant: DesignVariant }) {
  return (
    <div className="relative isolate min-h-[26rem] overflow-hidden sm:min-h-[34rem]">
      <div className="absolute inset-y-0 right-0 w-[62%] sm:w-[54%]">
        <Image
          src={variant.heroImage}
          alt="Кастомна фара з RGB-підсвіткою"
          fill
          sizes={IMAGE_SIZES}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--v-bg)_0%,rgba(5,3,8,0.55)_38%,transparent_100%)]" />
      </div>

      {/* Світлові витоки */}
      <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[var(--v-accent-2)] opacity-25 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-[var(--v-accent)] opacity-20 blur-[110px]" />

      <div className="relative flex min-h-[26rem] flex-col justify-center gap-8 p-5 sm:min-h-[34rem] sm:p-10">
        <div className="flex flex-wrap gap-2">
          {["BI-LED", "RGB", "AMBIENT", "КАСТОМ"].map((tag, i) => (
            <span
              key={tag}
              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]"
              style={{
                borderColor: [
                  "var(--v-accent)",
                  "var(--v-accent-2)",
                  "var(--v-accent-3)",
                  "var(--v-accent-2)",
                ][i],
                color: [
                  "var(--v-accent)",
                  "var(--v-accent-2)",
                  "var(--v-accent-3)",
                  "var(--v-accent-2)",
                ][i],
              }}
            >
              [{tag}]
            </span>
          ))}
        </div>

        <h3
          className="text-[clamp(2.4rem,8vw,5.6rem)] leading-[0.84] font-black tracking-[-0.04em] uppercase"
          style={{ fontFamily: "var(--v-font-display)" }}
        >
          <span className="block text-[var(--v-text)]">Твої</span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(96deg,var(--v-accent) 0%,var(--v-accent-2) 48%,var(--v-accent-3) 100%)",
            }}
          >
            фари
          </span>
          <span className="block pl-[0.6em] text-[var(--v-text)]">впізнають</span>
        </h3>

        <p className="max-w-xs text-sm leading-relaxed text-[var(--v-muted)] sm:max-w-sm">
          Проєктуємо оптику під характер авто: маски, ДХО, кільця, лазерне
          гравіювання на лінзах, повний RGB-контур.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-full px-7 py-3.5 text-[13px] font-bold tracking-wide text-white"
            style={{
              background:
                "linear-gradient(96deg,var(--v-accent) 0%,var(--v-accent-2) 100%)",
              boxShadow: "0 8px 40px -8px var(--v-glow)",
            }}
          >
            Обговорити проєкт
          </button>
          <button
            type="button"
            className="rounded-full border border-[var(--v-line)] px-6 py-3.5 text-[13px] text-[var(--v-text)]"
          >
            Instagram
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 03 */

function WorkshopHero({ variant }: { variant: DesignVariant }) {
  const stripes =
    "repeating-linear-gradient(135deg,var(--v-accent) 0 14px,transparent 14px 28px)";

  return (
    <div className="relative isolate min-h-[26rem] overflow-hidden sm:min-h-[34rem]">
      <div className="h-2 w-full opacity-70" style={{ backgroundImage: stripes }} />

      <div className="grid min-h-[24rem] grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-between gap-8 border-b border-[var(--v-line)] p-5 sm:p-10 lg:border-r lg:border-b-0">
          <div className="flex items-baseline gap-4">
            <span
              className="font-mono text-5xl leading-none font-bold text-[var(--v-accent)] opacity-90 sm:text-6xl"
              style={{ WebkitTextStroke: "0px" }}
            >
              03
            </span>
            <span className="font-mono text-[10px] tracking-[0.26em] text-[var(--v-muted)] uppercase">
              Цех оптики
              <br />
              Парковa 7, Одеса
            </span>
          </div>

          <div>
            <h3
              className="text-[clamp(2rem,5.4vw,3.6rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-[var(--v-text)] uppercase"
              style={{ fontFamily: "var(--v-font-display)" }}
            >
              Розберемо.
              <br />
              Відновимо.
              <br />
              <span className="text-[var(--v-accent)]">Зберемо краще.</span>
            </h3>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--v-muted)]">
              Герметичність, відбивачі, корпуси, кріплення, коректори. Легкові,
              вантажні, автобуси й спецтехніка — без винятків.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="bg-[var(--v-accent)] px-7 py-3.5 text-[13px] font-bold tracking-[0.08em] text-[#0A0908] uppercase"
            >
              +380 73 133 56 32
            </button>
            <button
              type="button"
              className="border border-[var(--v-line)] px-6 py-3.5 text-[13px] tracking-[0.08em] text-[var(--v-text)] uppercase"
            >
              Надіслати фото
            </button>
          </div>
        </div>

        <div className="relative min-h-[16rem]">
          <div
            className="absolute inset-3 sm:inset-5"
            style={{ clipPath: "polygon(0 0,100% 0,100% 88%,92% 100%,0 100%)" }}
          >
            <Image
              src={variant.heroImage}
              alt="BMW X5 у цеху студії"
              fill
              sizes={IMAGE_SIZES}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(10,9,8,0.85)_100%)]" />
          </div>
          <span className="absolute right-6 bottom-8 font-mono text-[10px] tracking-[0.2em] text-[var(--v-accent-2)] uppercase sm:right-9 sm:bottom-10">
            BMW X5 E53 · Angel Eyes
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 04 */

function BlueprintHero({ variant }: { variant: DesignVariant }) {
  return (
    <div className="relative isolate min-h-[26rem] overflow-hidden sm:min-h-[34rem]">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--v-line) 1px,transparent 1px),linear-gradient(90deg,var(--v-line) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative grid min-h-[26rem] grid-cols-1 gap-8 p-5 sm:min-h-[34rem] sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <div className="mb-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-[var(--v-accent)] uppercase">
            <span className="h-px w-8 bg-[var(--v-accent)]" />
            Fig. 01 — light architecture
          </div>

          <h3
            className="text-[clamp(2rem,5.6vw,3.9rem)] leading-[1.02] font-medium tracking-[-0.025em] text-[var(--v-text)]"
            style={{ fontFamily: "var(--v-font-display)" }}
          >
            Ми проєктуємо
            <br />
            промінь, а не
            <br />
            просто ставимо лінзу
          </h3>

          <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--v-line)] pt-6">
            {[
              ["Кут розсіювання", "≤ 0.8°"],
              ["Світловий потік", "4200 lm"],
              ["Герметичність", "IP67"],
              ["Термін", "1–3 дні"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-[var(--v-muted)] uppercase">
                  {k}
                </dt>
                <dd className="mt-1 font-mono text-base text-[var(--v-accent-2)]">{v}</dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            className="mt-8 inline-flex items-center gap-3 border border-[var(--v-accent)] px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-[var(--v-accent)] uppercase"
          >
            Отримати консультацію
            <span aria-hidden>→</span>
          </button>
        </div>

        <div className="relative aspect-[4/3] w-full">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={variant.heroImage}
              alt="Фара Mercedes Vito крупним планом"
              fill
              sizes={IMAGE_SIZES}
              className="object-cover object-center opacity-80 saturate-[0.6]"
            />
          </div>

          {/* Кутові маркери замість рамки */}
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ].map((pos) => (
            <span
              key={pos}
              className={`absolute h-6 w-6 border-[var(--v-accent)] ${pos}`}
            />
          ))}

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 300"
            fill="none"
            aria-hidden
          >
            <path
              d="M150 160 L400 90"
              stroke="var(--v-accent)"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.8"
            />
            <path
              d="M150 160 L400 210"
              stroke="var(--v-accent)"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.8"
            />
            <circle cx="150" cy="160" r="4" fill="var(--v-accent)" />
            <text
              x="250"
              y="152"
              fill="var(--v-accent-2)"
              fontSize="10"
              fontFamily="var(--font-mono)"
              letterSpacing="1.5"
            >
              BEAM 0.8°
            </text>
          </svg>

          <span className="absolute -bottom-6 left-0 font-mono text-[10px] tracking-[0.2em] text-[var(--v-muted)] uppercase">
            [ 04 ] Mercedes Vito W639 · bi-led retrofit
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

const HERO_BY_ID: Record<string, (p: { variant: DesignVariant }) => React.ReactElement> = {
  "cold-light": ColdLightHero,
  spectrum: SpectrumHero,
  workshop: WorkshopHero,
  blueprint: BlueprintHero,
};

export function HeroMock({ variant }: { variant: DesignVariant }) {
  const Hero = HERO_BY_ID[variant.id];
  return <Hero variant={variant} />;
}
