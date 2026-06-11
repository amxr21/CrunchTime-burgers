import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageBanner from "@/components/ui/PageBanner";
import CtaBanner from "@/components/ui/CtaBanner";
import BurgerBuilder from "@/components/make-it/BurgerBuilder";
import { IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Make It | CRUNCHTIME",
};

export default function MakeItPage() {
  return (
    <>
      <PageBanner
        image={IMAGES.makeBurgerBanner}
        title="Build Your Perfect Burger"
        subtitle="Customize Your Own Burger and Order It!"
      />

      <Section>
        <BurgerBuilder />
      </Section>

      <CtaBanner
        title="Ready to pick it up?"
        description="Find your nearest Crunchtime branch and we'll have it ready when you arrive."
        href="/find-us"
        cta="Find a Branch"
        accent="red"
      />
    </>
  );
}
