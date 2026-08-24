/**
 * Навігація сайту.
 *
 * `href` — це id відповідної секції на головній сторінці. Додаєте нову
 * секцію — додайте сюди пункт, і він з'явиться і в шапці, і в мобільному меню,
 * і в підвалі.
 */

export type NavItem = {
  href: string;
  label: string;
  /** Індекс у моношрифті поруч із пунктом мобільного меню. */
  index: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "#services", label: "Послуги", index: "01" },
  { href: "#before-after", label: "До / Після", index: "02" },
  { href: "#works", label: "Роботи", index: "03" },
  { href: "#process", label: "Як працюємо", index: "04" },
  { href: "#faq", label: "Питання", index: "05" },
  { href: "#contacts", label: "Контакти", index: "06" },
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
