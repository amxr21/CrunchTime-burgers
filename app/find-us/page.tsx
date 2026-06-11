import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageBanner from "@/components/ui/PageBanner";
import Reveal from "@/components/ui/Reveal";
import LocationCard from "@/components/find-us/LocationCard";
import BranchMap from "@/components/find-us/BranchMap";
import WorkingHours from "@/components/find-us/WorkingHours";
import { IMAGES } from "@/lib/assets";
import { locations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Find Us | CRUNCHTIME",
};

export default function FindUsPage() {
  return (
    <>
      <PageBanner
        image={IMAGES.findUsBanner}
        title="Find Us"
        subtitle="Find Your Crunchtime"
      />

      <Section className="gap-y-10">
        <Reveal className="col-span-12 grid grid-cols-1 gap-x-gutter gap-y-8 sm:grid-cols-2 lg:grid-cols-12">
          {locations.map((location, index) => (
            <LocationCard key={index} {...location} />
          ))}
        </Reveal>

        <Reveal className="col-span-12" delay={0.15}>
          <BranchMap />
        </Reveal>
      </Section>

      <PageBanner
        image={IMAGES.workingHoursBanner}
        title="Working Hours"
        subtitle="Day and Night Preparing Your Favorite Meal"
      />

      <Section>
        <Reveal className="col-span-12">
          <WorkingHours />
        </Reveal>
      </Section>
    </>
  );
}
