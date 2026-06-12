import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { categories } from "@/lib/data/home";

const accentGradients: Record<string, string> = {
  red: "from-[#1c1c1c] via-brand-red/70 to-transparent",
  yellow: "from-[#1c1c1c] via-brand-yellow/70 to-transparent",
  green: "from-[#1c1c1c] via-brand-green/70 to-transparent",
  blue: "from-[#1c1c1c] via-blue-700/70 to-transparent",
};

export default function Categories() {
  return (
    <Section id="categories">
      <SectionHeading>What&apos;s Your Craving?</SectionHeading>

      <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" delay={0.15} stagger>
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group relative flex aspect-3/4 flex-col justify-end overflow-hidden h-72 w-full transition-transform duration-500 ease-out will-change-transform hover:-translate-y-2 sm:h-144 lg:h-176"
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div
              className={`pointer-events-none absolute inset-0 bg-linear-to-tr ${accentGradients[category.accent]}`}
            />
            <div className="pointer-events-none absolute inset-0 bg-black/40 transition-colors duration-500 ease-out group-hover:bg-black/60" />
            <div className="relative z-10 p-4">
              <h3 className="font-display text-4xl font-normal uppercase leading-9 sm:text-6xl sm:leading-12">
                {category.title}
              </h3>
              <p className="mt-1 text-lg font-thin uppercase leading-6 tracking-wide sm:text-2xl sm:text-justify sm:leading-7">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </Reveal>
    </Section>
  );
}
