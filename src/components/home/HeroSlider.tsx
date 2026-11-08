"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { HERO_SLIDES } from "@/data/home";
import { cn } from "@/lib/cn";

const DURATION = 2000; // ms per slide

/** Full-width photo slider: headline bottom-left, floating stat cards bottom-right, no CTAs. */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const hoverPaused = useRef(false);
  const elapsed = useRef(0);
  const swipeX = useRef<number | null>(null);
  const count = HERO_SLIDES.length;

  const go = useCallback((n: number) => {
    elapsed.current = 0;
    setProgress(0);
    setIndex(((n % count) + count) % count);
  }, [count]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setUserPaused(true);
  }, []);

  // Autoplay: pauses on hover/focus, while the tab is hidden and during the first-load loader.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const blocked = userPaused || hoverPaused.current || document.hidden || document.documentElement.hasAttribute("data-loading");
      if (!blocked) {
        elapsed.current += dt;
        if (elapsed.current >= DURATION) {
          go(index + 1);
          return;
        }
        setProgress(elapsed.current / DURATION);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, userPaused, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="FNPF highlights"
      tabIndex={-1}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") hoverPaused.current = true;
      }}
      onPointerLeave={() => (hoverPaused.current = false)}
      onFocus={() => (hoverPaused.current = true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) hoverPaused.current = false;
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onPointerDown={(e) => {
        if (!(e.target as Element).closest("button")) swipeX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (swipeX.current === null) return;
        const dx = e.clientX - swipeX.current;
        swipeX.current = null;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      }}
      className="relative isolate h-[max(560px,min(640px,calc(100svh-112px)))] overflow-hidden bg-[#111] text-white lg:h-[clamp(560px,calc(100vh-117px),820px)]"
    >
      {HERO_SLIDES.map((s, i) => {
        const active = i === index;
        return (
          <article
            key={s.key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={!active}
            inert={!active}
            className={cn("absolute inset-0 transition-[opacity,visibility] duration-600 ease-out", active ? "visible opacity-100" : "invisible opacity-0")}
          >
            <div className="absolute inset-0 -z-10">
              <Image
                src={s.image.src}
                alt={s.image.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: s.image.position }}
              />
              {/* soft black gradient: darker bottom-left behind the headline */}
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.08)_100%)] lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.28)_40%,rgba(0,0,0,0)_70%),linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_40%)]" />
            </div>

            <div className="absolute inset-x-5 bottom-[188px] max-w-[640px] lg:right-auto lg:bottom-[120px] lg:left-[max(1.5rem,calc((100%-1240px)/2+1.5rem))]">
              {i === 0 ? (
                <h1 className={cn("mb-4 font-heading text-display text-white transition-[opacity,translate] delay-[80ms] duration-500 ease-soft", active ? "translate-y-0 opacity-100" : "translate-y-[18px] opacity-0")}>{s.title}</h1>
              ) : (
                <h2 className={cn("mb-4 font-heading text-display text-white transition-[opacity,translate] delay-[80ms] duration-500 ease-soft", active ? "translate-y-0 opacity-100" : "translate-y-[18px] opacity-0")}>{s.title}</h2>
              )}
              <p className={cn("max-w-[46ch] text-lead text-white/90 transition-[opacity,translate] delay-[140ms] duration-500 ease-soft", active ? "translate-y-0 opacity-100" : "translate-y-[18px] opacity-0")}>{s.text}</p>
            </div>

            <div className="absolute inset-x-5 bottom-[84px] grid gap-2.5 lg:right-[max(1.5rem,calc((100%-1240px)/2+1.5rem))] lg:bottom-12 lg:left-auto lg:w-[360px] lg:grid-cols-2">
              <div
                className={cn(
                  "col-span-full flex items-end justify-between gap-4 rounded-[18px] bg-white/95 px-4 py-3 text-ink shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-[opacity,translate,box-shadow] delay-[160ms] duration-500 ease-soft hover:-translate-y-[3px] hover:delay-0 lg:p-4",
                  active ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
                )}
              >
                <span>
                  <span className="block text-meta font-semibold">{s.feature.label}</span>
                  <span className="mt-1 block text-[0.75rem] text-ink-muted">{s.feature.meta}</span>
                </span>
                <CountUp value={s.feature.value} play={active} delay={180} duration={800} className="font-heading text-stat-sm text-red-brand lg:text-stat" />
              </div>
              {s.stats.map((st, k) => (
                <div
                  key={st.meta}
                  className={cn(
                    "hidden min-h-28 flex-col justify-between gap-2 rounded-[18px] bg-white/95 p-4 text-ink shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-[opacity,translate,box-shadow] duration-500 ease-soft hover:-translate-y-[3px] hover:delay-0 lg:flex",
                    k === 0 ? "delay-[220ms]" : "delay-[280ms]",
                    active ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
                  )}
                >
                  <span className="grid size-8 place-items-center rounded-[10px] bg-pacific-tint text-pacific">
                    <Icon name={st.icon} />
                  </span>
                  <span>
                    <CountUp value={st.value} play={active} delay={240 + k * 60} duration={800} className="block font-heading text-stat-sm text-pacific" />
                    <span className="mt-1 block text-[0.75rem] text-ink-muted">{st.meta}</span>
                  </span>
                </div>
              ))}
            </div>
          </article>
        );
      })}

      <div className="absolute inset-x-5 bottom-5 z-[3] flex items-center justify-between gap-3 lg:right-auto lg:bottom-12 lg:left-[max(1.5rem,calc((100%-1240px)/2+1.5rem))] lg:justify-start lg:gap-6">
        <div role="tablist" aria-label="Choose a slide" className="flex gap-1.5 lg:gap-4">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1} of ${count}`}
              onClick={() => go(i)}
              className="group/dot grid w-9 py-2.5 lg:w-14"
            >
              <span className="relative h-[3px] overflow-hidden rounded-full bg-white/25 transition-colors group-hover/dot:bg-white/40">
                <span
                  className="absolute inset-0 origin-left rounded-full bg-sun"
                  style={{ transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})` }}
                />
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 lg:gap-2">
          <HeroButton label="Previous slide" onClick={() => go(index - 1)}>
            <Icon name="arrow-left" className="size-4 transition-transform duration-300 ease-soft group-hover/hb:-translate-x-0.5" strokeWidth={2.2} />
          </HeroButton>
          <HeroButton label={userPaused ? "Play slideshow" : "Pause slideshow"} pressed={userPaused} onClick={() => setUserPaused((p) => !p)}>
            <Icon name={userPaused ? "play" : "pause"} className="size-4" />
          </HeroButton>
          <HeroButton label="Next slide" onClick={() => go(index + 1)}>
            <Icon name="arrow" className="size-4 transition-transform duration-300 ease-soft group-hover/hb:translate-x-0.5" strokeWidth={2.2} />
          </HeroButton>
        </div>
      </div>
    </section>
  );
}

function HeroButton({ label, onClick, pressed, children }: { label: string; onClick: () => void; pressed?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="group/hb grid size-9 place-items-center rounded-full border border-white/35 bg-white/8 text-white backdrop-blur-[8px] transition-[background-color,color,border-color,transform] duration-300 ease-soft hover:border-white hover:bg-white hover:text-pacific active:scale-90 lg:size-10"
    >
      {children}
    </button>
  );
}
