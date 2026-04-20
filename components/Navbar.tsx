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
    { href: "#proyectos", label: dict.navbar.projects },
    { href: "#servicios", label: dict.navbar.services },
    { href: "#nosotros",  label: dict.navbar.about },
  ];

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full transition-all duration-500"
      style={{
        /* White frosted glass — shows logo in its natural colors */
        background: scrolled
          ? "rgba(255, 255, 255, 0.97)"
          : "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: "0 1px 30px rgba(0,0,0,0.08)",
      }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">

        {/* ── Logo ─────────────────────────────────────── */}
        <Link href={`/${lang.toLowerCase()}`} className="flex items-center gap-2.5 outline-none group">
          {/* Icon mark */}
          <div
            className="flex items-center justify-center rounded-lg shrink-0"
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #2d5be3 0%, #4f8cff 100%)",
              boxShadow: "0 4px 14px rgba(45,91,227,0.4)",
            }}
          >
            {/* N lettermark */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 15V5l8 10V5"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Wordmark */}
          <span
            className="font-black tracking-tight text-[22px] leading-none select-none"
            style={{ color: "#0b1640", letterSpacing: "-0.03em" }}
          >
            nexura
          </span>
        </Link>

        {/* ── Desktop nav ──────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-slate-500">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative hover:text-slate-900 transition-colors duration-300 group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-nx-mid group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          <div className="flex items-center gap-3 ml-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-nx-mid/40 text-slate-500 hover:text-slate-800 transition-all duration-300 text-xs font-semibold"
            >
              <Globe className="w-3.5 h-3.5 text-nx-mid" />
              {lang}
            </button>
            <Link
              href="#contacto"
              className="bg-nx-mid hover:bg-nx-bright text-white px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300"
              style={{ boxShadow: "0 0 20px rgba(45,91,227,0.35)" }}
            >
              {dict.navbar.cta}
            </Link>
          </div>
        </nav>

        {/* ── Mobile toggle ────────────────────────────── */}
        <button
          className="md:hidden p-2 text-slate-500 hover:text-slate-800"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile drawer ────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full border-b border-slate-100 px-6 pb-6 flex flex-col gap-3 bg-white/97"
          style={{ backdropFilter: "blur(20px)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-slate-600 font-medium py-2.5 border-b border-slate-50 hover:text-slate-900 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => { toggleLang(); setMobileOpen(false); }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 text-slate-600 text-sm font-semibold"
            >
              <Globe className="w-3.5 h-3.5 text-nx-mid" />{lang === "ES" ? "English" : "Español"}
            </button>
            <Link
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="bg-nx-mid text-white px-5 py-3 rounded-full text-center font-semibold text-sm"
            >
              {dict.navbar.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
