"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Work } from "@/content/works";
import { cn } from "@/lib/utils";

type LightboxProps = {
  works: Work[];
  /** Індекс відкритої роботи або null, якщо вікно закрите. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/** Тривалість затухання при закритті — збігається з transition нижче. */
const CLOSE_DURATION = 220;

/**
 * Повноекранний перегляд роботи з галереї.
 *
 * Поява й затухання — на CSS-переходах: вікно монтується прозорим, клас
 * видимості додається наступним кадром, а при закритті спершу гасне і
 * лише потім зникає з розмітки. Бібліотека анімацій для цього не потрібна.
 */
export function Lightbox({ works, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  const isOpen = index !== null;
  const work = isOpen ? works[index] : null;

  /* Закриваємо із затуханням: спершу ховаємо, потім прибираємо з розмітки */
  const requestClose = useCallback(() => {
    setVisible(false);
    window.setTimeout(onClose, CLOSE_DURATION);
  }, [onClose]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + works.length) % works.length);
  }, [index, works.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % works.length);
  }, [index, works.length, onNavigate]);

  /* Поява: клас видимості додаємо наступним кадром, щоб перехід програвся */
  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(frame);
      setVisible(false);
    };
  }, [isOpen]);

  /*
   * Блокування прокрутки фону. Ефект залежить ТІЛЬКИ від isOpen — інакше
   * він перезапускався б на кожній зміні кадру й запам'ятовував уже
   * заблоковане значення як «попереднє».
   */
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /* Клавіатура — окремо, бо обробники змінюються разом із поточним кадром */
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") requestClose();
      else if (event.key === "ArrowLeft") goPrev();
      else if (event.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, requestClose, goPrev, goNext]);

  if (!isOpen || !work) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${work.title} — ${work.caption}`}
      className={cn(
        "bg-void/95 fixed inset-0 z-[100] flex items-center justify-center transition-opacity",
        visible ? "opacity-100" : "opacity-0",
      )}
      style={{ transitionDuration: `${CLOSE_DURATION}ms` }}
      onClick={requestClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={requestClose}
        aria-label="Закрити"
        className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-magenta hover:text-magenta"
      >
        ✕
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Попередня робота"
        className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-cyan hover:text-cyan sm:left-6"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Наступна робота"
        className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-cyan hover:text-cyan sm:right-6"
      >
        ›
      </button>

      <figure
        key={work.id}
        className="animate-fade-scale flex max-h-[88dvh] w-full max-w-5xl flex-col items-center gap-4 px-14 sm:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={work.image}
          alt={`${work.title}: ${work.caption}`}
          width={work.width}
          height={work.height}
          sizes="(max-width: 1024px) 92vw, 1024px"
          className="max-h-[72dvh] w-auto rounded-sm object-contain"
        />
        <figcaption className="text-center">
          <div className="font-display text-lg font-bold tracking-[-0.02em]">
            {work.title}
          </div>
          <p className="mt-1 text-[13px] text-muted">{work.caption}</p>
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-faint">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(works.length).padStart(2, "0")}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
