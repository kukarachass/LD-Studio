import { Onest } from "next/font/google";

/**
 * Onest потрібен лише специмену напряму «Оптична схема» на цій сторінці,
 * тому вантажимо його тут, а не в кореневому layout — щоб не тягнути
 * зайву гарнітуру на бойові сторінки сайту.
 */
const onest = Onest({
  variable: "--font-onest",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={onest.variable}>{children}</div>;
}
