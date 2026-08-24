import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stars } from "@/components/ui/stars";
import { REVIEWS, REVIEW_SOURCE_LABEL } from "@/content/reviews";
import { SITE } from "@/content/site";

/**
 * Відгуки клієнтів.
 *
 * Свідомо без мікророзмітки Review: Google не враховує відгуки, які сайт
 * публікує сам про себе, і за таку розмітку може накласти санкції.
 * Довіру тут будує посилання на першоджерело — картку в Google Maps.
 */
export function Reviews() {
  return (
    <section
      id="reviews"
      className="relative isolate overflow-hidden bg-surface/40 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="glow glow-violet pointer-events-none -top-24 right-1/4 h-80 w-80 opacity-70"
      />

      <div className="section-x relative mx-auto max-w-[110rem]">
        <SectionHeading
          index="05"
          eyebrow="Відгуки"
          title="Що кажуть клієнти"
          description="Живі відгуки з картки студії. Натисніть на джерело — побачите оригінал."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review, i) => (
            <Reveal as="li" key={review.id} from="scale" delay={i * 0.08}>
              <figure className="group relative flex h-full flex-col rounded-sm border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:p-7">
                {/* Декоративні лапки */}
                <span
                  aria-hidden
                  className="font-display pointer-events-none absolute top-3 right-5 text-5xl leading-none font-black text-violet/15 transition-colors duration-500 group-hover:text-violet/25"
                >
                  &rdquo;
                </span>

                <Stars rating={review.rating} />

                <blockquote className="mt-5 flex-1 text-[14px] leading-relaxed text-paper/80">
                  {review.text}
                </blockquote>

                <figcaption className="mt-6 border-t border-line pt-4">
                  <div className="text-[13px] text-paper">
                    {review.author ?? "Клієнт студії"}
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                    {REVIEW_SOURCE_LABEL[review.source]}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}

          {/* Заклик лишити відгук: заповнює сітку й приносить нові справжні відгуки */}
          <Reveal as="li" from="scale" delay={REVIEWS.length * 0.08}>
            <div
              className="flex h-full flex-col justify-between rounded-sm border border-line p-6 sm:p-7"
              style={{
                background:
                  "linear-gradient(150deg,color-mix(in srgb,var(--color-magenta) 14%,var(--color-surface)),var(--color-surface) 62%)",
              }}
            >
              <div>
                <div className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">
                  Були в нас?
                </div>
                <p className="font-display mt-4 text-lg leading-tight font-extrabold tracking-[-0.012em] uppercase">
                  Залиште
                  <br />
                  свій відгук
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">
                  Кілька рядків від вас допомагають наступному водію
                  зважитись — і нам стати кращими.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={SITE.maps.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-spectrum rounded-full px-5 py-3 text-center text-[13px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Google Maps
                </a>
                <a
                  href={SITE.socials[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line-strong px-5 py-3 text-center text-[13px] text-paper transition-colors duration-300 hover:border-cyan hover:text-cyan"
                >
                  Instagram
                </a>
              </div>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
