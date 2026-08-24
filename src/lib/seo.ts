import { FAQ } from "@/content/faq";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";

/**
 * Мікророзмітка Schema.org.
 *
 * Google використовує її, щоб показати студію в локальній видачі та на
 * картах: назва, адреса, телефон, координати, послуги й відповіді з FAQ.
 * Дані беруться з src/content — окремо нічого правити не треба.
 */

const BUSINESS_ID = `${SITE.url}/#business`;

/** Основна картка бізнесу: автосервіс із прив'язкою до адреси й координат. */
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": BUSINESS_ID,
    name: SITE.legalName,
    alternateName: SITE.name,
    description: SITE.shortDescription,
    url: SITE.url,
    image: [`${SITE.url}/ld-studio-1.webp`, `${SITE.url}/ld-studio-11.webp`],
    logo: `${SITE.url}/ld-studio-logo.webp`,
    telephone: SITE.contacts.phoneRaw,
    email: SITE.contacts.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: SITE.maps.shareUrl,
    areaServed: [
      { "@type": "City", name: "Одеса" },
      { "@type": "Country", name: "Україна" },
    ],
    sameAs: SITE.socials.map((social) => social.url),
    ...(SITE.workingHours
      ? { openingHours: SITE.workingHours.schema }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Послуги з автомобільної оптики",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: service.items.join(", "),
          areaServed: SITE.address.city,
          provider: { "@id": BUSINESS_ID },
        },
      })),
    },
  };
}

/** Питання та відповіді — Google показує їх розгортанням прямо у видачі. */
export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Безпечна серіалізація для вставки в <script type="application/ld+json">. */
export function serializeJsonLd(schema: object) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
