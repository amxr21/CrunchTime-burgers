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
        { opacity: 0, x: "60%" },
        { opacity: 1, x: "0%", duration: 1 },
      )
        .fromTo(
          "[data-hero-heading-line]",
          { opacity: 0, x: "-60%" },
          { opacity: 1, x: "0%", duration: 1, stagger: 0.12 },
          "<",
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

      <Container className="flex w-full flex-row items-center sm:w-fit sm:items-center">

        <div className="sm:m-0 relative flex w-7/12 max-w-xs shrink-0 sm:w-fit sm:h-180 sm:max-w-none -mr-10">
          <Image
            data-hero-burger
            src={IMAGES.heroBurger}
            alt="Crunchtime signature burger"
            width={324}
            height={2}
            className="h-auto w-full max-w-md [mask-image:radial-gradient(circle,black_45%,transparent_85%)]"
          />
        </div>


        <div className="relative w-1/2 sm:w-80 sm:m-0 mt-8">
          <h1 className="font-display text-6xl font-bold uppercase leading-none overflow-hidden text-left sm:text-left sm:text-[10.5rem] sm:leading-32">
            <span data-hero-heading-line className="block">Every Bite.</span>
            <span data-hero-heading-line className="block">Every Time</span>
          </h1>

          <span data-hero-badge className="mt-4 flex w-fit items-center gap-1.5 bg-brand-red px-2 py-1 font-display text-sm uppercase tracking-wide sm:absolute sm:top-[42%] sm:left-10 sm:mt-0 sm:gap-2 sm:px-4 sm:py-0 sm:text-3xl sm:leading-12">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 shrink-0 sm:h-8 sm:w-8"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
            Over 100 Locations
          </span>
        </div>
      </Container>

      <div data-hero-bar className="border-t z-50 bg-brand-black/70 mt-8 w-full border-brand-white/10 sm:-mt-36">
        <Container className="flex flex-col justify-between gap-y-2 py-4 z-50 sm:flex-row sm:items-center">
          <p className="text-left text-base uppercase font-light tracking-wide text-brand-white sm:text-2xl">
            Find an offer in: Business Park Drive, Suite 420 Atlanta, GA
          </p>
          <p className="text-left font-display text-base font-light tracking-wide sm:text-right sm:text-2xl">
            (404) 555-CRUNCH (27862)
          </p>
        </Container>
      </div>
    </section>
  );
}
