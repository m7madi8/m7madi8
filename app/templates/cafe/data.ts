export type CafeCategory =
  | "espresso"
  | "latte"
  | "cold"
  | "matcha"
  | "signature";

export type CafeItem = {
  id: string;
  num: string;
  category: CafeCategory;
  name: string;
  nameAr: string;
  tags: string;
  ingredients: string[];
  price: number;
  img: string;
  featured?: boolean;
  seasonal?: boolean;
  signature?: boolean;
  plant?: boolean;
};

export const cafePlace = {
  name: "POUR",
  nameAr: "قهوة مختصة",
  city: "رام الله",
  hours: "يومياً ٧ صباحاً — ١٠ مساءً",
};

export const cafeCats: { id: "all" | CafeCategory; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "espresso", label: "إسبريسو" },
  { id: "latte", label: "لاتيه" },
  { id: "cold", label: "بارد" },
  { id: "matcha", label: "ماتشا" },
  { id: "signature", label: "توقيع" },
];

const IMG = {
  espresso:
    "https://images.unsplash.com/photo-1506372023823-741c83b836fe?auto=format&fit=crop&w=1400&q=80",
  latte:
    "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1400&q=80",
  cold: "https://images.unsplash.com/photo-1527156231393-7023794f363c?auto=format&fit=crop&w=1400&q=80",
  matcha:
    "https://images.unsplash.com/photo-1717398804885-a6c22b3e5c2f?auto=format&fit=crop&w=1400&q=80",
  signature:
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1400&q=80",
  pistachio:
    "https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?auto=format&fit=crop&w=1400&q=80",
  iced: "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=1400&q=80",
  strawberry:
    "https://images.unsplash.com/photo-1749280447307-31a68eb38673?auto=format&fit=crop&w=1400&q=80",
};

export const cafeMenu: CafeItem[] = [
  {
    id: "espresso",
    num: "01",
    category: "espresso",
    name: "Espresso",
    nameAr: "إسبريسو",
    tags: "أصل واحد · ٣٠ مل",
    ingredients: ["إسبريسو من أصل واحد"],
    price: 10,
    img: IMG.espresso,
  },
  {
    id: "americano",
    num: "02",
    category: "espresso",
    name: "Americano",
    nameAr: "أمريكانو",
    tags: "إسبريسو · ماء ساخن",
    ingredients: ["إسبريسو", "ماء ساخن"],
    price: 12,
    img: IMG.espresso,
  },
  {
    id: "cortado",
    num: "03",
    category: "espresso",
    name: "Cortado",
    nameAr: "كورتادو",
    tags: "متوازن · حرير · دافئ",
    ingredients: ["إسبريسو", "حليب مبخّر"],
    price: 14,
    img: IMG.latte,
  },
  {
    id: "cappuccino",
    num: "04",
    category: "espresso",
    name: "Cappuccino",
    nameAr: "كابتشينو",
    tags: "دبل شوت · رغوة ناعمة",
    ingredients: ["دبل إسبريسو", "حليب مبخّر", "مايكروفوم"],
    price: 16,
    img: IMG.latte,
  },
  {
    id: "flat-white",
    num: "05",
    category: "espresso",
    name: "Flat White",
    nameAr: "فلات وايت",
    tags: "ريستريتو · حليب مخملي",
    ingredients: ["ريستريتو", "حليب مبخّر"],
    price: 16,
    img: IMG.latte,
  },
  {
    id: "classic-latte",
    num: "06",
    category: "latte",
    name: "Classic Latte",
    nameAr: "لاتيه",
    tags: "إسبريسو · حليب مبخّر",
    ingredients: ["إسبريسو", "حليب مبخّر"],
    price: 16,
    img: IMG.latte,
  },
  {
    id: "vanilla-latte",
    num: "07",
    category: "latte",
    name: "Vanilla Latte",
    nameAr: "لاتيه فانيلا",
    tags: "فانيلا البيت · إسبريسو",
    ingredients: ["إسبريسو", "حليب مبخّر", "سيرب فانيلا البيت"],
    price: 18,
    img: IMG.latte,
  },
  {
    id: "pistachio",
    num: "08",
    category: "latte",
    name: "Pistachio Latte",
    nameAr: "لاتيه فستق",
    tags: "كريم فستق · ملح بحر",
    ingredients: ["إسبريسو", "كريم فستق", "حليب مبخّر", "ملح بحر"],
    price: 22,
    img: IMG.pistachio,
    featured: true,
    signature: true,
  },
  {
    id: "spanish",
    num: "09",
    category: "latte",
    name: "Spanish Latte",
    nameAr: "لاتيه إسباني",
    tags: "حليب مكثّف · قرفة",
    ingredients: ["إسبريسو", "حليب مكثّف محلّى", "قرفة"],
    price: 18,
    img: IMG.latte,
  },
  {
    id: "iced-latte",
    num: "10",
    category: "cold",
    name: "Iced Latte",
    nameAr: "لاتيه مثلج",
    tags: "إسبريسو على الثلج",
    ingredients: ["إسبريسو", "حليب بارد", "ثلج"],
    price: 18,
    img: IMG.signature,
  },
  {
    id: "cold-brew",
    num: "11",
    category: "cold",
    name: "Cold Brew",
    nameAr: "كولد برو",
    tags: "نقيع ١٨ ساعة",
    ingredients: ["قهوة منقوعة على البارد", "ثلج"],
    price: 16,
    img: IMG.cold,
  },
  {
    id: "iced-americano",
    num: "12",
    category: "cold",
    name: "Iced Americano",
    nameAr: "أمريكانو مثلج",
    tags: "إسبريسو · ماء بارد · ثلج",
    ingredients: ["إسبريسو", "ماء بارد", "ثلج"],
    price: 14,
    img: IMG.cold,
  },
  {
    id: "sig-cold",
    num: "13",
    category: "cold",
    name: "The Iced One",
    nameAr: "كولد برو التوقيع",
    tags: "كولد برو · فانيلا · كريمة",
    ingredients: ["كولد برو", "فانيلا البيت", "كريمة طازجة"],
    price: 20,
    img: IMG.iced,
    featured: true,
    signature: true,
  },
  {
    id: "matcha",
    num: "14",
    category: "matcha",
    name: "Classic Matcha",
    nameAr: "ماتشا",
    tags: "درجة احتفالية · حليب",
    ingredients: ["ماتشا احتفالية", "حليب"],
    price: 18,
    img: IMG.matcha,
  },
  {
    id: "strawberry-matcha",
    num: "15",
    category: "matcha",
    name: "Strawberry Matcha",
    nameAr: "ماتشا فراولة",
    tags: "ماتشا · بيوريه فراولة · حليب",
    ingredients: ["ماتشا احتفالية", "بيوريه فراولة البيت", "حليب بارد"],
    price: 22,
    img: IMG.strawberry,
    featured: true,
    seasonal: true,
  },
  {
    id: "vanilla-matcha",
    num: "16",
    category: "matcha",
    name: "Vanilla Matcha",
    nameAr: "ماتشا فانيلا",
    tags: "ماتشا · فانيلا · حليب",
    ingredients: ["ماتشا احتفالية", "فانيلا البيت", "حليب"],
    price: 20,
    img: IMG.matcha,
  },
  {
    id: "coconut-matcha",
    num: "17",
    category: "matcha",
    name: "Coconut Matcha",
    nameAr: "ماتشا جوز هند",
    tags: "ماتشا · حليب جوز هند",
    ingredients: ["ماتشا احتفالية", "حليب جوز هند"],
    price: 20,
    img: IMG.matcha,
    plant: true,
  },
  {
    id: "sig-cafe",
    num: "18",
    category: "signature",
    name: "Café Signature",
    nameAr: "توقيع POUR",
    tags: "خلطة البيت · اسأل الباريستا",
    ingredients: ["وصفة البيت المتجددة"],
    price: 22,
    img: IMG.signature,
    signature: true,
  },
  {
    id: "sig-seasonal",
    num: "19",
    category: "signature",
    name: "Seasonal Special",
    nameAr: "موسم الشهر",
    tags: "يتغيّر كل شهر",
    ingredients: ["وصفة موسمية محدودة"],
    price: 22,
    img: IMG.strawberry,
    seasonal: true,
  },
  {
    id: "sig-house",
    num: "20",
    category: "signature",
    name: "House Creation",
    nameAr: "اختيار الباريستا",
    tags: "تجربة اليوم",
    ingredients: ["وصفة يومية صغيرة"],
    price: 22,
    img: IMG.signature,
    signature: true,
  },
];
