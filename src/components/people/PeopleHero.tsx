import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PEOPLE_HERO, TEAMS } from "@/data/people";

const pad = (n: number) => String(n).padStart(2, "0");

/** Full-width photo hero with breadcrumb, title, intro and jump links to each team. */
export function PeopleHero() {
  return (
    <section aria-labelledby="pplTitle" className="relative isolate flex min-h-[clamp(380px,56vh,540px)] items-end overflow-hidden bg-[#111] text-white">
      <div className="absolute inset-0 -z-10">
        <Image src={PEOPLE_HERO.src} alt={PEOPLE_HERO.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: PEOPLE_HERO.position }} />
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.32)_45%,rgba(0,0,0,0.05)_75%),linear-gradient(0deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_45%)]" />
      </div>
      <Container className="w-full animate-rise pt-18 pb-14">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-meta text-white/80">
          <Link href="/" className="font-medium text-white hover:underline hover:underline-offset-[3px]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span>About Us</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-semibold text-white">
            Our People
          </span>
        </nav>
        <h1 id="pplTitle" className="mb-3.5 max-w-[16ch] font-heading text-h1">
          Our People
        </h1>
        <p className="mb-6.5 max-w-[54ch] text-lead text-white/90">
          Meet the Board and Executive team who look after the retirement savings of more than 430,000 Fijians.
        </p>
        <ul className="flex flex-wrap gap-2.5">
          {TEAMS.map((t) => (
            <li key={t.id}>
              <a
                href={`#team-${t.id}`}
                className="group/jump inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/45 px-4.5 text-small font-semibold text-white transition-colors duration-150 ease-out hover:border-white hover:bg-white hover:text-ink focus-visible:border-white focus-visible:bg-white focus-visible:text-ink"
              >
                {t.title}
                <b className="text-sun tabular-nums transition-colors duration-150 group-hover/jump:text-red-brand group-focus-visible/jump:text-red-brand">{pad(t.people.length)}</b>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
