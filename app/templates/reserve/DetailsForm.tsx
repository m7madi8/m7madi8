"use client";

import { useState } from "react";
import { cx } from "./cx";
import type { GuestDetails, Occasion } from "./data";

const OCCASIONS: Occasion[] = [
  "None",
  "Birthday",
  "Anniversary",
  "Business Dinner",
  "Other",
];

function isValidPhone(v: string) {
  return v.replace(/[^\d]/g, "").length >= 7;
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

type DetailsFormProps = {
  initial: GuestDetails;
  onSubmit: (details: GuestDetails) => void;
};

export default function DetailsForm({ initial, onSubmit }: DetailsFormProps) {
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

  return (
    <form
      className="nr-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTouched({ firstName: true, lastName: true, phone: true, email: true });
        if (!hasErrors) onSubmit(values);
      }}
    >
      <div className="nr-form-row">
        <div>
          <label className="nr-label">First name</label>
          <input
            className={cx("nr-input nr-focus", touched.firstName && errors.firstName && "is-bad")}
            value={values.firstName}
            placeholder="Mohammad"
            onChange={(e) => field("firstName", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
          />
          {touched.firstName && errors.firstName ? <p className="nr-err">{errors.firstName}</p> : null}
        </div>
        <div>
          <label className="nr-label">Last name</label>
          <input
            className={cx("nr-input nr-focus", touched.lastName && errors.lastName && "is-bad")}
            value={values.lastName}
            placeholder="Hassan"
            onChange={(e) => field("lastName", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
          />
          {touched.lastName && errors.lastName ? <p className="nr-err">{errors.lastName}</p> : null}
        </div>
      </div>

      <div>
        <label className="nr-label">Mobile number</label>
        <input
          type="tel"
          className={cx("nr-input nr-focus", touched.phone && errors.phone && "is-bad")}
          value={values.phone}
          placeholder="+970 59 000 0000"
          onChange={(e) => field("phone", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
        />
        {touched.phone && errors.phone ? <p className="nr-err">{errors.phone}</p> : null}
      </div>

      <div>
        <label className="nr-label">Email</label>
        <input
          type="email"
          className={cx("nr-input nr-focus", touched.email && errors.email && "is-bad")}
          value={values.email}
          placeholder="you@email.com"
          onChange={(e) => field("email", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        />
        {touched.email && errors.email ? <p className="nr-err">{errors.email}</p> : null}
      </div>

      <div>
        <label className="nr-label">Special occasion (optional)</label>
        <div className="nr-pills">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              type="button"
              aria-pressed={values.occasion === o}
              className={cx("nr-pill nr-focus", values.occasion === o && "is-on")}
              onClick={() => field("occasion", o)}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="nr-label">Special request (optional)</label>
        <textarea
          className="nr-input nr-input--area nr-focus"
          value={values.notes}
          placeholder="Dietary needs, seating preference, anything we should know."
          onChange={(e) => field("notes", e.target.value)}
        />
      </div>

      <button type="submit" className="nr-btn nr-btn--full nr-focus">
        Review Reservation
      </button>
    </form>
  );
}
