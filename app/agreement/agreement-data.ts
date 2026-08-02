export type AgreementItem = { label: string; text: string };
export type AgreementStep = { title: string; desc: string };

export type AgreementSection = {
  id: string;
  title: string;
  body?: string | null;
  items?: AgreementItem[];
  list?: string[];
  steps?: AgreementStep[];
  bodyAfter?: string;
  highlight?: string;
};

export type AgreementLocale = {
  meta: {
    document: string;
    version: string;
    effective: string;
  };
  title: string;
  lede: string;
  subtitle: string;
  back: string;
  contact: string;
  translateLabel: string;
  contentsLabel: string;
  lastUpdated: string;
  sections: AgreementSection[];
};

export const agreementContent: Record<"en" | "ar", AgreementLocale> = {
  en: {
    meta: {
      document: "Document",
      version: "v1.0",
      effective: "Effective upon project kickoff",
    },
    title: "Work Agreement",
    lede: "Clear terms for scope, timeline, payment, and delivery — written so both sides know exactly how we work.",
    subtitle: "Mohammad Hroub · Full-Stack Web Developer",
    back: "Home",
    contact: "Start a project",
    translateLabel: "العربية",
    contentsLabel: "Contents",
    lastUpdated: "Last reviewed 2026",
    sections: [
      {
        id: "intro",
        title: "Purpose",
        body: "This agreement outlines how engagements work: what is included, how delivery progresses, payment structure, and post-launch support. Work is remote. Quality and clarity are non-negotiable. Please read before kickoff.",
      },
      {
        id: "parties",
        title: "Parties",
        body: null,
        items: [
          {
            label: "Service provider",
            text: "Mohammad Hroub — Full-Stack Web Developer, operating remotely.",
          },
          {
            label: "Client",
            text: "The person or organization commissioning the web project described in the proposal or written brief.",
          },
        ],
      },
      {
        id: "scope",
        title: "Scope of work",
        body: "Scope is whatever is explicitly agreed in the proposal, email, or written brief. Typical engagements include:",
        list: [
          "Full-stack development (front-end and back-end)",
          "Responsive layouts across modern devices",
          "Compatibility with current major browsers",
          "Implementation of approved designs, logic, and APIs",
        ],
        bodyAfter:
          "Work outside the agreed scope is scoped and priced separately before it begins.",
      },
      {
        id: "phases",
        title: "Delivery phases",
        body: "Projects move through a clear sequence so progress stays visible:",
        steps: [
          {
            title: "Discovery",
            desc: "Goals, constraints, content, and success criteria.",
          },
          {
            title: "Planning",
            desc: "Structure, UX decisions, or adoption of provided designs.",
          },
          {
            title: "Development",
            desc: "Build, integrate, and refine against the agreed brief.",
          },
          {
            title: "Review",
            desc: "Shared preview, feedback, and revisions within policy.",
          },
          {
            title: "Handoff",
            desc: "Delivery or launch after payment milestones and sign-off.",
          },
        ],
      },
      {
        id: "timeline",
        title: "Timeline",
        body: "Each project timeline is set by size and complexity and confirmed in the proposal or written correspondence. Meeting dates depends on timely content, feedback, and approvals from the client.",
      },
      {
        id: "revisions",
        title: "Revisions",
        body: "Two revision rounds are included for in-scope changes — copy, color, spacing, and layout adjustments. Material changes that expand scope or require redesign are quoted before work continues.",
      },
      {
        id: "payment",
        title: "Payment",
        body: "Engagements typically begin with an upfront portion of the total fee. Remaining balance is due by stage or on delivery, as stated in the proposal or invoice. Amounts, methods, and due dates are confirmed in writing before work starts.",
      },
      {
        id: "client",
        title: "Client responsibilities",
        body: "To keep the schedule intact, the client agrees to:",
        list: [
          "Provide copy, images, and brand assets by agreed dates",
          "Respond to questions within a reasonable window",
          "Give clear written feedback and approvals during review",
        ],
        bodyAfter:
          "Repeated delays in assets or approvals may shift the delivery date; coordination will be offered in good faith.",
      },
      {
        id: "ownership",
        title: "Ownership",
        body: "Upon full payment and delivery, ownership of the delivered project files and code transfers to the client. The provider may include the work in a personal portfolio unless otherwise agreed in writing.",
      },
      {
        id: "support",
        title: "Post-delivery support",
        body: "A limited support window (typically 14–30 days from delivery) covers bugs or defects from the original build at no extra cost. New features or substantial changes after that window are scoped and priced separately.",
      },
      {
        id: "cancellation",
        title: "Cancellation",
        body: "Either party may request cancellation by mutual written notice. Work completed through the cancellation date remains payable for the stage delivered. Disputes are handled directly and in good faith.",
      },
      {
        id: "acceptance",
        title: "Acceptance",
        body: "Confirming a proposal, making the initial payment, or sending written go-ahead constitutes acceptance of these terms. Request any amendments before kickoff so both parties start aligned.",
        highlight:
          "Starting the project confirms acceptance of this agreement.",
      },
    ],
  },
  ar: {
    meta: {
      document: "مستند",
      version: "الإصدار ١.٠",
      effective: "سارية عند بدء المشروع",
    },
    title: "اتفاقية العمل",
    lede: "شروط واضحة للنطاق والجدول والدفع والتسليم — مكتوبة حتى يعرف الطرفان كيف نعمل معًا.",
    subtitle: "محمد حروب · مطور ويب Full-Stack",
    back: "الرئيسية",
    contact: "ابدأ مشروعًا",
    translateLabel: "English",
    contentsLabel: "المحتويات",
    lastUpdated: "آخر مراجعة ٢٠٢٦",
    sections: [
      {
        id: "intro",
        title: "الغرض",
        body: "توضح هذه الاتفاقية آلية التعاون: ما يشمله العمل، مراحل التسليم، هيكل الدفع، والدعم بعد الإطلاق. العمل عن بُعد. الجودة والوضوح غير قابلين للمساومة. يُرجى القراءة قبل البدء.",
      },
      {
        id: "parties",
        title: "الأطراف",
        body: null,
        items: [
          {
            label: "مقدّم الخدمة",
            text: "محمد حروب — مطور ويب Full-Stack، يعمل عن بُعد.",
          },
          {
            label: "العميل",
            text: "الشخص أو الجهة التي تكلّف بتنفيذ مشروع الويب الموضّح في العرض أو الملخص المكتوب.",
          },
        ],
      },
      {
        id: "scope",
        title: "نطاق العمل",
        body: "النطاق هو ما يُتفق عليه صراحة في العرض أو البريد أو الملخص المكتوب. وتشمل المشاريع عادةً:",
        list: [
          "تطوير Full-Stack (واجهات أمامية وخلفية)",
          "تصميم متجاوب عبر الأجهزة الحديثة",
          "توافق مع المتصفحات الرئيسية الحالية",
          "تنفيذ التصاميم المعتمدة والمنطق وواجهات البرمجة",
        ],
        bodyAfter:
          "أي عمل خارج النطاق المتفق عليه يُحدَّد ويُسعَّر بشكل منفصل قبل البدء به.",
      },
      {
        id: "phases",
        title: "مراحل التسليم",
        body: "يسير المشروع وفق تسلسل واضح ليبقى التقدم مرئيًا:",
        steps: [
          {
            title: "الاستكشاف",
            desc: "الأهداف والقيود والمحتوى ومعايير النجاح.",
          },
          {
            title: "التخطيط",
            desc: "الهيكل وقرارات التجربة أو اعتماد التصاميم المقدَّمة.",
          },
          {
            title: "التطوير",
            desc: "البناء والربط والتحسين وفق الملخص المتفق عليه.",
          },
          {
            title: "المراجعة",
            desc: "معاينة مشتركة وملاحظات وتعديلات ضمن السياسة.",
          },
          {
            title: "التسليم",
            desc: "التسليم أو الإطلاق بعد مراحل الدفع والموافقة.",
          },
        ],
      },
      {
        id: "timeline",
        title: "الجدول الزمني",
        body: "يُحدَّد جدول كل مشروع حسب حجمه وتعقيده ويُؤكَّد في العرض أو المراسلات المكتوبة. الالتزام بالمواعيد يعتمد على تسليم المحتوى والملاحظات والموافقات في الوقت المتفق عليه.",
      },
      {
        id: "revisions",
        title: "التعديلات",
        body: "جولتان من المراجعة مشمولتان للتعديلات ضمن النطاق — النصوص والألوان والمسافات وترتيب العناصر. التغييرات الجوهرية التي توسّع النطاق أو تتطلب إعادة تصميم تُسعَّر قبل متابعة العمل.",
      },
      {
        id: "payment",
        title: "الدفع",
        body: "تبدأ المشاريع عادةً بمقدم من إجمالي الأتعاب. ويُستحق الباقي على مراحل أو عند التسليم حسب العرض أو الفاتورة. تُؤكَّد المبالغ والطرق والمواعيد كتابةً قبل بدء العمل.",
      },
      {
        id: "client",
        title: "التزامات العميل",
        body: "للحفاظ على الجدول، يوافق العميل على:",
        list: [
          "توفير النصوص والصور وأصول الهوية في المواعيد المتفق عليها",
          "الرد على الاستفسارات خلال مدة معقولة",
          "إعطاء ملاحظات وموافقات مكتوبة واضحة أثناء المراجعة",
        ],
        bodyAfter:
          "التأخير المتكرر في الأصول أو الموافقات قد يؤجّل موعد التسليم؛ وسيُقدَّم التنسيق بحسن نية.",
      },
      {
        id: "ownership",
        title: "الملكية",
        body: "بعد استلام كامل المبلغ والتسليم، تنتقل ملكية ملفات المشروع والكود المُسلَّم إلى العميل. ويحق لمقدّم الخدمة عرض العمل في معرضه الشخصي ما لم يُتفق كتابةً على خلاف ذلك.",
      },
      {
        id: "support",
        title: "الدعم بعد التسليم",
        body: "فترة دعم محدودة (عادةً ١٤–٣٠ يومًا من التسليم) تغطي الأخطاء أو العيوب الناتجة عن التنفيذ الأصلي دون تكلفة إضافية. الميزات الجديدة أو التغييرات الجوهرية بعد هذه الفترة تُحدَّد وتُسعَّر بشكل منفصل.",
      },
      {
        id: "cancellation",
        title: "الإلغاء",
        body: "يجوز لأي طرف طلب الإلغاء بإشعار مكتوب متبادل. ويظل العمل المنجز حتى تاريخ الإلغاء مستحق الدفع حسب المرحلة المُسلَّمة. تُعالَج الخلافات مباشرة وبحسن نية.",
      },
      {
        id: "acceptance",
        title: "الموافقة",
        body: "تأكيد العرض أو الدفع الأولي أو إرسال الموافقة المكتوبة يُعدّ قبولًا لهذه الشروط. يُفضَّل طلب أي تعديلات قبل البدء حتى يبدأ الطرفان متوافقين.",
        highlight: "بدء المشروع يعني الموافقة على هذه الاتفاقية.",
      },
    ],
  },
};
