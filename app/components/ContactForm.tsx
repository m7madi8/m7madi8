"use client";

import { useState } from "react";
import { getDb } from "../../lib/firebase";

const EMAIL = "eslamhuhu1@gmail.com";
const CONTACTS_COLLECTION = "contacts";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const SITE_NAME = "My Portfolio";

export default function ContactForm() {
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
      setErrorMessage("Please fill in your name, phone number, and message.");
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
        <p className="contact-form-kicker">Brief</p>
        <h3 className="contact-form-title">Tell me about the work.</h3>
      </div>

      {status !== "success" && (
        <div className="contact-fields">
          <div className="contact-field contact-field--wide">
            <label htmlFor="contact-name">
              Name <span className="contact-req">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "loading"}
              required
              className="contact-input"
              placeholder="Your name"
              suppressHydrationWarning
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="contact-input"
              placeholder="you@studio.com"
              suppressHydrationWarning
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-phone">
              Phone <span className="contact-req">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={status === "loading"}
              required
              className="contact-input"
              placeholder="Phone or WhatsApp"
              suppressHydrationWarning
            />
          </div>
          <div className="contact-field contact-field--wide">
            <label htmlFor="contact-notes">
              Message <span className="contact-req">*</span>
            </label>
            <textarea
              id="contact-notes"
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={status === "loading"}
              required
              className="contact-input contact-input--area"
              placeholder="Goals, timeline, and what done looks like."
            />
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="contact-form-success">
          <p className="contact-form-kicker">Sent</p>
          <h3>Thank you for reaching out.</h3>
          <p>I&apos;ll get back to you as soon as possible.</p>
        </div>
      )}

      {mailtoUrl && (
        <div className="contact-form-mailto">
          <p>Open your email app to send this brief:</p>
          <a href={mailtoUrl}>Send via email →</a>
        </div>
      )}

      {status === "error" && (
        <p className="contact-form-status" role="alert">
          {errorMessage || "Failed to send. Try again or use the email action."}
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
          {status === "loading" ? "Sending…" : "Send brief"}
        </button>
      )}
    </form>
  );
}
