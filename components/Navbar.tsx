"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Globe, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

export default function Navbar({ dict }: { dict: any }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router   = useRouter();
  const lang = pathname.startsWith("/en") ? "EN" : "ES";

  const toggleLang = () => {
    const nl = lang === "ES" ? "en" : "es";
    router.push(pathname.replace(/^\/(en|es)/, `/${nl}`) || `/${nl}`);
  };

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -70, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.1 }
    );
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#inicio",    label: dict.navbar.home },
    { href: "#beneficios", label: "Beneficios" },
    { href: "#proyectos", label: dict.navbar.projects },
    { href: "#servicios", label: dict.navbar.services },
    { href: "#planes",    label: "Planes" },
    { href: "#nosotros",  label: dict.navbar.about },
  ];

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(5, 9, 26, 0.85)"
          : "rgba(5, 9, 26, 0.6)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">

        {/* ── Logo ─────────────────────────────────────── */}
        <Link href={`/${lang.toLowerCase()}`} className="flex items-center gap-2.5 outline-none group">
          <div className="relative w-36 h-10 md:w-52 md:h-14 lg:w-60 lg:h-16">
            <Image 
              src="/LogoNexura.jpg" 
              alt="Nexura Logo" 
              fill
              priority
              className="object-contain" 
            />
          </div>
        </Link>

        {/* ── Desktop nav ──────────────────────────────── */}
        <nav className="hidden xl:flex items-center gap-7 text-[13px] font-medium text-white/50">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative hover:text-nx-mid transition-colors duration-300 group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-nx-mid group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          <div className="flex items-center gap-3 ml-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-nx-mid/40 text-white/50 hover:text-white transition-all duration-300 text-xs font-semibold bg-white/5"
            >
              <Globe className="w-3.5 h-3.5 text-nx-mid" />
              {lang}
            </button>
            <Link
              href="#citas"
              className="bg-nx-mid hover:bg-nx-bright text-white px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300"
              style={{ boxShadow: "0 0 20px rgba(45,91,227,0.35)" }}
            >
              Agendar Cita
            </Link>
          </div>
        </nav>

        {/* ── Mobile toggle ────────────────────────────── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden p-2 text-white/70 hover:text-white transition-colors"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ── Mobile drawer ────────────────────────────────── */}
      {mobileOpen && (
        <div className="xl:hidden absolute top-16 left-0 w-full border-b border-white/10 px-6 pb-6 flex flex-col gap-3 bg-[#05091a]/95 backdrop-blur-2xl"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-lg font-bold text-white border-b border-white/5 last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-4 mt-4">
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-white/60 font-medium"
            >
              <Globe className="w-4 h-4" />
              {lang === "ES" ? "Switch to English" : "Cambiar a Español"}
            </button>
            <Link
              href="#citas"
              onClick={() => setMobileOpen(false)}
              className="bg-nx-mid text-white px-6 py-4 rounded-2xl text-center font-bold"
            >
              Agendar Cita
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
