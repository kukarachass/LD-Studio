import { MARQUEE_ITEMS } from "@/content/navigation";

/**
 * Рухомий рядок із переліком робіт. Анімація чисто на CSS: дублюємо список
 * двічі й зсуваємо доріжку на -50% — шов непомітний.
 * Список редагується в src/content/navigation.ts.
 */
export function Marquee() {
  const track = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      className="relative overflow-hidden border-y border-line bg-surface/60 py-4"
      aria-label="Перелік робіт студії"
    >
      {/* Затемнення країв, щоб рядок не обривався різко */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,var(--color-void),transparent)] sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,var(--color-void),transparent)] sm:w-32" />

      <ul
        className="flex w-max items-center gap-8 [animation:marquee-x_46s_linear_infinite] hover:[animation-play-state:paused] sm:gap-12"
        aria-hidden
      >
        {track.map((item, i) => (
          <li key={`${item}-${i}`} className="flex shrink-0 items-center gap-8 sm:gap-12">
            <span className="font-display text-[13px] font-semibold tracking-[0.02em] whitespace-nowrap text-paper/70 uppercase sm:text-sm">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-spectrum" />
          </li>
        ))}
      </ul>
    </section>
  );
}
