import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";

/**
 * Шрифти сайту. Усі — варіативні (один файл на всю вагу) і з підмножиною
 * `cyrillic`, бо сайт україномовний.
 *
 * Кожен віддає власну CSS-змінну, а globals.css зіставляє їх із
 * семантичними токенами теми (--font-display / --font-sans / --font-mono).
 */

/** Дисплейний гротеск — заголовки, великі цифри, акцентні рядки. */
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

/** Основний текстовий шрифт — абзаци, списки, інтерфейс. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

/** Технічний моноширинний — індекси секцій, теги, телефон, підписи-дані. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const fontVariables = [
  unbounded.variable,
  manrope.variable,
  jetbrainsMono.variable,
].join(" ");
