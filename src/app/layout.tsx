import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
  title: {
    default: `${siteConfig.name} — ${siteConfig.slogan}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.slogan}`,
    description: siteConfig.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#continut"
          className="sr-only z-50 rounded-md bg-card px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:focus-ring"
        >
          Sari la conținut
        </a>
        <TooltipProvider>
          <SiteHeader />
          <main id="continut" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <MobileTabBar />
        </TooltipProvider>
        <Toaster mobileOffset={{ bottom: 80 }} />
      </body>
    </html>
  );
}
