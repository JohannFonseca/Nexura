import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import BookingSection from "@/components/BookingSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SmoothCursor from "@/components/SmoothCursor";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, Locale } from "@/lib/dictionaries";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      {/* Custom magnetic cursor (desktop only) */}
      <SmoothCursor />

      <Navbar dict={dict} />
      <main className="flex-1 pt-16 md:pt-20">
        <HeroSection dict={dict} />
        <BenefitsSection dict={dict} />
        <ProjectsSection dict={dict} />
        <ServicesSection dict={dict} />
        <PricingSection dict={dict} />
        <BookingSection dict={dict} />
        <AboutSection dict={dict} />
        <ContactSection dict={dict} />
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/[0.05] relative bg-[#05091a]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex flex-col items-center md:items-start gap-6">
              <div className="relative w-40 h-12">
                <Image 
                  src="/LogoNexura.jpg" 
                  alt="Nexura Logo" 
                  fill
                  className="object-contain" 
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-px h-6 bg-nx-mid opacity-40" />
                <span className="text-xs text-white/20 uppercase tracking-widest">
                  Digital Agency · Costa Rica
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <p className="text-white/15 text-xs">
                © {new Date().getFullYear()} {dict.footer.rights}
              </p>
              <div className="flex gap-6">
                <Link href="#proyectos" className="text-white/20 hover:text-white text-xs transition-colors">Proyectos</Link>
                <Link href="#servicios" className="text-white/20 hover:text-white text-xs transition-colors">Servicios</Link>
                <Link href="#contacto" className="text-white/20 hover:text-white text-xs transition-colors">Contacto</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <FloatingWhatsApp dict={dict} />
    </>
  );
}
