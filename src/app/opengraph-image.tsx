import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Прев'ю для месенджерів і соцмереж.
 * Генерується на етапі збірки, окремої картинки підтримувати не треба —
 * текст береться з src/content/site.ts.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050308",
          backgroundImage:
            "linear-gradient(135deg, #050308 0%, #120820 52%, #1E0A32 100%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Смуга спектра */}
        <div
          style={{
            display: "flex",
            height: 8,
            width: "100%",
            backgroundImage:
              "linear-gradient(96deg, #FF2D8F 0%, #7C3BFF 48%, #00E5FF 100%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 118,
              fontWeight: 800,
              letterSpacing: "-4px",
              color: "#F6F2FF",
              lineHeight: 1,
            }}
          >
            L.D_STUDIO
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 38,
              color: "#C9BEE8",
            }}
          >
            {SITE.tagline}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 26,
              color: "#8A7FA6",
            }}
          >
            Ремонт · Відновлення · Bi-LED · Тюнінг · Бронювання
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(246,242,255,0.16)",
            paddingTop: 28,
            fontSize: 26,
            color: "#F6F2FF",
          }}
        >
          <div style={{ display: "flex" }}>
            {SITE.address.city} · {SITE.coverage.scope}
          </div>
          <div style={{ display: "flex", color: "#FF2D8F" }}>
            {SITE.contacts.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
