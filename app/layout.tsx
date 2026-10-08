import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ============================================
// COCAVYN - Local Font Configuration
// Self-hosted fonts (no internet dependency)
// ============================================

const playfair = localFont({
  src: [
    {
      path: "../public/fonts/playfair-display/PlayfairDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/playfair-display/PlayfairDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/Inter_28pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/Inter_28pt-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = localFont({
  src: [
    {
      path: "../public/fonts/hind-siliguri/HindSiliguri-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/hind-siliguri/HindSiliguri-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hind-siliguri",
  display: "swap",
});

// ============================================
// Metadata (SEO)
// ============================================

export const metadata: Metadata = {
  title: {
    default: "COCAVYN — Premium Chocolate for Chocolate Lovers",
    template: "%s | COCAVYN",
  },
  description:
    "COCAVYN — Premium chocolates, gift boxes, and chocolate bouquets made for every occasion.",
  keywords: [
    "chocolate",
    "chocolate shop",
    "Bangladesh chocolate",
    "premium chocolate",
    "dark chocolate",
    "chocolate gift",
    "chocolate",
    "COCAVYN",
  ],
  authors: [{ name: "COCAVYN" }],
  creator: "COCAVYN",
  publisher: "COCAVYN",
  metadataBase: new URL("https://cocavyn.com"),
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: "COCAVYN",
    title: "COCAVYN — Premium Chocolate for Chocolate Lovers",
    description:
      "Bangladesh’s premium chocolate shop, offering exquisite chocolates, beautifully curated gift boxes, and stunning chocolate bouquets."
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ============================================
// Root Layout
// ============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${playfair.variable} ${inter.variable} ${hindSiliguri.variable}`}
    >
      <body className="antialiased font-sans bg-cream text-cocoa-dark">
        <TopBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}