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

/**
 * Технічний моноширинний — індекси секцій, теги, телефон, підписи-дані.
 *
 * preload: false навмисно. Цією гарнітурою набрані лише дрібні службові
 * написи, вони не впливають ні на LCP, ні на сприйняття першого екрана.
 * Знімаємо два файли з критичного шляху завантаження — до появи шрифту
 * текст показується системним моноширинним (display: swap).
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["cyrillic", "latin"],
  display: "swap",
  preload: false,
});

export const fontVariables = [
  unbounded.variable,
  manrope.variable,
  jetbrainsMono.variable,
].join(" ");
