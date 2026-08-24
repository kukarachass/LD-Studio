import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PHONE_HREF, SITE } from "@/content/site";

/** Фінальний заклик перед підвалом. */
export function Cta() {
  return (
    <section className="relative isolate grain overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/ld-studio-12.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,var(--color-void)_10%,rgba(5,3,8,0.82)_46%,rgba(5,3,8,0.35)_100%)]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/3 h-[26rem] w-[26rem] rounded-full bg-violet/20 blur-[130px]"
      />

      <div className="section-x relative mx-auto max-w-[110rem] py-20 sm:py-28">
        <Reveal className="max-w-3xl">
          <div className="font-mono text-[10px] tracking-[0.28em] text-cyan uppercase">
            Наступний крок
          </div>

          <h2 className="mt-6 font-display text-[clamp(1.9rem,6vw,4.2rem)] leading-[0.94] font-black tracking-[-0.018em] text-balance uppercase">
            Надішліть фото фар —<br />
            <span className="text-spectrum">решту зробимо ми</span>
          </h2>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-paper/75">
            Кілька знімків достатньо, щоб зрозуміти стан оптики й назвати
            варіанти рішення. {SITE.coverage.city}, {SITE.coverage.scope} —
            працюємо з легковими, вантажними, автобусами та спецтехнікою.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={PHONE_HREF} size="lg">
              {SITE.contacts.phoneDisplay}
            </ButtonLink>
            <ButtonLink
              href={SITE.socials[0].url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
            >
              Написати в Instagram
            </ButtonLink>
          </div>
        </Reveal>
      </div>

      <span className="grain-layer" aria-hidden />
    </section>
  );
}
