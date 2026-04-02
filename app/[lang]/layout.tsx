import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexura-cr.vercel.app"),
  title: "Nexura | Soluciones Digitales",
  description: "Agencia digital que construye soluciones modernas y efectivas para impulsar el crecimiento de tu negocio.",
  keywords: ["Desarrollo Web", "Software", "WhatsApp Automatización", "Nexura", "Agencia Digital"],
  authors: [{ name: "Nexura" }],
  openGraph: {
    title: "Nexura | Soluciones Digitales",
    description: "Agencia digital que construye soluciones modernas y efectivas.",
    url: "https://nexura-cr.vercel.app",
    siteName: "Nexura",
    images: [
      {
        url: "https://nexura-cr.vercel.app/logo-definitivo.png",
        width: 800,
        height: 600,
        alt: "Nexura Logo",
      },
    ],
    locale: "es",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
