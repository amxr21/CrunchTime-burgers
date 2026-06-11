import { type ReactNode } from "react";
import Container from "@/components/layout/Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
};

export default function Section({
  children,
  className = "",
  containerClassName = "gap-y-8",
  id,
}: SectionProps) {
  return (
    <section id={id} className={` py-16 text-brand-white ${className}`}>
      <Container className={`flex flex-col gap-2 ${containerClassName}`}>{children}</Container>
    </section>
  );
}
