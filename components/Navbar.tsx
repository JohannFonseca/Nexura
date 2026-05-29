"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { lang, t, toggleLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#servicios", label: t.nav.services },
    { href: "#proyectos", label: t.nav.projects },
    { href: "#precios", label: t.nav.pricing },
    { href: "#contacto", label: t.nav.contact },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${
          scrolled
            ? "h-[60px] bg-[#07070A]/90 backdrop-blur-[20px] border-b border-accent-teal/15"
            : "h-[76px] bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Logo - Nexuracr.dev */}
          <Link href="#inicio" className="flex items-center gap-2 group outline-none">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-[pulse_2s_infinite] shadow-[0_0_8px_#00E8C6]" />
            <span className="font-syne font-extrabold text-xl tracking-tight text-text-primary group-hover:text-accent-teal transition-colors duration-300">
              Nexuracr<span className="text-accent-gold">.dev</span>
            </span>
          </Link>

          {/* Desktop Center Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans font-medium text-sm text-text-muted hover:text-text-primary transition-colors duration-300 relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-teal transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Language Toggle: Pill shape, minimal, active bold+underline, inactive muted. No flags. */}
            <div className="flex items-center gap-1.5 bg-surface-card border border-white/[0.05] p-1 rounded-full text-xs font-mono">
              <button
                onClick={() => toggleLang("es")}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${
                  lang === "es"
                    ? "font-bold text-accent-teal underline underline-offset-4 decoration-2"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => toggleLang("en")}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${
                  lang === "en"
                    ? "font-bold text-accent-teal underline underline-offset-4 decoration-2"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA button: pill shape */}
            <Link
              href="#contacto"
              className="bg-accent-teal hover:brightness-110 text-[#07070A] font-sans font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,232,198,0.35)] hover:scale-105"
            >
              {t.nav.ctaButton} →
            </Link>
          </div>

          {/* Mobile Right & Hamburger Toggle */}
          <div className="md:hidden flex items-center gap-4">
            
            {/* Mobile Language Toggle */}
            <div className="flex items-center gap-1 bg-surface-card border border-white/[0.05] p-0.5 rounded-full text-[10px] font-mono">
              <button
                onClick={() => toggleLang("es")}
                className={`px-2 py-0.5 rounded-full transition-all duration-300 ${
                  lang === "es"
                    ? "font-bold text-accent-teal underline underline-offset-4"
                    : "text-text-muted"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => toggleLang("en")}
                className={`px-2 py-0.5 rounded-full transition-all duration-300 ${
                  lang === "en"
                    ? "font-bold text-accent-teal underline underline-offset-4"
                    : "text-text-muted"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-text-primary hover:text-accent-teal transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer (Fullscreen Overlay) */}
      <div
        className={`fixed inset-0 z-[998] bg-[#07070A] md:hidden flex flex-col justify-center px-8 transition-all duration-500 ease-in-out ${
          mobileOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6 text-center">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-syne font-bold text-3xl text-text-primary hover:text-accent-teal transition-all duration-300 transform"
              style={{
                transitionDelay: `${index * 50}ms`,
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
          
          <div
            className="mt-12 flex justify-center transform"
            style={{
              transitionDelay: `${links.length * 50}ms`,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            <Link
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="bg-accent-teal text-[#07070A] font-syne font-bold px-8 py-3.5 rounded-full w-full max-w-[280px]"
            >
              {t.nav.ctaButton} →
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
