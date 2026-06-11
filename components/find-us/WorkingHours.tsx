import { workingHours } from "@/lib/data/locations";

export default function WorkingHours() {
  return (
    <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2">
      {workingHours.map((entry) => (
        <div key={entry.label}>
          <p className="font-display text-5xl uppercase tracking-wide sm:text-6xl">
            {entry.hours}
          </p>
          <p className="mt-1 text-sm uppercase tracking-wide text-brand-white/70">
            {entry.label}
          </p>
        </div>
      ))}
    </div>
  );
}
