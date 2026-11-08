import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { FindYourPathProvider } from "@/components/layout/FindYourPath";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { RouteTransition } from "@/components/layout/RouteTransition";
import { SITE } from "@/data/site";
import "./globals.css";

/** Body, UI and forms. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** Headings, card titles and big numbers. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: SITE.themeColor, // browser bar matches the blue top bar
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Fiji National Provident Fund (FNPF) | Securing Your Future",
    template: "%s | FNPF",
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_FJ",
    title: "Fiji National Provident Fund (FNPF) | Securing Your Future",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiji National Provident Fund (FNPF) | Securing Your Future",
    description: SITE.description,
  },
  // Favicons come from app/icon.png and app/apple-icon.png.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" data-loading="" className={`${inter.variable} ${jakarta.variable} antialiased`}>
      <head>
        {/* Without JS the loader would never lift. */}
        <noscript>
          <style>{"[data-route-transition]{display:none}"}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-white">
        <FindYourPathProvider>
          <Header />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <RouteTransition />
        </FindYourPathProvider>
      </body>
    </html>
  );
}
