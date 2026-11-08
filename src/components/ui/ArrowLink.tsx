import { Icon } from "./Icon";
import { SmartLink } from "./SmartLink";
import { cn } from "@/lib/cn";

/** Text link that nudges right and reveals a small arrow on hover (menus, footer columns). */
export function ArrowLink({ href, children, className, arrowClassName }: { href: string; children: React.ReactNode; className?: string; arrowClassName?: string }) {
  return (
    <SmartLink
      href={href}
      className={cn("group/al inline-flex items-center gap-1.5 py-1.5 transition-[color,translate] duration-300 ease-soft hover:translate-x-[3px]", className)}
    >
      {children}
      <Icon
        name="arrow"
        className={cn("size-3.5 -translate-x-1.5 opacity-0 transition-[opacity,translate] duration-300 ease-soft group-hover/al:translate-x-0 group-hover/al:opacity-100", arrowClassName)}
      />
    </SmartLink>
  );
}
