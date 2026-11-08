import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { HeroSlider } from "@/components/home/HeroSlider";
import { InvestmentsMarquee } from "@/components/home/InvestmentsMarquee";
import { LatestNews } from "@/components/home/LatestNews";
import { NewsletterCta } from "@/components/home/NewsletterCta";
import { QuickAccess } from "@/components/home/QuickAccess";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "Fiji National Provident Fund (FNPF) | Securing Your Future" },
  description: SITE.description,
  alternates: { canonical: "/" },
};

/** Homepage: no audience selected, so the top bar has no active tab and the sub navbar is hidden. */
export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <QuickAccess />
      <AboutSection />
      <InvestmentsMarquee />
      <LatestNews />
      <NewsletterCta />
    </>
  );
}
