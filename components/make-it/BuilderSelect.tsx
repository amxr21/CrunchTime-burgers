import type { BuilderField } from "@/lib/data/builder";

type BuilderSelectProps = {
  field: BuilderField;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function BuilderSelect({ field, value, onChange, className = "" }: BuilderSelectProps) {
  return (
    <div className={className}>
      <label className="block font-display text-xl uppercase tracking-wide">
        {field.label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full appearance-none border border-brand-white/30 bg-transparent px-4 py-3 font-display text-lg uppercase tracking-wide text-brand-white outline-none transition-colors focus:border-brand-yellow"
      >
        <option value="" disabled className="bg-brand-black">
          {field.placeholder}
        </option>
        {field.options.map((option) => (
          <option key={option.label} value={option.label} className="bg-brand-black">
            {option.label}
            {option.price > 0 ? ` (+$${option.price.toFixed(2)})` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
