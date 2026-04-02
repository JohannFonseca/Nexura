import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexura | Soluciones Digitales",
  description: "Agencia digital que construye soluciones modernas y efectivas para impulsar el crecimiento de tu negocio.",
  keywords: ["Desarrollo Web", "Software", "WhatsApp Automatización", "Nexura", "Agencia Digital"],
  authors: [{ name: "Nexura" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
