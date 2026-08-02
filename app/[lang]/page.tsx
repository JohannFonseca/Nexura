import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MonitorSection from "@/components/MonitorSection";
import ServicesMarquee from "@/components/ServicesMarquee";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import SunriseExperience from "@/components/SunriseExperience";
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

        {/* Endless Marquee of Services/Benefits */}
        <ServicesMarquee />

        {/* Casos de Éxito */}
        <ProjectsSection />

        {/* Portafolio (Selected Works bento grid) */}
        <PortfolioSection />

        {/* Servicios */}
        <ServicesSection />

        {/* Sunrise Experience */}
        <SunriseExperience />

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
