"use client";

import { useMemo, useState } from "react";
import { getDb } from "../../../../lib/firebase";
import {
  ODAY_QUESTION_LABELS,
  ODAY_SECTIONS,
  type OdayQuestionKey,
} from "../oday-requirements-data";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const LEADS_COLLECTION = "oday_requirements";
const OWNER_EMAIL = "eslamhuhu1@gmail.com";

type Answers = Record<OdayQuestionKey, string> & {
  fullName: string;
  officeName: string;
  whatsapp: string;
  email: string;
};

function emptyAnswers(): Answers {
  const base = {} as Record<OdayQuestionKey, string>;
  for (const key of Object.keys(ODAY_QUESTION_LABELS) as OdayQuestionKey[]) {
    base[key] = "";
  }
  return {
    ...base,
    fullName: "",
    officeName: "",
    whatsapp: "",
    email: "",
  };
}

const TOTAL_STEPS = ODAY_SECTIONS.length + 1;
const CONTACT_STEP_INDEX = ODAY_SECTIONS.length;

function buildEmailMessage(answers: Answers): string {
  const lines: string[] = [];

  for (const section of ODAY_SECTIONS) {
    lines.push(`## ${section.title}`);
    for (const q of section.questions) {
      lines.push("");
      lines.push(ODAY_QUESTION_LABELS[q.key]);
      lines.push(answers[q.key].trim() || "—");
    }
    lines.push("");
  }

  lines.push("---");
  lines.push(`الاسم: ${answers.fullName}`);
  lines.push(`المكتب: ${answers.officeName || "—"}`);
  lines.push(`واتساب: ${answers.whatsapp}`);
  lines.push(`البريد: ${answers.email || "—"}`);

  return lines.join("\n");
}

export default function OdayForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => emptyAnswers());
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null);
  const [stepError, setStepError] = useState("");

  const isContactStep = step === CONTACT_STEP_INDEX;
  const section = !isContactStep ? ODAY_SECTIONS[step] : null;

  const progressPct = useMemo(
    () => Math.round(((step + 1) / TOTAL_STEPS) * 100),
    [step]
  );

  function updateQuestion(key: OdayQuestionKey, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStepError("");
  }

  function updateContact(field: keyof Pick<Answers, "fullName" | "officeName" | "whatsapp" | "email">, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setStepError("");
  }

  function validateCurrentStep(): boolean {
    if (section) {
      const missing = section.questions.filter((q) => !answers[q.key].trim());
      if (missing.length > 0) {
        setStepError("يرجى الإجابة على كل الأسئلة في هذا القسم قبل المتابعة.");
        return false;
      }
      return true;
    }

    if (isContactStep) {
      if (!answers.fullName.trim() || !answers.whatsapp.trim()) {
        setStepError("الاسم ورقم الواتساب مطلوبان.");
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
    const isFirebaseConfigured = Boolean(
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    );
    const message = buildEmailMessage(answers);
    const subjectName = answers.officeName.trim() || answers.fullName.trim();

    try {
      if (web3formsKey) {
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `Oday — استبيان المتطلبات: ${subjectName}`,
            from_name: "Oday Requirements",
            name: answers.fullName,
            email: answers.email,
            phone: answers.whatsapp,
            message,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
          throw new Error(data.message ?? "تعذّر إرسال الإجابات.");
        }
      } else {
        const subject = encodeURIComponent(
          `Oday — استبيان المتطلبات: ${subjectName}`
        );
        const body = encodeURIComponent(message);
        setMailtoUrl(`mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`);
        setStatus("idle");
        return;
      }

      if (isFirebaseConfigured) {
        try {
          const db = await getDb();
          if (db) {
            const { addDoc, collection, serverTimestamp } = await import(
              "firebase/firestore"
            );
            await addDoc(collection(db, LEADS_COLLECTION), {
              source: "oday-requirements",
              ...Object.fromEntries(
                (Object.keys(ODAY_QUESTION_LABELS) as OdayQuestionKey[]).map(
                  (k) => [k, answers[k]]
                )
              ),
              full_name: answers.fullName,
              office_name: answers.officeName,
              whatsapp: answers.whatsapp,
              email: answers.email,
              created_at: serverTimestamp(),
            });
          }
        } catch {
          // Email already sent.
        }
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "حدث خطأ. حاول مرة أخرى."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="od-form-shell text-center">
        <p className="od-step-count">تم الاستلام</p>
        <h3 className="mt-3 text-xl font-medium tracking-tight text-white sm:text-2xl">
          شكرًا — وصلتنا إجاباتك.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[color:var(--muted)]">
          بنراجع المتطلبات ونرجعلك قبل ما نبدأ أي تصميم أو تطوير للنظام.
        </p>
      </div>
    );
  }

  return (
    <div className="od-form-shell">
      <div className="flex items-center justify-between gap-4">
        <span className="od-step-count">
          {isContactStep
            ? `الخطوة ${step + 1} من ${TOTAL_STEPS} — بيانات التواصل`
            : `القسم ${step + 1} من ${ODAY_SECTIONS.length}`}
        </span>
        <span className="od-step-count">{progressPct}%</span>
      </div>
      <div className="od-progress-track mt-3">
        <div className="od-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="od-step mt-8" key={step}>
        {section && (
          <div>
            <h2 className="od-section-title text-white">{section.title}</h2>
            <div className="mt-6 space-y-6">
              {section.questions.map((q, index) => (
                <div key={q.key}>
                  <label htmlFor={`od-${q.key}`} className="od-question-label">
                    <span className="font-mono text-xs text-[color:var(--muted)]">
                      {index + 1}.{" "}
                    </span>
                    {q.label}
                  </label>
                  {q.hint && <p className="od-question-hint">{q.hint}</p>}
                  <textarea
                    id={`od-${q.key}`}
                    className="od-textarea mt-3"
                    value={answers[q.key]}
                    onChange={(e) => updateQuestion(q.key, e.target.value)}
                    rows={q.key === "q3" ? 4 : 3}
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {isContactStep && (
          <div>
            <h2 className="od-section-title text-white">بيانات التواصل</h2>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              آخر خطوة — عشان نقدر نرجعلك إذا احتجنا توضيح على أي إجابة.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="od-name" className="od-field-label">
                  الاسم الكامل *
                </label>
                <input
                  id="od-name"
                  className="od-input"
                  value={answers.fullName}
                  onChange={(e) => updateContact("fullName", e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="od-office" className="od-field-label">
                  اسم المكتب (اختياري)
                </label>
                <input
                  id="od-office"
                  className="od-input"
                  value={answers.officeName}
                  onChange={(e) => updateContact("officeName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="od-whatsapp" className="od-field-label">
                  واتساب *
                </label>
                <input
                  id="od-whatsapp"
                  type="tel"
                  className="od-input"
                  value={answers.whatsapp}
                  onChange={(e) => updateContact("whatsapp", e.target.value)}
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="od-email" className="od-field-label">
                  البريد (اختياري)
                </label>
                <input
                  id="od-email"
                  type="email"
                  className="od-input"
                  value={answers.email}
                  onChange={(e) => updateContact("email", e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {stepError && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {stepError}
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {errorMessage || "تعذّر الإرسال. حاول مرة أخرى."}
        </p>
      )}
      {mailtoUrl && (
        <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-5">
          <p className="text-sm text-[color:var(--muted)]">
            لإرسال الإجابات، افتح تطبيق البريد:
          </p>
          <a
            href={mailtoUrl}
            className="mt-2 inline-block text-sm font-medium text-white underline decoration-[color:var(--border)] underline-offset-2 hover:decoration-white"
          >
            إرسال عبر البريد
          </a>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          className="od-nav-btn"
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
            {status === "loading" ? "جاري الإرسال…" : "إرسال الاستبيان ←"}
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary px-6 py-3"
            onClick={goNext}
            data-cursor
          >
            التالي
          </button>
        )}
      </div>
    </div>
  );
}
