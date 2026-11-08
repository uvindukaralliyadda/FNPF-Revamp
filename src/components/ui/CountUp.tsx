"use client";

import { useEffect, useRef, useState } from "react";
import { formatCount, parseCountable } from "@/lib/countUp";

type Props = {
  value: string;
  /** Count when scrolled into view (default), or each time `play` turns true. */
  play?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
};

/**
 * Counts a display value up from zero ("$12.1b", "9.5%", "436,860"). Values that are not a
 * single number ("5–15 yrs", "Monthly") are shown as they are. Waits for the first-load
 * loader to lift, and shows the final value straight away for reduced-motion visitors.
 */
export function CountUp({ value, play, delay = 150, duration = 1400, className }: Props) {
  const parts = parseCountable(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parts || play === false) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let timer = 0;
    let observer: IntersectionObserver | MutationObserver | null = null;

    const run = () => {
      setText(parts.prefix + formatCount(0, parts.decimals, parts.grouped) + parts.suffix);
      timer = window.setTimeout(() => {
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setText(parts.prefix + formatCount(parts.value * eased, parts.decimals, parts.grouped) + parts.suffix);
          if (t < 1) raf = requestAnimationFrame(step);
          else setText(value);
        };
        raf = requestAnimationFrame(step);
      }, delay);
    };

    const whenLoaded = () => {
      const html = document.documentElement;
      if (!html.hasAttribute("data-loading")) return run();
      observer = new MutationObserver(() => {
        if (html.hasAttribute("data-loading")) return;
        observer?.disconnect();
        run();
      });
      observer.observe(html, { attributes: true, attributeFilter: ["data-loading"] });
    };

    if (play === true) {
      whenLoaded();
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io.disconnect();
          whenLoaded();
        },
        { threshold: 0.4 },
      );
      io.observe(el);
      observer = io;
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      observer?.disconnect();
      setText(value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, play, delay, duration]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
