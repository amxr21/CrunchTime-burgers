import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageBanner from "@/components/ui/PageBanner";
import Reveal from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "News | CRUNCHTIME",
};

const news = [
  {
    date: "June 2026",
    title: "New Branch Opening Soon",
    description:
      "We're expanding the Crunchtime family with a brand new branch — stay tuned for the announcement.",
  },
  {
    date: "May 2026",
    title: "Build Your Perfect Burger",
    description:
      "Our new Make It builder is live — customize every layer of your burger and order it your way.",
  },
  {
    date: "April 2026",
    title: "Crunchtime Goes Online",
    description:
      "Browse the full menu, find your nearest branch, and order ahead for pickup from our new site.",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageBanner image={IMAGES.findUsBanner} title="News" subtitle="What's Cooking at Crunchtime" />

      <Section className="gap-y-8">
        <Reveal className="col-span-12 mx-auto flex max-w-3xl flex-col gap-6" stagger>
          {news.map((item) => (
            <div key={item.title} className="rounded-2xl bg-brand-white/5 p-6">
              <p className="text-sm uppercase tracking-wide text-brand-yellow">{item.date}</p>
              <h2 className="mt-1 font-display text-3xl uppercase tracking-wide sm:text-4xl">
                {item.title}
              </h2>
              <p className="mt-3 text-lg text-brand-white/70 sm:text-xl">{item.description}</p>
            </div>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
