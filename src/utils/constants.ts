export const API_HOST = process.env.NEXT_PUBLIC_API_URL;
export const CDN_PATH = process.env.NEXT_PUBLIC_CDN_PATH;
export const FORMAT_DATA = process.env.NEXT_PUBLIC_FORMAT_DATA;

export const AUTH_KEY = "application_auth";
export const USER_KEY = "application_user";

export const optionsAnimate = { animate: true, duration: 0.5 };

export const navItems = [
  { id: 2, path: "/login", text: "Registrati o accedi" },
  { id: 3, path: "/components", text: "Components" },
  { id: 4, path: "/professional", text: "Professionisti", shield: true },
];

export const defaultCarousel = [
  {
    id: 1,
    title: "Risparmia tempo,",
    position: 1,
    description: "trova il professionista giusto.",
    src: `https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c91f906b-5881-47b1-89e4-e4a69c1961a7`,
  },
  {
    id: 2,
    title: "Professionisti affidabili",
    position: 2,
    description: " a portata di clic.",
    src: `https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5bc859f0-db4f-4ab4-8f5f-e55977c33eb1`,
  },
  {
    id: 3,
    title: "Semplifica la tua vita, ",
    position: 3,
    description: "scegli i migliori esperti.",
    src: `https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d239a63a-a0f8-4213-82dc-bb8d3f0806db`,
  },
];

export const mokSlider = [
  {
    path: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c91f906b-5881-47b1-89e4-e4a69c1961a7",
  },
  {
    text: "Professionisti affidabili a portata di clic.",
    path: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5bc859f0-db4f-4ab4-8f5f-e55977c33eb1",
  },
  {
    text: "Semplifica la tua vita, scegli i migliori esperti.",
    path: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d239a63a-a0f8-4213-82dc-bb8d3f0806db",
  },
  {
    text: "Risparmia tempo, trova il professionista giusto.",
    path: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/9c0637aa-b440-4aef-93f3-ea20cf19f42c",
  },
];

export const mokCategories = [
  {
    label: "Casa e giardino",
    value: "Casa e giardino",
    url: "articoli-per-la-casa",
  },
  {
    label: "Console e Videogiochi",
    value: "Console e Videogiochi",
    url: "console-e-videogiochi",
  },
  {
    label: "Cinema, libri e musica",
    value: "Cinema, libri e musica",
    url: "cinema-libri-musica",
  },
  {
    label: "Telefonia e Accessori",
    value: "Telefonia e Accessori",
    url: "telefonia-e-accessori",
  },
  {
    label: "Prodotti informatici",
    value: "Prodotti informatici",
    url: "informatica-e-elettronica",
  },
  {
    label: "Tecnologia ed elettronica",
    value: "Tecnologia ed elettronica",
    url: "tv-audio-e-fotocamere",
  },
  {
    label: "Sport e tempo libero",
    value: "Sport e tempo libero",
    url: "sport-e-tempo-libero",
  },
  {
    label: "Biciclette",
    value: "Biciclette",
    url: "biciclette",
  },
  {
    label: "Collezionismo",
    value: "Collezionismo",
    url: "oggetti-da-collezione",
  },
  {
    label: "Bambini e neonati",
    value: "Bambini e neonati",
    url: "bambini-e-neonati",
  },
  {
    label: "Moda e accessori",
    value: "Moda e accessori",
    url: "moda-e-accessori",
  },
  {
    label: "Auto",
    value: "Auto",
    url: "auto",
  },
  {
    label: "Moto",
    value: "Moto",
    url: "moto",
  },
  {
    label: "Motori e accessori",
    value: "Motori e accessori",
    url: "motori-e-accessori",
  },
  {
    label: "Immobiliare",
    value: "Immobiliare",
    url: "immobiliare",
  },
  {
    label: "Elettrodomestici",
    value: "Elettrodomestici",
    url: "elettrodomestici",
  },
  {
    label: "Attrezzature di lavoro",
    value: "Attrezzature di lavoro",
    url: "attrezzadure-di-lavoro",
  },
  {
    label: "Industria e agricoltura",
    value: "Industria e agricoltura",
    url: "industria-e-agricoltura",
  },
  {
    label: "Lavoro",
    value: "Lavoro",
    url: "offerte-di-lavoro",
  },
  {
    label: "Servizi",
    value: "Servizi",
    url: "servizi",
  },
  {
    label: "Altro",
    value: "Altro",
    url: "altro",
  },
];

export const mokSortPrice = [
  { label: "Prezzo crescente", value: "ASC" },
  { label: "Prezzo decrescente", value: "DESC" },
];

export const specialist = [
  {
    id: 1,
    createdAt: "06/03/2022",
    name: "Carlo Rossi",
    position: [42.16137759041936, 12.339213749209796],
    range: 20,
    profession: "Musicista",
    rating: 1,
  },
  {
    id: 2,
    createdAt: "06/03/2022",
    name: "Flavio Bianchi",
    position: [42.142287926630516, 12.540400871218557],
    range: 10,
    profession: "Meccanico",
    rating: 2,
  },
  {
    id: 3,
    createdAt: "06/03/2022",
    name: "Mario Verdi",
    position: [42.09288262437151, 12.273639107053354],
    range: 50,
    profession: "Giardiniere",
    rating: 3,
  },
  {
    id: 4,
    createdAt: "06/03/2022",
    name: "Anna Gialli",
    position: [42.206914985163685, 12.39517535481974],
    range: 80,
    profession: "Operaio",
    rating: 4,
  },
  {
    id: 5,
    createdAt: "06/03/2022",
    name: "Claudia Shiffer",
    position: [42.0775948359501, 12.4497636694941],
    range: 10,
    profession: "Nerd",
    rating: 5,
  },
  {
    id: 6,
    createdAt: "06/03/2022",
    name: "Sole Soleil",
    position: [42.09950618862456, 12.563746817117186],
    range: 15,
    profession: "Avvocato",
    rating: 3,
  },
  {
    id: 7,
    createdAt: "06/03/2022",
    name: "Falco Neri",
    position: [42.090681921149525, 12.27409778617536],
    range: 15,
    profession: "Studente",
    rating: 2,
  },
];
