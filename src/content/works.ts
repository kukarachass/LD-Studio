/**
 * Галерея робіт.
 *
 * Щоб додати роботу:
 *   1. покладіть файл у /public (бажано .webp);
 *   2. допишіть об'єкт на початок масиву — нові роботи мають бути зверху;
 *   3. вкажіть реальні width/height, інакше буде стрибок верстки при
 *      завантаженні (їх видно у властивостях файлу).
 *
 * Сітка галереї — «цегляна» (CSS columns), тому вертикальні й горизонтальні
 * кадри вкладаються без порожнеч і жодних додаткових налаштувань не треба.
 */

/**
 * Скільки робіт показувати на головній.
 *
 * Значення підібране під сітку: 10 кадрів рівно лягають у три колонки без
 * «хвоста» з порожнечею внизу. Решта робіт доступна на /roboty за кнопкою.
 */
export const WORKS_PREVIEW_COUNT = 10;

export type Work = {
    id: string;
    title: string;
    /** Короткий підпис: що саме зроблено. */
    caption: string;
    tags: string[];
    image: string;
    width: number;
    height: number;
};

export const WORKS: Work[] = [
    {
        id: "bmw-e60-rgb",
        title: "BMW E60",
        caption: "Кастомні фари з RGB-контуром і вставками у формі хреста",
        tags: ["Кастом", "RGB", "Тюнінг"],
        image: "/ld-studio-1.webp",
        width: 1133,
        height: 890,
    },
    {
        id: "bmw-e60-macro",
        title: "BMW E60 — макро",
        caption: "Шестигранний контур, лінза з підсвіткою та біжуча LED-смуга",
        tags: ["RGB", "ДХО"],
        image: "/ld-studio-2.webp",
        width: 1179,
        height: 1423,
    },
    {
        id: "tesla-model-s",
        title: "Tesla Model S",
        caption: "Відновлення оптики та налаштування світлового пучка",
        tags: ["Відновлення", "LED"],
        image: "/ld-studio-3.webp",
        width: 1920,
        height: 2560,
    },
    {
        id: "bmw-e60-green",
        title: "BMW E60",
        caption: "Динамічна LED-смуга із заміною кольору по контуру фари",
        tags: ["RGB", "Тюнінг"],
        image: "/ld-studio-4.webp",
        width: 1179,
        height: 2023,
    },
    {
        id: "mercedes-g",
        title: "Mercedes-Benz",
        caption: "Devil Eyes у лінзі та повне перефарбування маски",
        tags: ["Тюнінг", "Покраска масок"],
        image: "/ld-studio-5.webp",
        width: 1176,
        height: 2002,
    },
    {
        id: "mercedes-vito",
        title: "Mercedes-Benz Vito",
        caption: "Ремонт корпуса, підсвічена зірка та Bi-LED retrofit",
        tags: ["Ремонт", "Bi-LED"],
        image: "/ld-studio-6.webp",
        width: 1178,
        height: 2084,
    },
    {
        id: "rgb-strip",
        title: "RGB-контур",
        caption: "Повний спектр по периметру фари з керуванням із салону",
        tags: ["RGB", "Ambient"],
        image: "/ld-studio-7.webp",
        width: 1179,
        height: 1466,
    },
    {
        id: "bmw-x5-e53",
        title: "BMW X5 E53",
        caption: "Класичні Angel Eyes із заміною кілець на світлодіодні",
        tags: ["Angel Eyes", "LED"],
        image: "/ld-studio-8.webp",
        width: 1175,
        height: 1836,
    },
    {
        id: "bmw-f30",
        title: "BMW F30",
        caption: "Заміна скла фар і відновлення прозорості",
        tags: ["Заміна скла", "Відновлення"],
        image: "/ld-studio-9.webp",
        width: 1179,
        height: 1697,
    },
    {
        id: "lada-2107",
        title: "ВАЗ 2107",
        caption: "Bi-LED лінзи та ДХО у штатному корпусі",
        tags: ["Bi-LED", "ДХО"],
        image: "/ld-studio-10.webp",
        width: 1073,
        height: 1305,
    },
    {
        id: "bmw-x3-f25",
        title: "BMW X3 F25",
        caption: "Шестигранні ДХО холодного спектра, полірування та бронювання",
        tags: ["ДХО", "Бронювання"],
        image: "/ld-studio-11.webp",
        width: 1179,
        height: 1156,
    },
    {
        id: "mercedes-sprinter",
        title: "Mercedes-Benz Sprinter",
        caption: "Комерційний транспорт: Bi-LED, ДХО та Devil Eyes",
        tags: ["Вантажні", "Bi-LED"],
        image: "/ld-studio-12.webp",
        width: 1179,
        height: 1160,
    },
    {
        id: "bmw-e60",
        title: "BMW-e60",
        caption: "Кастомний дизайн",
        tags: [],
        image: "/bmw-e60.webp",
        width: 1179,
        height: 1160,
    },
    {
        id: "bmw-x5-f15",
        title: "BMW X5 F15",
        caption: "Кастомний дизайн",
        tags: [],
        image: "/bmw-x5-f15.webp",
        width: 1179,
        height: 1160,
    },
    {
        id: "ford-mustang",
        title: "Ford mustang",
        caption: "",
        tags: [],
        image: "/ford-mustang.webp",
        width: 1179,
        height: 1160,
    },
];
