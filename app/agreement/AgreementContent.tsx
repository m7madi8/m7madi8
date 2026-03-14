"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CustomCursor from "../components/CustomCursor";
import RevealManager from "../components/RevealManager";
import logoMe from "../../img/logo-me.png";

const content = {
  ar: {
    title: "اتفاقية العمل",
    subtitle: "محمد حروب — Full-Stack Web Developer",
    back: "العودة للرئيسية",
    contact: "اتصل بي",
    translateLabel: "English",
    sections: [
      {
        id: "intro",
        title: "مقدمة",
        body: "نرحب بك. هذه الصفحة توضح آلية العمل بيننا بشكل واضح ومشفوع بالثقة. نعمل عن بُعد عبر الإنترنت، ونلتزم بتسليم مشروعك في الوقت المتفق عليه وبجودة احترافية. ننصح بقراءة الاتفاقية قبل بدء أي مشروع.",
      },
      {
        id: "parties",
        title: "تعريف الطرفين",
        body: null,
        items: [
          { label: "الطرف الأول (مقدم الخدمة):", text: "محمد حروب، يعمل كمطور ويب Full-Stack (Full-Stack Web Developer)، ومقره للعمل عن بُعد." },
          { label: "الطرف الثاني (العميل):", text: "الجهة أو الشخص الذي يتعاقد مع الطرف الأول لتنفيذ مشروع تطوير موقع ويب أو واجهات رقمية." },
        ],
      },
      {
        id: "scope",
        title: "نطاق العمل",
        body: "يشمل نطاق الخدمة ما يتم الاتفاق عليه صراحة في العرض أو البريد أو المحادثة، وعادةً يتضمن:",
        list: [
          "تطوير واجهات المواقع والواجهات الخلفية (Full-Stack)",
          "جعل الموقع متجاوباً مع الشاشات المختلفة",
          "ضمان توافق جيد مع المتصفحات الشائعة",
          "تنفيذ التصاميم المعتمدة وبناء المنطق الخلفي وواجهات البرمجة (APIs)",
        ],
        bodyAfter: "أي مهام إضافية خارج هذا النطاق تُحدد وتُسعّر بشكل منفصل بالاتفاق.",
      },
      {
        id: "phases",
        title: "مراحل العمل",
        body: "نسير وفق مراحل واضحة لضمان تنفيذ منظم وشفاف:",
        steps: [
          { title: "١. استكشاف المتطلبات", desc: "جمع احتياجاتك، الأهداف، والمحتوى أو التصاميم المتوفرة." },
          { title: "٢. التخطيط والتصميم", desc: "تحديد هيكل الصفحات وواجهة المستخدم (أو اعتماد التصاميم التي تقدمها)." },
          { title: "٣. التطوير", desc: "كتابة الكود وربط الواجهات والمنطق الخلفي وفق ما تم الاتفاق عليه." },
          { title: "٤. المراجعة والاختبار", desc: "عرض النسخة عليك للمراجعة وإجراء التعديلات ضمن السياسة المذكورة أدناه." },
          { title: "٥. التسليم", desc: "تسليم الملفات أو النشر بعد استلام المبلغ المتفق عليه واستكمال الموافقات." },
        ],
      },
      {
        id: "timeline",
        title: "مدة تنفيذ المشروع",
        body: "تُحدد المدة الزمنية لكل مشروع حسب حجمه وتعقده، وتُذكر صراحة في عرض السعر أو في المراسلات المعتمدة بين الطرفين. الالتزام بالجدول الزمني يعتمد على توفيرك للمحتوى والموافقات في المواعيد المتفق عليها.",
      },
      {
        id: "revisions",
        title: "سياسة التعديلات",
        body: "نضمن لك عدداً معقولاً من جولات المراجعة (عادةً جولتان) لتعديلات ضمن نطاق العمل المتفق عليه، مثل تعديل النصوص، الألوان، أو ترتيب العناصر. التعديلات الجوهرية التي تغيّر نطاق المشروع أو تتطلب إعادة تصميم كبيرة قد تستلزم اتفاقاً إضافياً من حيث التكلفة والمدة.",
      },
      {
        id: "payment",
        title: "طريقة الدفع",
        body: "نفضل العمل بنظام يضمن راحة الطرفين: عادةً نطلب مقدماً (نسبة من إجمالي المشروع) لبدء العمل، ويُستكمل الباقي على مراحل أو عند التسليم حسب ما نتفق عليه في كل مشروع. طريقة التحويل والمبالغ والمواعيد تُحدد في العرض أو الفاتورة المرسلة لك.",
      },
      {
        id: "client",
        title: "التزامات العميل",
        body: "لضمان إنجاز المشروع في الوقت المحدد، نرجو منك:",
        list: [
          "توفير المحتوى (نصوص، صور، شعارات) في المواعيد المتفق عليها",
          "الرد على الاستفسارات والطلبات خلال مدة معقولة",
          "إبداء الموافقات أو الملاحظات بشكل واضح في مرحلة المراجعة",
        ],
        bodyAfter: "التأخير المتكرر في توفير المحتوى أو الموافقات قد يؤثر على الجدول الزمني؛ سنحاول دائماً التنسيق معك لتجنب ذلك.",
      },
      {
        id: "ownership",
        title: "ملكية الموقع بعد الدفع",
        body: "بعد استلام كامل المبلغ المتفق عليه وتسليم المشروع، تنتقل ملكية العمل المُسلّم (الكود والملفات المُنتجة للمشروع) إليك. يحق لك استخدام الموقع وإدارته وفق رغبتك، مع الاحتفاظ بحق مقدم الخدمة في عرض المشروع ضمن portfolioه الشخصي ما لم يتفق على غير ذلك.",
      },
      {
        id: "support",
        title: "الدعم الفني بعد التسليم",
        body: "نقدم فترة دعم محدودة (مثلاً ١٤ أو ٣٠ يوماً من تاريخ التسليم) لمعالجة أخطاء أو مشكلات تقنية ناتجة عن التنفيذ الأصلي، دون تحميل إضافي. أي تطوير جديد أو تعديلات جوهرية بعد هذه الفترة تُسعّر بشكل منفصل بالاتفاق.",
      },
      {
        id: "cancellation",
        title: "سياسة إلغاء المشروع",
        body: "في حال رغبة أي من الطرفين في إلغاء المشروع، يُفضّل أن يتم ذلك بالاتفاق والتفاهم. العمل المنفذ حتى تاريخ الإلغاء يظل مستحقاً مقابله المبلغ المناسب حسب المرحلة المُنجزة، ويُحدد بالاتفاق. لا نهدف إلى احتجاز أي طرف؛ نحرص على حل أي خلاف بشكل ودّي وعادل.",
      },
      {
        id: "acceptance",
        title: "الموافقة على الاتفاقية",
        body: "باطّلاعك على هذه الصفحة وبدء المشروع (سواءً بتأكيد العرض أو إجراء الدفع الأول أو إرسال الموافقة كتابةً)، نعتبر أنك وافقت على هذه الاتفاقية وشروطها. إن كانت لديك أي تحفظات أو رغبة في تعديل نقطة معينة، يُفضّل مناقشتها قبل البدء لنصل إلى صيغة واضحة ومريحة للطرفين.",
        highlight: "بدء المشروع يعني موافقتك على شروط هذه الاتفاقية.",
      },
    ],
  },
  en: {
    title: "Work Agreement",
    subtitle: "Mohammad Hroub — Full-Stack Web Developer",
    back: "Back to home",
    contact: "Contact me",
    translateLabel: "العربية",
    sections: [
      {
        id: "intro",
        title: "Introduction",
        body: "Welcome. This page clearly explains how we work together and what you can expect. We work remotely over the internet and are committed to delivering your project on time with professional quality. We recommend reading this agreement before starting any project.",
      },
      {
        id: "parties",
        title: "Definition of Parties",
        body: null,
        items: [
          { label: "First party (service provider):", text: "Mohammad Hroub, working as a Full-Stack Web Developer, operating remotely." },
          { label: "Second party (client):", text: "The entity or person contracting with the first party to carry out a web development project or digital interfaces." },
        ],
      },
      {
        id: "scope",
        title: "Scope of Work",
        body: "The scope of service includes what is explicitly agreed in the proposal, email, or conversation, and typically includes:",
        list: [
          "Full-stack development (front-end and back-end)",
          "Making the site responsive across devices",
          "Ensuring good compatibility with common browsers",
          "Implementing approved designs and building back-end logic and APIs",
        ],
        bodyAfter: "Any tasks outside this scope are defined and quoted separately by agreement.",
      },
      {
        id: "phases",
        title: "Work Phases",
        body: "We follow clear phases to ensure organized and transparent delivery:",
        steps: [
          { title: "1. Discovery", desc: "Gathering your needs, goals, and available content or designs." },
          { title: "2. Planning & design", desc: "Defining page structure and user interface (or adopting designs you provide)." },
          { title: "3. Development", desc: "Writing code and connecting front-end and back-end as agreed." },
          { title: "4. Review & testing", desc: "Presenting the version for your review and making changes under the policy below." },
          { title: "5. Delivery", desc: "Handing over files or going live after receiving the agreed payment and approvals." },
        ],
      },
      {
        id: "timeline",
        title: "Project Timeline",
        body: "The timeline for each project is set according to its size and complexity and is stated in the quote or in agreed correspondence. Meeting the schedule depends on you providing content and approvals on the agreed dates.",
      },
      {
        id: "revisions",
        title: "Revision Policy",
        body: "We include a reasonable number of revision rounds (typically two) for changes within the agreed scope, such as text, colors, or layout adjustments. Substantial changes that alter the scope or require major redesign may require an additional agreement on cost and timeline.",
      },
      {
        id: "payment",
        title: "Payment Terms",
        body: "We prefer a structure that works for both parties: usually an upfront portion of the total to start, with the remainder in stages or on delivery as agreed per project. Transfer method, amounts, and dates are specified in the proposal or invoice sent to you.",
      },
      {
        id: "client",
        title: "Client Obligations",
        body: "To ensure the project is completed on time, we ask you to:",
        list: [
          "Provide content (copy, images, logos) by the agreed deadlines",
          "Respond to questions and requests within a reasonable time",
          "Give clear approvals or feedback during the review phase",
        ],
        bodyAfter: "Repeated delays in providing content or approvals may affect the timeline; we will always try to coordinate with you to avoid this.",
      },
      {
        id: "ownership",
        title: "Ownership After Payment",
        body: "After full receipt of the agreed amount and project delivery, ownership of the delivered work (code and project deliverables) transfers to you. You may use and manage the site as you wish, while the service provider retains the right to showcase the project in their portfolio unless otherwise agreed.",
      },
      {
        id: "support",
        title: "Support After Delivery",
        body: "We provide a limited support period (e.g. 14 or 30 days from delivery) to fix bugs or technical issues arising from the original implementation at no extra charge. Any new development or substantial changes after this period are quoted separately by agreement.",
      },
      {
        id: "cancellation",
        title: "Project Cancellation",
        body: "If either party wishes to cancel the project, we prefer to do so by mutual agreement. Work completed up to the cancellation date remains payable as appropriate for the stage completed, to be agreed between the parties. We do not seek to hold anyone to terms unfairly; we aim to resolve any disagreement in a friendly and fair way.",
      },
      {
        id: "acceptance",
        title: "Agreement to Terms",
        body: "By viewing this page and starting the project (whether by confirming the proposal, making the first payment, or sending written acceptance), you are deemed to have agreed to this agreement and its terms. If you have any reservations or want to change a specific point, we recommend discussing it before starting so we can agree on clear, comfortable terms for both parties.",
        highlight: "Starting the project means you accept the terms of this agreement.",
      },
    ],
  },
};

function SectionBlock({
  section,
  dir,
}: {
  section: (typeof content.ar.sections)[0];
  dir: "rtl" | "ltr";
}) {
  const isRtl = dir === "rtl";
  return (
    <section
      id={section.id}
      className="reveal relative scroll-mt-24 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm sm:p-8"
      data-reveal
    >
      {/* علامة مائية: لوجو شفاف */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <Image
          src={logoMe}
          alt=""
          className="h-auto max-h-[70%] w-auto max-w-[60%] opacity-[0.04]"
          sizes="(max-width: 768px) 50vw, 200px"
        />
      </div>
      <div className="relative z-10">
      <h2 className="section-title font-medium text-[color:var(--foreground)]">
        {section.title}
      </h2>
      <div className="mt-4 space-y-4">
        {section.body && (
          <p className="leading-relaxed text-[color:var(--muted)]">
            {section.body}
          </p>
        )}
        {"items" in section &&
          section.items?.map((item, i) => (
            <div key={i} className="space-y-1">
              <p className="font-medium text-[color:var(--foreground)]">
                {item.label}
              </p>
              <p className="text-[color:var(--muted)]">{item.text}</p>
            </div>
          ))}
        {"list" in section && section.list && (
          <ul
            className={`space-y-2 text-[color:var(--muted)] ${isRtl ? "list-inside list-disc" : "list-inside list-disc"}`}
          >
            {section.list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
        {"steps" in section && section.steps && (
          <ul className="space-y-4 border-s-2 border-[color:var(--border)] ps-4 sm:ps-6">
            {section.steps.map((step, i) => (
              <li key={i}>
                <h3 className="font-medium text-[color:var(--foreground)]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  {step.desc}
                </p>
              </li>
            ))}
          </ul>
        )}
        {"bodyAfter" in section && section.bodyAfter && (
          <p className="leading-relaxed text-[color:var(--muted)]">
            {section.bodyAfter}
          </p>
        )}
        {"highlight" in section && section.highlight && (
          <p className="rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-4 font-medium text-[color:var(--foreground)]">
            {section.highlight}
          </p>
        )}
      </div>
      </div>
    </section>
  );
}

export default function AgreementContent() {
  const [lang, setLang] = useState<"ar" | "en">("en");
  const t = content[lang];
  const isRtl = lang === "ar";

  return (
    <div className="bg-[color:var(--background)] text-[color:var(--foreground)]">
      <CustomCursor />
      <RevealManager />
      <main className="relative mx-auto min-h-screen max-w-4xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10 lg:px-10 lg:pt-12">
        <header
          className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
          dir={isRtl ? "rtl" : "ltr"}
        >
          <div className="space-y-1">
            <p className="eyebrow">{t.title}</p>
            <p className="text-sm text-[color:var(--muted)]">{t.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-elevated)]"
              href="/"
              data-cursor
            >
              {t.back}
            </Link>
            <Link
              className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-elevated)]"
              href="/#contact"
              data-cursor
            >
              {t.contact}
            </Link>
            <button
              type="button"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="rounded-lg border border-[color:var(--button-border)] bg-[color:var(--button-bg)] px-4 py-2 text-[color:var(--button-text)] transition hover:opacity-90"
              data-cursor
              aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              {t.translateLabel}
            </button>
          </div>
        </header>

        <article
          dir={isRtl ? "rtl" : "ltr"}
          lang={lang === "ar" ? "ar" : "en"}
          className="mt-12 space-y-8 sm:mt-16 sm:space-y-10"
        >
          {t.sections.map((section) => (
            <SectionBlock key={section.id} section={section} dir={isRtl ? "rtl" : "ltr"} />
          ))}
        </article>
      </main>
    </div>
  );
}
