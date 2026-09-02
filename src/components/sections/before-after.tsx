"use client";

import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {CompareSlider} from "@/components/ui/compare-slider";
import {Reveal} from "@/components/ui/reveal";
import {SectionHeading} from "@/components/ui/section-heading";
import {BEFORE_AFTER} from "@/content/before-after";
import {cn} from "@/lib/utils";

/** Скільки триває підміна кадру: спершу гасне старий, потім проявляється новий. */
const SWAP_MS = 250;

/** Скільки їде «таблетка» від однієї вкладки до іншої. */
const PILL_MS = 380;
/**
 * Крива підібрана під пружину, що була тут раніше (stiffness 400,
 * damping 34): швидкий старт і ледь помітний перебіг у кінці.
 */
const PILL_EASE = "cubic-bezier(0.22, 1.12, 0.36, 1)";

/**
 * На сервері useLayoutEffect не виконується — React про це попереджає.
 * Тут він потрібен саме синхронно (інакше «таблетка» встигне блимнути
 * на новому місці до початку руху), тому на сервері беремо useEffect.
 */
const useIsomorphicLayoutEffect =
    typeof window === "undefined" ? useEffect : useLayoutEffect;

export function BeforeAfter() {
    const [activeId, setActiveId] = useState(BEFORE_AFTER[0].id);
    const active = BEFORE_AFTER.find((p) => p.id === activeId) ?? BEFORE_AFTER[0];

    /*
     * «Таблетка» під активною вкладкою.
     *
     * Вона живе всередині активної кнопки (absolute inset-0) — тому на
     * сервері й до гідратації стоїть точно на місці, без жодного JS.
     * Переїзд робимо руками за схемою FLIP: запам'ятали, де вона була,
     * після перемикання миттєво повернули її туди трансформом і відпустили
     * у нуль. Це те саме, що робив layoutId з motion, тільки без
     * 47 КБ бібліотеки в бандлі.
     */
    const tabsRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLSpanElement>(null);
    const pillBox = useRef<{ left: number; top: number; width: number } | null>(
        null,
    );

    useIsomorphicLayoutEffect(() => {
        const pill = pillRef.current;
        const tabs = tabsRef.current;
        if (!pill || !tabs) return;

        /*
         * Координати рахуємо ВІДНОСНО обгортки вкладок, а не вікна: між двома
         * перемиканнями сторінку встигають прокрутити, і абсолютні координати
         * вікна дали б зсув на всю висоту прокрутки.
         */
        const origin = tabs.getBoundingClientRect();
        const rect = pill.getBoundingClientRect();
        const next = {
            left: rect.left - origin.left,
            top: rect.top - origin.top,
            width: rect.width,
        };

        const prev = pillBox.current;
        pillBox.current = next;

        /* Перший показ — просто запам'ятовуємо позицію, рухати нічого */
        if (!prev || next.width === 0) return;

        const dx = prev.left - next.left;
        const dy = prev.top - next.top;
        if (dx === 0 && dy === 0 && prev.width === next.width) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        pill.style.transition = "none";
        pill.style.width = `${prev.width}px`;
        pill.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;

        /* Змушуємо браузер прийняти стартовий стан до того, як задамо цільовий */
        void pill.offsetWidth;

        pill.style.transition = `transform ${PILL_MS}ms ${PILL_EASE}, width ${PILL_MS}ms ${PILL_EASE}`;
        pill.style.width = `${next.width}px`;
        pill.style.transform = "translate3d(0, 0, 0)";

        let fallback = 0;
        const done = () => {
            /* Знімаємо ручні стилі — далі таблетку тримає inset-0 */
            window.clearTimeout(fallback);
            pill.removeEventListener("transitionend", done);
            pill.style.transition = "";
            pill.style.width = "";
            pill.style.transform = "";
        };

        pill.addEventListener("transitionend", done);
        /* Страховка: у фоновій вкладці transitionend може не прийти взагалі */
        fallback = window.setTimeout(done, PILL_MS + 80);

        return () => {
            window.clearTimeout(fallback);
            pill.removeEventListener("transitionend", done);
        };
    }, [activeId]);

    /*
     * Підміна кадру. Поводиться так само, як AnimatePresence mode="wait":
     * спершу старий кадр гасне, і лише потім на його місці проявляється
     * новий. Перший показ теж із проявленням.
     */
    const [shown, setShown] = useState(activeId);
    const [visible, setVisible] = useState(false);
    const swapTimer = useRef<number | undefined>(undefined);

    /* Проявлення на першому показі */
    useEffect(() => {
        const frame = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => () => window.clearTimeout(swapTimer.current), []);

    function selectPair(id: string) {
        if (id === activeId) return;

        /* Підпис і таблетка перемикаються одразу, кадр — після затухання */
        setActiveId(id);
        setVisible(false);

        window.clearTimeout(swapTimer.current);
        swapTimer.current = window.setTimeout(() => {
            setShown(id);
            setVisible(true);
        }, SWAP_MS);
    }

    const shownPair = BEFORE_AFTER.find((p) => p.id === shown) ?? BEFORE_AFTER[0];

    return (
        <section
            id="before-after"
            className="relative isolate overflow-hidden bg-surface/40 py-20 sm:py-28"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-cyan/10 blur-[130px]"
            />

            <div className="section-x mx-auto max-w-[110rem]">
                <SectionHeading
                    eyebrow="Результат"
                    title="До / Після"
                    description="Один і той самий автомобіль. Потягніть смугу вбік — межа рухається разом із нею."
                />

                <div ref={tabsRef} className="mb-8 flex flex-wrap gap-2">
                    {BEFORE_AFTER.map((pair) => {
                        const isActive = pair.id === activeId;
                        return (
                            <button
                                key={pair.id}
                                type="button"
                                onClick={() => selectPair(pair.id)}
                                aria-pressed={isActive}
                                className={cn(
                                    "relative rounded-full px-5 py-2.5 text-[13px] transition-colors duration-300",
                                    isActive ? "text-white" : "text-muted hover:text-paper",
                                )}
                            >
                                {isActive && (
                                    <span
                                        ref={pillRef}
                                        aria-hidden
                                        className="absolute inset-0 rounded-full bg-spectrum"
                                    />
                                )}
                                <span className="relative z-10">{pair.title}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-center lg:gap-14">
                    <Reveal from="scale" className="overflow-hidden rounded-sm border border-line">
                        <div
                            style={{
                                opacity: visible ? 1 : 0,
                                transition: `opacity ${SWAP_MS}ms linear`,
                            }}
                        >
                            <CompareSlider
                                key={shownPair.id}
                                before={shownPair.before}
                                after={shownPair.after}
                                beforeAlt={`${shownPair.title} — оптика до роботи студії`}
                                afterAlt={`${shownPair.title} — оптика після роботи студії`}
                                aspect={shownPair.aspect}
                            />
                        </div>
                    </Reveal>

                    <Reveal from="right" delay={0.1}>
                        <div className="font-mono text-[10px] tracking-[0.24em] text-magenta uppercase">
                            {active.title}
                        </div>
                        <p className="mt-4 font-display text-[clamp(1.2rem,2.6vw,1.75rem)] leading-tight font-bold tracking-[-0.02em]">
                            {active.subtitle}
                        </p>
                        <hr className="rule-spectrum my-7"/>
                        <p className="text-[14px] leading-relaxed text-muted">
                            Перед роботою ми фіксуємо стан оптики, а після — показуємо
                            результат при вимкненому світлі в боксі. Різницю видно одразу, без
                            обробки кадрів.
                        </p>
                        <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                            Керування: перетягніть · стрілки ← → · Home / End
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
