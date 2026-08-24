"use client";

import { useEffect, useState } from "react";

/**
 * Стежить за CSS-медіазапитом із JS.
 *
 * Потрібен там, де недостатньо сховати блок через CSS: якщо елемент
 * лишається в DOM, браузер усе одно вантажить його зображення. Тут ми
 * взагалі не рендеримо зайву гілку.
 *
 * До монтування завжди повертає false — щоб серверний і клієнтський
 * рендер збігалися й не було помилки гідратації.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const sync = () => setMatches(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, [query]);

  return matches;
}
