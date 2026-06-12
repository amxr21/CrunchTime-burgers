"use client";

import { useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ICONS, IMAGES } from "@/lib/assets";
import { prefersReducedMotion } from "@/lib/motion";

const EMOJIS = [IMAGES.emojis.chicken, IMAGES.emojis.fries, IMAGES.emojis.drink, IMAGES.emojis.wrap];

export default function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const emojiRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isFirstRun = useRef(true);

  useGSAP(
    () => {
      if (!overlayRef.current || !logoRef.current) return;

      const emojis = emojiRefs.current.filter(Boolean) as HTMLDivElement[];

      if (prefersReducedMotion()) {
        gsap.set(overlayRef.current, { autoAlpha: 0 });
        isFirstRun.current = false;
        return;
      }

      if (isFirstRun.current) {
        // The overlay is visible by default (covers the initial page load/refresh).
        gsap.set(logoRef.current, { scale: 0.4, opacity: 0, rotate: -15 });
        gsap.set(emojis, { scale: 0.3, opacity: 0, y: 12 });
      } else {
        gsap.set(overlayRef.current, { autoAlpha: 1 });
        gsap.set(logoRef.current, { scale: 0.4, opacity: 0, rotate: -15 });
        gsap.set(emojis, { scale: 0.3, opacity: 0, y: 12 });
      }

      isFirstRun.current = false;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.01 })
        .to(logoRef.current, { scale: 1, opacity: 1, rotate: 0, duration: 0.45, ease: "elastic.out(1, 0.6)" })
        .to(
          emojis,
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(2.5)", stagger: 0.15 },
          "-=0.2",
        )
        .to(emojis, { scale: 0.3, opacity: 0, y: 12, duration: 0.2, stagger: 0.06 }, "+=0.2")
        .to(logoRef.current, { scale: 0.4, opacity: 0, rotate: 15, duration: 0.3, ease: "power2.in" }, "<")
        .to(overlayRef.current, { autoAlpha: 0, duration: 0.35 }, "-=0.15");
    },
    { dependencies: [pathname] },
  );

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10000 flex flex-col items-center justify-center gap-6 overflow-hidden bg-brand-black/60 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 sm:gap-6">
        {EMOJIS.map((src, index) => (
          <div
            key={src}
            ref={(el) => {
              emojiRefs.current[index] = el;
            }}
            className="relative h-10 w-10 sm:h-14 sm:w-14"
          >
            <Image src={src} alt="" fill className="object-contain" />
          </div>
        ))}
      </div>

      <div ref={logoRef} className="relative">
        <Image src={ICONS.logo} alt="" width={200} height={36} className="h-auto w-40 sm:w-56" priority />
      </div>
    </div>
  );
}
