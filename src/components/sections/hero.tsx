import Image from "next/image";
import {ButtonLink} from "@/components/ui/button";
import {PHONE_HREF, SITE} from "@/content/site";

/**
 * Перший екран.
 *
 * Свідомо серверний компонент без JS: поява зроблена на CSS-анімаціях.
 * Заголовок, опис і телефон мають бути видимими навіть якщо сторінку
 * відкрили у фоновій вкладці або скрипти ще не встигли виконатись —
 * це головний блок, який продає, і він не має залежати від гідратації.
 */
/** Рядки заголовка. Різні відступи дають діагональ. */
const TITLE_LINES = [
    {text: "Твої", indent: "", gradient: false},
    {text: "фари", indent: "pl-[0.14em] sm:pl-[0.22em]", gradient: true},
    {text: "впізнають", indent: "pl-[0.05em] sm:pl-[0.09em]", gradient: false},
];

const COVERAGE = [
    {label: "Місто", value: SITE.coverage.city},
    {label: "Виїзд", value: SITE.coverage.scope},
    {label: "Транспорт", value: SITE.coverage.vehicles},
];

export function Hero() {
    return (
        <section
            id="hero"
            className="grain relative isolate flex min-h-dvh flex-col justify-center overflow-hidden pt-[var(--header-h)] pb-10"
        >
            {/* Фото: на мобільному — фон на весь екран, на десктопі — права частина */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-[56%]">
                <div className="animate-zoom-in relative h-full w-full">
                    <Image
                        src="/ld-studio-2.webp"
                        alt="Кастомна фара BMW із шестигранним RGB-контуром від L.D_Studio"
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-[58%_center]"
                        priority
                        fetchPriority="high"
                    />
                </div>
                {/* Розтушовка в бік тексту */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,3,8,0.9)_0%,rgba(5,3,8,0.74)_45%,rgba(5,3,8,0.97)_100%)] lg:bg-[linear-gradient(90deg,var(--color-void)_2%,rgba(5,3,8,0.88)_30%,rgba(5,3,8,0.2)_74%,rgba(5,3,8,0.5)_100%)]"/>
            </div>

            {/* Світлові витоки.
                Рух — на зовнішньому вузлі, розмиття — на внутрішньому:
                див. коментар до .leak у globals.css. Геометрія й кольори
                ті самі, що були. */}
            <div
                aria-hidden
                className="leak pointer-events-none absolute -top-32 -left-24 h-[26rem] w-[26rem] [animation:spectrum-drift_18s_ease-in-out_infinite]"
            >
                <div className="bg-magenta/22 blur-[120px]"/>
            </div>
            <div
                aria-hidden
                className="leak pointer-events-none absolute -bottom-40 left-1/4 h-[30rem] w-[30rem] [animation:spectrum-drift_24s_ease-in-out_infinite_reverse]"
            >
                <div className="bg-violet/18 blur-[140px]"/>
            </div>
            <div
                aria-hidden
                className="pointer-events-none absolute top-1/3 right-0 h-64 w-64 rounded-full bg-cyan/12 blur-[110px]"
            />

            <div className="section-x relative mx-auto w-full max-w-[110rem]">
                <h1 className="font-display mt-7 text-[clamp(1.85rem,10vw,9rem)] leading-[0.86] font-black tracking-[-0.022em] uppercase">
                    {TITLE_LINES.map((line, i) => (
                        <span key={line.text} className="block">
              <span
                  className={`animate-rise-in block ${line.indent} ${
                      line.gradient ? "text-spectrum" : ""
                  }`}
                  style={{animationDelay: `${0.12 + i * 0.09}s`}}
              >
                {line.text}
              </span>
            </span>
                    ))}
                </h1>

                <div
                    className="animate-fade-up mt-9 flex max-w-xl flex-col gap-7"
                    style={{animationDelay: "0.5s"}}
                >
                    <p className="max-w-md text-[15px] leading-relaxed text-paper/75 sm:text-base">
                        Ремонт, відновлення й тюнінг автомобільної оптики в Одесі.
                        Проєктуємо світло під характер авто — від герметичності корпусу до
                        повністю кастомної фари.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        <ButtonLink href={PHONE_HREF} size="lg">
                            {SITE.contacts.phoneDisplay}
                        </ButtonLink>
                        <ButtonLink href="#works" variant="outline" size="lg">
                            Дивитись роботи
                        </ButtonLink>
                    </div>
                </div>

                <dl
                    className="animate-fade-up mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-5 lg:mt-16"
                    style={{animationDelay: "0.7s"}}
                >
                    {COVERAGE.map((item) => (
                        <div key={item.label} className="min-w-0">
                            <dt className="font-mono text-[9px] tracking-[0.24em] text-faint uppercase">
                                {item.label}
                            </dt>
                            <dd className="mt-1 text-[13px] text-paper/85">{item.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <span className="grain-layer" aria-hidden/>
        </section>
    );
}
