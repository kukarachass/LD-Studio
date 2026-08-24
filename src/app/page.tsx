import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BeforeAfter } from "@/components/sections/before-after";
import { Contacts } from "@/components/sections/contacts";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Process } from "@/components/sections/process";
import { Reviews } from "@/components/sections/reviews";
import { Services } from "@/components/sections/services";
import { Works } from "@/components/sections/works";
import { JsonLd } from "@/components/seo/json-ld";
import { buildFaqSchema, buildLocalBusinessSchema } from "@/lib/seo";

/**
 * Головна сторінка. Порядок секцій = порядок блоків нижче;
 * щоб переставити або прибрати секцію, достатньо змінити цей список
 * (і відповідний пункт у src/content/navigation.ts).
 */
export default function HomePage() {
  return (
    <>
      <JsonLd schema={buildLocalBusinessSchema()} />
      <JsonLd schema={buildFaqSchema()} />

      <SiteHeader />

      <main>
        <Hero />
        <Marquee />
        <Services />
        <BeforeAfter />
        <Works />
        <Process />
        <Reviews />
        <Faq />
        <Contacts />
        <Cta />
      </main>

      <SiteFooter />
    </>
  );
}
