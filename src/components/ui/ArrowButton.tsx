import Link from "next/link";
import { ArrowChip } from "./ArrowChip";
import { Icon, type IconName } from "./Icon";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "onBrand" | "onDark" | "navy";

const VARIANTS: Record<Variant, { button: string; chip: string }> = {
  primary: {
    button: "border-red-brand bg-red-brand text-white hover:border-red-deep hover:bg-red-deep hover:shadow-red",
    chip: "bg-white text-red-brand",
  },
  secondary: {
    button: "border-line-strong bg-white text-ink hover:border-ink hover:shadow-card",
    chip: "bg-surface-3 text-ink group-hover/btn:bg-red-brand group-hover/btn:text-white",
  },
  onBrand: {
    button: "border-white bg-white text-pacific hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.4)]",
    chip: "bg-red-brand text-white",
  },
  onDark: {
    button: "border-white/40 bg-transparent text-white hover:border-white hover:bg-white/5",
    chip: "bg-white/10 text-white group-hover/btn:bg-sun group-hover/btn:text-pacific-deep",
  },
  navy: {
    button: "border-pacific-deep bg-pacific-deep text-white hover:border-black hover:bg-black hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)]",
    chip: "bg-sun text-pacific-deep",
  },
};

type Props = {
  href?: string;
  variant?: Variant;
  size?: "md" | "sm";
  /** Show the sliding arrow chip (default) or a leading icon instead. */
  chip?: boolean;
  icon?: IconName;
  block?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

/** Pill button: lifts on hover, light sweep on primary, arrow slides through the chip. */
export function ArrowButton({ href, variant = "primary", size = "md", chip = true, icon, block, type = "button", className, children, ...aria }: Props) {
  const v = VARIANTS[variant];
  const classes = cn(
    "group/btn relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full border-[1.5px] text-small leading-none font-semibold whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out active:translate-y-0 active:scale-[0.98] active:duration-150",
    size === "md" ? "min-h-12" : "min-h-10",
    chip ? (size === "md" ? "pr-1.5 pl-6" : "pr-1 pl-4") : size === "md" ? "px-6" : "px-4",
    block ? "w-full justify-between" : "justify-center",
    v.button,
    className,
  );
  const content = (
    <>
      {icon && <Icon name={icon} className="size-4 shrink-0" />}
      <span>{children}</span>
      {chip && <ArrowChip className={cn(v.chip, size === "sm" && "size-7")} />}
    </>
  );

  if (!href) {
    return (
      <button type={type} className={classes} {...aria}>
        {content}
      </button>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...aria}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...aria}>
      {content}
    </a>
  );
}
