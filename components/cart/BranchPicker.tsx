"use client";

import { useState } from "react";
import { branches, type Branch } from "@/lib/data/branches";

type BranchPickerProps = {
  selectedBranchId: string;
  onSelect: (branchId: string) => void;
};

type LocateState =
  | { status: "idle" }
  | { status: "locating" }
  | { status: "success"; branch: Branch; distanceKm: number }
  | { status: "error"; message: string };

const EARTH_RADIUS_KM = 6371;

function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function BranchPicker({ selectedBranchId, onSelect }: BranchPickerProps) {
  const [locate, setLocate] = useState<LocateState>({ status: "idle" });

  const selectedBranch = branches.find((b) => b.id === selectedBranchId);

  function handleDetect() {
    if (!("geolocation" in navigator)) {
      setLocate({ status: "error", message: "Location services aren't available on this device." });
      return;
    }

    setLocate({ status: "locating" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        let nearest = branches[0];
        let nearestDistance = haversineKm(latitude, longitude, nearest.lat, nearest.lng);

        for (const branch of branches.slice(1)) {
          const distance = haversineKm(latitude, longitude, branch.lat, branch.lng);
          if (distance < nearestDistance) {
            nearest = branch;
            nearestDistance = distance;
          }
        }

        setLocate({ status: "success", branch: nearest, distanceKm: nearestDistance });
        onSelect(nearest.id);
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? "Location access denied — pick your branch from the list below."
            : error.code === error.TIMEOUT
              ? "Location request timed out — pick your branch from the list below."
              : "Couldn't determine your location — pick your branch from the list below.";

        setLocate({ status: "error", message });
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 },
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleDetect}
        disabled={locate.status === "locating"}
        className="w-fit rounded-md bg-brand-white/10 px-4 py-2 font-display text-xl uppercase tracking-wide transition-colors duration-300 ease-out hover:bg-brand-yellow hover:text-brand-black disabled:opacity-60"
      >
        {locate.status === "locating" ? "Detecting…" : "Detect nearest branch"}
      </button>

      <div aria-live="polite" className="text-lg">
        {locate.status === "success" && (
          <p className="text-brand-white/80">
            Nearest: <span className="text-brand-yellow">{locate.branch.city}</span> —{" "}
            {locate.distanceKm.toFixed(1)} km away
          </p>
        )}
        {locate.status === "error" && <p className="text-brand-white/60">{locate.message}</p>}
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-lg uppercase tracking-wide text-brand-white/70">
          Pickup branch
        </span>
        <select
          value={selectedBranchId}
          onChange={(e) => onSelect(e.target.value)}
          className="rounded-md border border-brand-white/20 bg-brand-black px-4 py-2 font-display text-xl uppercase tracking-wide focus:border-brand-yellow focus:outline-none"
        >
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.city}
            </option>
          ))}
        </select>
      </label>

      {selectedBranch && (
        <div className="text-lg text-brand-white/80">
          <p>{selectedBranch.address}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedBranch.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-yellow underline-offset-2 transition-colors duration-300 ease-out hover:underline"
          >
            Open in Maps
          </a>
        </div>
      )}
    </div>
  );
}
