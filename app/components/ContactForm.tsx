"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../lib/firebase";

const EMAIL = "eslamhuhu1@gmail.com";
const CONTACTS_COLLECTION = "contacts";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
  const isFirebaseConfigured = Boolean(db);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
    };

    setStatus("loading");

    try {
      // 1) إرسال الطلب إلى بريدك عبر Web3Forms
      if (web3formsKey) {
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: "Contact from portfolio",
            name: payload.name,
            phone: payload.phone,
            message: payload.notes,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
          throw new Error(data.message ?? "Failed to send email.");
        }
      }

      // 2) حفظ في Firebase إن كان مفعّلاً
      if (isFirebaseConfigured) {
        await addDoc(collection(db!, CONTACTS_COLLECTION), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      // إذا لم يكن هناك Web3Forms ولا Firebase → فتح mailto
      if (!web3formsKey && !isFirebaseConfigured) {
        const subject = encodeURIComponent("Contact from portfolio");
        const body = encodeURIComponent(
          `Name: ${payload.name}\nPhone: ${payload.phone}\n\nNotes:\n${payload.notes}`
        );
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        return;
      }

      setStatus("success");
      setName("");
      setPhone("");
      setNotes("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="reveal grid w-full max-w-2xl gap-5 sm:grid-cols-2"
      data-reveal
      suppressHydrationWarning
    >
      {status !== "success" && (
        <>
          <div className="space-y-2 sm:col-span-2 sm:max-w-xs">
            <label
              htmlFor="contact-name"
              className="block font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]"
            >
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "loading"}
              className="contact-input w-full select-text rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-white placeholder:text-[color:var(--muted)] focus:border-[color:var(--button-border)] focus:outline-none focus:ring-1 focus:ring-[color:var(--button-border)] disabled:opacity-60"
              placeholder="Your name"
              suppressHydrationWarning
            />
          </div>
          <div className="space-y-2 sm:max-w-xs">
            <label
              htmlFor="contact-phone"
              className="block font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]"
            >
              Phone
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={status === "loading"}
              className="contact-input w-full select-text rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-white placeholder:text-[color:var(--muted)] focus:border-[color:var(--button-border)] focus:outline-none focus:ring-1 focus:ring-[color:var(--button-border)] disabled:opacity-60"
              placeholder="Phone or WhatsApp"
              suppressHydrationWarning
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label
              htmlFor="contact-notes"
              className="block font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]"
            >
              Notes
            </label>
            <textarea
              id="contact-notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={status === "loading"}
              className="contact-input w-full resize-y rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-white placeholder:text-[color:var(--muted)] focus:border-[color:var(--button-border)] focus:outline-none focus:ring-1 focus:ring-[color:var(--button-border)] disabled:opacity-60"
              placeholder="Your message or project details..."
            />
          </div>
        </>
      )}

      {status === "success" && (
        <div className="sm:col-span-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 text-center">
          <p className="eyebrow text-[color:var(--muted)]">Message sent</p>
          <h3 className="mt-3 text-xl font-medium tracking-tight text-white sm:text-2xl">
            Thank you for reaching out.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[color:var(--muted)]">
            I&apos;ll get back to you as soon as possible.
          </p>
          <div className="mx-auto mt-6 h-px w-12 bg-[color:var(--border)]" aria-hidden />
        </div>
      )}
      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-red-400">
          {errorMessage || "Failed to send. Try again or use the email link below."}
        </p>
      )}

      {status !== "success" && (
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary px-6 py-3 disabled:opacity-60"
            data-cursor
            suppressHydrationWarning
          >
            {status === "loading" ? "Sending…" : "Send"}
          </button>
        </div>
      )}
    </form>
  );
}
