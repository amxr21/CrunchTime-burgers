import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { whyFeatures } from "@/lib/data/home";
import { IMAGES } from "@/lib/assets";

export default function WhyCrunchtime() {
  return (
    <Section id="why-crunchtime" className="relative overflow-hidden">
      <Image
        src={IMAGES.typography2}
        alt=""
        fill
        aria-hidden
        className=" absolute top-0 left-0"
      />

      <SectionHeading>Why Crunchtime</SectionHeading>

      <Reveal className="col-span-12 grid grid-cols-2 gap-gutter sm:grid-cols-4" delay={0.15} stagger>
        {whyFeatures.map((feature) => (
          <div
            key={feature.title}
            className="group flex flex-col gap-5 items-center py-8 text-center"
          >
            <Image
              src={feature.icon}
              alt=""
              width={48}
              height={48}
              className="w-15 h-15 transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="text">
              <h3 className="font-display text-4xl uppercase tracking-wide">
                {feature.title}
              </h3>
              <p className="text-xl text-brand-white/70 -mt-1">{feature.description}</p>

            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
