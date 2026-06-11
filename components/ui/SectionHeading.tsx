import { type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

type SectionHeadingProps = {
  children: ReactNode;
  description?: ReactNode;
  className?: string;
};

export default function SectionHeading({
  children,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal className={`col-span-12 ${className}`}>
      <h2 className="font-display text-4xl font-semibold uppercase tracking- sm:text-5xl">
        {children}
      </h2>
      {description ? (
        <p className="mt-2 leading-6 text-justify text-brand-white/70 font-light sm:text-2xl">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
