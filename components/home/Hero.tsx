"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Container from "@/components/layout/Container";
import { IMAGES } from "@/lib/assets";
import { EASE_OUT, EASE_SOFT, prefersReducedMotion } from "@/lib/motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(
          [
            "[data-hero-burger]",
            "[data-hero-heading-line]",
            "[data-hero-badge]",
            "[data-hero-bar]",
          ],
          { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });

      tl.fromTo(
        "[data-hero-burger]",
        { opacity: 0, scale: 0.8, rotate: -8 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.9 },
      )
        .fromTo(
          "[data-hero-heading-line]",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.5",
        )
        .fromTo(
          "[data-hero-badge]",
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
          "-=0.3",
        )
        .fromTo(
          "[data-hero-bar]",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2",
        );

      // Continuous gentle float on the burger image.
      gsap.to("[data-hero-burger]", {
        y: 14,
        duration: 2.6,
        ease: EASE_SOFT,
        yoyo: true,
        repeat: -1,
        delay: 0.9,
      });

      // Subtle scroll-linked drift on the background watermark.
      gsap.to("[data-hero-watermark]", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-brand-white flex flex-col items-center"
    >
      <Image
        data-hero-watermark
        src={IMAGES.typography}
        alt=""
        fill
        aria-hidden
        className=" absolute top-0 left-0"
      />

      <Container className="flex w-full flex-col items-center sm:w-fit sm:flex-row sm:items-center">

        <div className="relative flex w-full max-w-xs sm:w-fit sm:h-180 sm:max-w-none">
          <Image
            data-hero-burger
            src={IMAGES.heroBurger}
            alt="Crunchtime signature burger"
            width={324}
            height={2}
            className="h-auto w-full max-w-md [mask-image:radial-gradient(circle,black_45%,transparent_85%)]"
          />
        </div>


        <div className="relative w-full sm:w-80">
          <h1 className="font-display text-7xl font-bold uppercase leading-tight overflow-hidden text-center sm:text-left sm:text-[10.5rem] sm:leading-32">
            <span data-hero-heading-line className="block">Every Bite.</span>
            <span data-hero-heading-line className="block">Every Time</span>
          </h1>

          <span data-hero-badge className="mx-auto mt-4 block w-fit bg-brand-red px-4 py-1 font-display text-2xl uppercase tracking-wide sm:absolute sm:top-[42%] sm:left-10 sm:mt-0 sm:py-0 sm:text-3xl sm:leading-12">
            Over 100 Locations
          </span>
        </div>
      </Container>

      <div data-hero-bar className="border-t z-50 bg-brand-black/70 mt-8 w-full border-brand-white/10 sm:-mt-36">
        <Container className="flex flex-col justify-between gap-y-2 py-4 z-50 sm:flex-row sm:items-center">
          <p className="text-center text-xl uppercase font-light tracking-wide text-brand-white sm:text-left sm:text-2xl">
            Find an offer in: Business Park Drive, Suite 420 Atlanta, GA
          </p>
          <p className="text-center font-display text-xl font-light tracking-wide sm:text-right sm:text-2xl">
            (404) 555-CRUNCH (27862)
          </p>
        </Container>
      </div>
    </section>
  );
}
