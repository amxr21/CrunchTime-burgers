"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DURATION, EASE_OUT, STAGGER, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate direct children individually with a stagger instead of the wrapper as one block. */
  stagger?: boolean | number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      if (prefersReducedMotion()) {
        gsap.set(stagger ? ref.current.children : ref.current, { opacity: 1, y: 0 });
        return;
      }

      const targets = stagger ? ref.current.children : ref.current;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.reveal,
          delay,
          ease: EASE_OUT,
          stagger: stagger === true ? STAGGER.base : stagger || 0,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: ref, dependencies: [stagger] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
