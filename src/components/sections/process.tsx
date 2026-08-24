import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROCESS } from "@/content/process";
import { cn } from "@/lib/utils";

export function Process() {
  return (
    <section
      id="process"
      className="relative isolate overflow-hidden bg-surface/40 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="glow glow-magenta pointer-events-none -right-24 bottom-0 h-96 w-96 opacity-60"
      />

      <div className="section-x mx-auto max-w-[110rem]">
        <SectionHeading
          index="04"
          eyebrow="Як проходить робота"
          title={
            <>
              Шість кроків
              <br />
              до готової фари
            </>
          }
          description="Усе починається з двох фото в месенджері — приїжджати наосліп не потрібно."
        />

        <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {PROCESS.map((item, i) => (
            <Reveal
              as="li"
              key={item.step}
              delay={(i % 3) * 0.08}
              className={cn(
                "group relative",
                /* Зигзаг на широких екранах — щоб сітка не читалась як таблиця */
                i % 3 === 1 && "lg:mt-14",
                i % 3 === 2 && "lg:mt-7",
              )}
            >
              <span className="block h-px w-full bg-line">
                <span className="block h-px w-0 bg-spectrum transition-all duration-700 ease-[var(--ease-out-quint)] group-hover:w-full" />
              </span>

              <div className="flex items-start gap-5 pt-6">
                <span className="font-display text-[2.6rem] leading-none font-black tracking-[-0.04em] text-spectrum opacity-90 sm:text-[3.2rem]">
                  {item.step}
                </span>

                <div className="pt-1">
                  <h3 className="font-display text-base leading-tight font-extrabold tracking-[-0.02em] uppercase sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
