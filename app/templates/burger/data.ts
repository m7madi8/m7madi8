export type BurgerCategory = "burgers" | "sides" | "drinks";
export type MenuGroup = "food" | "drinks";

export type BurgerItem = {
  id: string;
  num: string;
  category: BurgerCategory;
  name: string;
  nameAr: string;
  tags: string;
  ingredients: string[];
  price: number;
  spicy: 0 | 1 | 2 | 3;
  veg?: boolean;
  signature?: boolean;
  img: string;
};

export const groups: { id: MenuGroup; label: string }[] = [
  { id: "food", label: "طعام" },
  { id: "drinks", label: "مشروبات" },
];

export const foodCats: { id: "all" | "burgers" | "sides"; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "burgers", label: "برغر" },
  { id: "sides", label: "جانبي" },
];

export const burgerPlace = {
  name: "GRIDLOCK",
  nameAr: "صاج برغر",
  city: "رام الله",
  hours: "يومياً ١٢ الظهر — ١٢ الليل",
};

export const burgerMenu: BurgerItem[] = [
  {
    id: "original",
    num: "01",
    category: "burgers",
    name: "The Original",
    nameAr: "الأصلي",
    tags: "دبل سماش · شيدر · مخلل بيتي",
    ingredients: ["قطعتين لحم على الصاج", "شيدر معتّق", "مخلل بيتي", "صوص البيت", "خبز بريوش"],
    price: 28,
    spicy: 0,
    signature: true,
    img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "beast",
    num: "02",
    category: "burgers",
    name: "The Beast",
    nameAr: "الثقيل",
    tags: "تريبل لحم · دبل جبنة · بصل مكرمل",
    ingredients: ["ثلاث قطع لحم", "دبل شيدر", "بصل مكرمل", "صوص مدخّن", "خبز بريوش"],
    price: 42,
    spicy: 1,
    img: "https://images.unsplash.com/photo-1688246780164-00c01647e78c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "fire",
    num: "03",
    category: "burgers",
    name: "Fire",
    nameAr: "شطة",
    tags: "هالبينو · شطة · بيبر جاك",
    ingredients: ["قطعتين لحم", "جبنة بيبر جاك", "هالبينو طازج", "شطة البيت", "بصل مقرمش"],
    price: 35,
    spicy: 3,
    img: "https://images.unsplash.com/photo-1596956470007-2bf6095e7e16?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "blackout",
    num: "04",
    category: "burgers",
    name: "Blackout",
    nameAr: "الفحم",
    tags: "خبز فحم · ثوم أسود · شيدر مدخّن",
    ingredients: ["قطعتين لحم", "شيدر مدخّن", "صوص ثوم أسود", "خبز فحم"],
    price: 38,
    spicy: 2,
    img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "crunch",
    num: "05",
    category: "burgers",
    name: "Crunch",
    nameAr: "المقرمش",
    tags: "بصل مقلي · مخلل · صوص خاص",
    ingredients: ["قطعتين لحم", "شيدر", "بصل مقرمش", "مخلل بيتي", "صوص كرانش"],
    price: 32,
    spicy: 0,
    img: "https://images.unsplash.com/photo-1639020715088-e7afebe6cb25?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "vegetal",
    num: "06",
    category: "burgers",
    name: "Vegetal",
    nameAr: "نباتي",
    tags: "قطعة نباتية · فليفلة مشوية · أعشاب",
    ingredients: ["قطعة نباتية مشوية", "فليفلة مشوية", "شيدر", "صوص أعشاب", "خبز بريوش"],
    price: 30,
    spicy: 0,
    veg: true,
    img: "https://images.unsplash.com/photo-1465799411029-5a317ff17837?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "fries",
    num: "07",
    category: "sides",
    name: "Fries",
    nameAr: "بطاطا صاج",
    tags: "ملح · بابريكا",
    ingredients: ["بطاطا مقلية على الصاج", "ملح خشن", "بابريكا"],
    price: 12,
    spicy: 0,
    veg: true,
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "onion",
    num: "08",
    category: "sides",
    name: "Onion rings",
    nameAr: "حلقات بصل",
    tags: "مقرمش · صوص البيت",
    ingredients: ["بصل مغطى", "قلي غزير", "صوص البيت"],
    price: 14,
    spicy: 0,
    veg: true,
    img: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "ayran",
    num: "09",
    category: "drinks",
    name: "Ayran",
    nameAr: "عيران",
    tags: "بارد · مملح خفيف",
    ingredients: ["لبن", "ماء", "ملح"],
    price: 8,
    spicy: 0,
    veg: true,
    img: "https://images.unsplash.com/photo-1623065425901-5bac5023c2d0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "cola",
    num: "10",
    category: "drinks",
    name: "Cola",
    nameAr: "كولا",
    tags: "علبة باردة",
    ingredients: ["علبة ٣٣٠ مل"],
    price: 7,
    spicy: 0,
    veg: true,
    img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1400&q=80",
  },
];
