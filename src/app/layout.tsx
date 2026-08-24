import type { Metadata, Viewport } from "next";
import { SITE } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ремонт, відновлення та тюнінг фар в Одесі`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.shortDescription,
  applicationName: SITE.name,
  keywords: [
    "ремонт фар Одеса",
    "відновлення фар Одеса",
    "тюнінг фар",
    "Bi-LED Одеса",
    "встановлення лінз",
    "заміна скла фар",
    "усунення запотівання фар",
    "полірування фар",
    "бронювання фар",
    "ДХО",
    "Ambient Light",
    "автосвітло Одеса",
    "L.D_Studio",
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "automotive",
  formatDetection: {
    telephone: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050308",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
