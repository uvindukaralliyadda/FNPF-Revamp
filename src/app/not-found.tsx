import type { Metadata } from "next";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="bg-[linear-gradient(180deg,var(--color-pacific-tint)_0%,#fff_100%)] py-24">
      <Container className="text-center">
        <p className="text-label text-red-brand uppercase">Error 404</p>
        <h1 className="mx-auto mt-3 mb-4 max-w-[18ch] font-heading text-h1">We couldn’t find that page</h1>
        <p className="mx-auto mb-8 max-w-[46ch] text-lead text-ink-muted">It may have moved while we rebuild the site. Start from the homepage or choose who you are.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ArrowButton href="/">Go to the homepage</ArrowButton>
          <ArrowButton href="/members" variant="secondary">Members</ArrowButton>
          <ArrowButton href="/employers" variant="secondary">Employers</ArrowButton>
        </div>
      </Container>
    </section>
  );
}
