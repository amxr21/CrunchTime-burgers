"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/assets";
import { DURATION, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TaglineBanner() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-scribble]", { clipPath: "inset(0 0% 0 0)" });
        return;
      }

      gsap.fromTo(
        "[data-scribble]",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: DURATION.reveal * 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: wrapperRef },
  );

  return (
    <Section id="tagline" className="relative overflow-hidden my-40">
      <div ref={wrapperRef} className="contents">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Image
            data-scribble
            src={IMAGES.scratches}
            alt=""
            width={2186}
            height={531}
            className="w-full max-w-4xl opacity-80"
          />
        </div>

        <Reveal
          className="relative col-span-12 text-center font-display text-3xl uppercase tracking-wide sm:text-5xl"
          delay={0.6}
        >
          Simple, Memorable, and Emphasizes Consistency Across All 100+
          Locations.
        </Reveal>
      </div>
    </Section>
  );
}
