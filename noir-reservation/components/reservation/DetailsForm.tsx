"use client";

import { useState } from "react";
import clsx from "clsx";
import { GuestDetails, Occasion } from "@/lib/types";

interface Props {
  initial: GuestDetails;
  onSubmit: (details: GuestDetails) => void;
}

const OCCASIONS: Occasion[] = [
  "None",
  "Birthday",
  "Anniversary",
  "Business Dinner",
  "Other",
];

function isValidPhone(v: string) {
  const digits = v.replace(/[^\d]/g, "");
  return digits.length >= 7;
}
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function DetailsForm({ initial, onSubmit }: Props) {
  const [values, setValues] = useState<GuestDetails>(initial);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = {
    firstName: values.firstName.trim().length < 1 ? "Enter your first name." : "",
    lastName: values.lastName.trim().length < 1 ? "Enter your last name." : "",
    phone: !isValidPhone(values.phone) ? "Please enter a valid mobile number." : "",
    email: !isValidEmail(values.email) ? "Please enter a valid email address." : "",
  };

  const hasErrors = Object.values(errors).some(Boolean);

  const field = (key: keyof GuestDetails, val: string) =>
    setValues((v) => ({ ...v, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, phone: true, email: true });
    if (!hasErrors) onSubmit(values);
  };

  const inputClass =
    "focus-ring w-full bg-transparent border border-border px-4 py-3.5 text-[14px] placeholder:text-text-muted/60 focus:border-accent transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] tracking-[0.1em] uppercase text-text-muted mb-2 block">
            First name
          </label>
          <input
            className={clsx(inputClass, touched.firstName && errors.firstName && "border-danger")}
            value={values.firstName}
            onChange={(e) => field("firstName", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
            placeholder="Mohammad"
          />
          {touched.firstName && errors.firstName && (
            <p className="text-[12px] text-danger mt-1.5">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="text-[11px] tracking-[0.1em] uppercase text-text-muted mb-2 block">
            Last name
          </label>
          <input
            className={clsx(inputClass, touched.lastName && errors.lastName && "border-danger")}
            value={values.lastName}
            onChange={(e) => field("lastName", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
            placeholder="Hassan"
          />
          {touched.lastName && errors.lastName && (
            <p className="text-[12px] text-danger mt-1.5">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-[11px] tracking-[0.1em] uppercase text-text-muted mb-2 block">
          Mobile number
        </label>
        <input
          type="tel"
          className={clsx(inputClass, touched.phone && errors.phone && "border-danger")}
          value={values.phone}
          onChange={(e) => field("phone", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          placeholder="+970 59 000 0000"
        />
        {touched.phone && errors.phone && (
          <p className="text-[12px] text-danger mt-1.5">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="text-[11px] tracking-[0.1em] uppercase text-text-muted mb-2 block">
          Email
        </label>
        <input
          type="email"
          className={clsx(inputClass, touched.email && errors.email && "border-danger")}
          value={values.email}
          onChange={(e) => field("email", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="you@email.com"
        />
        {touched.email && errors.email && (
          <p className="text-[12px] text-danger mt-1.5">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="text-[11px] tracking-[0.1em] uppercase text-text-muted mb-2 block">
          Special occasion (optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <button
              type="button"
              key={o}
              onClick={() => field("occasion", o)}
              aria-pressed={values.occasion === o}
              className={clsx(
                "focus-ring px-4 py-2 text-[12px] border transition-colors",
                values.occasion === o
                  ? "bg-accent border-accent text-[#0a0a0a]"
                  : "border-border text-text-muted hover:border-border-strong hover:text-text"
              )}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[11px] tracking-[0.1em] uppercase text-text-muted mb-2 block">
          Special request (optional)
        </label>
        <textarea
          className={clsx(inputClass, "min-h-[88px] resize-none")}
          value={values.notes}
          onChange={(e) => field("notes", e.target.value)}
          placeholder="Dietary needs, seating preference, anything we should know."
        />
      </div>

      <button
        type="submit"
        className="focus-ring w-full bg-accent text-[#0a0a0a] py-4 text-[13px] tracking-[0.1em] uppercase font-medium hover:brightness-110 active:scale-[0.99] transition-all"
      >
        Review Reservation
      </button>
    </form>
  );
}
