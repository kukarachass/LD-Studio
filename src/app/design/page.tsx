import type { Metadata } from "next";
import { DesignLab } from "./_components/design-lab";

export const metadata: Metadata = {
  title: "Дизайн-напрями — L.D_Studio",
  description: "Внутрішня сторінка для вибору візуального напряму сайту студії.",
  robots: { index: false, follow: false },
};

export default function DesignPage() {
  return <DesignLab />;
}
