import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import BenefitsSection from "@/components/BenefitsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SmoothCursor from "@/components/SmoothCursor";
import IntroLoader from "@/components/IntroLoader";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Locale } from "@/lib/translations";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  // Safely parse initial locale
  const initialLang: Locale = (lang === "en" || lang === "es") ? lang : "es";

  return (
    <LanguageProvider initialLang={initialLang}>
      {/* Cinematic Intro Gate Splits Loader (max 1.6s) */}
      <IntroLoader />

      {/* Desktop-only custom magnetic cursor (Teal filled dot + ghost ring) */}
      <SmoothCursor />

      {/* Transparent-to-blur header */}
      <Navbar />

      <main className="flex-1">
        {/* Sections in correct hierarchical flow */}
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <BenefitsSection />
        <PricingSection />
        <ContactSection />
      </main>

      {/* Footer with infinite scrolling marquee */}
      <Footer />
    </LanguageProvider>
  );
}
