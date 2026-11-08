import { Icon } from "./Icon";
import { SmartLink } from "./SmartLink";
import { cn } from "@/lib/cn";

/** Red text link with a growing underline and arrow, e.g. "View all news". */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <SmartLink
      href={href}
      className={cn(
        "group/tl inline-flex items-center gap-2 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_1.5px] bg-left-bottom bg-no-repeat pb-[3px] font-semibold text-red-brand transition-[background-size,color] duration-500 ease-soft hover:bg-[length:100%_1.5px] hover:text-red-deep",
        className,
      )}
    >
      {children}
      <Icon name="arrow" className="size-4 transition-transform duration-500 ease-soft group-hover/tl:translate-x-1" />
    </SmartLink>
  );
}
