"use client";

import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import MealCard from "@/components/ui/MealCard";
import { useCart } from "@/lib/cart/CartContext";
import { useToast } from "@/lib/toast/ToastContext";
import type { MenuSection } from "@/lib/data/menu";

const accentClasses: Record<MenuSection["accent"], string> = {
  red: "bg-brand-red",
  yellow: "bg-brand-yellow text-brand-black",
  green: "bg-brand-green",
  blue: "bg-blue-700",
};

export default function MenuSectionBlock({ section }: { section: MenuSection }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  return (
    <Section id={section.id} className="relative overflow-hidden">
      <Image
        src={section.typography}
        alt=""
        width={2880}
        height={538}
        aria-hidden
        className="pointer-events-none absolute top-10 left-0 w-full h-auto opacity-10 invert"
      />

      <SectionHeading className="text-center">
        <span className={`inline-block px-4 py-1 pt-3 text-brand-white ${accentClasses[section.accent]}`}>
          {section.title}
        </span>
        <span className="mt-2 block text-2xl font-light normal-case tracking-normal text-brand-white/70">
          {section.description}
        </span>
      </SectionHeading>

      <Reveal className="col-span-12 grid grid-cols-2 gap-gutter sm:grid-cols-4" delay={0.15}>
        {section.items.map((item, index) => (
          <MealCard
            key={`${item.name}-${index}`}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            accent={section.accent}
            onAddToCart={() => {
              addItem({ id: item.id, name: item.name, price: item.priceValue, image: item.image });
              showToast({
                title: "Added to order",
                description: item.name,
                image: item.image,
              });
            }}
          />
        ))}
      </Reveal>
    </Section>
  );
}
