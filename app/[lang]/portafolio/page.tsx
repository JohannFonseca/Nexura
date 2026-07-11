import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Locale } from "@/lib/translations";
import ClientCursor from "@/components/ClientCursor";
import AllProjectsSection from "@/components/AllProjectsSection";

export default async function PortafolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const initialLang: Locale = (lang === "en" || lang === "es") ? lang : "es";

  return (
    <LanguageProvider initialLang={initialLang}>
      {/* 3% Opacity Cinematic Noise Layer */}
      <div className="grain-overlay" />

      {/* Desktop-only custom magnetic cursor */}
      <ClientCursor />

      {/* Navigation header */}
      <Navbar />

      <main className="flex-1 bg-white pt-24">
        <AllProjectsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WA Button */}
      <FloatingWhatsApp />
    </LanguageProvider>
  );
}
