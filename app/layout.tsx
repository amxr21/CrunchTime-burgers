import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site-config";
import { CartProvider } from "@/lib/cart/CartContext";
import { ToastProvider } from "@/lib/toast/ToastContext";

const teko = localFont({
  variable: "--font-teko",
  src: [
    { path: "../public/fonts/Teko-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/Teko-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Teko-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Teko-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Teko-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${teko.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col px-4 sm:px-8 lg:px-28 " suppressHydrationWarning>
        <CartProvider>
          <ToastProvider>
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
