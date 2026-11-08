"use client";

import { useEffect } from "react";

const DURATION_MS = 500;
/** Every reveal is the same 14px fade-up; "fade" skips the movement. */
const OFFSETS: Record<string, string> = { fade: "none" };

/**
 * Fades and lifts every `[data-reveal]` element into place as it scrolls into view.
 * `data-reveal="160"` delays it by 160ms; `data-reveal="fade"` fades without moving
 * (combine with a delay as `data-reveal="fade 120"`).
 *
 * Only elements below the fold are hidden, so nothing visible on load flashes. Styles are set
 * inline and removed once the element lands, so its own hover transitions keep working.
 * Mounted once per page (keyed by pathname in PageTransition).
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          const delay = Number((el.dataset.reveal ?? "").match(/\d+/)?.[0] ?? 0);
          el.style.transition = `opacity ${DURATION_MS}ms ease-out ${delay}ms, transform ${DURATION_MS}ms cubic-bezier(.22,1,.36,1) ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "none";
          timers.push(
            window.setTimeout(() => {
              el.style.removeProperty("transition");
              el.style.removeProperty("opacity");
              el.style.removeProperty("transform");
            }, delay + DURATION_MS + 150),
          );
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      const kind = (el.dataset.reveal ?? "").match(/[a-z]+/)?.[0] ?? "";
      el.style.opacity = "0";
      el.style.transform = OFFSETS[kind] ?? "translateY(14px)";
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
