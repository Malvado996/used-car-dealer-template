import type { Metadata, Viewport } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { dealer } from "@/config/dealer";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { PublicChrome } from "@/components/public-chrome";
import { JsonLd } from "@/components/json-ld";
import { autoDealerJsonLd } from "@/lib/seo";

const heading = Oswald({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-oswald", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(dealer.seo.siteUrl),
  title: { default: dealer.seo.title, template: `%s | ${dealer.name}` },
  description: dealer.seo.description,
  keywords: dealer.seo.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: dealer.name,
    locale: dealer.seo.locale,
    title: dealer.seo.title,
    description: dealer.seo.description,
    images: dealer.seo.ogImage ? [dealer.seo.ogImage] : undefined,
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: dealer.logo },
};

export const viewport: Viewport = { themeColor: dealer.colors.primary };

/** Brand colors from dealer config -> CSS variables used by Tailwind/shadcn tokens */
const brandCss = `html:root{--primary:${dealer.colors.primary};--primary-foreground:${dealer.colors.primaryForeground};--ring:${dealer.colors.primary};--background:${dealer.colors.background};--foreground:${dealer.colors.foreground};--brand-accent:${dealer.colors.accent};--brand-accent-foreground:${dealer.colors.accentForeground};}` +
  // Dark mode: keep navy/red brand but lift navy so it reads on a dark background; background/foreground come from globals.css .dark
  `html.dark{--primary:oklch(0.55 0.11 262);--primary-foreground:#ffffff;--ring:oklch(0.65 0.11 262);--background:oklch(0.17 0.03 262);--foreground:oklch(0.96 0.01 85);}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${heading.variable} ${body.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: brandCss }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-background focus:p-2">
          Skip to content
        </a>
        <PublicChrome><SiteHeader /></PublicChrome>
        <main id="main" className="flex-1">{children}</main>
        <PublicChrome><SiteFooter /></PublicChrome>
        <JsonLd data={autoDealerJsonLd()} />
        </ThemeProvider>
      </body>
    </html>
  );
}
