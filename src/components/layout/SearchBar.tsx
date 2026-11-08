"use client";

import { useEffect, useRef } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Container } from "@/components/ui/Container";
import { SEARCH_SHORTCUTS } from "@/data/navigation";
import { cn } from "@/lib/cn";

/** Slide-down search with shortcut chips for the most common tasks. */
export function SearchBar({ open }: { open: boolean }) {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => input.current?.focus(), 150);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <div
      id="site-search"
      className={cn(
        "relative z-[2] grid border-b bg-white transition-[grid-template-rows,border-color] duration-300 ease-soft",
        open ? "grid-rows-[1fr] border-line" : "grid-rows-[0fr] border-transparent",
      )}
      inert={!open}
    >
      <div className="overflow-hidden">
        <Container>
          <form role="search" action="https://myfnpf.com.fj/" className="flex gap-3 py-4">
            <label htmlFor="site-search-input" className="sr-only">
              Search FNPF
            </label>
            <input
              ref={input}
              id="site-search-input"
              name="s"
              type="search"
              placeholder="Search withdrawals, pensions, forms…"
              className="min-h-12 min-w-0 flex-1 rounded-full border border-line-strong px-6 text-body transition-[border-color,box-shadow] duration-150 outline-none placeholder:text-[#8a9299] focus:border-red-brand focus:shadow-[0_0_0_4px_rgba(179,7,7,0.25)]"
            />
            <ArrowButton type="submit">Search</ArrowButton>
          </form>
          <div className="flex flex-wrap items-center gap-2 pb-4" aria-label="Shortcuts">
            <span className="mr-2 text-label text-ink-muted uppercase">Shortcuts</span>
            {SEARCH_SHORTCUTS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="inline-flex items-center rounded-full bg-pacific-tint px-3.5 py-1.5 text-meta font-medium text-pacific transition-[background-color,color,transform] duration-300 ease-soft hover:-translate-y-px hover:bg-pacific hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
