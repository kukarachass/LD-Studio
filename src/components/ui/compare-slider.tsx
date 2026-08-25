"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CompareSliderProps = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  /** Пропорція кадру (ширина / висота) — тримає висоту без стрибка верстки. */
  aspect: number;
  priority?: boolean;
  className?: string;
};

/** Кадри автопрев'ю: показуємо, що смугу можна тягнути. */
const DEMO_KEYFRAMES = [50, 80, 24, 50];
const DEMO_DURATION = 2200;

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function clamp(value: number) {
  return Math.min(100, Math.max(0, value));
}

/**
 * Порівняння «до / після» з вертикальною смугою, яку можна тягнути мишею,
 * пальцем або клавіатурою.
 *
 * Дрібниці, які важливі:
 * — `touch-action: pan-y` дає гортати сторінку вертикальним свайпом
 *   і при цьому тягнути смугу горизонтальним;
 * — коли блок уперше потрапляє в екран, смуга сама проходить туди-назад,
 *   щоб було очевидно, що це інтерактив (вимикається після першого дотику
 *   й для prefers-reduced-motion);
 * — смуга доступна з клавіатури: стрілки, Home/End.
 */
export function CompareSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  aspect,
  priority = false,
  className,
}: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const interacted = useRef(false);

  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const [inView, setInView] = useState(false);

  const markInteracted = useCallback(() => {
    interacted.current = true;
    setHintVisible(false);
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  /* --- Помічаємо, коли блок уперше потрапив у видиму область ------ */
  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin: "-20% 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  /* --- Автопрев'ю при першій появі в екрані --------------------- */
  useEffect(() => {
    if (!inView || interacted.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      if (interacted.current) return;
      const progress = Math.min(1, (now - start) / DEMO_DURATION);
      const segment = easeInOutQuad(progress) * (DEMO_KEYFRAMES.length - 1);
      const i = Math.min(DEMO_KEYFRAMES.length - 2, Math.floor(segment));
      const local = segment - i;
      setPosition(
        DEMO_KEYFRAMES[i] + (DEMO_KEYFRAMES[i + 1] - DEMO_KEYFRAMES[i]) * local,
      );
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  /* --- Вказівник -------------------------------------------------- */
  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    markInteracted();
    dragging.current = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    updateFromClientX(event.clientX);
  }

  function stopDragging(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  /* --- Клавіатура ------------------------------------------------- */
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 10 : 2;
    let next: number | null = null;

    if (event.key === "ArrowLeft") next = position - step;
    else if (event.key === "ArrowRight") next = position + step;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 100;

    if (next === null) return;
    event.preventDefault();
    markInteracted();
    setPosition(clamp(next));
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full cursor-ew-resize touch-pan-y overflow-hidden select-none max-h-[700px]",
        className,
      )}
      style={{ aspectRatio: aspect }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      {/* Після — базовий шар */}
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 900px"
        className="object-cover"
        priority={priority}
        draggable={false}
      />

      {/* До — обрізаний шар зверху */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
          priority={priority}
          draggable={false}
        />
        <div className="absolute inset-0 bg-void/25" />
      </div>

      {/* Підписи */}
      <span
        className="pointer-events-none absolute top-4 left-4 rounded-full border border-line bg-void/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-paper/80 uppercase backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: position < 16 ? 0 : 1 }}
      >
        До
      </span>
      <span
        className="pointer-events-none absolute top-4 right-4 rounded-full border border-magenta/50 bg-void/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-magenta uppercase backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: position > 84 ? 0 : 1 }}
      >
        Після
      </span>

      {/* Смуга */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-spectrum"
        style={{
          left: `${position}%`,
          boxShadow: "0 0 24px 2px rgba(255,45,143,0.55)",
        }}
      />

      {/* Ручка */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Порівняння до та після: перетягніть, щоб змінити межу"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`Показано ${Math.round(position)}% кадру «до»`}
        onKeyDown={handleKeyDown}
        className={cn(
          "absolute top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2",
          "items-center justify-center rounded-full border border-white/25",
          "bg-void/60 backdrop-blur-md transition-transform duration-200",
          isDragging ? "scale-110" : "hover:scale-105",
        )}
        style={{
          left: `${position}%`,
          boxShadow: "0 0 32px -4px rgba(124,59,255,0.9)",
        }}
      >
        <span className="bg-spectrum bg-clip-text text-lg leading-none text-transparent select-none">
          ⟨⟩
        </span>
      </div>

      {/* Підказка до першої взаємодії */}
      <span
        className={cn(
          "pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full",
          "border border-line bg-void/70 px-4 py-2 font-mono text-[10px] tracking-[0.2em]",
          "text-muted uppercase backdrop-blur-sm transition-opacity duration-500",
          hintVisible ? "opacity-100" : "opacity-0",
        )}
      >
        Потягніть смугу
      </span>
    </div>
  );
}
