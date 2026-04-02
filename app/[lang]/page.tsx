import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getDictionary, Locale } from "@/lib/dictionaries";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navbar dict={dict} />
      <main className="flex-1">
        <HeroSection dict={dict} />
        <ProjectsSection dict={dict} />
        <ServicesSection dict={dict} />
        <AboutSection dict={dict} />
        <ContactSection dict={dict} />
      </main>
      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm border-t border-slate-800">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} {dict.footer.rights}</p>
        </div>
      </footer>
      <FloatingWhatsApp dict={dict} />
    </>
  );
}
