"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Globe, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ dict }: { dict: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLang = pathname.startsWith("/en") ? "EN" : "ES";

  const toggleLanguage = () => {
    const newLang = currentLang === "ES" ? "en" : "es";
    // Replace the first path segment
    const newPathname = pathname.replace(/^\/(en|es)/, `/${newLang}`);
    router.push(newPathname || `/${newLang}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href={`/${currentLang.toLowerCase()}`} className="flex items-center gap-2 outline-none">
          {/* New Logo Container */}
          <div className="relative h-14 w-44">
            <Image 
              src="/logo-definitivo.png" 
              alt="Nexura Logo" 
              fill
              className="object-cover object-center mix-blend-multiply"
              priority
            />
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#inicio" className="hover:text-brand-800 transition-colors">{dict.navbar.home}</Link>
          <Link href="#proyectos" className="hover:text-brand-800 transition-colors">{dict.navbar.projects}</Link>
          <Link href="#servicios" className="hover:text-brand-800 transition-colors">{dict.navbar.services}</Link>
          <Link href="#nosotros" className="hover:text-brand-800 transition-colors">{dict.navbar.about}</Link>
          
          <div className="flex items-center gap-4 ml-2">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 font-semibold text-xs"
            >
              <Globe className="w-4 h-4 text-brand-800" />
              {currentLang}
            </button>
            <Link href="#contacto" className="bg-brand-800 text-white px-5 py-2.5 rounded-full hover:bg-brand-700 transition shadow-sm">
              {dict.navbar.cta}
            </Link>
          </div>
        </nav>
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md border-b shadow-lg pb-6 px-4 flex flex-col gap-4">
          <Link href="#inicio" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium py-2 hover:text-brand-800 transition-colors">{dict.navbar.home}</Link>
          <Link href="#proyectos" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium py-2 hover:text-brand-800 transition-colors">{dict.navbar.projects}</Link>
          <Link href="#servicios" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium py-2 hover:text-brand-800 transition-colors">{dict.navbar.services}</Link>
          <Link href="#nosotros" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium py-2 hover:text-brand-800 transition-colors">{dict.navbar.about}</Link>
          
          <div className="flex flex-col gap-4 mt-2 pt-4 border-t border-slate-100">
            <button 
              onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 font-semibold text-sm w-full"
            >
              <Globe className="w-4 h-4 text-brand-800" />
              {currentLang === "ES" ? "English" : "Español"}
            </button>
            <Link href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-800 text-white px-5 py-3 rounded-full hover:bg-brand-700 transition shadow-sm text-center font-medium w-full text-sm">
              {dict.navbar.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
