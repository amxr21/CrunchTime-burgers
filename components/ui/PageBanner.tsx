import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

type PageBannerProps = {
  image: string;
  title: string;
  subtitle: string;
};

export default function PageBanner({ image, title, subtitle }: PageBannerProps) {
  return (
    <div className="relative h-64 w-full overflow-hidden sm:h-64">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-brand-black/60" />
      <div className="relative flex h-full flex-col items-center justify-center text-center text-brand-white">
        <Reveal y={24}>
          <h1 className="font-display text-6xl uppercase tracking-wide sm:text-8xl font-semibold">
            {title}
          </h1>
          <p className="mt-2 font-display text-lg uppercase tracking-wide text-brand-white/80 sm:text-3xl">
            {subtitle}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
