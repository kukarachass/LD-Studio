import { JetBrains_Mono, Manrope, Onest, Unbounded } from "next/font/google";

/**
 * Усі шрифти підключені з підмножиною `cyrillic` — сайт україномовний.
 * Кожен віддає власну CSS-змінну (`--font-<гарнітура>`), а вже globals.css
 * зіставляє їх із семантичними токенами теми (`--font-display` тощо).
 */

/** Дисплейний гротеск із характерною геометрією — заголовки, великі цифри. */
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/** Основний текстовий шрифт — абзаци, списки, інтерфейс. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

/** Нейтральний геометричний гротеск (напрям «Оптична схема»). */
const onest = Onest({
  variable: "--font-onest",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

/** Технічний моноширинний — індекси, координати, підписи-дані. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const fontVariables = [
  unbounded.variable,
  manrope.variable,
  onest.variable,
  jetbrainsMono.variable,
].join(" ");
