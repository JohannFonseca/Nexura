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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: `/${lang}#servicios`, label: t.nav.services },
    { href: `/${lang}/portafolio`, label: t.nav.projects },
    { href: `/${lang}#casos`, label: t.nav.cases },
    { href: `/${lang}#precios`, label: t.nav.pricing },
    { href: `/${lang}#nosotros`, label: t.nav.about },
  ];

  const waNumber = "50685803868";
  const waMsg = encodeURIComponent(
    lang === "es"
      ? "Hola Nexura, quiero contarles sobre un sistema que necesito."
      : "Hello Nexura, I want to talk about a custom system I need."
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-350 ${
          scrolled
            ? "py-3 bg-white/82 backdrop-blur-md border-b border-line shadow-sm"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 flex items-center justify-between w-full">
          {/* Logo Column (Left-aligned, fills left third) */}
          <div className="flex-1 flex justify-start">
            <Link href={`/${lang}`} className="flex items-center gap-2 group outline-none">
              <span className="w-2 h-2 rounded-full bg-status shadow-[0_0_0_4px_var(--color-status-dim)] animate-[pulse_1.8s_ease-in-out_infinite]" />
              <span className="font-display font-bold text-xl tracking-tight text-ink group-hover:text-signal transition-colors duration-300 uppercase">
                Nexura
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links (Perfectly centered on the viewport) */}
          <nav className="hidden md:flex items-center gap-8 justify-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-soft hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions (Right-aligned, fills right third) */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            {/* Language Switch */}
            <div className="flex items-center gap-1 bg-bg-alt border border-line p-1 rounded-full text-xs font-mono">
              <button
                onClick={() => toggleLang("es")}
                className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  lang === "es"
                    ? "font-bold text-signal bg-white shadow-sm"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => toggleLang("en")}
                className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  lang === "en"
                    ? "font-bold text-signal bg-white shadow-sm"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                EN
              </button>
            </div>

            {/* WA CTA button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm px-5 py-2.5 rounded-full border border-transparent cursor-pointer transition-all duration-250 ease-out whitespace-nowrap bg-ink text-white hover:-translate-y-[2px] hover:shadow-[0_10px_24px_-8px_rgba(11,14,20,0.45)]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.32 4.94L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.13-4.9-4.32-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.29.29-.12.57.17.28.75 1.24 1.61 2.01 1.11 1 2.05 1.31 2.32 1.46.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.15.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.13.07.72-.17 1.4Z" />
              </svg>
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile hamburger & Lang Switch (Right-aligned, fills right third on mobile) */}
          <div className="md:hidden flex items-center gap-4 flex-1 justify-end">
            {/* Language Switch */}
            <div className="flex items-center gap-0.5 bg-bg-alt border border-line p-0.5 rounded-full text-[10px] font-mono">
              <button
                onClick={() => toggleLang("es")}
                className={`px-2 py-0.5 rounded-full transition-all duration-300 ${
                  lang === "es"
                    ? "font-bold text-signal bg-white shadow-sm"
                    : "text-ink-soft"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => toggleLang("en")}
                className={`px-2 py-0.5 rounded-full transition-all duration-300 ${
                  lang === "en"
                    ? "font-bold text-signal bg-white shadow-sm"
                    : "text-ink-soft"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-ink hover:text-signal transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[98] bg-white md:hidden flex flex-col justify-center px-8 transition-all duration-500 ease-in-out ${
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
              className="font-display font-bold text-3xl text-ink hover:text-signal transition-all duration-300 transform"
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
            <a
              href={waUrl}
              onClick={() => setMobileOpen(false)}
              className="bg-ink text-white font-sans font-bold px-8 py-3.5 rounded-full w-full max-w-[280px] inline-flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.32 4.94L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.13-4.9-4.32-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.29.29-.12.57.17.28.75 1.24 1.61 2.01 1.11 1 2.05 1.31 2.32 1.46.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.15.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.13.07.72-.17 1.4Z" />
              </svg>
              {t.nav.cta}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
