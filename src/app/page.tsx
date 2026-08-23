import Link from "next/link";

/**
 * Тимчасова заглушка. Повний лендинг збирається після того,
 * як буде обрано дизайн-напрям на /design.
 */
export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.3em] text-ink-500 uppercase">
        L.D_Studio · Одеса
      </p>
      <h1 className="font-display text-3xl font-semibold tracking-[-0.03em] text-ink-100">
        Сайт у розробці
      </h1>
      <p className="max-w-md text-[15px] leading-relaxed text-ink-300">
        Спочатку оберіть візуальний напрям — далі на його основі буде зібрано
        повний сайт студії.
      </p>
      <Link
        href="/design"
        className="rounded-full border border-white/20 px-6 py-3 text-[13px] text-ink-100 transition-colors hover:border-white/50"
      >
        Переглянути варіанти дизайну →
      </Link>
    </main>
  );
}
