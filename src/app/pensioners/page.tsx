import type { Metadata } from "next";
import { AudiencePage } from "@/components/audience/AudiencePage";
import { AUDIENCE_PAGES } from "@/data/audiences";
import { pageMetadata } from "@/lib/metadata";

const { meta } = AUDIENCE_PAGES.pensioners;

export const metadata: Metadata = pageMetadata({ title: meta.title, description: meta.description, path: "/pensioners" });

/** Pensioners landing page: opened by the "Pensioners" tab in the top bar. */
export default function PensionersPage() {
  return <AudiencePage audience="pensioners" />;
}
