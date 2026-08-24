import { serializeJsonLd } from "@/lib/seo";

/** Вставляє готову схему Schema.org у розмітку сторінки. */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
