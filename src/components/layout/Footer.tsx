import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/data/footer";
import { CONTACT, SITE } from "@/data/site";
import { BackToTop } from "./BackToTop";

const QUICK: Array<{ icon: IconName; kicker: string; label: string; href: string }> = [
  { icon: "phone", kicker: "Call us", label: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: "mail", kicker: "Email us", label: CONTACT.email, href: CONTACT.emailHref },
  { icon: "pin", kicker: "Visit us", label: "Find a branch", href: CONTACT.branchesHref },
];

/** Aerial coastline under a light black gradient; brand + contact, link columns, legal bar. */
export function Footer() {
  return (
    <footer id="footer" className="relative isolate overflow-hidden bg-[#111] text-white/90">
      <Image src="/images/footer/aerial.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.68)_45%,rgba(0,0,0,0.8)_100%)]" />

      <Container>
        <div data-reveal className="grid items-center gap-6 border-b border-white/20 pt-12 pb-9 lg:grid-cols-[auto_1fr_auto]">
          <Link href="/" aria-label="FNPF home" className="justify-self-start rounded-[10px] bg-white px-2.5 py-2 transition-transform duration-300 ease-soft hover:-translate-y-0.5">
            <Image src="/images/logo.png" alt="FNPF – securing your future" width={298} height={272} className="h-14 w-auto" />
          </Link>
          <div className="[text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
            <p className="mb-1 font-heading text-h4 text-white">{SITE.name}</p>
            <p className="max-w-[46ch] text-small text-white/90">Securing the retirement savings of members, pensioners and employers across Fiji since 1966.</p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {QUICK.map((q) => (
              <li key={q.kicker} className="max-sm:basis-full">
                <a
                  href={q.href}
                  className="group/q flex items-center gap-3 rounded-[10px] border border-white/20 bg-black/30 py-2.5 pr-[18px] pl-2.5 backdrop-blur-[6px] transition-[background-color,border-color,transform] duration-300 ease-soft hover:-translate-y-0.5 hover:border-white/45 hover:bg-black/45 active:scale-[0.97]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/8 text-sun transition-colors group-hover/q:bg-sun group-hover/q:text-pacific-deep">
                    <Icon name={q.icon} className="size-4" />
                  </span>
                  <span className="text-small leading-tight font-semibold text-white">
                    <small className="mb-0.5 block text-label text-pacific-soft uppercase">{q.kicker}</small>
                    {q.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 py-10 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] lg:grid-cols-[repeat(4,1fr)_1.15fr]">
          {FOOTER_COLUMNS.map((col, i) => (
            <div key={col.title} data-reveal={String(i * 80)}>
              <h3 className="mb-4 text-label text-white/70 uppercase">{col.title}</h3>
              <ul className="grid gap-0.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <ArrowLink href={l.href} className="text-small text-white/95 hover:text-white" arrowClassName="text-sun">
                      {l.label}
                    </ArrowLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div data-reveal="320">
            <h3 className="mb-4 text-label text-white/70 uppercase">Head office</h3>
            <address className="grid gap-4 text-small not-italic">
              <span>
                <strong className="block font-semibold text-white">Provident Plaza Two</strong>
                33 Ellery Street, Suva
                <br />
                {CONTACT.address[1]}
              </span>
              <span>
                <strong className="block font-semibold text-white">Opening hours</strong>
                {CONTACT.hours.map((h) => (
                  <span key={h} className="block">
                    {h}
                  </span>
                ))}
              </span>
              <span>
                <strong className="block font-semibold text-white">SMS</strong>
                {CONTACT.sms}
              </span>
            </address>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/12 bg-black/35 backdrop-blur-[2px]">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-6 text-meta text-white/70">
          <div className="grid max-w-[520px] gap-1">
            <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
            <small className="text-[0.75rem] text-white/65">FNPF operates under the FNPF Act. Information on this website is general and does not take your personal circumstances into account.</small>
          </div>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2 md:ml-auto">
            {LEGAL_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-white/75 transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
          <BackToTop />
        </Container>
      </div>
    </footer>
  );
}
