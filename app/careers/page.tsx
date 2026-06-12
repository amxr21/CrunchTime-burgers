import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageBanner from "@/components/ui/PageBanner";
import CtaBanner from "@/components/ui/CtaBanner";
import Reveal from "@/components/ui/Reveal";
import CareersApply from "@/components/careers/CareersApply";
import { IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Careers | CRUNCHTIME",
};

const roles = [
  {
    title: "Crew Member",
    type: "Full-time / Part-time",
    description:
      "Join the kitchen and front-of-house team — prep, grill, and serve up the Crunchtime experience.",
  },
  {
    title: "Shift Supervisor",
    type: "Full-time",
    description:
      "Lead a team during your shift, keep things running smoothly, and make sure every order is fire.",
  },
  {
    title: "Branch Manager",
    type: "Full-time",
    description:
      "Run the day-to-day of a Crunchtime branch — staffing, operations, and delivering on our standards.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageBanner
        image={IMAGES.findUsBanner}
        title="Careers"
        subtitle="Join the Crunchtime Family"
      />

      <Section className="gap-y-10">
        <Reveal className="col-span-12 mx-auto max-w-2xl text-center">
          <p className="text-xl leading-relaxed text-brand-white/70 sm:text-2xl">
            We&apos;re always looking for hardworking, friendly people to join our crew. If you love
            food, fast pace, and being part of a family, we&apos;d love to hear from you.
          </p>
        </Reveal>

        <CareersApply roles={roles} />
      </Section>

      <CtaBanner
        title="Ready to apply?"
        description="Drop in to your nearest branch or send us a message and we'll get back to you."
        href="/find-us"
        cta="Find a Branch"
        accent="red"
      />
    </>
  );
}
