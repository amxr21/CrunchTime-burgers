"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PriceTag from "@/components/ui/PriceTag";
import { IMAGES } from "@/lib/assets";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MealCardProps = {
  name: string;
  description: string;
  price: string;
  image: string;
  href?: string;
  top?: boolean;
  badge?: string;
  accent?: keyof typeof IMAGES.elementPatterns;
  onAddToCart?: () => void;
};

export default function MealCard({
  name,
  description,
  price,
  image,
  href,
  top,
  badge,
  accent = "red",
  onAddToCart,
}: MealCardProps) {
  const ribbonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ribbonRef.current || !top) return;

      if (prefersReducedMotion()) {
        gsap.set(ribbonRef.current, { opacity: 1, scale: 1 });
        return;
      }

      gsap.fromTo(
        ribbonRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: ribbonRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { dependencies: [top] },
  );

  const content = (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-brand-black p-2 transition-transform duration-500 ease-out will-change-transform hover:-translate-y-1 sm:p-3">
      <div className="relative bg-brand-white/5 h-full rounded-2xl p-3 overflow-hidden sm:p-6">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${IMAGES.elementPatterns[accent]})` }}
        />
        <div className="relative mx-auto aspect-square w-4/5 ">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 25% 50%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 60%)",
              WebkitMaskImage: `url(${image})`,
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: `url(${image})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />
          {badge && (
            <span className="absolute right-0 top-0 z-10 bg-brand-red px-2 py-0.5 font-display text-sm uppercase tracking-wide text-brand-white">
              {badge}
            </span>
          )}
          {top && (
            <div ref={ribbonRef} className="absolute bottom-0 left-0 z-10">
              <Image
                src={IMAGES.topBadge}
                alt="Top pick"
                width={62}
                height={98}
                className="h-16 w-auto"
              />
            </div>
          )}
          <PriceTag price={price} />
        </div>
        <div className="relative mt-2 flex items-start justify-between gap-2 sm:mt-4">
          <h3 className="font-display text-2xl uppercase leading-7 tracking-wide w-4/5 sm:text-4xl sm:leading-8">{name}</h3>
        </div>
        <p className="mt-1 text-base uppercase leading-5 tracking-wide text-brand-white/70 sm:mt-2 sm:text-lg">{description}</p>

        {onAddToCart && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart();
            }}
            className="relative mt-3 w-full rounded-md bg-brand-red py-2 font-display text-lg uppercase tracking-wide transition-colors duration-300 ease-out hover:bg-brand-yellow hover:text-brand-black sm:text-xl"
          >
            Add to Order
          </button>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
