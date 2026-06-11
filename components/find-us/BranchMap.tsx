"use client";

import { useState } from "react";
import { branches } from "@/lib/data/locations";

export default function BranchMap() {
  const [activeBranch, setActiveBranch] = useState(branches[0]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {branches.map((branch) => (
          <button
            key={branch}
            type="button"
            onClick={() => setActiveBranch(branch)}
            className={`px-4 py-1 font-display text-lg uppercase tracking-wide transition-colors ${
              activeBranch === branch
                ? "bg-brand-white text-brand-black"
                : "bg-transparent text-brand-white/50 hover:text-brand-white"
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 flex h-72 w-full items-center justify-center border border-dashed border-brand-white/30 bg-brand-white/5 transition-colors hover:bg-brand-white/10 sm:h-96"
      >
        <span className="font-display text-xl uppercase tracking-wide text-brand-white">
          Click to Expand
        </span>
      </button>
    </div>
  );
}
