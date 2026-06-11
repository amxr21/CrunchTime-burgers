import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

type CtaBannerProps = {
  title: string;
  description: string;
  href: string;
  cta: string;
  accent?: "red" | "yellow";
};

export default function CtaBanner({ title, description, href, cta, accent = "yellow" }: CtaBannerProps) {
  const accentClass =
    accent === "yellow"
      ? "bg-brand-white/5 text-brand-white ring-1 ring-brand-yellow/40"
      : "bg-brand-red text-brand-white";
  const headingAccentClass = accent === "yellow" ? "text-brand-yellow" : "";

  return (
    <Section containerClassName="gap-y-0">
      <Reveal className="col-span-12">
        <div
          className={`flex flex-col items-center gap-4 rounded-2xl px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left ${accentClass}`}
        >
          <div>
            <h2 className={`font-display text-3xl uppercase tracking-wide sm:text-4xl ${headingAccentClass}`}>
              {title}
            </h2>
            <p className="mt-1 text-lg text-brand-white/70 sm:text-xl">{description}</p>
          </div>
          <Button href={href} size="lg">
            {cta}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
