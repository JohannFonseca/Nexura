"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { href: "#servicios", label: t.nav.services },
    { href: "#proyectos", label: t.nav.projects },
    { href: "#precios", label: t.nav.pricing },
    { href: "#contacto", label: t.nav.contact },
  ];

  return (
    <footer className="relative bg-[#07070A] z-20 border-t border-white/[0.03] pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center pb-16 border-b border-white/[0.03]">
          
          {/* Left: Brand name */}
          <div className="flex justify-center md:justify-start items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-teal shadow-[0_0_8px_#00E8C6]" />
            <span className="font-syne font-extrabold text-2xl tracking-tight text-text-primary">
              Nexuracr<span className="text-accent-gold">.dev</span>
            </span>
          </div>

          {/* Center: Links */}
          <nav className="flex justify-center flex-wrap gap-6 sm:gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-text-muted hover:text-accent-teal transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Contacts */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm font-mono text-text-muted">
            <a href="https://wa.me/50685803868" target="_blank" rel="noopener noreferrer" className="hover:text-accent-teal transition-colors">
              +506 8580 3868
            </a>
            <a
              href="mailto:nexura.cr.soporte@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-teal transition-colors"
            >
              nexura.cr.soporte@gmail.com
            </a>
          </div>

        </div>

        {/* Middle: Infinite Loop left marquee with fading mask edges and pause-on-hover */}
        <div className="relative py-12 overflow-hidden z-10 w-full select-none">
          <div
            className="flex whitespace-nowrap overflow-hidden py-2"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <div className="marquee-slide flex gap-12 text-text-muted/15 font-syne font-extrabold text-2xl sm:text-3.5xl tracking-wide uppercase">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="inline-block shrink-0">
                  {t.footer.marquee}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Strip: Rights reserved */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.03] text-xs font-mono text-text-muted">
          <p>{t.footer.rights}</p>
          <div className="flex gap-6">
            <span className="text-[10px] text-accent-gold border border-accent-gold/20 px-2 py-0.5 rounded-full uppercase">
              Costa Rica
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
