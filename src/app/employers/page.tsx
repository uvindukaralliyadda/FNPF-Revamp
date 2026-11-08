import type { Metadata } from "next";
import { AudiencePage } from "@/components/audience/AudiencePage";
import { AUDIENCE_PAGES } from "@/data/audiences";
import { pageMetadata } from "@/lib/metadata";

const { meta } = AUDIENCE_PAGES.employers;

export const metadata: Metadata = pageMetadata({ title: meta.title, description: meta.description, path: "/employers" });

/** Employers landing page: opened by the "Employers" tab in the top bar. */
export default function EmployersPage() {
  return <AudiencePage audience="employers" />;
}
