import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * AVIF першим: для фото фар у темряві він дає помітно менший файл за
     * webp при тій самій якості. Браузери, що не підтримують AVIF,
     * отримають webp — Next обирає формат за заголовком Accept.
     */
    formats: ["image/avif", "image/webp"],
    /**
     * Фото робіт не змінюються — тримаємо оптимізовані версії в кеші довше,
     * ніж стандартні 4 години, щоб не переоброблювати їх щоразу.
     */
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  /* Заголовок із версією Next нікому не потрібен */
  poweredByHeader: false,
};

export default nextConfig;
