"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { href: "#servicios", label: t.nav.services },
    { href: "#casos", label: t.nav.cases },
    { href: "#precios", label: t.nav.pricing },
    { href: "#nosotros", label: t.nav.about },
  ];

  return (
    <footer className="py-12 md:py-16 bg-bg relative z-10">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-line">
          
          {/* Rights Note */}
          <span className="text-[13px] text-ink-soft">
            {t.footer.rights}
          </span>
          
          {/* Nav Links */}
          <div className="flex gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-ink-soft hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
