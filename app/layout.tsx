import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
// ============================================
// ORRIVA - Local Font Configuration
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
    default: "ORRIVA — Premium Quality Products",
    template: "%s | ORRIVA",
  },
  description:
    "ORRIVA — Premium quality products curated for every occasion. Chocolates, gift boxes, and more.",
  keywords: [
    "chocolate",
    "chocolate shop",
    "Bangladesh chocolate",
    "premium chocolate",
    "dark chocolate",
    "chocolate gift",
    "chocolate",
    "ORRIVA",
  ],
  authors: [{ name: "ORRIVA" }],
  creator: "ORRIVA",
  publisher: "ORRIVA",
  metadataBase: new URL("https://ORRIVA.com"),
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: "ORRIVA",
    title: "ORRIVA — Premium Chocolate for Chocolate Lovers",
    description:
      "ORRIVA — Premium quality products curated for every occasion. Bangladesh's trusted destination for chocolates, gift boxes, and more.",
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
       <CartProvider>
        <TopBar />
        <Header />
        {children}
        <Footer />
       </CartProvider> 
      </body>
    </html>
  );
}