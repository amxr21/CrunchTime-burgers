"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "@/components/ui/Button";
import type { Branch } from "@/lib/data/branches";
import { DURATION, EASE_OUT, prefersReducedMotion } from "@/lib/motion";
import { maskPhone } from "@/lib/order/sanitize";

type OrderSuccessProps = {
  reference: string;
  branch: Branch;
  phone: string;
  onPlaceAnother: () => void;
};

export default function OrderSuccess({ reference, branch, phone, onPlaceAnother }: OrderSuccessProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion()) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: DURATION.reveal, ease: EASE_OUT },
    );
  }, []);

  return (
    <div ref={ref} className="col-span-12 mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-12 text-center sm:py-16">
      <h1 className="font-display text-5xl uppercase tracking-wide text-brand-yellow sm:text-6xl">Order sent!</h1>
      <p className="text-xl sm:text-2xl">
        Reference: <span className="font-display text-2xl sm:text-3xl">{reference}</span>
      </p>

      <div className="w-full rounded-2xl bg-brand-white/5 p-4 text-left text-lg sm:p-6 sm:text-xl">
        <p>
          <span className="text-brand-white/70">Pickup branch:</span> {branch.city}
        </p>
        <p className="mt-1 text-brand-white/70">{branch.address}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-brand-yellow underline-offset-2 transition-colors duration-300 ease-out hover:underline"
        >
          Open in Maps
        </a>
        <p className="mt-3">
          <span className="text-brand-white/70">Estimated pickup:</span> 20-30 minutes
        </p>
        <p className="mt-1">
          <span className="text-brand-white/70">We&apos;ll text:</span> {maskPhone(phone)}
        </p>
        <p className="mt-3 text-brand-yellow">Pay on pickup — no online payment was taken.</p>
      </div>

      <Button onClick={onPlaceAnother} size="lg">
        Place another order
      </Button>
    </div>
  );
}
