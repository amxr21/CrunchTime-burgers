import type { Metadata } from "next";
import MenuSectionBlock from "@/components/menu/MenuSectionBlock";
import CtaBanner from "@/components/ui/CtaBanner";
import { menuSections } from "@/lib/data/menu";

export const metadata: Metadata = {
  title: "Menu | CRUNCHTIME",
};

export default function MenuPage() {
  return (
    <>
      {menuSections.map((section) => (
        <MenuSectionBlock key={section.id} section={section} />
      ))}

      <CtaBanner
        title="Can't find what you're craving?"
        description="Build your own burger from scratch — pick your patty, toppings, and sauces."
        href="/make-it"
        cta="Make It Yourself"
        accent="yellow"
      />
    </>
  );
}
