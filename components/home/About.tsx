import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { aboutImages } from "@/lib/data/home";

export default function About() {
  return (
    <Section id="about">
      <SectionHeading
        description="Born from a simple belief: great food shouldn't be complicated. What started as one location has grown to over 100 restaurants across the country, but our commitment remains the same. We source quality ingredients, prepare everything fresh, and serve it fast. No shortcuts. No compromises. Just the food you want, when you want it."
      >
        About Us, Crunch Time!
      </SectionHeading>

      <Reveal className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-0" delay={0.15}>
        {aboutImages.map((image, index) => (
          <div key={image} className="relative aspect-square overflow-hidden sm:aspect-6/3">
            <Image
              src={image}
              alt={`Crunchtime kitchen and team photo ${index + 1}`}
              fill
              sizes="(min-width: 640px) 25vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
