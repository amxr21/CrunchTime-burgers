"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import type { CartItem } from "@/lib/cart/CartContext";
import { useCart } from "@/lib/cart/CartContext";
import { DURATION, EASE_OUT, prefersReducedMotion } from "@/lib/motion";

type CartItemRowProps = {
  item: CartItem;
};

export default function CartItemRow({ item }: CartItemRowProps) {
  const { setQty, removeItem } = useCart();
  const rowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!rowRef.current || prefersReducedMotion()) return;

    gsap.fromTo(
      rowRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: DURATION.base, ease: EASE_OUT },
    );
  }, []);

  function handleRemove() {
    if (!rowRef.current || prefersReducedMotion()) {
      removeItem(item.id);
      return;
    }

    gsap.to(rowRef.current, {
      opacity: 0,
      x: -24,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: DURATION.fast,
      ease: EASE_OUT,
      onComplete: () => removeItem(item.id),
    });
  }

  function handleSetQty(qty: number) {
    if (qty <= 0) {
      handleRemove();
      return;
    }
    setQty(item.id, qty);
  }

  return (
    <div
      ref={rowRef}
      className="flex flex-col gap-3 border-b border-brand-white/10 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-brand-white/5 sm:h-20 sm:w-20">
        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="font-display text-2xl uppercase leading-7 tracking-wide sm:text-3xl">{item.name}</h3>
        <p className="text-base text-brand-white/70 sm:text-lg">${item.price.toFixed(2)} each</p>
      </div>

      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSetQty(item.qty - 1)}
            aria-label={`Decrease quantity of ${item.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-white/10 font-display text-2xl transition-colors duration-300 ease-out hover:bg-brand-red"
          >
            −
          </button>
          <span className="w-6 text-center font-display text-2xl" aria-live="polite">
            {item.qty}
          </span>
          <button
            type="button"
            onClick={() => handleSetQty(item.qty + 1)}
            aria-label={`Increase quantity of ${item.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-white/10 font-display text-2xl transition-colors duration-300 ease-out hover:bg-brand-red"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <span className="font-display text-2xl">${(item.price * item.qty).toFixed(2)}</span>
          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from order`}
            className="shrink-0 text-2xl text-brand-white/50 transition-colors duration-300 ease-out hover:text-brand-red"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="hidden w-24 shrink-0 text-right font-display text-3xl sm:block">
        ${(item.price * item.qty).toFixed(2)}
      </div>

      <button
        type="button"
        onClick={handleRemove}
        aria-label={`Remove ${item.name} from order`}
        className="hidden shrink-0 text-2xl text-brand-white/50 transition-colors duration-300 ease-out hover:text-brand-red sm:block"
      >
        ✕
      </button>
    </div>
  );
}
