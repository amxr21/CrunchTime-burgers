import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageBanner from "@/components/ui/PageBanner";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/assets";
import { siteConfig, socialLinks } from "@/lib/site-config";
import { branches } from "@/lib/data/branches";

export const metadata: Metadata = {
  title: "Info | CRUNCHTIME",
};

export default function InfoPage() {
  const mainPhone = branches[0]?.phone ?? "";

  return (
    <>
      <PageBanner image={IMAGES.findUsBanner} title="Info" subtitle="Get in Touch" />

      <Section className="gap-y-10">
        <Reveal className="col-span-12 mx-auto max-w-2xl text-center">
          <p className="text-xl leading-relaxed text-brand-white/70 sm:text-2xl">
            {siteConfig.description}
          </p>
        </Reveal>

        <Reveal className="col-span-12 grid grid-cols-1 gap-gutter sm:grid-cols-3" stagger>
          <div className="rounded-2xl bg-brand-white/5 p-6 text-center">
            <h3 className="font-display text-2xl uppercase tracking-wide">Call Us</h3>
            <p className="mt-2 text-lg text-brand-white/70">{mainPhone}</p>
          </div>

          <div className="rounded-2xl bg-brand-white/5 p-6 text-center">
            <h3 className="font-display text-2xl uppercase tracking-wide">Follow Us</h3>
            <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {socialLinks.map((social) => (
                <li key={social.label} className="text-lg text-brand-white/70">
                  {social.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-brand-white/5 p-6 text-center">
            <h3 className="font-display text-2xl uppercase tracking-wide">Visit Us</h3>
            <p className="mt-2 text-lg text-brand-white/70">{branches.length} branches nationwide</p>
          </div>
        </Reveal>

        <Reveal className="col-span-12 flex justify-center">
          <Button href="/find-us" size="lg">
            Find a Branch
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
