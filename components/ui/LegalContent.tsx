import Reveal from "@/components/ui/Reveal";

export type LegalBlock = {
  heading: string;
  body: string[];
};

type LegalContentProps = {
  intro?: string;
  blocks: LegalBlock[];
};

export default function LegalContent({ intro, blocks }: LegalContentProps) {
  return (
    <Reveal className="col-span-12 mx-auto flex max-w-3xl flex-col gap-8" stagger>
      {intro ? (
        <p className="text-xl leading-relaxed text-brand-white/70 sm:text-2xl">{intro}</p>
      ) : null}

      {blocks.map((block) => (
        <div key={block.heading}>
          <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
            {block.heading}
          </h2>
          {block.body.map((paragraph, index) => (
            <p key={index} className="mt-3 text-lg leading-relaxed text-brand-white/70 sm:text-xl">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </Reveal>
  );
}
