import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-custom",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-custom",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono-custom",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexuracr.dev"),
  title: "Nexuracr.dev | Premium Custom Software & SaaS Studio",
  description:
    "Estudio costarricense de software especializado en plataformas SaaS, sistemas CRM y desarrollo web a la medida. Entrega rápida, resultados serios.",
  keywords: [
    "Desarrollo de Software Costa Rica",
    "SaaS desarrollo",
    "CRM a medida",
    "Nexuracr.dev",
    "Estudio de software",
    "Desarrollo web premium",
  ],
  authors: [{ name: "Nexuracr.dev" }],
  openGraph: {
    title: "Nexuracr.dev | Premium Custom Software & SaaS Studio",
    description:
      "Construimos el software que escala tu negocio. SaaS, CRM y plataformas web premium. Entrega rápida, resultados serios.",
    url: "https://nexuracr.dev",
    siteName: "Nexuracr.dev",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Nexuracr.dev Logo",
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
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col bg-bg text-ink"
        suppressHydrationWarning
      >
        <div className="grain-overlay" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
