"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ dict }: { dict: any }) {
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href={`/${currentLang.toLowerCase()}`} className="flex items-center gap-2">
          {/* We use the logo-alt.png we renamed */}
          <div className="relative h-12 w-40">
            <Image 
              src="/logo-alt.png" 
              alt="Nexura Logo" 
              fill
              className="object-contain object-left"
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
        <button className="md:hidden p-2 text-slate-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
