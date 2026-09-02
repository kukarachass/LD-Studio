/**
 * Пари «до / після» для інтерактивного повзунка.
 *
 * Щоб додати пару:
 *   1. покладіть два файли у /public/before-after/;
 *   2. допишіть об'єкт у масив.
 *
 * ВАЖЛИВО: обидва кадри мають бути максимально схожими за ракурсом і
 * пропорціями — тоді ефект «та сама фара» працює найсильніше. Пропорція
 * береться з поля `aspect` (ширина / висота), однакова для обох кадрів.
 */

export type BeforeAfterPair = {
    id: string;
    title: string;
    subtitle: string;
    before: string;
    after: string;
    /** width / height — задає висоту блока без стрибка верстки. */
    aspect: number;
};

export const BEFORE_AFTER: BeforeAfterPair[] = [
    {
        id: "audi-a5",
        title: "Audi A5",
        subtitle: "Помутніле скло, запотівання → відновлення та бронювання",
        before: "/before-after/audi-before-1.webp",
        after: "/before-after/audi-after-1.webp",
        aspect: 1179 / 1160,
    },
    {
        id: "vw-passat",
        title: "VW Passat B8",
        subtitle: "Штатна галогенна оптика → Bi-LED із синім контуром",
        before: "/before-after/passat-before-1.webp",
        after: "/before-after/passat-after-1.webp",
        aspect: 1179 / 1447,
    },
    {
        id: "bmw-e60",
        title: "BMW-E60",
        subtitle: "",
        before: "/before-after/bmw-e60-before.webp",
        after: "/before-after/bmw-e60-after.webp",
        aspect: 1179 / 1447,
    },
];
