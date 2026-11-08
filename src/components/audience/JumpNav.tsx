"use client";

import { useEffect, useState } from "react";
import type { ServiceGroup } from "@/data/audiences";
import { cn } from "@/lib/cn";

/**
 * "On this page" chips that stick under the header. Clicking glides to a group, the chip for the
 * group in view turns dark, and a red-to-yellow line shows reading progress.
 */
export function JumpNav({ groups, prefix }: { groups: ServiceGroup[]; prefix: string }) {
  const [current, setCurrent] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;
      const line = header + 120;
      let active: string | null = null;
      for (const g of groups) {
        const el = document.getElementById(`${prefix}-${g.id}`);
        if (el && el.getBoundingClientRect().top <= line) active = g.id;
      }
      setCurrent(active);
      const wrap = document.getElementById(`${prefix}-groups`);
      if (wrap) {
        const r = wrap.getBoundingClientRect();
        const start = window.innerHeight * 0.35;
        setProgress(Math.min(1, Math.max(0, (start - r.top) / (r.height - start))));
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [groups, prefix]);

  return (
    <nav aria-label="On this page" className="sticky top-[var(--header-h,169px)] z-20 animate-rise border-b border-line bg-white/92 backdrop-blur-[10px] [animation-delay:300ms]">
      <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-0.5">
        <span className="absolute inset-0 origin-left bg-[linear-gradient(90deg,var(--color-red-brand),var(--color-sun))] transition-transform duration-100 ease-linear" style={{ transform: `scaleX(${progress})` }} />
      </span>
      <div className="mx-auto flex w-full max-w-[1240px] items-center gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden">
        <span className="mr-1.5 shrink-0 text-label text-ink-muted uppercase">On this page</span>
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => document.getElementById(`${prefix}-${g.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className={cn(
              "h-[34px] shrink-0 rounded-full border px-3.5 text-meta font-medium transition-[background-color,color,border-color,transform] duration-150 active:scale-95",
              current === g.id ? "border-ink bg-ink text-white" : "border-line bg-surface-2 text-ink hover:border-pacific hover:bg-pacific hover:text-white",
            )}
          >
            {g.title}
          </button>
        ))}
      </div>
    </nav>
  );
}
