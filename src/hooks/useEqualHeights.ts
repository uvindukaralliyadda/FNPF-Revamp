"use client";

import { useEffect, useRef } from "react";

/**
 * Sets `--eq-h` on the container to the tallest `[data-eq]` child's natural height,
 * so those children can use `min-h-(--eq-h)`. Recalculates when the container width changes and after fonts load.
 */
export function useEqualHeights<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const equalize = () => {
      el.style.removeProperty("--eq-h");
      let max = 0;
      el.querySelectorAll<HTMLElement>("[data-eq]").forEach((n) => (max = Math.max(max, n.offsetHeight)));
      el.style.setProperty("--eq-h", `${max}px`);
    };
    let width = 0;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (w !== width) {
        width = w;
        equalize();
      }
    });
    ro.observe(el);
    document.fonts?.ready.then(equalize);
    return () => ro.disconnect();
  }, []);
  return ref;
}
