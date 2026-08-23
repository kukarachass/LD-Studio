import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "L.D_Studio — автомобільна оптика нового рівня | Одеса",
  description:
    "Ремонт, відновлення та тюнінг автомобільних фар в Одесі. Bi-LED, LED, заміна скла, усунення запотівання, ДХО, індивідуальні проєкти.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={`${fontVariables} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
