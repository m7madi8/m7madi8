import type { Locale } from "./config";

export type Messages = {
  langSwitch: {
    label: string;
    toEn: string;
    toAr: string;
    shortEn: string;
    shortAr: string;
    menuKicker: string;
    current: string;
  };
  menu: { toggle: string };
  nav: {
    home: string;
    projects: string;
    about: string;
    restaurants: string;
    links: string;
    contact: string;
    agreement: string;
    work: string;
    method: string;
  };
  navAria: Record<string, string>;
  hero: {
    aria: string;
    nameLine1: string;
    nameLine2: string;
    tagMono: string;
    tagSerif: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
    ghost: string;
  };
  home: {
    workSection: {
      aria: string;
      index: string;
      eyebrow: string;
      title: string;
      description: string;
    };
    method: {
      aria: string;
      index: string;
      kicker: string;
      heading: string;
      steps: { step: string; title: string; copy: string }[];
    };
    contact: {
      index: string;
      eyebrow: string;
      title: string;
      description: string;
      emailLabel: string;
      emailAction: string;
      locationLabel: string;
      locationValue: string;
      locationAction: string;
    };
    entityAria: string;
  };
  about: {
    id: string;
    eyebrow: string;
    title: string;
    intro: string;
    chapters: { index: string; title: string; body: string }[];
    portraitAlt: string;
    statLabel: string;
  };
  cta: {
    aria: string;
    statSr: (n: number) => string;
    statLabel: string;
    eyebrow: string;
    statement: string;
    inline: string;
  };
  work: {
    eyebrow: string;
    backHome: string;
    title: string;
    lede: string;
    live: string;
    launching: string;
    inDev: string;
    total: string;
    aria: string;
    nextStep: string;
    readyTitle: string;
    readyCopy: string;
    getInTouch: string;
  };
  case: {
    allProjects: string;
    visitSite: string;
    viewProject: string;
    context: string;
    stack: string;
    status: string;
    live: string;
    goal: string;
    built: string;
    building: string;
    keyWork: string;
    outcome: string;
    summary: string;
    startSimilar: string;
    previous: string;
    next: string;
    navAria: string;
    statusDev: string;
  };
  footer: {
    thanks: string;
    legal: string;
    homeAria: string;
  };
  contactForm: {
    kicker: string;
    title: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    sending: string;
    successKicker: string;
    successTitle: string;
    successBody: string;
    success: string;
    errorRequired: string;
    errorSend: string;
    errorFallback: string;
    mailtoIntro: string;
    mailto: string;
    optional: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
  };
  featured: {
    note: string;
    viewAll: string;
  };
  aboutPlate: string;
  aboutCta: string;
  notFound: {
    code: string;
    title: string;
    body: string;
    home: string;
    projects: string;
  };
  links: {
    archive: string;
    startProject: string;
    homeAria: string;
  };
  meta: {
    homeTitle: string;
    homeDescription: string;
    homeOg: string;
    workTitle: string;
    workDescription: string;
    workOg: string;
    linksTitle: string;
    linksDescription: string;
    linksOg: string;
    projectTitle: (title: string) => string;
    projectDescription: (summary: string, context: string) => string;
    projectOg: (title: string) => string;
  };
};

const en: Messages = {
  langSwitch: {
    label: "Language",
    toEn: "English",
    toAr: "العربية",
    shortEn: "EN",
    shortAr: "عر",
    menuKicker: "Language",
    current: "English",
  },
  menu: { toggle: "Menu" },
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    restaurants: "Restaurants",
    links: "Links",
    contact: "Contact",
    agreement: "Work Agreement",
    work: "Work",
    method: "Method",
  },
  navAria: {
    home: "Go to home",
    projects: "View all projects",
    about: "About Mohammad",
    restaurants: "Restaurant and café work",
    links: "Digital identity links",
    contact: "Get in touch",
    agreement: "Work Agreement",
  },
  hero: {
    aria: "Introduction",
    nameLine1: "Mohammad",
    nameLine2: "Hroub",
    tagMono: "silent code /",
    tagSerif: "massive impact.",
    lede:
      "I build the websites businesses show customers, and the systems they run on behind the scenes — from Palestine and remotely worldwide, from the first line of code to the dashboard your team opens every morning.",
    ctaPrimary: "Start a Project",
    ctaSecondary: "View My Work",
    scroll: "Scroll",
    ghost: "Hroub",
  },
  home: {
    workSection: {
      aria: "Featured projects",
      index: "01",
      eyebrow: "Featured Work",
      title: "Different problems. One standard.",
      description:
        "Five projects, two kinds of problems — the experience customers see, and the systems running behind it.",
    },
    method: {
      aria: "Method",
      index: "03",
      kicker: "Method",
      heading: "How the work happens.",
      steps: [
        {
          step: "01",
          title: "Listen first",
          copy: "Goals, constraints, and what “done” actually means.",
        },
        {
          step: "02",
          title: "Shape the system",
          copy: "Structure, stack, and the decisions — screens, data, workflows — that won’t rot in six months.",
        },
        {
          step: "03",
          title: "Build with restraint",
          copy: "Clean UI, reliable systems, nothing decorative without a job.",
        },
        {
          step: "04",
          title: "Ship & stay close",
          copy: "Launch, measure, refine — still reachable after go-live.",
        },
      ],
    },
    contact: {
      index: "04",
      eyebrow: "Contact",
      title: "Have a business that needs better digital infrastructure?",
      description:
        "I take on a limited number of projects to keep quality high — websites, operational systems, or both. Let's talk about yours.",
      emailLabel: "Email",
      emailAction: "Write",
      locationLabel: "Location",
      locationValue: "Remote — Worldwide",
      locationAction: "Open",
    },
    entityAria: "About Mohammad Hroub",
  },
  about: {
    id: "about",
    eyebrow: "About",
    title: "Mohammad Hroub",
    intro:
      "Full-stack developer building business websites and the operational systems behind them — focused on clarity, reliability, and work that stays useful after launch.",
    chapters: [
      {
        index: "A",
        title: "Both sides of the product.",
        body: "Business websites and custom web applications — plus the operational systems your team relies on behind the scenes.",
      },
      {
        index: "B",
        title: "Built to stay useful.",
        body: "Clear structure, clean UI, dependable infrastructure — nothing decorative without a job.",
      },
      {
        index: "C",
        title: "Close after launch.",
        body: "Ship, measure, refine. I stay reachable when the product is live.",
      },
    ],
    portraitAlt: "Mohammad Hroub portrait",
    statLabel: "projects live",
  },
  cta: {
    aria: "Start a project",
    statSr: (n) => `${n} projects live on the web`,
    statLabel: "live on the web",
    eyebrow: "Next",
    statement: "Let's build the next one.",
    inline: "Start a project",
  },
  work: {
    eyebrow: "Portfolio",
    backHome: "Back to home",
    title: "Selected work",
    lede:
      "A curated archive of digital products — each one designed, engineered, and refined with the same standard of craft.",
    live: "Live",
    launching: "Launching",
    inDev: "In Development",
    total: "Total Cases",
    aria: "All projects",
    nextStep: "Next step",
    readyTitle: "Ready to start your project?",
    readyCopy:
      "Let's discuss your goals and build something exceptional together.",
    getInTouch: "Get in touch",
  },
  case: {
    allProjects: "All projects",
    visitSite: "Visit site",
    viewProject: "View project",
    context: "Context",
    stack: "Stack",
    status: "Status",
    live: "Live",
    goal: "Goal",
    built: "What was built",
    building: "What's being built",
    keyWork: "Key work",
    outcome: "Outcome",
    summary: "Summary",
    startSimilar: "Start a similar project",
    previous: "Previous",
    next: "Next",
    navAria: "Project navigation",
    statusDev: "In active development — publishing soon.",
  },
  footer: {
    thanks: "Thanks for looking.",
    legal: "Silent Code. Massive Impact.",
    homeAria: "m. — Home",
  },
  contactForm: {
    kicker: "Brief",
    title: "Tell me about the work.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    submit: "Send brief",
    sending: "Sending…",
    successKicker: "Sent",
    successTitle: "Thank you for reaching out.",
    successBody: "I'll get back to you as soon as possible.",
    success: "Message sent — I'll get back to you soon.",
    errorRequired: "Please fill in your name, phone number, and message.",
    errorSend: "Something went wrong. Try again or email directly.",
    errorFallback: "Failed to send. Try again or use the email action.",
    mailtoIntro: "Open your email app to send this brief:",
    mailto: "Send via email",
    optional: "optional",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@studio.com",
    phonePlaceholder: "Phone or WhatsApp",
    messagePlaceholder: "Goals, timeline, and what done looks like.",
  },
  featured: {
    note:
      "A curated selection of recent work — customer-facing sites, and the systems running behind some of them.",
    viewAll: "View all projects",
  },
  aboutPlate: "Palestine · Remote worldwide",
  aboutCta: "Start a project",
  notFound: {
    code: "404",
    title: "Page not found",
    body: "This URL is not part of the portfolio. Try the homepage or project archive.",
    home: "Home",
    projects: "Projects",
  },
  links: {
    archive: "Archive",
    startProject: "Start a project",
    homeAria: "m. — Home",
  },
  meta: {
    homeTitle: "Mohammad Hroub | محمد حروب",
    homeDescription:
      "Mohammad Hroub | محمد حروب — Full-stack developer in Palestine. Business websites, custom web apps, operational systems.",
    homeOg: "Mohammad Hroub — Websites & Operational Systems | محمد حروب",
    workTitle: "Projects | Mohammad Hroub — محمد حروب",
    workDescription:
      "Portfolio case studies: web apps, e-commerce, and full-stack builds by Mohammad Hroub — websites and operational systems.",
    workOg: "Projects — Mohammad Hroub | محمد حروب",
    linksTitle: "Mohammad Hroub",
    linksDescription:
      "Mohammad Hroub — portfolio, selected work, Instagram, WhatsApp, and email.",
    linksOg: "Mohammad Hroub",
    projectTitle: (title) => `${title} — Mohammad Hroub | محمد حروب`,
    projectDescription: (summary, context) =>
      `${summary} ${context}. Built by Mohammad Hroub, Full-Stack Developer.`,
    projectOg: (title) => `${title} | Mohammad Hroub`,
  },
};

const ar: Messages = {
  langSwitch: {
    label: "اللغة",
    toEn: "English",
    toAr: "العربية",
    shortEn: "EN",
    shortAr: "عر",
    menuKicker: "اللغة",
    current: "العربية",
  },
  menu: { toggle: "القائمة" },
  nav: {
    home: "الرئيسية",
    projects: "المشاريع",
    about: "من أنا",
    restaurants: "مطاعم ومقاهي",
    links: "روابط",
    contact: "تواصل",
    agreement: "اتفاقية العمل",
    work: "الأعمال",
    method: "المنهج",
  },
  navAria: {
    home: "الانتقال إلى الرئيسية",
    projects: "عرض كل المشاريع",
    about: "عن محمد حروب",
    restaurants: "أعمال المطاعم والمقاهي",
    links: "روابط الهوية الرقمية",
    contact: "تواصل معي",
    agreement: "اتفاقية العمل",
  },
  hero: {
    aria: "مقدمة",
    nameLine1: "محمد",
    nameLine2: "حروب",
    tagMono: "كود هادئ /",
    tagSerif: "أثر واضح.",
    lede:
      "أبني مواقع وأنظمة ويب تساعد الأعمال على العمل والنمو — من فلسطين ومع عملاء عن بُعد حول العالم، من أول سطر برمجي إلى لوحة التحكم التي يفتحها فريقك كل صباح.",
    ctaPrimary: "ابدأ مشروعك",
    ctaSecondary: "استعرض الأعمال",
    scroll: "تابع",
    ghost: "حروب",
  },
  home: {
    workSection: {
      aria: "مشاريع مختارة",
      index: "01",
      eyebrow: "أعمال مختارة",
      title: "مشاكل مختلفة — معيار واحد",
      description:
        "خمسة مشاريع — بين ما يراه العميل على الشاشة، وما يشغّله الفريق خلف الكواليس.",
    },
    method: {
      aria: "منهج العمل",
      index: "03",
      kicker: "المنهج",
      heading: "كيف يتم العمل.",
      steps: [
        {
          step: "01",
          title: "الاستماع أولاً",
          copy: "الأهداف، القيود، ومعنى «انتهى المشروع» في الواقع.",
        },
        {
          step: "02",
          title: "تشكيل النظام",
          copy: "الهيكل، التقنيات، والقرارات — شاشات، بيانات، سير عمل — التي لا تتقادم بعد ستة أشهر.",
        },
        {
          step: "03",
          title: "بناء باعتدال",
          copy: "واجهة نظيفة، نظام موثوق، ولا زخرفة بلا وظيفة.",
        },
        {
          step: "04",
          title: "إطلاق وقرب مستمر",
          copy: "نشر، قياس، تحسين — وأبقى متاحاً بعد الإطلاق.",
        },
      ],
    },
    contact: {
      index: "04",
      eyebrow: "تواصل",
      title: "هل يحتاج عملك بنية رقمية أوضح؟",
      description:
        "أستقبل عدداً محدوداً من المشاريع للحفاظ على الجودة — مواقع، أنظمة تشغيل، أو الاثنين معاً. لنتحدث عن مشروعك.",
      emailLabel: "البريد",
      emailAction: "راسلني",
      locationLabel: "الموقع",
      locationValue: "عن بُعد — عالمياً",
      locationAction: "مفتوح",
    },
    entityAria: "عن محمد حروب",
  },
  about: {
    id: "about",
    eyebrow: "من أنا",
    title: "محمد حروب",
    intro:
      "مطور Full-Stack يبني مواقع للأعمال والأنظمة التشغيلية خلفها — بتركيز على الوضوح والاعتمادية وعمل يظل مفيداً بعد الإطلاق.",
    chapters: [
      {
        index: "أ",
        title: "وجهان للمنتج.",
        body: "مواقع أعمال وتطبيقات ويب مخصصة — مع الأنظمة التشغيلية التي يعتمد عليها فريقك.",
      },
      {
        index: "ب",
        title: "مبني ليبقى مفيداً.",
        body: "هيكل واضح، واجهة نظيفة، بنية تحتية يمكن الاعتماد عليها — بلا زخرفة بلا سبب.",
      },
      {
        index: "ج",
        title: "قرب بعد الإطلاق.",
        body: "نشر، قياس، تحسين. أبقى متاحاً عندما يصبح المنتج مباشراً.",
      },
    ],
    portraitAlt: "صورة محمد حروب",
    statLabel: "مشروع مباشر",
  },
  cta: {
    aria: "ابدأ مشروعاً",
    statSr: (n) => `${n} مشروعاً مباشراً على الويب`,
    statLabel: "مباشر على الويب",
    eyebrow: "التالي",
    statement: "لنبني التالي معاً.",
    inline: "ابدأ مشروعاً",
  },
  work: {
    eyebrow: "معرض الأعمال",
    backHome: "العودة للرئيسية",
    title: "أعمال مختارة",
    lede:
      "أرشيف منتجات رقمية — كل مشروع يُصمم ويُبرمج ويُصقل بنفس معيار الجودة.",
    live: "مباشر",
    launching: "قريباً",
    inDev: "قيد التطوير",
    total: "إجمالي الحالات",
    aria: "كل المشاريع",
    nextStep: "الخطوة التالية",
    readyTitle: "جاهز لبدء مشروعك؟",
    readyCopy: "لنناقش أهدافك ونبني شيئاً يليق بعملك.",
    getInTouch: "تواصل معي",
  },
  case: {
    allProjects: "كل المشاريع",
    visitSite: "زيارة الموقع",
    viewProject: "عرض المشروع",
    context: "السياق",
    stack: "التقنيات",
    status: "الحالة",
    live: "مباشر",
    goal: "الهدف",
    built: "ما تم بناؤه",
    building: "ما يُبنى حالياً",
    keyWork: "محاور العمل",
    outcome: "النتيجة",
    summary: "ملخص",
    startSimilar: "مشروع مشابه",
    previous: "السابق",
    next: "التالي",
    navAria: "تنقل بين المشاريع",
    statusDev: "قيد التطوير — النشر قريباً.",
  },
  footer: {
    thanks: "شكراً لزيارتك.",
    legal: "كود هادئ. أثر واضح.",
    homeAria: "m. — الرئيسية",
  },
  contactForm: {
    kicker: "نبذة",
    title: "أخبرني عن المشروع.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    message: "الرسالة",
    submit: "إرسال",
    sending: "جارٍ الإرسال…",
    successKicker: "تم الإرسال",
    successTitle: "شكراً لتواصلك.",
    successBody: "سأرد عليك في أقرب وقت ممكن.",
    success: "تم الإرسال — سأرد عليك قريباً.",
    errorRequired: "يرجى تعبئة الاسم، الهاتف، والرسالة.",
    errorSend: "حدث خطأ. أعد المحاولة أو راسلني بالبريد مباشرة.",
    errorFallback: "تعذّر الإرسال. أعد المحاولة أو استخدم البريد.",
    mailtoIntro: "افتح تطبيق البريد لإرسال هذه النبذة:",
    mailto: "إرسال بالبريد",
    optional: "اختياري",
    namePlaceholder: "اسمك",
    emailPlaceholder: "you@example.com",
    phonePlaceholder: "هاتف أو واتساب",
    messagePlaceholder: "الأهداف، الجدول الزمني، ومعنى «انتهى المشروع».",
  },
  featured: {
    note:
      "مجموعة مختارة من أعمال حديثة — ما يراه العميل على الشاشة، والأنظمة خلف بعضها.",
    viewAll: "كل المشاريع",
  },
  aboutPlate: "فلسطين · عن بُعد عالمياً",
  aboutCta: "ابدأ مشروعاً",
  notFound: {
    code: "404",
    title: "الصفحة غير موجودة",
    body: "هذا الرابط ليس جزءاً من المعرض. جرّب الرئيسية أو أرشيف المشاريع.",
    home: "الرئيسية",
    projects: "المشاريع",
  },
  links: {
    archive: "الأرشيف",
    startProject: "ابدأ مشروعاً",
    homeAria: "m. — الرئيسية",
  },
  meta: {
    homeTitle: "محمد حروب | Mohammad Hroub — مطور مواقع وأنظمة ويب",
    homeDescription:
      "محمد حروب — مطور Full-Stack في فلسطين. مواقع للأعمال، تطبيقات ويب مخصصة، وأنظمة تشغيل. عمل عن بُعد من الخليل ورام الله وعالمياً.",
    homeOg: "محمد حروب — مواقع وأنظمة تشغيل | Mohammad Hroub",
    workTitle: "المشاريع | محمد حروب — Mohammad Hroub",
    workDescription:
      "معرض أعمال محمد حروب: مواقع، تجارة إلكترونية، وتطبيقات ويب — مواقع للأعمال وأنظمة تشغيل رقمية.",
    workOg: "المشاريع — محمد حروب | Mohammad Hroub",
    linksTitle: "محمد حروب — روابط",
    linksDescription:
      "هوية محمد حروب الرقمية — المعرض، أعمال مختارة، إنستغرام، واتساب، والبريد.",
    linksOg: "محمد حروب",
    projectTitle: (title) => `${title} — محمد حروب | Mohammad Hroub`,
    projectDescription: (summary, context) =>
      `${summary} ${context}. بناه محمد حروب، مطور Full-Stack.`,
    projectOg: (title) => `${title} | محمد حروب`,
  },
};

const catalogs: Record<Locale, Messages> = { en, ar };

export function getMessages(locale: Locale): Messages {
  return catalogs[locale];
}
