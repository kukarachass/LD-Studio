/**
 * ЄДИНЕ ДЖЕРЕЛО ПРАВДИ про студію.
 *
 * Усе, що стосується контактів, адреси та бренду, редагується тільки тут —
 * далі ці дані самі розходяться по шапці, підвалу, секції контактів,
 * мікророзмітці JSON-LD та метаданих сторінки.
 */

export const SITE = {
  name: "L.D_Studio",
  legalName: "L.D_Studio / Студія Автосвітла",
  tagline: "Автомобільна оптика нового рівня",
  shortDescription:
    "Ремонт, відновлення та тюнінг автомобільної оптики в Одесі. Bi-LED, LED, Bi-Xenon, ДХО, бронювання, індивідуальні проєкти.",

  /**
   * Домен продакшену. Замініть на реальний перед деплоєм —
   * від нього залежать canonical, sitemap.xml, robots.txt і OG-теги.
   */
  url: "https://ld-studio.com.ua",

  contacts: {
    /** Формат для tel: — тільки цифри та «+». */
    phoneRaw: "+380731335632",
    /** Формат для показу користувачу. */
    phoneDisplay: "+380 73 133 56 32",
    /** TODO: замінити на робочу пошту студії. Зараз — заглушка. */
    email: "info@ld-studio.com.ua",
  },

  address: {
    street: "вул. Паркова, 7",
    city: "Одеса",
    region: "Одеська область",
    postalCode: "65000",
    country: "UA",
    countryName: "Україна",
    /** Повний рядок для показу одним блоком. */
    full: "вул. Паркова, 7, Одеса, Одеська обл., 65000",
  },

  geo: {
    lat: 46.4849097,
    lng: 30.6982328,
  },

  maps: {
    /** Посилання «Відкрити в Google Maps» — картка студії. */
    shareUrl: "https://maps.app.goo.gl/yq65D1a1rZqHXTk36",
    /** Вбудована карта. Без API-ключа, працює за координатами. */
    embedUrl:
      "https://maps.google.com/maps?q=46.4849097,30.6982328&z=17&hl=uk&output=embed",
    /**
     * Google Maps не має темної теми без платного API, тому карту
     * інвертуємо через CSS-фільтр. Поставте false, щоб бачити оригінал.
     */
    darkFilter: true,
  },

  socials: [
    {
      id: "instagram",
      label: "Instagram",
      handle: "@l.d_studio",
      url: "https://www.instagram.com/l.d_studio",
    },
  ],

  /**
   * Графік роботи.
   * TODO: підтвердити реальні години й розкоментувати — тоді блок
   * з'явиться в контактах і потрапить у мікророзмітку для Google.
   * Приклад:
   *   workingHours: { display: "Пн–Сб, 09:00 – 19:00", schema: ["Mo-Sa 09:00-19:00"] }
   */
  workingHours: null as { display: string; schema: string[] } | null,

  /** Що показуємо в блоці охоплення. */
  coverage: {
    city: "Одеса",
    scope: "вся Україна",
    vehicles: "легкові, вантажні, автобуси та спецтехніка",
  },
} as const;

export const PHONE_HREF = `tel:${SITE.contacts.phoneRaw}`;
export const EMAIL_HREF = `mailto:${SITE.contacts.email}`;
