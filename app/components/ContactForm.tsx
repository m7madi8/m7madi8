"use client";

import { useState } from "react";
import type { Locale } from "../../lib/i18n/config";
import { getMessages } from "../../lib/i18n/messages";
import { getDb } from "../../lib/firebase";

const EMAIL = "eslamhuhu1@gmail.com";
const CONTACTS_COLLECTION = "contacts";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const SITE_NAME = "My Portfolio";

type ContactFormProps = {
  locale?: Locale;
};

export default function ContactForm({ locale = "en" }: ContactFormProps) {
  const f = getMessages(locale).contactForm;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null);

  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
  const isFirebaseConfigured = Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();
  const trimmedNotes = notes.trim();
  const canSubmit = Boolean(trimmedName && trimmedPhone && trimmedNotes);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setMailtoUrl(null);

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      notes: trimmedNotes,
    };

    if (!canSubmit) {
      setStatus("error");
      setErrorMessage(f.errorRequired);
      return;
    }

    setStatus("loading");

    try {
      if (web3formsKey) {
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `${SITE_NAME} – New contact`,
            from_name: SITE_NAME,
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            message: payload.notes,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
          throw new Error(data.message ?? "Failed to send email.");
        }
      }

      if (isFirebaseConfigured) {
        const db = await getDb();
        if (db) {
          const { addDoc, collection, serverTimestamp } = await import(
            "firebase/firestore"
          );
          await addDoc(collection(db, CONTACTS_COLLECTION), {
            ...payload,
            createdAt: serverTimestamp(),
          });
        }
      }

      if (!web3formsKey && !isFirebaseConfigured) {
        const subject = encodeURIComponent(`${SITE_NAME} – New contact`);
        const body = encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\n\nNotes:\n${payload.notes}`
        );
        setMailtoUrl(`mailto:${EMAIL}?subject=${subject}&body=${body}`);
        setStatus("idle");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" suppressHydrationWarning>
      <div className="contact-form-head">
        <p className="contact-form-kicker">{f.kicker}</p>
        <h3 className="contact-form-title">{f.title}</h3>
      </div>

      {status !== "success" && (
        <div className="contact-fields">
          <div className="contact-field contact-field--wide">
            <label htmlFor="contact-name">
              {f.name} <span className="contact-req">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "loading"}
              required
              className="contact-input"
              placeholder={f.namePlaceholder}
              suppressHydrationWarning
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">{f.email}</label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="contact-input"
              placeholder={f.emailPlaceholder}
              dir="ltr"
              suppressHydrationWarning
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-phone">
              {f.phone} <span className="contact-req">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={status === "loading"}
              required
              className="contact-input"
              placeholder={f.phonePlaceholder}
              dir="ltr"
              suppressHydrationWarning
            />
          </div>
          <div className="contact-field contact-field--wide">
            <label htmlFor="contact-notes">
              {f.message} <span className="contact-req">*</span>
            </label>
            <textarea
              id="contact-notes"
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={status === "loading"}
              required
              className="contact-input contact-input--area"
              placeholder={f.messagePlaceholder}
            />
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="contact-form-success">
          <p className="contact-form-kicker">{f.successKicker}</p>
          <h3>{f.successTitle}</h3>
          <p>{f.successBody}</p>
        </div>
      )}

      {mailtoUrl && (
        <div className="contact-form-mailto">
          <p>{f.mailtoIntro}</p>
          <a href={mailtoUrl}>
            {f.mailto} {locale === "ar" ? "←" : "→"}
          </a>
        </div>
      )}

      {status === "error" && (
        <p className="contact-form-status" role="alert">
          {errorMessage || f.errorFallback}
        </p>
      )}

      {status !== "success" && (
        <button
          type="submit"
          disabled={status === "loading" || !canSubmit}
          className="btn-primary contact-submit"
          data-cursor
          suppressHydrationWarning
        >
          {status === "loading" ? f.sending : f.submit}
        </button>
      )}
    </form>
  );
}
