"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { basePrice, builderFields } from "@/lib/data/builder";
import { IMAGES } from "@/lib/assets";
import BuilderSelect from "@/components/make-it/BuilderSelect";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function BurgerBuilder() {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const total = useMemo(() => {
    const extras = builderFields.reduce((sum, field) => {
      const selected = selections[field.id];
      const option = field.options.find((item) => item.label === selected);
      return sum + (option?.price ?? 0);
    }, 0);
    return basePrice + extras;
  }, [selections]);

  const handleChange = (id: string, value: string) => {
    setSelections((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Reveal className="col-span-12 grid grid-cols-1 gap-gutter sm:grid-cols-12">
      <div className="flex flex-col items-center justify-center bg-brand-white/5 p-8 sm:col-span-4">
        <h2 className="font-display text-2xl uppercase tracking-wide">Your Burger:</h2>
        <div className="relative mt-6 aspect-square w-full max-w-xs">
          <Image
            src={IMAGES.burgers.monsterStack}
            alt="Your custom burger"
            fill
            sizes="(min-width: 640px) 33vw, 80vw"
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col bg-brand-white/5 p-8 sm:col-span-8">
        <BuilderSelect
          field={builderFields[0]}
          value={selections[builderFields[0].id] ?? ""}
          onChange={(value) => handleChange(builderFields[0].id, value)}
        />

        <BuilderSelect
          field={builderFields[1]}
          value={selections[builderFields[1].id] ?? ""}
          onChange={(value) => handleChange(builderFields[1].id, value)}
          className="mt-6"
        />

        <div className="mt-6 grid grid-cols-1 gap-gutter sm:grid-cols-3">
          {builderFields.slice(2).map((field) => (
            <BuilderSelect
              key={field.id}
              field={field}
              value={selections[field.id] ?? ""}
              onChange={(value) => handleChange(field.id, value)}
            />
          ))}
        </div>

        <div className="mt-auto flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <p className="font-display text-2xl uppercase tracking-wide">
            Total Order:{" "}
            <span className="text-brand-yellow">${total.toFixed(2)}</span>
          </p>
          <Button size="lg">Make It</Button>
        </div>
      </div>
    </Reveal>
  );
}
