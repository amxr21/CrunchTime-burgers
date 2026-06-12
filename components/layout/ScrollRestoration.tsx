"use client";

import { useEffect } from "react";

/**
 * `scroll-behavior: smooth` on <html> hijacks the browser's native
 * back/forward scroll restoration, making it land in the wrong spot.
 * Temporarily switch to instant scrolling while the browser restores
 * the previous scroll position, then restore smooth scrolling.
 */
export default function ScrollRestoration() {
  useEffect(() => {
    if (typeof window === "undefined" || !("history" in window)) return;

    history.scrollRestoration = "manual";

    function restoreScroll() {
      const key = `scroll:${window.location.pathname}${window.location.search}`;
      const stored = sessionStorage.getItem(key);
      const y = stored ? Number(stored) : 0;

      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, y);
      document.documentElement.style.scrollBehavior = "";
    }

    function saveScroll() {
      const key = `scroll:${window.location.pathname}${window.location.search}`;
      sessionStorage.setItem(key, String(window.scrollY));
    }

    window.addEventListener("beforeunload", saveScroll);
    window.addEventListener("pagehide", saveScroll);
    window.addEventListener("popstate", restoreScroll);

    restoreScroll();

    return () => {
      window.removeEventListener("beforeunload", saveScroll);
      window.removeEventListener("pagehide", saveScroll);
      window.removeEventListener("popstate", restoreScroll);
    };
  }, []);

  return null;
}
