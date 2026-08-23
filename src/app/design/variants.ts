

export type Swatch = {
  hex: string;
  name: string;
  role: string;
};

export type DesignVariant = {
  id: string;
  index: string;
  name: string;
  latin: string;
  tagline: string;
  concept: string;
  mood: string[];
  typography: {
    display: string;
    displayNote: string;
    body: string;
    bodyNote: string;
    accent: string;
    accentNote: string;
  };
  layoutNote: string;
  motionNote: string;
  heroImage: string;
  swatches: Swatch[];
  /** CSS-змінні, які застосовуються до кореня секції варіанта. */
  tokens: Record<string, string>;
};

export const DESIGN_VARIANTS: DesignVariant[] = [
  {
    id: "cold-light",
    index: "01",
    name: "Холодне світло",
    latin: "COLD LIGHT",
    tagline: "Світло як предмет розкоші",
    concept:
      "Абсолютна чорнота і один-єдиний промінь. Фотографія працює на повний екран, типографіка накладається зверху великими масивами, жодних карток і рамок. Акцент — крижаний ксеноновий блакитний, той самий, що світиться на ваших роботах. Це мова преміальних автомобільних брендів: мало елементів, багато повітря, максимальний контраст.",
    mood: ["преміум", "мінімалізм", "нічна зйомка", "6000K"],
    typography: {
      display: "Unbounded",
      displayNote: "великий кегль, tight-трекінг, тільки капс у коротких рядках",
      body: "Manrope",
      bodyNote: "16–18px, висока інтерліньяж, приглушений сірий",
      accent: "JetBrains Mono",
      accentNote: "індекси секцій, технічні підписи, номери",
    },
    layoutNote:
      "Full-bleed фото + текст, що заходить на зображення. Розділювачі — волосяні лінії 1px. Ніяких тіней і градієнтних кнопок.",
    motionNote:
      "Повільні розгортання (0.8s, ease-out), паралакс фото, промінь світла, що проходить по заголовку при появі.",
    heroImage: "/ld-studio-11.webp",
    swatches: [
      { hex: "#04050A", name: "Ink", role: "тло сторінки" },
      { hex: "#0A0D14", name: "Surface", role: "секції, панелі" },
      { hex: "#161B26", name: "Line", role: "межі, розділювачі" },
      { hex: "#F2F6FF", name: "Beam", role: "основний текст" },
      { hex: "#79839A", name: "Muted", role: "другорядний текст" },
      { hex: "#4DA3FF", name: "Xenon", role: "акцент, CTA" },
      { hex: "#CFE6FF", name: "Halo", role: "світіння, hover" },
    ],
    tokens: {
      "--v-bg": "#04050A",
      "--v-surface": "#0A0D14",
      "--v-surface-2": "#0F1420",
      "--v-line": "rgba(242,246,255,0.10)",
      "--v-text": "#F2F6FF",
      "--v-muted": "#79839A",
      "--v-accent": "#4DA3FF",
      "--v-accent-2": "#CFE6FF",
      "--v-accent-3": "#4DA3FF",
      "--v-glow": "rgba(77,163,255,0.35)",
      "--v-font-display": "var(--font-display)",
      "--v-font-body": "var(--font-sans)",
      "--v-radius": "2px",
    },
  },
  {
    id: "spectrum",
    index: "02",
    name: "RGB Спектр",
    latin: "SPECTRUM",
    tagline: "Колір, який ви ставите в фари",
    concept:
      "Палітра взята прямо з ваших робіт: пурпур, фіолет, ціан на чорному. Композиція навмисно асиметрична й діагональна, заголовки з хроматичним контуром, світлові витоки по краях блоків. Найгучніший варіант — говорить мовою тюнінг-культури й молодої аудиторії, яка приходить за кастомом і Ambient Light.",
    mood: ["тюнінг", "RGB", "кастом", "молода аудиторія"],
    typography: {
      display: "Unbounded 800–900",
      displayNote: "надважкий кегль, розтягнуті рядки, часткова заливка градієнтом",
      body: "Manrope",
      bodyNote: "компактний, нейтральний — щоб не сперечатись із кольором",
      accent: "JetBrains Mono",
      accentNote: "теги на кшталт [RGB] [BI-LED] [AMBIENT]",
    },
    layoutNote:
      "Діагональні сітки, фото з обрізом за край екрана, градієнтні бордюри 1px, накладені blend-mode блоки.",
    motionNote:
      "Плавний зсув відтінку в градієнтах, реакція світіння на курсор, hover із хроматичним зміщенням.",
    heroImage: "/ld-studio-2.webp",
    swatches: [
      { hex: "#050308", name: "Void", role: "тло сторінки" },
      { hex: "#0D0714", name: "Surface", role: "секції, панелі" },
      { hex: "#1C1030", name: "Line", role: "межі, підкладки" },
      { hex: "#F6F2FF", name: "Light", role: "основний текст" },
      { hex: "#8A7FA6", name: "Muted", role: "другорядний текст" },
      { hex: "#FF2D8F", name: "Magenta", role: "акцент №1" },
      { hex: "#7C3BFF", name: "Violet", role: "акцент №2" },
      { hex: "#00E5FF", name: "Cyan", role: "акцент №3" },
    ],
    tokens: {
      "--v-bg": "#050308",
      "--v-surface": "#0D0714",
      "--v-surface-2": "#150A22",
      "--v-line": "rgba(246,242,255,0.12)",
      "--v-text": "#F6F2FF",
      "--v-muted": "#8A7FA6",
      "--v-accent": "#FF2D8F",
      "--v-accent-2": "#7C3BFF",
      "--v-accent-3": "#00E5FF",
      "--v-glow": "rgba(255,45,143,0.40)",
      "--v-font-display": "var(--font-display)",
      "--v-font-body": "var(--font-sans)",
      "--v-radius": "4px",
    },
  },
  {
    id: "workshop",
    index: "03",
    name: "Бурштиновий цех",
    latin: "AMBER WORKSHOP",
    tagline: "Ремесло, а не неон",
    concept:
      "Графіт, тепле бурштинове світло покажчиків повороту і фактура реального цеху — жовтий тент, цегла, верстат. Жорсткі кути замість заокруглень, трафаретна нумерація, попереджувальні смуги як розділювачі. Варіант для аудиторії, яка обирає майстра, а не картинку: тут головні слова — герметичність, відбивач, корпус, кріплення.",
    mood: ["майстерня", "інженерія", "надійність", "вантажні та автобуси"],
    typography: {
      display: "Unbounded 600",
      displayNote: "щільні капслок-рядки, широкий трекінг у коротких словах",
      body: "Manrope",
      bodyNote: "трохи більший розмір — багато пояснювального тексту",
      accent: "JetBrains Mono",
      accentNote: "трафаретні номери етапів, прайс, специфікації",
    },
    layoutNote:
      "Жорстка модульна сітка, панелі з різаними кутами (clip-path), смугастий роздільник, фото в межах суворих рамок.",
    motionNote:
      "Стримано: зсув на 8–12px, поява по сітці, бурштиновий підсвіт краю панелі при hover.",
    heroImage: "/ld-studio-8.webp",
    swatches: [
      { hex: "#0A0908", name: "Graphite", role: "тло сторінки" },
      { hex: "#15120D", name: "Surface", role: "секції, панелі" },
      { hex: "#241E14", name: "Line", role: "межі, рамки" },
      { hex: "#F6F1E6", name: "Bone", role: "основний текст" },
      { hex: "#8C8271", name: "Muted", role: "другорядний текст" },
      { hex: "#FFA51F", name: "Amber", role: "акцент, CTA" },
      { hex: "#FFE3A3", name: "Filament", role: "світіння, hover" },
    ],
    tokens: {
      "--v-bg": "#0A0908",
      "--v-surface": "#15120D",
      "--v-surface-2": "#1D1811",
      "--v-line": "rgba(246,241,230,0.12)",
      "--v-text": "#F6F1E6",
      "--v-muted": "#8C8271",
      "--v-accent": "#FFA51F",
      "--v-accent-2": "#FFE3A3",
      "--v-accent-3": "#FFA51F",
      "--v-glow": "rgba(255,165,31,0.35)",
      "--v-font-display": "var(--font-display)",
      "--v-font-body": "var(--font-sans)",
      "--v-radius": "0px",
    },
  },
  {
    id: "blueprint",
    index: "04",
    name: "Оптична схема",
    latin: "OPTICAL BLUEPRINT",
    tagline: "Інженери світла",
    concept:
      "Сайт як технічне креслення: майже чорний графіт, ледь помітна сітка, векторні промені й кути розсіювання поверх фото. Моноширинний шрифт веде ієрархію, поруч із кожним блоком — координати й позначення, як у специфікації. Найспокійніший і найдовговічніший варіант: він не старіє і чудово масштабується, коли з'явиться багато нового контенту.",
    mood: ["точність", "схема", "дані", "довіра"],
    typography: {
      display: "Onest",
      displayNote: "нейтральний геометричний гротеск, без декору",
      body: "Onest",
      bodyNote: "одна гарнітура на весь сайт — максимальна чистота",
      accent: "JetBrains Mono",
      accentNote: "несе основну характерність: підписи, осі, індекси, розміри",
    },
    layoutNote:
      "Видима базова сітка, кутові маркери замість рамок, підписи-виноски з тонкими лініями до об'єкта на фото.",
    motionNote:
      "Лінії, що прокреслюються (SVG stroke-dashoffset), лічильники цифр, поява блоків рядок за рядком.",
    heroImage: "/ld-studio-6.webp",
    swatches: [
      { hex: "#06080A", name: "Carbon", role: "тло сторінки" },
      { hex: "#0C1013", name: "Surface", role: "секції, панелі" },
      { hex: "#18201F", name: "Grid", role: "сітка, межі" },
      { hex: "#E8F1EF", name: "Paper", role: "основний текст" },
      { hex: "#6E7D7B", name: "Muted", role: "другорядний текст" },
      { hex: "#3FE0C8", name: "Signal", role: "акцент, схема" },
      { hex: "#A8FFF0", name: "Trace", role: "світіння, hover" },
    ],
    tokens: {
      "--v-bg": "#06080A",
      "--v-surface": "#0C1013",
      "--v-surface-2": "#111719",
      "--v-line": "rgba(232,241,239,0.10)",
      "--v-text": "#E8F1EF",
      "--v-muted": "#6E7D7B",
      "--v-accent": "#3FE0C8",
      "--v-accent-2": "#A8FFF0",
      "--v-accent-3": "#3FE0C8",
      "--v-glow": "rgba(63,224,200,0.30)",
      "--v-font-display": "var(--font-alt)",
      "--v-font-body": "var(--font-alt)",
      "--v-radius": "2px",
    },
  },
];
