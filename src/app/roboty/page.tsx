import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { WorksGrid } from "@/components/ui/works-grid";
import { SITE } from "@/content/site";
import { WORKS } from "@/content/works";

export const metadata: Metadata = {
  title: "Роботи студії",
  description:
    "Галерея робіт L.D_Studio: кастомні фари, Bi-LED та LED лінзи, ДХО, RGB-контури, відновлення й бронювання оптики. Реальні кадри з боксу в Одесі.",
  alternates: { canonical: "/roboty" },
  openGraph: {
    type: "article",
    url: `${SITE.url}/roboty`,
    title: `Роботи студії — ${SITE.name}`,
    description:
      "Галерея робіт з автомобільною оптикою: кастом, Bi-LED, ДХО, відновлення, бронювання.",
  },
};

/** Хлібні крихти допомагають Google показати шлях у видачі. */
function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Головна",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Роботи студії",
        item: `${SITE.url}/roboty`,
      },
    ],
  };
}

export default function WorksPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema()} />

      <SiteHeader />

      <main>
        <section className="section-x mx-auto max-w-[110rem] pt-[calc(var(--header-h)+3rem)] pb-16 sm:pb-20">
          <div className="animate-fade-up flex items-center gap-4">
            <Link
              href="/#works"
              className="font-mono text-[10px] tracking-[0.24em] text-muted uppercase transition-colors hover:text-paper"
            >
              ← На головну
            </Link>
            <span className="bg-spectrum h-px w-10 sm:w-16" />
            <span className="font-mono text-[10px] tracking-[0.24em] text-magenta uppercase">
              Портфоліо
            </span>
          </div>

          <h1
            className="animate-rise-in font-display mt-6 text-[clamp(2.1rem,9vw,5.5rem)] leading-[0.96] font-black tracking-[-0.018em] uppercase"
            style={{ animationDelay: "0.1s" }}
          >
             Роботи
            <br />
            <span className="text-spectrum">студії</span>
          </h1>

          <div
            className="animate-fade-up mt-8 flex flex-col gap-6 border-t border-line pt-6 lg:flex-row lg:items-end lg:justify-between"
            style={{ animationDelay: "0.35s" }}
          >
            <p className="max-w-xl text-[15px] leading-relaxed text-muted">
              Кожен кадр знятий у нашому боксі після здачі авто. Легкові,
              вантажні, автобуси та спецтехніка — від відновлення герметичності
              до повністю кастомної оптики. Натисніть на будь-яку роботу, щоб
              роздивитись деталі.
            </p>
            <div className="shrink-0">
              <div className="font-mono text-[10px] tracking-[0.22em] text-faint uppercase">
                Робіт у галереї
              </div>
              <div className="font-display mt-1 text-3xl font-black tracking-[-0.02em]">
                {String(WORKS.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </section>

        <section className="section-x mx-auto max-w-[110rem] pb-20 sm:pb-28">
          <WorksGrid works={WORKS} priorityCount={3} />
        </section>

        <Cta />
      </main>

      <SiteFooter />
    </>
  );
}
