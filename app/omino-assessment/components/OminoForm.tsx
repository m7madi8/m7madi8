"use client";

import { useMemo, useState } from "react";
import { getDb } from "../../../lib/firebase";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const LEADS_COLLECTION = "omino_market_assessments";
const OWNER_EMAIL = "eslamhuhu1@gmail.com";

type SingleKey =
  | "storeType"
  | "storeAge"
  | "salesChannel"
  | "teamSize"
  | "inventoryTracking"
  | "orderTracking"
  | "bestSellersVisibility"
  | "duplicateEntryFrequency"
  | "singleBiggestPain"
  | "timeWastedWeekly"
  | "knowsBestCustomers"
  | "followUpOnNonBuyers"
  | "usesDataForDecisions"
  | "mostWantedInsight"
  | "autoReplyAcceptance"
  | "stockAlertAcceptance"
  | "salesAnalysisAcceptance"
  | "productSuggestionAcceptance"
  | "autoContentAcceptance"
  | "automationBarrier"
  | "valueDriver"
  | "paymentModel"
  | "priceRange"
  | "premortemReason"
  // e-commerce discovery section
  | "hasEcommerceStore"
  | "ecommerceManagementMethod"
  | "noStoreReason"
  | "noCodeStoreInterest"
  | "aiStoreAssistantInterest"
  | "ecommerceAdoptionBarriers";

type Answers = Record<SingleKey, string> & {
  painPoints: string[];
  ecommercePainPoints: string[];
  preferredEcommerceFeatures: string[];
  finalNote: string;
  fullName: string;
  whatsapp: string;
  storeName: string;
  instagramOrWebsite: string;
};

const EMPTY_ANSWERS: Answers = {
  storeType: "",
  storeAge: "",
  salesChannel: "",
  teamSize: "",
  inventoryTracking: "",
  orderTracking: "",
  bestSellersVisibility: "",
  duplicateEntryFrequency: "",
  singleBiggestPain: "",
  timeWastedWeekly: "",
  knowsBestCustomers: "",
  followUpOnNonBuyers: "",
  usesDataForDecisions: "",
  mostWantedInsight: "",
  autoReplyAcceptance: "",
  stockAlertAcceptance: "",
  salesAnalysisAcceptance: "",
  productSuggestionAcceptance: "",
  autoContentAcceptance: "",
  automationBarrier: "",
  valueDriver: "",
  paymentModel: "",
  priceRange: "",
  premortemReason: "",
  hasEcommerceStore: "",
  ecommerceManagementMethod: "",
  noStoreReason: "",
  noCodeStoreInterest: "",
  aiStoreAssistantInterest: "",
  ecommerceAdoptionBarriers: "",
  painPoints: [],
  ecommercePainPoints: [],
  preferredEcommerceFeatures: [],
  finalNote: "",
  fullName: "",
  whatsapp: "",
  storeName: "",
  instagramOrWebsite: "",
};

type SingleBlock = {
  type: "single";
  key: SingleKey;
  question: string;
  options: string[];
};

type MultiBlock = {
  type: "multi";
  key: "painPoints";
  question: string;
  helper: string;
  options: string[];
  max: number;
};

type TextareaBlock = {
  type: "textarea";
  key: "finalNote";
  question: string;
  placeholder: string;
  optional: true;
};

type Block = SingleBlock | MultiBlock | TextareaBlock;

type RegularStep = { kind: "blocks"; title: string; blocks: Block[] };
type EcommerceStep = { kind: "ecommerce"; title: string };
type StepConfig = RegularStep | EcommerceStep;

const PAIN_POINTS = [
  "متابعة المخزون",
  "الطلبات والشحن",
  "الرد على العملاء",
  "متابعة العملاء بعد الشراء",
  "إدخال المنتجات والأسعار",
  "معرفة المنتجات الأكثر ربحًا",
  "المنتجات الراكدة",
  "إدارة Instagram وWhatsApp والموقع",
  "التسويق والعروض",
  "معرفة أرقام المتجر وتحليلها",
  "لا أواجه مشكلة كبيرة حاليًا",
  "أخرى",
];

const ACCEPTANCE_OPTIONS = ["نعم بالتأكيد", "غالبًا", "ربما", "لا أفضل ذلك"];

// ---- E-commerce discovery section config ----

const ECOMMERCE_STATUS_OPTIONS = [
  "🛍️ نعم، عندي متجر إلكتروني",
  "📱 أبيع عبر Instagram وWhatsApp فقط",
  "🌐 عندي موقع، لكن ليس متجرًا متكاملًا",
  "🚀 أعمل حاليًا على إنشاء متجر",
  "❌ لا، وما عندي حاليًا",
];

const HAS_STORE_LIKE = new Set([
  "🛍️ نعم، عندي متجر إلكتروني",
  "🌐 عندي موقع، لكن ليس متجرًا متكاملًا",
]);
const NO_STORE = new Set([
  "📱 أبيع عبر Instagram وWhatsApp فقط",
  "❌ لا، وما عندي حاليًا",
]);
const BUILDING = "🚀 أعمل حاليًا على إنشاء متجر";

const ECOMMERCE_PAIN_POINTS = [
  "تحديث المنتجات والأسعار",
  "إدارة المخزون",
  "إدارة الطلبات",
  "التصميم والتعديل",
  "الدفع الإلكتروني",
  "الشحن والتوصيل",
  "متابعة العملاء",
  "التسويق",
  "التكلفة الشهرية",
  "لا توجد مشكلة كبيرة",
  "شيء آخر",
];

const ECOMMERCE_MANAGEMENT_OPTIONS = [
  "أعمل كل شيء بنفسي",
  "موظف يديره",
  "أحتاج مطورًا عند كل تعديل",
  "أستخدم منصة جاهزة",
  "طريقة أخرى",
];

const NO_STORE_REASON_OPTIONS = [
  "لا أعرف كيف أنشئه",
  "لا أملك معرفة تقنية",
  "تكلفة إنشاء المتجر",
  "تكلفة الاشتراك والاستضافة",
  "لا أملك الوقت لإدارته",
  "Instagram وWhatsApp كافيان بالنسبة لي",
  "لم أجد حلًا مناسبًا",
  "لا أرى حاجة حقيقية له حاليًا",
  "سبب آخر",
];

const NO_CODE_INTEREST_OPTIONS = [
  "مهم جدًا — هذا الشيء أحتاجه فعلًا",
  "مهم — لكن ليس أولوية حاليًا",
  "ممكن أجربه",
  "ربما، حسب السعر",
  "لا أحتاج متجرًا إلكترونيًا حاليًا",
];

const PREFERRED_ECOMMERCE_FEATURES = [
  "إنشاء المتجر بسهولة",
  "إضافة المنتجات والصور والأسعار بسرعة",
  "إدارة المخزون تلقائيًا",
  "استقبال وإدارة الطلبات",
  "إدارة العملاء",
  "ربط WhatsApp وInstagram",
  "معرفة المبيعات والأرباح",
  "إنشاء عروض وكوبونات",
  "أدوات AI تساعدني في إدارة المتجر",
  "عدم الحاجة لمطور في كل تعديل",
];

const AI_STORE_ASSISTANT_OPTIONS = [
  "يوميًا",
  "عدة مرات بالأسبوع",
  "عند الحاجة",
  "ممكن أجربه",
  "لا أعتقد أنني سأستخدمه",
];

const ECOMMERCE_BARRIER_OPTIONS = [
  "السعر",
  "صعوبة الاستخدام",
  "عدم الثقة بالمنصة",
  "الخوف من الأخطاء",
  "أفضل الحلول التي أستخدمها حاليًا",
  "لا أريد تغيير طريقة عملي",
  "لا أحتاج متجرًا إلكترونيًا",
  "الاشتراك الشهري",
  "شيء آخر",
];

const STEPS: StepConfig[] = [
  {
    kind: "blocks",
    title: "خلينا نفهم متجرك أولًا",
    blocks: [
      {
        type: "single",
        key: "storeType",
        question: "ما نوع متجرك؟",
        options: ["عطور", "ملابس", "إكسسوارات", "مستحضرات تجميل", "أحذية", "أخرى"],
      },
      {
        type: "single",
        key: "storeAge",
        question: "منذ متى يعمل متجرك؟",
        options: ["أقل من سنة", "1–3 سنوات", "3–5 سنوات", "أكثر من 5 سنوات"],
      },
      {
        type: "single",
        key: "salesChannel",
        question: "كيف تتم معظم مبيعاتك اليوم؟",
        options: ["المحل", "Instagram / Facebook", "WhatsApp", "موقع إلكتروني", "أكثر من قناة"],
      },
      {
        type: "single",
        key: "teamSize",
        question: "كم شخص يشارك في إدارة المتجر؟",
        options: ["شخص واحد", "2–3", "4–10", "أكثر من 10"],
      },
    ],
  },
  {
    kind: "blocks",
    title: "كيف تمشي الأمور عندك اليوم؟",
    blocks: [
      {
        type: "single",
        key: "inventoryTracking",
        question: "كيف تتابع المخزون؟",
        options: ["يدويًا", "Excel / Google Sheets", "نظام نقاط بيع", "متجر إلكتروني", "نظام آخر"],
      },
      {
        type: "single",
        key: "orderTracking",
        question: "كيف تتابع الطلبات؟",
        options: ["WhatsApp / Instagram", "دفتر أو ملاحظات", "Excel", "نظام إدارة", "بشكل مختلط"],
      },
      {
        type: "single",
        key: "bestSellersVisibility",
        question: "كيف تعرف المنتجات الأكثر مبيعًا؟",
        options: ["عندي تقارير واضحة", "أراجعها يدويًا", "أعتمد على خبرتي", "غالبًا لا أعرف بدقة"],
      },
      {
        type: "single",
        key: "duplicateEntryFrequency",
        question: "كم مرة تدخل نفس معلومة المنتج أو الطلب في أكثر من مكان؟",
        options: ["نادرًا", "أحيانًا", "كثيرًا", "تقريبًا دائمًا"],
      },
    ],
  },
  {
    kind: "ecommerce",
    title: "وماذا عن البيع أونلاين؟",
  },
  {
    kind: "blocks",
    title: "وين أكثر شيء بتعبك؟",
    blocks: [
      {
        type: "multi",
        key: "painPoints",
        question: "وين أكثر شيء بتعبك في متجرك؟",
        helper: "اختر حتى 3 خيارات.",
        options: PAIN_POINTS,
        max: 3,
      },
      {
        type: "single",
        key: "singleBiggestPain",
        question: "لو قدرت تحل مشكلة واحدة فقط في متجرك هذا الشهر، شو بتختار؟",
        options: PAIN_POINTS,
      },
      {
        type: "single",
        key: "timeWastedWeekly",
        question: "كم من وقتك أو وقت فريقك تضيّع هذه المشكلة تقريبًا كل أسبوع؟",
        options: ["أقل من ساعة", "1–3 ساعات", "3–5 ساعات", "أكثر من 5 ساعات", "لا أعرف"],
      },
    ],
  },
  {
    kind: "blocks",
    title: "قديش بتعرف عن عملائك؟",
    blocks: [
      {
        type: "single",
        key: "knowsBestCustomers",
        question: "هل تعرف من هم عملاؤك الأكثر قيمة؟",
        options: ["نعم", "بشكل جزئي", "لا"],
      },
      {
        type: "single",
        key: "followUpOnNonBuyers",
        question: "ماذا يحدث عندما يسأل العميل عن منتج ولا يشتري؟",
        options: ["أتابعه يدويًا", "أرسل له لاحقًا", "لا أتابعه", "لا توجد لدي طريقة منظمة للمتابعة"],
      },
      {
        type: "single",
        key: "usesDataForDecisions",
        question: "هل تستخدم بيانات المبيعات والعملاء لاتخاذ قراراتك؟",
        options: ["بشكل مستمر", "أحيانًا", "نادرًا", "تقريبًا لا"],
      },
      {
        type: "single",
        key: "mostWantedInsight",
        question: "ما أكثر شيء تتمنى أن تعرفه عن متجرك؟",
        options: [
          "ما المنتجات التي يجب أن أركز عليها؟",
          "من هم أفضل عملائي؟",
          "لماذا بعض المنتجات لا تبيع؟",
          "كيف أزيد المبيعات؟",
          "متى أحتاج لإعادة طلب المخزون؟",
          "شيء آخر",
        ],
      },
    ],
  },
  {
    kind: "blocks",
    title: "لو صار عندك مساعد ذكي...",
    blocks: [
      {
        type: "single",
        key: "autoReplyAcceptance",
        question:
          "لو النظام يرد تلقائيًا على الأسئلة المتكررة للعملاء، مع إمكانية تدخل الموظف عند الحاجة، هل ستستخدمه؟",
        options: ACCEPTANCE_OPTIONS,
      },
      {
        type: "single",
        key: "stockAlertAcceptance",
        question: "لو النظام ينبهك أن منتجًا معينًا يقترب من النفاد؟",
        options: ACCEPTANCE_OPTIONS,
      },
      {
        type: "single",
        key: "salesAnalysisAcceptance",
        question: "لو النظام يحلل مبيعاتك ويخبرك بأهم المنتجات والمشاكل والفرص؟",
        options: ACCEPTANCE_OPTIONS,
      },
      {
        type: "single",
        key: "productSuggestionAcceptance",
        question: "لو النظام يقترح منتجات مناسبة لكل عميل بناءً على مشترياته واهتماماته؟",
        options: ACCEPTANCE_OPTIONS,
      },
      {
        type: "single",
        key: "autoContentAcceptance",
        question: "لو النظام يكتب أوصاف المنتجات والمنشورات تلقائيًا؟",
        options: ACCEPTANCE_OPTIONS,
      },
      {
        type: "single",
        key: "automationBarrier",
        question: "ما أكثر شيء يمنعك من استخدام الأتمتة أو الذكاء الاصطناعي؟",
        options: [
          "لا أثق به بشكل كامل",
          "أخاف من الأخطاء",
          "لا أعرف كيف أستخدمه",
          "لا أريد تغيير طريقة شغلي",
          "التكلفة",
          "لا أرى حاجة حقيقية له",
          "لا يوجد شيء يمنعني",
        ],
      },
    ],
  },
  {
    kind: "blocks",
    title: "آخر كم سؤال",
    blocks: [
      {
        type: "single",
        key: "valueDriver",
        question:
          "لو كان هناك نظام واحد يجمع إدارة المنتجات والمخزون والطلبات والعملاء والتحليلات والأتمتة، ما أكثر شيء سيجعلك تستخدمه؟",
        options: [
          "توفير الوقت",
          "زيادة المبيعات",
          "تقليل الأخطاء",
          "تنظيم العمل",
          "فهم العملاء",
          "أتمتة المهام",
          "كل ما سبق",
        ],
      },
      {
        type: "single",
        key: "paymentModel",
        question: "أي نموذج دفع تفضله؟",
        options: [
          "مجاني بميزات محدودة",
          "اشتراك شهري منخفض",
          "اشتراك شهري حسب حجم المتجر",
          "دفع مرة واحدة",
          "لا أعرف",
        ],
      },
      {
        type: "single",
        key: "priceRange",
        question:
          "ما النطاق الشهري الذي تعتبره منطقيًا لنظام يوفر لك وقتًا ويحل مشاكل تشغيلية حقيقية؟",
        options: ["أقل من 5$", "5–10$", "10–20$", "20–50$", "أكثر من 50$", "لن أدفع حاليًا"],
      },
      {
        type: "single",
        key: "premortemReason",
        question:
          "تخيل أننا أطلقنا نظامًا جديدًا لإدارة المتاجر، وبعد سنة لم ينجح. برأيك، ما السبب الأكثر احتمالًا؟",
        options: [
          "السعر مرتفع",
          "النظام معقد",
          "أصحاب المتاجر لا يريدون تغيير طريقة عملهم",
          "لا أثق بالذكاء الاصطناعي",
          "لدي أنظمة أخرى بالفعل",
          "لا أرى فائدة واضحة",
          "لا أحب الاشتراكات الشهرية",
          "المتاجر لا تحتاج كل هذه الأدوات في نظام واحد",
          "سبب آخر",
        ],
      },
      {
        type: "textarea",
        key: "finalNote",
        question: "لو عندك ملاحظة واحدة فقط ممكن تساعدنا نبني شيئًا أفضل للمتاجر، شو بتكون؟",
        placeholder: "اختياري...",
        optional: true,
      },
    ],
  },
];

const TOTAL_STEPS = STEPS.length + 1; // + contact-details step
const CONTACT_STEP_INDEX = STEPS.length;

function buildEmailMessage(answers: Answers): string {
  const lines = [
    `نوع المتجر: ${answers.storeType}`,
    `عمر المتجر: ${answers.storeAge}`,
    `قناة المبيعات: ${answers.salesChannel}`,
    `عدد أفراد الفريق: ${answers.teamSize}`,
    `متابعة المخزون: ${answers.inventoryTracking}`,
    `متابعة الطلبات: ${answers.orderTracking}`,
    `معرفة الأكثر مبيعًا: ${answers.bestSellersVisibility}`,
    `تكرار إدخال نفس المعلومة: ${answers.duplicateEntryFrequency}`,
    "",
    `حالة المتجر الإلكتروني: ${answers.hasEcommerceStore}`,
    `مشاكل المتجر الحالي: ${answers.ecommercePainPoints.join("، ") || "—"}`,
    `طريقة إدارة المتجر: ${answers.ecommerceManagementMethod || "—"}`,
    `سبب عدم وجود متجر: ${answers.noStoreReason || "—"}`,
    `الاهتمام بحل بدون برمجة: ${answers.noCodeStoreInterest || "—"}`,
    `أهم ميزات مرغوبة بمتجر إلكتروني: ${answers.preferredEcommerceFeatures.join("، ") || "—"}`,
    `الاهتمام بمساعد ذكي داخل المتجر: ${answers.aiStoreAssistantInterest}`,
    `أهم حاجز أمام منصة جديدة: ${answers.ecommerceAdoptionBarriers}`,
    "",
    `أكبر نقاط الألم: ${answers.painPoints.join("، ") || "—"}`,
    `أهم مشكلة واحدة: ${answers.singleBiggestPain}`,
    `الوقت الضائع أسبوعيًا: ${answers.timeWastedWeekly}`,
    `يعرف عملاءه الأكثر قيمة: ${answers.knowsBestCustomers}`,
    `متابعة من لم يشترِ: ${answers.followUpOnNonBuyers}`,
    `استخدام البيانات لاتخاذ القرار: ${answers.usesDataForDecisions}`,
    `أكثر ما يتمنى معرفته: ${answers.mostWantedInsight}`,
    `تقبل الرد التلقائي: ${answers.autoReplyAcceptance}`,
    `تقبل تنبيه المخزون: ${answers.stockAlertAcceptance}`,
    `تقبل تحليل المبيعات: ${answers.salesAnalysisAcceptance}`,
    `تقبل اقتراح المنتجات: ${answers.productSuggestionAcceptance}`,
    `تقبل كتابة المحتوى تلقائيًا: ${answers.autoContentAcceptance}`,
    `أهم حاجز أمام الأتمتة: ${answers.automationBarrier}`,
    `أهم دافع للاستخدام: ${answers.valueDriver}`,
    `نموذج الدفع المفضل: ${answers.paymentModel}`,
    `النطاق السعري المقبول: ${answers.priceRange}`,
    `سبب الفشل المحتمل (Pre-mortem): ${answers.premortemReason}`,
    "",
    `ملاحظة إضافية: ${answers.finalNote || "—"}`,
    "",
    `اسم المتجر: ${answers.storeName}`,
    `WhatsApp: ${answers.whatsapp}`,
    `Instagram / الموقع: ${answers.instagramOrWebsite || "—"}`,
  ];
  return lines.join("\n");
}

export default function OminoForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null);
  const [stepError, setStepError] = useState("");

  const isContactStep = step === CONTACT_STEP_INDEX;
  const currentStep = !isContactStep ? STEPS[step] : null;

  const progressPct = useMemo(
    () => Math.round(((step + 1) / TOTAL_STEPS) * 100),
    [step]
  );

  function updateSingle(key: SingleKey, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStepError("");
  }

  function updateFinalNote(value: string) {
    setAnswers((prev) => ({ ...prev, finalNote: value }));
  }

  function togglePainPoint(option: string, max: number) {
    setAnswers((prev) => {
      const has = prev.painPoints.includes(option);
      if (has) {
        return { ...prev, painPoints: prev.painPoints.filter((p) => p !== option) };
      }
      if (prev.painPoints.length >= max) return prev;
      return { ...prev, painPoints: [...prev.painPoints, option] };
    });
    setStepError("");
  }

  function toggleMulti(
    key: "ecommercePainPoints" | "preferredEcommerceFeatures",
    option: string,
    max: number
  ) {
    setAnswers((prev) => {
      const list = prev[key];
      const has = list.includes(option);
      if (has) {
        return { ...prev, [key]: list.filter((p) => p !== option) };
      }
      if (list.length >= max) return prev;
      return { ...prev, [key]: [...list, option] };
    });
    setStepError("");
  }

  function selectEcommerceStatus(value: string) {
    // Changing the branch clears answers that only applied to the
    // previous branch, so stale data never gets submitted.
    setAnswers((prev) => ({
      ...prev,
      hasEcommerceStore: value,
      ecommercePainPoints: [],
      ecommerceManagementMethod: "",
      noStoreReason: "",
      noCodeStoreInterest: "",
    }));
    setStepError("");
  }

  function updateContactField(
    key: "fullName" | "whatsapp" | "storeName" | "instagramOrWebsite",
    value: string
  ) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStepError("");
  }

  function validateCurrentStep(): boolean {
    if (currentStep?.kind === "blocks") {
      for (const block of currentStep.blocks) {
        if (block.type === "single" && !answers[block.key]) {
          setStepError("الرجاء اختيار إجابة قبل المتابعة.");
          return false;
        }
        if (block.type === "multi" && answers.painPoints.length === 0) {
          setStepError("الرجاء اختيار خيار واحد على الأقل.");
          return false;
        }
        // textarea blocks are optional — no validation
      }
    }

    if (currentStep?.kind === "ecommerce") {
      if (!answers.hasEcommerceStore) {
        setStepError("الرجاء اختيار إجابة قبل المتابعة.");
        return false;
      }
      if (HAS_STORE_LIKE.has(answers.hasEcommerceStore)) {
        if (answers.ecommercePainPoints.length === 0 || !answers.ecommerceManagementMethod) {
          setStepError("الرجاء إكمال الأسئلة قبل المتابعة.");
          return false;
        }
      } else if (NO_STORE.has(answers.hasEcommerceStore)) {
        if (!answers.noStoreReason || !answers.noCodeStoreInterest) {
          setStepError("الرجاء إكمال الأسئلة قبل المتابعة.");
          return false;
        }
      } else if (answers.hasEcommerceStore === BUILDING) {
        if (!answers.noCodeStoreInterest) {
          setStepError("الرجاء إكمال الأسئلة قبل المتابعة.");
          return false;
        }
      }
      if (
        answers.preferredEcommerceFeatures.length === 0 ||
        !answers.aiStoreAssistantInterest ||
        !answers.ecommerceAdoptionBarriers
      ) {
        setStepError("الرجاء إكمال الأسئلة قبل المتابعة.");
        return false;
      }
    }

    if (isContactStep) {
      if (!answers.fullName.trim() || !answers.whatsapp.trim() || !answers.storeName.trim()) {
        setStepError("الاسم، رقم الواتساب، واسم المتجر مطلوبة.");
        return false;
      }
    }
    return true;
  }

  function goNext() {
    if (!validateCurrentStep()) return;
    setStepError("");
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setStepError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!validateCurrentStep()) return;

    setStatus("loading");
    setErrorMessage("");
    setMailtoUrl(null);

    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
    const isFirebaseConfigured = Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
    const message = buildEmailMessage(answers);

    try {
      if (web3formsKey) {
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `OMINO Market Assessment — ${answers.storeName}`,
            from_name: "OMINO Market Assessment",
            name: answers.fullName,
            phone: answers.whatsapp,
            message,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
          throw new Error(data.message ?? "فشل إرسال البريد.");
        }
      } else {
        const subject = encodeURIComponent(`OMINO Market Assessment — ${answers.storeName}`);
        const body = encodeURIComponent(message);
        setMailtoUrl(`mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`);
        setStatus("idle");
        return;
      }

      if (isFirebaseConfigured) {
        try {
          const db = await getDb();
          if (db) {
            const { addDoc, collection, serverTimestamp } = await import("firebase/firestore");
            await addDoc(collection(db, LEADS_COLLECTION), {
              source: "omino-market-assessment",
              store_type: answers.storeType,
              store_age: answers.storeAge,
              sales_channel: answers.salesChannel,
              team_size: answers.teamSize,
              inventory_tracking: answers.inventoryTracking,
              order_tracking: answers.orderTracking,
              best_sellers_visibility: answers.bestSellersVisibility,
              duplicate_entry_frequency: answers.duplicateEntryFrequency,
              // e-commerce discovery
              has_ecommerce_store: answers.hasEcommerceStore,
              current_sales_channels: answers.hasEcommerceStore,
              ecommerce_pain_points: answers.ecommercePainPoints,
              ecommerce_management_method: answers.ecommerceManagementMethod,
              no_store_reason: answers.noStoreReason,
              no_code_store_interest: answers.noCodeStoreInterest,
              ecommerce_priority: answers.noCodeStoreInterest,
              preferred_ecommerce_features: answers.preferredEcommerceFeatures,
              ai_store_assistant_interest: answers.aiStoreAssistantInterest,
              ecommerce_adoption_barriers: answers.ecommerceAdoptionBarriers,
              // core pain / growth
              pain_points: answers.painPoints,
              single_biggest_pain: answers.singleBiggestPain,
              time_wasted_weekly: answers.timeWastedWeekly,
              knows_best_customers: answers.knowsBestCustomers,
              follow_up_on_non_buyers: answers.followUpOnNonBuyers,
              uses_data_for_decisions: answers.usesDataForDecisions,
              most_wanted_insight: answers.mostWantedInsight,
              auto_reply_acceptance: answers.autoReplyAcceptance,
              stock_alert_acceptance: answers.stockAlertAcceptance,
              sales_analysis_acceptance: answers.salesAnalysisAcceptance,
              product_suggestion_acceptance: answers.productSuggestionAcceptance,
              auto_content_acceptance: answers.autoContentAcceptance,
              automation_barrier: answers.automationBarrier,
              value_driver: answers.valueDriver,
              payment_model: answers.paymentModel,
              price_range: answers.priceRange,
              premortem_reason: answers.premortemReason,
              final_note: answers.finalNote,
              full_name: answers.fullName,
              whatsapp: answers.whatsapp,
              store_name: answers.storeName,
              instagram_or_website: answers.instagramOrWebsite,
              created_at: serverTimestamp(),
            });
          }
        } catch {
          // Silent — the email already carries the response.
        }
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "حدث خطأ ما.");
    }
  }

  if (status === "success") {
    return (
      <div className="om-form-shell text-center">
        <p className="om-step-count">تم الإرسال</p>
        <h3 className="mt-3 text-xl font-medium tracking-tight text-white sm:text-2xl">
          شكرًا على وقتك.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[color:var(--muted)]">
          إجاباتك ستساعدنا نفهم احتياجات المتاجر بشكل أفضل، ونبني حلولًا مبنية
          على مشاكل حقيقية، وليس مجرد أفكار نظرية.
        </p>
      </div>
    );
  }

  return (
    <div className="om-form-shell">
      <div className="flex items-center justify-between gap-4">
        <span className="om-step-count">
          الخطوة {step + 1} من {TOTAL_STEPS}
        </span>
        <span className="om-step-count">{progressPct}%</span>
      </div>
      <div className="om-progress-track mt-3">
        <div className="om-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="om-step mt-8 space-y-8" key={step}>
        {currentStep?.kind === "blocks" && (
          <>
            <h2 className="text-lg font-medium text-white sm:text-xl">
              {currentStep.title}
            </h2>
            {currentStep.blocks.map((block) => {
              if (block.type === "single") {
                return (
                  <fieldset key={block.key}>
                    <legend className="text-base font-medium text-white">
                      {block.question}
                    </legend>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {block.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="om-option"
                          aria-pressed={answers[block.key] === option}
                          onClick={() => updateSingle(block.key, option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                );
              }
              if (block.type === "multi") {
                return (
                  <fieldset key={block.key}>
                    <legend className="text-base font-medium text-white">
                      {block.question}
                    </legend>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">
                      {block.helper}
                    </p>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {block.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="om-option"
                          aria-pressed={answers.painPoints.includes(option)}
                          onClick={() => togglePainPoint(option, block.max)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                );
              }
              // textarea
              return (
                <div key={block.key}>
                  <label htmlFor="om-final-note" className="text-base font-medium text-white">
                    {block.question}
                  </label>
                  <textarea
                    id="om-final-note"
                    className="om-textarea mt-4"
                    value={answers.finalNote}
                    onChange={(e) => updateFinalNote(e.target.value)}
                    placeholder={block.placeholder}
                  />
                </div>
              );
            })}
          </>
        )}

        {currentStep?.kind === "ecommerce" && (
          <>
            <div>
              <h2 className="text-lg font-medium text-white sm:text-xl">
                {currentStep.title}
              </h2>
              <p className="mt-1.5 text-sm text-[color:var(--muted)]">
                خلينا نفهم كيف بتبيع منتجاتك حاليًا، وهل المتجر الإلكتروني
                فعلًا أولوية بالنسبة إلك.
              </p>
            </div>

            <fieldset>
              <legend className="text-base font-medium text-white">
                هل عندك متجر إلكتروني حاليًا؟
              </legend>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {ECOMMERCE_STATUS_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="om-option"
                    aria-pressed={answers.hasEcommerceStore === option}
                    onClick={() => selectEcommerceStatus(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            {answers.hasEcommerceStore && HAS_STORE_LIKE.has(answers.hasEcommerceStore) && (
              <div className="om-step space-y-8">
                <fieldset>
                  <legend className="text-base font-medium text-white">
                    ما أكثر شيء يزعجك في متجرك الحالي؟
                  </legend>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">
                    يمكن اختيار حتى 2.
                  </p>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {ECOMMERCE_PAIN_POINTS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="om-option"
                        aria-pressed={answers.ecommercePainPoints.includes(option)}
                        onClick={() => toggleMulti("ecommercePainPoints", option, 2)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-base font-medium text-white">
                    كيف يتم تعديل وإدارة متجرك حاليًا؟
                  </legend>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {ECOMMERCE_MANAGEMENT_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="om-option"
                        aria-pressed={answers.ecommerceManagementMethod === option}
                        onClick={() => updateSingle("ecommerceManagementMethod", option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {answers.hasEcommerceStore && NO_STORE.has(answers.hasEcommerceStore) && (
              <div className="om-step space-y-8">
                <fieldset>
                  <legend className="text-base font-medium text-white">
                    ما السبب الرئيسي لعدم وجود متجر إلكتروني؟
                  </legend>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {NO_STORE_REASON_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="om-option"
                        aria-pressed={answers.noStoreReason === option}
                        onClick={() => updateSingle("noStoreReason", option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-base font-medium text-white">
                    لو كان بإمكانك إنشاء متجر إلكتروني كامل لمتجرك بنفسك، بدون
                    برمجة أو معرفة تقنية، هل سيكون هذا مهمًا بالنسبة لك؟
                  </legend>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {NO_CODE_INTEREST_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="om-option"
                        aria-pressed={answers.noCodeStoreInterest === option}
                        onClick={() => updateSingle("noCodeStoreInterest", option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {answers.hasEcommerceStore === BUILDING && (
              <div className="om-step">
                <fieldset>
                  <legend className="text-base font-medium text-white">
                    لو كان بإمكانك إنشاء متجر إلكتروني كامل لمتجرك بنفسك، بدون
                    برمجة أو معرفة تقنية، هل سيكون هذا مهمًا بالنسبة لك؟
                  </legend>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {NO_CODE_INTEREST_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="om-option"
                        aria-pressed={answers.noCodeStoreInterest === option}
                        onClick={() => updateSingle("noCodeStoreInterest", option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {answers.hasEcommerceStore && (
              <div className="om-step space-y-8">
                <fieldset>
                  <legend className="text-base font-medium text-white">
                    لو كان بإمكانك إدارة متجرك الإلكتروني من مكان واحد، ما
                    أكثر شيء سيهمك؟
                  </legend>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">
                    اختر حتى 3.
                  </p>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {PREFERRED_ECOMMERCE_FEATURES.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="om-option"
                        aria-pressed={answers.preferredEcommerceFeatures.includes(option)}
                        onClick={() => toggleMulti("preferredEcommerceFeatures", option, 3)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-base font-medium text-white">
                    ولو كان المتجر نفسه يحتوي على مساعد ذكي يساعدك في إدارته؟
                    مثلًا: يضيف المنتجات، يكتب الوصف، يحلل المبيعات، يقترح
                    عروضًا، ويخبرك بما يحتاج انتباهك. قديش ممكن تستخدم شيء
                    مثل هذا؟
                  </legend>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {AI_STORE_ASSISTANT_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="om-option"
                        aria-pressed={answers.aiStoreAssistantInterest === option}
                        onClick={() => updateSingle("aiStoreAssistantInterest", option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-base font-medium text-white">
                    ما الذي قد يمنعك من استخدام منصة جديدة لإنشاء وإدارة
                    متجرك؟
                  </legend>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {ECOMMERCE_BARRIER_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="om-option"
                        aria-pressed={answers.ecommerceAdoptionBarriers === option}
                        onClick={() => updateSingle("ecommerceAdoptionBarriers", option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <p className="text-sm text-[color:var(--muted)]">
                  ما في إجابة صح أو غلط — هدفنا نفهم كيف المتاجر تشتغل فعلًا.
                </p>
              </div>
            )}
          </>
        )}

        {isContactStep && (
          <div>
            <h2 className="text-lg font-medium text-white sm:text-xl">
              كيف نتواصل معك؟
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="om-name" className="om-field-label">
                  الاسم *
                </label>
                <input
                  id="om-name"
                  className="om-input"
                  value={answers.fullName}
                  onChange={(e) => updateContactField("fullName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="om-whatsapp" className="om-field-label">
                  رقم WhatsApp *
                </label>
                <input
                  id="om-whatsapp"
                  type="tel"
                  className="om-input"
                  value={answers.whatsapp}
                  onChange={(e) => updateContactField("whatsapp", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="om-store-name" className="om-field-label">
                  اسم المتجر *
                </label>
                <input
                  id="om-store-name"
                  className="om-input"
                  value={answers.storeName}
                  onChange={(e) => updateContactField("storeName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="om-instagram" className="om-field-label">
                  Instagram أو الموقع (اختياري)
                </label>
                <input
                  id="om-instagram"
                  className="om-input"
                  value={answers.instagramOrWebsite}
                  onChange={(e) => updateContactField("instagramOrWebsite", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {stepError && <p className="mt-4 text-sm text-red-400">{stepError}</p>}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          {errorMessage || "فشل الإرسال. الرجاء المحاولة مرة أخرى."}
        </p>
      )}
      {mailtoUrl && (
        <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-5">
          <p className="text-sm text-[color:var(--muted)]">
            لإرسال إجاباتك، افتح تطبيق البريد الإلكتروني:
          </p>
          <a
            href={mailtoUrl}
            className="mt-2 inline-block text-sm font-medium text-white underline decoration-[color:var(--border)] underline-offset-2 hover:decoration-white"
          >
            إرسال عبر البريد
          </a>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          className="om-nav-btn"
          onClick={goBack}
          disabled={step === 0 || status === "loading"}
        >
          السابق
        </button>

        {isContactStep ? (
          <button
            type="button"
            className="btn-primary px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleSubmit}
            disabled={status === "loading"}
            data-cursor
          >
            {status === "loading" ? "جاري الإرسال…" : "إرسال التقييم"}
          </button>
        ) : (
          <button type="button" className="btn-primary px-6 py-3" onClick={goNext} data-cursor>
            التالي
          </button>
        )}
      </div>
    </div>
  );
}