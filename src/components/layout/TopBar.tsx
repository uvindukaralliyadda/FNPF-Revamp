"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { AUDIENCE_LIST, type AudienceKey } from "@/data/navigation";
import { CONTACT } from "@/data/site";
import { useFindYourPath } from "./FindYourPath";
import { cn } from "@/lib/cn";

type Box = { left: number; width: number } | null;

/**
 * Layer 1: audience tabs (Members, Pensioners, Employers) on the left, "Find your path" and
 * contact links on the right. On the homepage no tab is active.
 */
export function TopBar({ active, isHome }: { active: AudienceKey | null; isHome: boolean }) {
  const { open: pathOpen, openPath } = useFindYourPath();
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<Box>(null);
  const [hover, setHover] = useState<Box>(null);
  const [moving, setMoving] = useState(false);
  const [clicked, setClicked] = useState<string | null>(null);

  const measure = useCallback(() => {
    const el = active ? tabRefs.current[active] : null;
    setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [active]);

  useEffect(() => {
    measure();
    setMoving(true);
    const t = window.setTimeout(() => setMoving(false), 260);
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [measure]);

  return (
    <div className="overflow-x-clip bg-pacific">
      <div className="mx-auto flex h-10 w-full max-w-[1240px] items-stretch justify-between px-4 md:px-6">
        <nav aria-label="Audience" ref={listRef} className="relative flex items-stretch" onPointerLeave={() => setHover(null)}>
          {/* hover pill that follows the pointer */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-1.5 rounded-full bg-white/12 transition-[left,width,opacity] duration-300 ease-soft",
              hover ? "opacity-100" : "opacity-0",
            )}
            style={hover ? { left: hover.left + 4, width: hover.width - 8 } : undefined}
          />
          {/* white tab + red top line for the current audience */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-0 -bottom-px z-[1] bg-white transition-[left,width,opacity] duration-300 ease-soft",
              "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-red-brand before:transition-transform before:duration-300 before:ease-soft",
              moving && "before:scale-x-60",
              indicator ? "opacity-100" : "opacity-0",
            )}
            style={indicator ? { left: indicator.left, width: indicator.width } : undefined}
          />
          {AUDIENCE_LIST.map((a) => {
            const isActive = a.key === active;
            return (
              <Link
                key={a.key}
                ref={(el) => {
                  tabRefs.current[a.key] = el;
                }}
                href={a.href}
                aria-current={isActive ? "page" : undefined}
                onPointerEnter={(e) => !isActive && setHover({ left: e.currentTarget.offsetLeft, width: e.currentTarget.offsetWidth })}
                onClick={() => {
                  setClicked(a.key);
                  window.setTimeout(() => setClicked(null), 400);
                }}
                className={cn(
                  "group/tab relative z-[2] flex items-center px-2.5 text-label uppercase transition-colors duration-150 sm:px-4",
                  "after:absolute after:bottom-[7px] after:left-1/2 after:-ml-[9px] after:h-0.5 after:w-[18px] after:rounded-full after:bg-sun after:transition-transform after:duration-300 after:ease-soft",
                  isActive ? "text-red-brand after:scale-x-0" : "text-white/80 after:scale-x-0 hover:text-white hover:after:scale-x-100",
                )}
              >
                <span
                  className={cn(
                    "inline-block transition-transform duration-300 ease-soft group-active/tab:scale-[0.94] group-active/tab:duration-75",
                    !isActive && "group-hover/tab:-translate-y-px",
                    clicked === a.key && "scale-[1.08]",
                  )}
                >
                  {a.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPath}
            aria-haspopup="dialog"
            aria-expanded={pathOpen}
            className={cn(
              "group/path mr-2 hidden h-7 items-center gap-1.5 rounded-full border px-3 text-[0.75rem] font-semibold transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-soft md:inline-flex",
              "active:scale-[0.98]",
              pathOpen ? "border-sun bg-sun text-pacific-deep" : "border-white/40 text-white hover:border-white hover:bg-white hover:text-pacific",
            )}
          >
            <Icon
              name="compass"
              className={cn(
                "size-3.5 transition-colors duration-150",
                pathOpen ? "text-pacific-deep" : "text-sun group-hover/path:text-pacific",
              )}
            />
            Find your path
          </button>
          <TopBarLink href={CONTACT.phoneHref} icon="phone" label={CONTACT.phone} tip="Call or click to copy" doneTip="Number copied ✓" copy={CONTACT.phone} animate="" />
          <TopBarLink href={CONTACT.emailHref} icon="mail" label={CONTACT.email} tip="Send us an email" doneTip="Opening your email app…" hideOnSmall animate="" />
          <TopBarLink href={CONTACT.branchesHref} icon="pin" label="Branches" tip="Find a branch near you" doneTip="Opening branches…" hideOnSmall alignRight animate="" />
        </div>
      </div>
    </div>
  );
}

function TopBarLink({
  href,
  icon,
  label,
  tip,
  doneTip,
  copy,
  hideOnSmall,
  alignRight,
  animate,
}: {
  href: string;
  icon: IconName;
  label: string;
  tip: string;
  doneTip: string;
  copy?: string;
  hideOnSmall?: boolean;
  alignRight?: boolean;
  animate: string;
}) {
  const [done, setDone] = useState(false);
  const timer = useRef(0);

  async function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Desktop: copy the number instead of trying to dial.
    if (copy && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(copy);
      } catch {
        /* clipboard blocked: the tooltip still confirms the number */
      }
    }
    setDone(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 1800);
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group/tb relative h-7 items-center gap-1.5 rounded-full text-meta font-medium transition-[color,background-color,transform] duration-150",
        "max-[479px]:w-8 max-[479px]:justify-center min-[480px]:px-2.5 active:scale-95 active:duration-75",
        hideOnSmall ? "hidden md:inline-flex" : "inline-flex",
        done ? "bg-sun text-pacific-deep" : "text-white/85 hover:bg-white/12 hover:text-white",
      )}
    >
      <Icon name={icon} className={cn("size-3.5 shrink-0 transition-transform duration-500", !done && animate)} />
      <span className="max-[479px]:sr-only">{label}</span>
      <span
        role="status"
        className={cn(
          "pointer-events-none absolute top-[calc(100%+8px)] z-[70] hidden rounded-md bg-pacific-deep px-2.5 py-1.5 text-[0.75rem] font-medium whitespace-nowrap text-white shadow-menu transition-[opacity,translate] duration-300 ease-soft pointer-fine:block",
          alignRight ? "right-0" : "left-1/2 -translate-x-1/2",
          done ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0 group-hover/tb:translate-y-0 group-hover/tb:opacity-100 group-focus-visible/tb:opacity-100",
        )}
      >
        {done ? doneTip : tip}
      </span>
    </a>
  );
}
