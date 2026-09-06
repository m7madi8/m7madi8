"use client";

import { useMemo, useState } from "react";
import { getDb } from "../../../lib/firebase";
import ClinicReveal from "./ClinicReveal";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const CLINIC_LEADS_COLLECTION = "clinic_leads";
const OWNER_EMAIL = "eslamhuhu1@gmail.com";

type SingleStepKey =
  | "clinicType"
  | "hasWebsite"
  | "contactChannel"
  | "bookingMethod"
  | "leadFollowup"
  | "patientDatabase"
  | "patientFollowup";

type Answers = {
  clinicType: string;
  hasWebsite: string;
  contactChannel: string;
  bookingMethod: string;
  leadFollowup: string;
  patientDatabase: string;
  patientFollowup: string;
  improvementGoals: string[];
  mainChallenge: string;
  fullName: string;
  clinicName: string;
  whatsapp: string;
  email: string;
  instagram: string;
};

const EMPTY_ANSWERS: Answers = {
  clinicType: "",
  hasWebsite: "",
  contactChannel: "",
  bookingMethod: "",
  leadFollowup: "",
  patientDatabase: "",
  patientFollowup: "",
  improvementGoals: [],
  mainChallenge: "",
  fullName: "",
  clinicName: "",
  whatsapp: "",
  email: "",
  instagram: "",
};

const SINGLE_STEPS: {
  key: SingleStepKey;
  question: string;
  options: string[];
}[] = [
  {
    key: "clinicType",
    question: "What type of clinic do you run?",
    options: [
      "Dental",
      "Medical",
      "Dermatology & Aesthetics",
      "Physiotherapy",
      "Wellness",
      "Other",
    ],
  },
  {
    key: "hasWebsite",
    question: "Does your clinic currently have a website?",
    options: ["Yes", "No", "Yes, but it needs improvement"],
  },
  {
    key: "contactChannel",
    question: "How do most new patients contact you?",
    options: [
      "WhatsApp",
      "Phone",
      "Instagram / Facebook",
      "Website",
      "Multiple channels",
    ],
  },
  {
    key: "bookingMethod",
    question: "How are appointments currently managed?",
    options: [
      "WhatsApp / Phone",
      "Calendar / scheduling tool",
      "Clinic management system",
      "Combination of tools",
      "Other",
    ],
  },
  {
    key: "leadFollowup",
    question: "What happens when someone contacts the clinic but doesn't book?",
    options: [
      "We follow up manually",
      "We follow up sometimes",
      "Automated follow-up",
      "Nothing currently",
    ],
  },
  {
    key: "patientDatabase",
    question: "Do you have an organized database of existing patients?",
    options: ["Yes", "Partially", "No"],
  },
  {
    key: "patientFollowup",
    question: "Do you actively follow up with previous patients?",
    options: ["Yes, regularly", "Sometimes", "Rarely", "No"],
  },
];

const IMPROVEMENT_OPTIONS = [
  "Attract more new patients",
  "Increase bookings",
  "Improve follow-up",
  "Bring back previous patients",
  "Get more reviews",
  "Improve online presence",
  "Organize patient relationships",
];

// Step order: 7 single-select steps, then goals (multi), challenge (text), contact.
const TOTAL_STEPS = SINGLE_STEPS.length + 3;

function buildEmailMessage(answers: Answers): string {
  const lines = [
    `Clinic type: ${answers.clinicType}`,
    `Has website: ${answers.hasWebsite}`,
    `Main contact channel: ${answers.contactChannel}`,
    `Booking method: ${answers.bookingMethod}`,
    `Follow-up on missed leads: ${answers.leadFollowup}`,
    `Organized patient database: ${answers.patientDatabase}`,
    `Follows up with past patients: ${answers.patientFollowup}`,
    `Wants to improve: ${answers.improvementGoals.join(", ") || "—"}`,
    "",
    "Biggest challenge:",
    answers.mainChallenge,
    "",
    `Clinic name: ${answers.clinicName}`,
    `WhatsApp: ${answers.whatsapp}`,
    `Email: ${answers.email || "—"}`,
    `Instagram: ${answers.instagram || "—"}`,
  ];
  return lines.join("\n");
}

export default function ClinicForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null);
  const [stepError, setStepError] = useState("");

  const isContactStep = step === TOTAL_STEPS - 1;
  const isChallengeStep = step === TOTAL_STEPS - 2;
  const isGoalsStep = step === TOTAL_STEPS - 3;
  const singleStep =
    step < SINGLE_STEPS.length ? SINGLE_STEPS[step] : null;

  const progressPct = useMemo(
    () => Math.round(((step + 1) / TOTAL_STEPS) * 100),
    [step]
  );

  function updateAnswer<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStepError("");
  }

  function toggleGoal(goal: string) {
    setAnswers((prev) => {
      const has = prev.improvementGoals.includes(goal);
      return {
        ...prev,
        improvementGoals: has
          ? prev.improvementGoals.filter((g) => g !== goal)
          : [...prev.improvementGoals, goal],
      };
    });
    setStepError("");
  }

  function validateCurrentStep(): boolean {
    if (singleStep && !answers[singleStep.key]) {
      setStepError("Please choose an option to continue.");
      return false;
    }
    if (isGoalsStep && answers.improvementGoals.length === 0) {
      setStepError("Please select at least one option.");
      return false;
    }
    if (isChallengeStep && !answers.mainChallenge.trim()) {
      setStepError("Please share a few words before continuing.");
      return false;
    }
    if (isContactStep) {
      if (!answers.fullName.trim() || !answers.clinicName.trim() || !answers.whatsapp.trim()) {
        setStepError("Name, clinic name, and WhatsApp number are required.");
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

    try {
      if (web3formsKey) {
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `Clinic Growth — New Assessment: ${answers.clinicName}`,
            from_name: "Clinic Growth",
            name: answers.fullName,
            email: answers.email,
            phone: answers.whatsapp,
            message,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
          throw new Error(data.message ?? "Failed to send email.");
        }
      } else {
        const subject = encodeURIComponent(
          `Clinic Growth — New Assessment: ${answers.clinicName}`
        );
        const body = encodeURIComponent(message);
        setMailtoUrl(`mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`);
        setStatus("idle");
        return;
      }

      // Best-effort Firestore save — never lets a Firestore hiccup mask
      // a successful email, since email is the only lead notification.
      if (isFirebaseConfigured) {
        try {
          const db = await getDb();
          if (db) {
            const { addDoc, collection, serverTimestamp } = await import(
              "firebase/firestore"
            );
            await addDoc(collection(db, CLINIC_LEADS_COLLECTION), {
              source: "clinic-growth",
              clinic_type: answers.clinicType,
              has_website: answers.hasWebsite,
              contact_channel: answers.contactChannel,
              booking_method: answers.bookingMethod,
              lead_followup: answers.leadFollowup,
              patient_database: answers.patientDatabase,
              patient_followup: answers.patientFollowup,
              improvement_goals: answers.improvementGoals,
              main_challenge: answers.mainChallenge,
              full_name: answers.fullName,
              clinic_name: answers.clinicName,
              whatsapp: answers.whatsapp,
              email: answers.email,
              instagram: answers.instagram,
              created_at: serverTimestamp(),
            });
          }
        } catch {
          // Silent — the email already carries the lead.
        }
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="cg-form-shell text-center">
        <p className="cg-step-count">Received</p>
        <h3 className="mt-3 text-xl font-medium tracking-tight text-white sm:text-2xl">
          You&apos;re on my radar.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[color:var(--muted)]">
          Thanks for sharing a little about your clinic. I&apos;ll review your
          answers and get back to you with the biggest opportunities I see.
        </p>
      </div>
    );
  }

  return (
    <div className="cg-form-shell">
      <div className="flex items-center justify-between gap-4">
        <span className="cg-step-count">
          Step {step + 1} of {TOTAL_STEPS}
        </span>
        <span className="cg-step-count">{progressPct}%</span>
      </div>
      <div className="cg-progress-track mt-3">
        <div className="cg-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="cg-step mt-8" key={step}>
        {singleStep && (
          <fieldset>
            <legend className="text-lg font-medium text-white sm:text-xl">
              {singleStep.question}
            </legend>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {singleStep.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="cg-option"
                  aria-pressed={answers[singleStep.key] === option}
                  onClick={() => updateAnswer(singleStep.key, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {isGoalsStep && (
          <fieldset>
            <legend className="text-lg font-medium text-white sm:text-xl">
              What would you most like to improve?
            </legend>
            <p className="mt-1.5 text-sm text-[color:var(--muted)]">
              Choose as many as apply.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {IMPROVEMENT_OPTIONS.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  className="cg-option"
                  aria-pressed={answers.improvementGoals.includes(goal)}
                  onClick={() => toggleGoal(goal)}
                >
                  {goal}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {isChallengeStep && (
          <div>
            <label
              htmlFor="cg-challenge"
              className="block text-lg font-medium text-white sm:text-xl"
            >
              What&apos;s the biggest challenge your clinic is facing right
              now?
            </label>
            <textarea
              id="cg-challenge"
              className="cg-textarea mt-5"
              value={answers.mainChallenge}
              onChange={(e) => updateAnswer("mainChallenge", e.target.value)}
              placeholder="Tell me what's currently frustrating, inefficient, or difficult about your clinic's digital patient journey."
            />
          </div>
        )}

        {isContactStep && (
          <div>
            <h3 className="text-lg font-medium text-white sm:text-xl">
              Where can I reach you?
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="cg-name" className="cg-field-label">
                  Full name *
                </label>
                <input
                  id="cg-name"
                  className="cg-input"
                  value={answers.fullName}
                  onChange={(e) => updateAnswer("fullName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="cg-clinic" className="cg-field-label">
                  Clinic name *
                </label>
                <input
                  id="cg-clinic"
                  className="cg-input"
                  value={answers.clinicName}
                  onChange={(e) => updateAnswer("clinicName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="cg-whatsapp" className="cg-field-label">
                  WhatsApp number *
                </label>
                <input
                  id="cg-whatsapp"
                  type="tel"
                  className="cg-input"
                  value={answers.whatsapp}
                  onChange={(e) => updateAnswer("whatsapp", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="cg-email" className="cg-field-label">
                  Email (optional)
                </label>
                <input
                  id="cg-email"
                  type="email"
                  className="cg-input"
                  value={answers.email}
                  onChange={(e) => updateAnswer("email", e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="cg-instagram" className="cg-field-label">
                  Instagram (optional)
                </label>
                <input
                  id="cg-instagram"
                  className="cg-input"
                  value={answers.instagram}
                  onChange={(e) => updateAnswer("instagram", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {stepError && (
        <p className="mt-4 text-sm text-red-400">{stepError}</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          {errorMessage || "Failed to send. Please try again."}
        </p>
      )}
      {mailtoUrl && (
        <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-5">
          <p className="text-sm text-[color:var(--muted)]">
            To send your answers, open your email app:
          </p>
          <a
            href={mailtoUrl}
            className="mt-2 inline-block text-sm font-medium text-white underline decoration-[color:var(--border)] underline-offset-2 hover:decoration-white"
          >
            Send via email
          </a>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          className="cg-nav-btn"
          onClick={goBack}
          disabled={step === 0 || status === "loading"}
        >
          Back
        </button>

        {isContactStep ? (
          <button
            type="button"
            className="btn-primary px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleSubmit}
            disabled={status === "loading"}
            data-cursor
          >
            {status === "loading" ? "Sending…" : "Send my clinic assessment →"}
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary px-6 py-3"
            onClick={goNext}
            data-cursor
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
