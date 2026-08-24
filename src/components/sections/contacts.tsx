import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { EMAIL_HREF, PHONE_HREF, SITE } from "@/content/site";

/** Фільтр, який робить світлу карту Google придатною для темного сайту. */
const DARK_MAP_FILTER =
  "invert(0.92) hue-rotate(180deg) saturate(0.72) contrast(0.9) brightness(0.96)";

export function Contacts() {
  const instagram = SITE.socials[0];

  return (
    <section id="contacts" className="section-x mx-auto max-w-[110rem] py-20 sm:py-28">
      <SectionHeading
        index="07"
        eyebrow="Контакти"
        title={
          <>
            Приїжджайте
            <br />
            або напишіть
          </>
        }
        description="Студія в Одесі. Перед візитом надішліть фото фар — так консультація буде предметною."
      />

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* Контактні дані */}
        <Reveal from="left" className="flex flex-col gap-4">
          <a
            href={PHONE_HREF}
            className="group rounded-sm border border-line bg-surface p-6 transition-colors duration-300 hover:border-magenta/60 sm:p-7"
          >
            <div className="font-mono text-[10px] tracking-[0.24em] text-magenta uppercase">
              Телефон
            </div>
            <div className="mt-3 font-mono text-[clamp(1.25rem,3.6vw,1.85rem)] tracking-[-0.01em] transition-colors duration-300 group-hover:text-magenta">
              {SITE.contacts.phoneDisplay}
            </div>
            <div className="mt-2 text-[13px] text-muted">
              Зателефонуйте — підкажемо рішення по вашій фарі
            </div>
          </a>

          <a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-sm border border-line bg-surface p-6 transition-colors duration-300 hover:border-violet/60 sm:p-7"
          >
            <div className="font-mono text-[10px] tracking-[0.24em] text-violet uppercase">
              Instagram
            </div>
            <div className="mt-3 font-display text-xl font-extrabold tracking-[-0.02em] transition-colors duration-300 group-hover:text-violet">
              {instagram.handle}
            </div>
            <div className="mt-2 text-[13px] text-muted">
              Свіжі роботи, сторіз із процесу та відгуки
            </div>
          </a>

          <div className="rounded-sm border border-line bg-surface p-6 sm:p-7">
            <div className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">
              Адреса
            </div>
            <address className="mt-3 text-[15px] leading-relaxed not-italic">
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.region}
              <br />
              {SITE.address.postalCode}, {SITE.address.countryName}
            </address>

            <div className="mt-5 border-t border-line pt-4">
              <div className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                Графік
              </div>
              <div className="mt-1.5 text-[14px] text-muted">
                {SITE.workingHours
                  ? SITE.workingHours.display
                  : "Уточнюйте за телефоном"}
              </div>
            </div>

            <div className="mt-4 border-t border-line pt-4">
              <div className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                Пошта
              </div>
              <a
                href={EMAIL_HREF}
                className="mt-1.5 block text-[14px] text-muted transition-colors hover:text-paper"
              >
                {SITE.contacts.email}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Карта */}
        <Reveal from="right" delay={0.08}>
          <div className="relative h-[24rem] overflow-hidden rounded-sm border border-line sm:h-[32rem] lg:h-full lg:min-h-[34rem]">
            <iframe
              src={SITE.maps.embedUrl}
              title={`Карта: ${SITE.legalName}, ${SITE.address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
              style={
                SITE.maps.darkFilter ? { filter: DARK_MAP_FILTER } : undefined
              }
            />

            {/* Легка кольорова вуаль, щоб карта не випадала зі стилістики */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(124,59,255,0.10),transparent_45%,rgba(0,229,255,0.07))]"
            />

            {/* Картка поверх карти */}
            <div className="pointer-events-none absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5">
              <div className="pointer-events-auto flex flex-col gap-4 rounded-sm border border-line bg-void/94 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-display text-sm font-extrabold tracking-[-0.02em] uppercase">
                    {SITE.legalName}
                  </div>
                  <div className="mt-1.5 text-[13px] text-muted">
                    {SITE.address.full}
                  </div>
                </div>
                <a
                  href={SITE.maps.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full bg-spectrum px-5 py-2.5 text-center text-[12px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Прокласти маршрут
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
