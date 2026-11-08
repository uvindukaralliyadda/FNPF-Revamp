"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ArrowChip } from "@/components/ui/ArrowChip";
import { AUDIENCES } from "@/data/navigation";
import { PATHS } from "@/data/home";
import { cn } from "@/lib/cn";

type Ctx = { open: boolean; openPath: () => void; closePath: () => void };
const PathContext = createContext<Ctx | null>(null);

export function useFindYourPath() {
  const ctx = useContext(PathContext);
  if (!ctx) throw new Error("useFindYourPath must be used inside <FindYourPathProvider>");
  return ctx;
}

/** Holds the "Find your path" dialog state for the top bar, the drawer and anything else. */
export function FindYourPathProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openPath = useCallback(() => setOpen(true), []);
  const closePath = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, openPath, closePath }), [open, openPath, closePath]);
  return (
    <PathContext.Provider value={value}>
      {children}
      <FindYourPathDialog open={open} onClose={closePath} />
    </PathContext.Provider>
  );
}

function FindYourPathDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("a")?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>("a, button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      returnFocus.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      className={cn("fixed inset-0 z-[90] grid place-items-center p-4 transition-[visibility] duration-300", open ? "visible" : "invisible")}
      aria-hidden={!open}
    >
      <div
        className={cn("absolute inset-0 bg-pacific-deep/55 backdrop-blur-[3px] transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pathTitle"
        className={cn(
          "relative max-h-[calc(100vh-32px)] w-[min(900px,100%)] overflow-auto rounded-[20px] bg-white px-4 pt-12 pb-5 shadow-[0_24px_64px_rgba(7,31,64,0.3)] transition-[opacity,transform] duration-300 ease-soft sm:px-8 sm:pt-12 sm:pb-8",
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.98] opacity-0",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-11 place-items-center rounded-full transition-colors hover:bg-surface-3 hover:text-red-brand active:scale-90"
        >
          <Icon name="close" className="size-5" />
        </button>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-pacific-tint px-2.5 py-1 text-label text-pacific uppercase">
          <Icon name="compass" className="size-3" />
          Find your path
        </span>
        <h2 id="pathTitle" className="mt-3 mb-2 font-heading text-h2">
          How can we help you today?
        </h2>
        <p className="mb-7 max-w-[60ch] text-ink-muted">Choose the option that describes you best. We’ll show you the services that matter to you.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {PATHS.map((p) => (
            <Link
              key={p.key}
              href={AUDIENCES[p.key].href}
              onClick={onClose}
              className="group/card flex flex-col gap-2 rounded-card border border-line bg-surface-2 p-6 transition-[background-color,border-color,box-shadow,transform] duration-300 ease-soft hover:-translate-y-[3px] hover:border-pacific hover:bg-white hover:shadow-menu active:scale-[0.98]"
            >
              <span className="mb-3 flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-[10px] bg-pacific-tint text-pacific transition-colors duration-150">
                  <Icon name={p.icon} className="size-[22px]" />
                </span>
                <span className="rounded-full bg-pacific-tint px-2.5 py-1 text-label text-pacific uppercase">Start here</span>
              </span>
              <span className="font-heading text-h4">{p.title}</span>
              <span className="flex-1 text-small text-ink-muted">{p.text}</span>
              <span className="mt-4 inline-flex items-center gap-2 text-small font-semibold text-pacific">
                Go to {AUDIENCES[p.key].label}
                <ArrowChip group="card" className="size-7 bg-pacific text-white group-hover/card:bg-red-brand" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
