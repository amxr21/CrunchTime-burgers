"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useToast } from "@/lib/toast/ToastContext";
import { ICONS } from "@/lib/assets";
import { DURATION, EASE_OUT, prefersReducedMotion } from "@/lib/motion";

function ToastCard({ id, title, description, image }: { id: number; title: string; description?: string; image?: string }) {
  const { dismissToast } = useToast();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion()) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: -16, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: DURATION.base, ease: "back.out(2)" },
    );
  }, []);

  return (
    <div
      ref={ref}
      role="status"
      className="pointer-events-auto flex items-center gap-3 rounded-xl bg-brand-black/95 p-3 pr-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] ring-1 ring-brand-white/10 backdrop-blur-sm"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-green/20 text-brand-green">
        <Image src={ICONS.cartBag} alt="" width={20} height={18} />
      </div>
      <div className="flex flex-col">
        <p className="font-display text-xl uppercase leading-6 tracking-wide">{title}</p>
        {description && <p className="text-base text-brand-white/70">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => dismissToast(id)}
        aria-label="Dismiss notification"
        className="ml-2 shrink-0 text-xl text-brand-white/50 transition-colors duration-300 ease-out hover:text-brand-red"
      >
        ✕
      </button>
    </div>
  );
}

export default function ToastViewport() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-20 z-100 flex flex-col items-center gap-2 px-4 sm:items-end sm:px-8"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} {...toast} />
      ))}
    </div>
  );
}
