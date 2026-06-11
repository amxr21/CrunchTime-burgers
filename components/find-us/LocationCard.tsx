import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ICONS, IMAGES } from "@/lib/assets";
import type { LocationItem } from "@/lib/data/locations";

export default function LocationCard({ street, city, address, phone }: LocationItem) {
  return (
    <div
      className="relative col-span-12 flex gap-3 overflow-hidden rounded-2xl bg-brand-black bg-repeat p-4 sm:col-span-6 lg:col-span-4"
      style={{ backgroundImage: `url(${IMAGES.pattern})` }}
    >
      <div className="flex shrink-0 flex-col gap-3 justify-end">
        <Link
          href="#"
          aria-label="Contact via WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-red"
        >
          <Image src={ICONS.whatsapp} alt="" width={20} height={20} />
        </Link>
        <Link
          href={`tel:${phone}`}
          aria-label={`Call ${city} (${phone})`}
          className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-red"
        >
          <Image src={ICONS.phone} alt="" width={20} height={20} />
        </Link>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-xl uppercase tracking-wide text-brand-white/70">{street}</p>
        <h3 className="-mt-1 font-display text-4xl uppercase tracking-wide sm:text-5xl lg:text-6xl">{city}</h3>
        <p className="-mt-1 text-lg uppercase tracking-wide text-brand-white/70">{address}</p>

        <Button href="/menu" className="mt-2 flex-1" aria-label={`Order now from ${city}`}>
          Order Now
        </Button>
      </div>
    </div>
  );
}
