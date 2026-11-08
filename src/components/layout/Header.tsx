"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { audienceFromPath, HOME_CTA } from "@/data/navigation";
import { MobileDrawer } from "./MobileDrawer";
import { Navbar } from "./Navbar";
import { SearchBar } from "./SearchBar";
import { SubNav } from "./SubNav";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/cn";

/**
 * Sticky three-layer header. The audience (and so the active tab, sub navbar and main button)
 * comes from the URL: /members, /pensioners, /employers. Everything else shows the homepage state.
 * Publishes its height as --header-h so sticky elements further down can sit beneath it.
 */
export function Header() {
  const pathname = usePathname();
  const audience = audienceFromPath(pathname);
  const cta = audience?.cta ?? HOME_CTA;

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef(0);
  const lastHover = useRef({ id: "", at: 0 });

  // Hover intent: open after a short pause, close a moment after leaving the header.
  const hoverOpen = useCallback((id: string) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      setOpenMenu((cur) => {
        if (cur !== id) lastHover.current = { id, at: Date.now() };
        return id;
      });
    }, 120);
  }, []);
  const toggle = useCallback((id: string) => {
    clearTimeout(hoverTimer.current);
    // A click right after hover-open keeps the menu open instead of closing it.
    const justHovered = lastHover.current.id === id && Date.now() - lastHover.current.at < 600;
    setOpenMenu((cur) => (cur === id && !justHovered ? null : id));
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setDrawerOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setDrawerOpen(false);
      setSearchOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onScroll = () => setScrolled(window.scrollY > 8);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty("--header-h", `${el.getBoundingClientRect().height}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        onPointerEnter={() => clearTimeout(hoverTimer.current)}
        onPointerLeave={(e) => {
          if (e.pointerType !== "mouse") return;
          clearTimeout(hoverTimer.current);
          hoverTimer.current = window.setTimeout(() => setOpenMenu(null), 200);
        }}
        className={cn("sticky top-0 z-50 bg-white transition-shadow duration-300", scrolled && "shadow-[0_6px_20px_rgba(26,29,32,0.06)]")}
      >
        <a href="#main" className="absolute -top-16 left-4 z-[100] rounded-md bg-ink px-4 py-2 text-small font-semibold text-white focus:top-2">
          Skip to main content
        </a>
        <TopBar active={audience?.key ?? null} isHome={pathname === "/"} />
        <Navbar
          openMenu={openMenu}
          onToggle={toggle}
          onHoverOpen={hoverOpen}
          searchOpen={searchOpen}
          onToggleSearch={() => setSearchOpen((v) => !v)}
          onOpenDrawer={() => setDrawerOpen(true)}
          drawerOpen={drawerOpen}
          cta={cta}
        />
        <SearchBar open={searchOpen} />
        <SubNav audience={audience} openMenu={openMenu} onToggle={toggle} onHoverOpen={hoverOpen} />
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} audience={audience} cta={cta} />
    </>
  );
}
