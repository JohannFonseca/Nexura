import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MonitorSection from "@/components/MonitorSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Locale } from "@/lib/translations";
import ClientCursor from "@/components/ClientCursor";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  // Safely parse initial locale
  const initialLang: Locale = (lang === "en" || lang === "es") ? lang : "es";

  return (
    <LanguageProvider initialLang={initialLang}>
      {/* 3% Opacity Cinematic Noise Layer */}
      <div className="grain-overlay" />

      {/* Desktop-only custom magnetic cursor (Blue filled dot + ghost ring) */}
      <ClientCursor />

      {/* Transparent-to-blur header */}
      <Navbar />

      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <HeroSection />

        {/* Live Systems Monitor */}
        <MonitorSection />

        {/* Tech Stack Strip */}
        <div className="border-t border-b border-line py-6.5 relative z-10 bg-bg">
          <div className="max-w-[1180px] mx-auto px-6 md:px-8 flex flex-wrap items-center justify-center gap-10 md:gap-11">
            <span className="font-mono text-[12.5px] tracking-wider text-ink-soft select-none">NEXT.JS</span>
            <span className="font-mono text-[12.5px] tracking-wider text-ink-soft select-none">LARAVEL</span>
            <span className="font-mono text-[12.5px] tracking-wider text-ink-soft select-none">PHP</span>
            <span className="font-mono text-[12.5px] tracking-wider text-ink-soft select-none font-bold">WHATSAPP CLOUD API</span>
            <span className="font-mono text-[12.5px] tracking-wider text-ink-soft select-none font-bold">SINPE MÓVIL</span>
            <span className="font-mono text-[12.5px] tracking-wider text-ink-soft select-none">TURSO</span>
          </div>
        </div>

        {/* Casos de Éxito */}
        <ProjectsSection />

        {/* Portafolio (Selected Works bento grid) */}
        <PortfolioSection />

        {/* Servicios */}
        <ServicesSection />

        {/* Nosotros */}
        <AboutSection />

        {/* Planes y Precios */}
        <PricingSection />

        {/* CTA Final */}
        <ContactSection />
      </main>

      {/* Simple Clean Footer */}
      <Footer />

      {/* Floating WA Button */}
      <FloatingWhatsApp />
    </LanguageProvider>
  );
}
