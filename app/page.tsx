import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm border-t border-slate-800">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Nexura Digital Agency. Todos los derechos reservados.</p>
        </div>
      </footer>
      <FloatingWhatsApp />
    </>
  );
}
