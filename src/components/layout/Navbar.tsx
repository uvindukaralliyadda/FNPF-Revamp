"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Icon } from "@/components/ui/Icon";
import { GLOBAL_MENUS, type Link as NavLink } from "@/data/navigation";
import { LOGINS } from "@/data/site";
import { Dropdown } from "./Dropdown";
import { MegaMenu } from "./MegaMenu";
import { cn } from "@/lib/cn";

type Props = {
  openMenu: string | null;
  onToggle: (id: string) => void;
  onHoverOpen: (id: string) => void;
  searchOpen: boolean;
  onToggleSearch: () => void;
  onOpenDrawer: () => void;
  drawerOpen: boolean;
  cta: NavLink;
};

/** Layer 2: logo, mega-menu pill group, search, login and the audience's main button. */
export function Navbar({ openMenu, onToggle, onHoverOpen, searchOpen, onToggleSearch, onOpenDrawer, drawerOpen, cta }: Props) {
  return (
    <div className="relative z-[3] border-b border-line bg-white">
      <div className="mx-auto flex h-[76px] w-full max-w-[1240px] items-center gap-6 px-4 md:px-6">
        <Link href="/" aria-label="FNPF home" className="shrink-0 transition-transform duration-300 ease-soft hover:scale-[1.03]">
          <Image src="/images/logo.png" alt="FNPF – securing your future" width={298} height={272} priority className="h-14 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-0.5 rounded-full border border-line bg-surface-2 p-1">
            {GLOBAL_MENUS.map((m) => {
              const open = openMenu === m.id;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`mega-${m.id}`}
                    onClick={() => onToggle(m.id)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && onHoverOpen(m.id)}
                    className={cn(
                      "inline-flex h-[38px] items-center gap-1.5 rounded-full px-4 text-small transition-[background-color,color,box-shadow] duration-150",
                      open
                        ? "bg-white font-semibold text-ink shadow-[0_1px_2px_rgba(26,29,32,0.06),0_0_0_1px_var(--color-line)]"
                        : "font-medium text-ink-muted hover:bg-surface-3 hover:text-ink",
                    )}
                  >
                    {m.label}
                    <Icon name="chevron" className={cn("size-3 transition-transform duration-300 ease-soft", open && "rotate-180 text-red-brand")} />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={onToggleSearch}
            className={cn(
              "group/search grid size-11 place-items-center rounded-full transition-[background-color,color,transform] duration-150 hover:bg-surface-3 hover:text-red-brand active:scale-90",
              searchOpen && "bg-surface-3 text-red-brand",
            )}
          >
            <Icon
              name="search"
              className={cn(
                "col-start-1 row-start-1 size-5 transition-[transform,opacity] duration-300 ease-soft",
                searchOpen ? "scale-60 rotate-90 opacity-0" : "",
              )}
            />
            <Icon
              name="close"
              className={cn("col-start-1 row-start-1 size-5 transition-[transform,opacity] duration-300 ease-soft", searchOpen ? "opacity-100" : "scale-60 -rotate-90 opacity-0")}
            />
          </button>

          <div className="relative hidden lg:block">
            <button
              type="button"
              aria-expanded={openMenu === "login"}
              aria-controls="login-menu"
              onClick={() => onToggle("login")}
              className={cn(
                "group/login inline-flex min-h-10 items-center gap-2 rounded-full border-[1.5px] bg-white px-4 text-small font-semibold transition-[border-color,color,transform,box-shadow] duration-300 ease-soft hover:-translate-y-px hover:shadow-card active:scale-[0.97]",
                openMenu === "login" ? "border-red-brand text-red-brand" : "border-line-strong text-ink hover:border-ink",
              )}
            >
              <Icon name="user" className="size-4 transition-transform duration-300 ease-soft" />
              Login
              <Icon name="chevron" className={cn("size-4 transition-transform duration-300 ease-soft", openMenu === "login" && "rotate-180")} />
            </button>
            <Dropdown id="login-menu" open={openMenu === "login"} links={[LOGINS.member, LOGINS.employer]} align="right" wide icons />
          </div>

          <div className="hidden lg:block">
            {/* key replays the fade when the label changes with the audience */}
            <span key={cta.label} className="block animate-page">
              <ArrowButton href={cta.href} size="sm">
                {cta.label}
              </ArrowButton>
            </span>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={onOpenDrawer}
            className="grid size-11 place-items-center rounded-full transition-colors hover:bg-surface-3 hover:text-red-brand active:scale-90 lg:hidden"
          >
            <Icon name="menu" className="size-5" />
          </button>
        </div>
      </div>

      {GLOBAL_MENUS.map((m) => (
        <MegaMenu key={m.id} menu={m} open={openMenu === m.id} />
      ))}
    </div>
  );
}
