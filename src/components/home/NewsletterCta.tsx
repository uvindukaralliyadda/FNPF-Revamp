"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const FLOATS = [
  { src: "/images/people/avatar-1.jpg", className: "top-[14%] left-[6%] size-16 md:size-[92px]", delay: "0s", hideSmall: false },
  { src: "/images/people/avatar-2.jpg", className: "top-[12%] right-[8%] size-[76px]", delay: "-2s", hideSmall: true },
  { src: "/images/people/avatar-3.jpg", className: "bottom-[12%] left-[11%] size-[72px]", delay: "-4s", hideSmall: true },
  { src: "/images/people/avatar-4.jpg", className: "right-[6%] bottom-[14%] size-16 md:size-[92px]", delay: "-1s", hideSmall: false },
];

type Status = { kind: "idle" | "error" | "ok"; text: string };

/**
 * Red newsletter panel with floating member portraits.
 * Front-end only: connect the form to FNPF's mailing service before launch.
 */
export function NewsletterCta() {
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });
  const [done, setDone] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = input.current?.value.trim() ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: "error", text: "Please enter a valid email address." });
      input.current?.focus();
      return;
    }
    setStatus({ kind: "ok", text: "Thank you! You’re on the list for the next issue." });
    setDone(true);
    e.currentTarget.reset();
    window.setTimeout(() => setDone(false), 3500);
  }

  return (
    <section aria-labelledby="nlTitle" className="bg-white pb-12 md:pb-16">
      <Container>
        <div
          data-reveal="scale"
          className="relative isolate overflow-hidden rounded-[22px] bg-red-brand px-5 pt-16 pb-12 text-center text-white md:rounded-[28px] md:px-6 md:py-14"
        >
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(700px_360px_at_85%_110%,rgba(0,0,0,0.22),transparent_70%),radial-gradient(600px_320px_at_10%_-10%,rgba(255,255,255,0.12),transparent_70%)]" />

          {FLOATS.map((f) => (
            <span
              key={f.src}
              aria-hidden="true"
              className={cn("absolute z-0", f.className, f.hideSmall && "max-lg:hidden")}
            >
              <span className="block size-full">
                <Image src={f.src} alt="" width={200} height={200} className="size-full rounded-full border-4 border-white/90 object-cover shadow-[0_18px_36px_-16px_rgba(0,0,0,0.5)]" />
              </span>
            </span>
          ))}

          <div className="relative z-[1] mx-auto max-w-[680px]">
            <h2 id="nlTitle" className="mx-auto mb-4 max-w-[22ch] font-heading text-h2 text-white">
              Stay informed with our Members Quarterly Newsletter
            </h2>
            <p className="mx-auto mb-6 max-w-[46ch] text-lead text-white/85">Savings tips, Fund updates and member stories from across Fiji, delivered to your inbox four times a year.</p>

            <form onSubmit={onSubmit} noValidate className="mx-auto flex max-w-[460px] gap-2.5 max-sm:flex-col">
              <label htmlFor="nl-email" className="sr-only">
                Email address
              </label>
              <input
                ref={input}
                id="nl-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@email.com"
                aria-invalid={status.kind === "error"}
                aria-describedby="nl-msg"
                onInput={() => status.kind === "error" && setStatus({ kind: "idle", text: "" })}
                className={cn(
                  "min-h-[52px] min-w-0 flex-1 rounded-full border px-6 text-small text-ink shadow-[0_6px_16px_-8px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] duration-150 outline-none placeholder:text-[#8a9299] focus:border-white focus:shadow-[0_0_0_4px_rgba(255,255,255,0.35)]",
                  status.kind === "error" ? "border-red-deep bg-[#fff6f6]" : "border-transparent bg-white hover:border-white/70",
                )}
              />
              <span className="shrink-0">
                <ArrowButton type="submit" variant="navy" block className={cn("min-h-[52px]", done && "border-[#1e7b4c] bg-[#1e7b4c] hover:border-[#1e7b4c] hover:bg-[#1e7b4c]")}>
                  {done ? "Subscribed" : "Subscribe now"}
                </ArrowButton>
              </span>
            </form>
            <p id="nl-msg" role="status" aria-live="polite" className={cn("mt-2.5 min-h-[1.4em] text-meta font-medium", status.kind === "error" ? "text-sun" : "text-white")}>
              {status.text}
            </p>

            <div className="mt-3 inline-flex items-center gap-3 text-small font-medium max-sm:flex-col max-sm:gap-2">
              <span aria-hidden="true" className="group/faces inline-flex items-center">
                {[5, 6, 4, 2].map((n, i) => (
                  <Image
                    key={n}
                    src={`/images/people/avatar-${n}.jpg`}
                    alt=""
                    width={64}
                    height={64}
                    className={cn("relative size-8 rounded-full border-2 border-red-brand object-cover transition-[margin,transform] duration-300 ease-soft", i > 0 && "-ml-2.5 group-hover/faces:-ml-1")}
                  />
                ))}
                <span className="-ml-2.5 grid size-8 place-items-center rounded-full border-2 border-red-brand bg-white font-semibold text-red-brand transition-[margin] duration-300 group-hover/faces:-ml-1">+</span>
              </span>
              Join thousands of members already subscribed
            </div>
            <p className="mx-auto mt-4 max-w-[46ch] text-[0.75rem] text-white/75">
              By subscribing you agree to receive emails from FNPF. Unsubscribe any time.{" "}
              <a href="#" className="text-white underline hover:text-sun">
                Privacy policy
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
