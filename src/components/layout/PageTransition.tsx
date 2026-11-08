"use client";

import { usePathname } from "next/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

/**
 * Fades each new page in on navigation and re-arms the scroll reveals. Keyed by pathname, so it
 * replays on every route change but not on #hash jumps. Opacity only: a transform here would
 * break the sticky header, jump bar and group headings mid-animation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page">
      {children}
      <RevealOnScroll />
    </div>
  );
}
