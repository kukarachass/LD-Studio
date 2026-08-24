"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/content/navigation";
import { PHONE_HREF, SITE } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  /* Меню на весь екран не має лишати сторінку прокручуваною під собою */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled && !menuOpen
            ? "border-b border-line bg-void/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        {/* Індикатор прокрутки — тонка смуга спектра */}
        <motion.div
          className="absolute inset-x-0 top-0 h-px origin-left bg-spectrum"
          style={{ scaleX: progress }}
          aria-hidden
        />

        <div className="section-x mx-auto flex h-[var(--header-h)] max-w-[110rem] items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${SITE.name} — на початок`}
          >
            <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-line-strong transition-shadow duration-500 group-hover:shadow-[0_0_22px_-2px_rgba(255,45,143,0.8)] sm:h-10 sm:w-10">
              <Image
                src="/ld-studio-logo.webp"
                alt=""
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[13px] font-extrabold tracking-[-0.02em] sm:text-sm">
                L.D_Studio
              </span>
              <span className="mt-1 font-mono text-[9px] tracking-[0.22em] text-muted uppercase">
                Автосвітло · Одеса
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Основне меню">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-1 text-[13px] text-muted transition-colors hover:text-paper"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-spectrum transition-transform duration-400 ease-[var(--ease-out-quint)] group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="hidden rounded-full bg-spectrum px-5 py-2.5 font-mono text-[12px] tracking-[0.04em] text-white shadow-[0_8px_28px_-10px_rgba(255,45,143,0.7)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              {SITE.contacts.phoneDisplay}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line transition-colors hover:border-line-strong lg:hidden"
            >
              <span
                className={cn(
                  "block h-px w-4 bg-paper transition-transform duration-300",
                  menuOpen && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-paper transition-transform duration-300",
                  menuOpen && "-translate-y-[3px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-void/97 pt-[var(--header-h)] backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-violet/25 blur-[100px]"
              aria-hidden
            />

            <nav className="section-x flex flex-1 flex-col justify-center gap-1" aria-label="Мобільне меню">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.05,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-magenta">
                      {item.index}
                    </span>
                    <span className="font-display text-2xl font-extrabold tracking-[-0.012em] uppercase">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="section-x flex flex-col gap-3 pb-10">
              <a
                href={PHONE_HREF}
                className="rounded-full bg-spectrum px-6 py-4 text-center font-mono text-sm text-white"
              >
                {SITE.contacts.phoneDisplay}
              </a>
              <a
                href={SITE.socials[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line-strong px-6 py-4 text-center text-sm text-paper"
              >
                Instagram {SITE.socials[0].handle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
