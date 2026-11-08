"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * FNPF Values Film (9:16, silent, 20s loop). Plays only while on screen, waits for the
 * first-load loader, and starts paused for reduced-motion visitors. A button pauses or plays it.
 */
export function ValuesFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const inView = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setUserPaused(true);
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const sync = () => {
      const play = inView.current && !userPaused && !document.hidden && !document.documentElement.hasAttribute("data-loading");
      if (play && el.paused) el.play().catch(() => {});
      if (!play && !el.paused) el.pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-loading"] });
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [userPaused]);

  return (
    <div className="group/film relative isolate aspect-[9/16] w-[min(100%,400px)] overflow-hidden rounded-panel bg-pacific-deep shadow-[0_30px_60px_-30px_rgba(10,58,120,0.5)] lg:ml-auto">
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/fnpf-values-film-poster.jpg"
        aria-label="FNPF values film: Excellence, Teamwork, Humility, Integrity and Courage"
        className="block size-full object-cover transition-transform duration-[900ms] ease-soft group-hover/film:scale-[1.03]"
      >
        <source src="/videos/fnpf-values-film.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={() => setUserPaused((p) => !p)}
        aria-pressed={userPaused}
        aria-label={userPaused ? "Play the values film" : "Pause the values film"}
        className={cn(
          "absolute z-[2] grid place-items-center rounded-full border border-white/45 bg-black/30 text-white backdrop-blur-[8px] transition-[opacity,transform,background-color,color,border-color,top,right,width,height] duration-300 ease-soft hover:border-white hover:bg-white hover:text-red-brand active:scale-90",
          userPaused
            ? "top-1/2 right-1/2 size-16 translate-x-1/2 -translate-y-1/2 opacity-100"
            : "top-3.5 right-3.5 size-[42px] scale-90 opacity-0 group-hover/film:scale-100 group-hover/film:opacity-100 focus-visible:scale-100 focus-visible:opacity-100",
        )}
      >
        <Icon name={userPaused ? "play" : "pause"} className={userPaused ? "size-[22px]" : "size-4"} />
      </button>
    </div>
  );
}
