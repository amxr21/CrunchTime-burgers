"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AsYouType, isValidPhoneNumber, type CountryCode } from "libphonenumber-js";
import { DURATION, EASE_OUT, prefersReducedMotion } from "@/lib/motion";

export type PhoneModalSubmitData = {
  name: string;
  phone: string;
  note: string;
  /** Honeypot field — must remain empty. */
  company: string;
  /** Milliseconds since the form mounted, used as a bot time-trap. */
  elapsedMs: number;
};

type PhoneModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PhoneModalSubmitData) => void;
  submitting?: boolean;
};

const COUNTRIES: { code: CountryCode; label: string }[] = [
  { code: "AE", label: "UAE (+971)" },
  { code: "US", label: "United States (+1)" },
];

export default function PhoneModal({ open, onClose, onSubmit, submitting }: PhoneModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const mountedAt = useRef<number>(0);

  const [visible, setVisible] = useState(open);
  const [prevOpen, setPrevOpen] = useState(open);
  const [name, setName] = useState("");
  const [country, setCountry] = useState<CountryCode>("AE");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; note?: string }>({});

  useEffect(() => {
    if (!open) return;

    mountedAt.current = Date.now();
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setVisible(true);
  }

  useEffect(() => {
    if (open || !visible) return;

    if (!overlayRef.current || !dialogRef.current || prefersReducedMotion()) {
      setVisible(false);
      return;
    }

    const overlay = overlayRef.current;
    const dialog = dialogRef.current;

    gsap.to(dialog, { opacity: 0, y: 24, scale: 0.97, duration: DURATION.fast, ease: EASE_OUT });
    gsap.to(overlay, {
      opacity: 0,
      duration: DURATION.fast,
      onComplete: () => setVisible(false),
    });
  }, [open, visible]);

  useGSAP(
    () => {
      if (!visible || !open || !overlayRef.current || !dialogRef.current) return;

      const firstInput = dialogRef.current.querySelector<HTMLElement>("input, select, textarea, button");
      firstInput?.focus();

      if (prefersReducedMotion()) {
        gsap.set(overlayRef.current, { opacity: 1 });
        gsap.set(dialogRef.current, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: DURATION.fast });
      gsap.fromTo(
        dialogRef.current,
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: DURATION.base, ease: EASE_OUT },
      );
    },
    { dependencies: [visible, open] },
  );

  if (!visible) return null;

  function handlePhoneChange(value: string) {
    const formatter = new AsYouType(country);
    setPhone(formatter.input(value));
  }

  function validate() {
    const nextErrors: typeof errors = {};

    if (!name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!isValidPhoneNumber(phone, country)) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (note.length > 200) {
      nextErrors.note = "Note must be 200 characters or fewer.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: name.trim(),
      phone,
      note: note.trim(),
      company,
      elapsedMs: Date.now() - mountedAt.current,
    });
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-4"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="phone-modal-title"
        className="relative w-full max-w-md rounded-2xl bg-brand-black p-6 text-brand-white shadow-xl"
      >
        <h2 id="phone-modal-title" className="font-display text-4xl uppercase tracking-wide">
          Contact details
        </h2>
        <p className="mt-1 text-lg text-brand-white/70">
          We&apos;ll use this to confirm your order with the branch.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4" noValidate>
          {/* Honeypot field — hidden from real users, bots tend to fill every field. */}
          <div className="absolute -left-2499.75" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-lg uppercase tracking-wide text-brand-white/70">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="rounded-md border border-brand-white/20 bg-brand-black px-4 py-2 text-xl focus:border-brand-yellow focus:outline-none"
            />
            {errors.name && (
              <p id="name-error" role="alert" className="text-base text-brand-red">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-lg uppercase tracking-wide text-brand-white/70">
              Phone number
            </label>
            <div className="flex gap-2">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryCode)}
                aria-label="Country code"
                className="rounded-md border border-brand-white/20 bg-brand-black px-2 py-2 text-lg focus:border-brand-yellow focus:outline-none"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="flex-1 rounded-md border border-brand-white/20 bg-brand-black px-4 py-2 text-xl focus:border-brand-yellow focus:outline-none"
              />
            </div>
            {errors.phone && (
              <p id="phone-error" role="alert" className="text-base text-brand-red">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="note" className="text-lg uppercase tracking-wide text-brand-white/70">
              Note (optional)
            </label>
            <textarea
              id="note"
              maxLength={200}
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              aria-describedby={errors.note ? "note-error" : undefined}
              className="rounded-md border border-brand-white/20 bg-brand-black px-4 py-2 text-lg focus:border-brand-yellow focus:outline-none"
            />
            {errors.note && (
              <p id="note-error" role="alert" className="text-base text-brand-red">
                {errors.note}
              </p>
            )}
          </div>

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md bg-brand-white/10 py-2 font-display text-xl uppercase tracking-wide transition-all duration-200 ease-out hover:bg-brand-white/20 active:scale-95 active:bg-brand-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-md bg-brand-red py-2 font-display text-xl uppercase tracking-wide transition-all duration-200 ease-out hover:bg-brand-yellow hover:text-brand-black active:scale-95 active:bg-brand-black active:text-brand-red disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send order"}
            </button>
          </div>
        </form>

        {submitting && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-brand-black/90">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand-white/20 border-t-brand-red" />
            <p className="font-display text-xl uppercase tracking-wide text-brand-white">Sending order…</p>
          </div>
        )}
      </div>
    </div>
  );
}
