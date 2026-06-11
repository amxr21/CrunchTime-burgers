/**
 * Shared GSAP timing/easing conventions.
 * Reference these instead of hardcoding durations/eases so motion feels cohesive.
 */

export const EASE_OUT = "power3.out";
export const EASE_SOFT = "power2.out";

export const DURATION = {
  fast: 0.3,
  base: 0.5,
  reveal: 0.8,
} as const;

export const STAGGER = {
  tight: 0.08,
  base: 0.12,
} as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
