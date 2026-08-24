/**
 * Навігація сайту.
 *
 * `href` веде на секцію головної сторінки. Шлях навмисно абсолютний
 * (`/#services`, а не `#services`) — щоб посилання працювали і з
 * внутрішніх сторінок, наприклад із /roboty.
 */

export type NavItem = {
  href: string;
  label: string;
  /** Індекс у моношрифті поруч із пунктом мобільного меню. */
  index: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/#services", label: "Послуги", index: "01" },
  { href: "/#before-after", label: "До / Після", index: "02" },
  { href: "/#works", label: "Роботи", index: "03" },
  { href: "/#process", label: "Як працюємо", index: "04" },
  { href: "/#reviews", label: "Відгуки", index: "05" },
  { href: "/#faq", label: "Питання", index: "06" },
  { href: "/#contacts", label: "Контакти", index: "07" },
];

/** Рухомий рядок під першим екраном. */
export const MARQUEE_ITEMS: string[] = [
  "Ремонт фар",
  "Відновлення",
  "Bi-LED",
  "LED",
  "Bi-Xenon",
  "Заміна скла",
  "Усунення запотівання",
  "Тюнінг оптики",
  "Покраска масок",
  "ДХО / DRL",
  "Ambient Light",
  "Полірування",
  "Бронювання",
  "Гравіювання на лінзах",
  "Кастом фар",
];
