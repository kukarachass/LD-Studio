import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "@/content/navigation";
import { SERVICES } from "@/content/services";
import { EMAIL_HREF, PHONE_HREF, SITE } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="section-x mx-auto max-w-[110rem] py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Бренд */}
          <div>
            <div className="flex items-center gap-3">
              <span className="relative block h-11 w-11 overflow-hidden rounded-full ring-1 ring-line-strong">
                <Image
                  src="/ld-studio-logo.webp"
                  alt=""
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span className="font-display text-base font-extrabold tracking-[-0.02em]">
                L.D_Studio
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-muted">
              {SITE.tagline}. Ремонт, відновлення та тюнінг оптики для
              автомобілів будь-яких марок.
            </p>
            <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
              {SITE.coverage.city} · {SITE.coverage.scope}
            </p>
          </div>

          {/* Навігація */}
          <nav aria-label="Розділи сайту">
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-magenta uppercase">
              Розділи
            </h3>
            <ul className="mt-4 space-y-0.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2 text-[14px] text-muted transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/roboty"
                  className="block py-2 text-[14px] text-muted transition-colors hover:text-paper"
                >
                  Усі роботи
                </Link>
              </li>
            </ul>
          </nav>

          {/* Послуги */}
          <nav aria-label="Послуги студії">
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-violet uppercase">
              Послуги
            </h3>
            <ul className="mt-4 space-y-0.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/#${service.slug}`}
                    className="block py-2 text-[14px] text-muted transition-colors hover:text-paper"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Контакти */}
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">
              Контакти
            </h3>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href={PHONE_HREF}
                  className="block py-1.5 font-mono text-lg text-paper transition-colors hover:text-magenta"
                >
                  {SITE.contacts.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={EMAIL_HREF}
                  className="block py-2 text-[14px] text-muted transition-colors hover:text-paper"
                >
                  {SITE.contacts.email}
                </a>
              </li>
              <li>
                <address className="py-2 text-[14px] leading-relaxed text-muted not-italic">
                  {SITE.address.full}
                </address>
              </li>
              {SITE.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-[14px] text-muted transition-colors hover:text-paper"
                  >
                    {social.label} {social.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="rule-spectrum mt-14" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
            © {year} {SITE.name} — {SITE.legalName}
          </p>
          <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
            {SITE.address.city} · {SITE.geo.lat.toFixed(4)}°N{" "}
            {SITE.geo.lng.toFixed(4)}°E
          </p>
        </div>
      </div>
    </footer>
  );
}
