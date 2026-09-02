import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorksGrid } from "@/components/ui/works-grid";
import { WORKS, WORKS_PREVIEW_COUNT } from "@/content/works";

/**
 * Галерея на головній показує лише частину робіт: рівна кількість кадрів
 * акуратно лягає в колонки без порожнечі внизу. Решта — на /roboty.
 * Кількість регулюється константою WORKS_PREVIEW_COUNT у src/content/works.ts.
 */
export function Works() {
  const preview = WORKS.slice(0, WORKS_PREVIEW_COUNT);
  const remaining = WORKS.length - preview.length;

  return (
    <section id="works" className="section-x mx-auto max-w-[110rem] py-20 sm:py-28">
      <SectionHeading
        eyebrow="Портфоліо"
        title="Роботи студії"
        description={`Реальні кадри з боксу, без стоку й рендерів. Усього в галереї — ${WORKS.length} робіт.`}
      />

      <WorksGrid works={preview} />

      {/* Кнопка стоїть завжди: сторінка /roboty — самостійний розділ,
          а лічильник з'являється тільки коли справді є що показати понад
          прев'ю. */}
      <Reveal className="mt-10 flex flex-col items-center gap-4 sm:mt-14">
        <hr className="rule-spectrum w-full max-w-md" />
        <ButtonLink href="/roboty" size="lg" className="w-full sm:w-auto">
          Переглянути бiльше
          <span aria-hidden>→</span>
        </ButtonLink>
        {remaining > 0 && (
          <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
            Ще {remaining} у галереї
          </p>
        )}
      </Reveal>
    </section>
  );
}
