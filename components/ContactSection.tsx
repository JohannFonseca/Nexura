"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // reveal CTA card
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const waNumber = "50685803868";
  const waMsg = encodeURIComponent(
    lang === "es"
      ? "Hola Nexura, quiero contarles sobre un sistema que necesito."
      : "Hello Nexura, I want to talk about a custom system I need."
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <section className="py-[76px]">
      <div
        ref={sectionRef}
        className="max-w-[1116px] mx-auto px-6 md:px-8 opacity-0"
      >
        <div className="bg-ink text-white rounded-[24px] py-20 px-8 md:px-[50px] text-center relative overflow-hidden">
          
          <span className="font-mono text-[12px] tracking-[0.14em] text-[#8ea2ff] font-semibold uppercase block mb-4">
            {t.cta.eyebrow}
          </span>
          <h2 className="font-display font-bold text-[clamp(28px,3.6vw,42px)] text-white tracking-tight leading-[1.12] max-w-[640px] mx-auto">
            {t.cta.title}
          </h2>
          <p className="text-[16.5px] text-[#a7adba] leading-relaxed max-w-[480px] mx-auto mt-4">
            {t.cta.subtitle}
          </p>

          <div className="mt-[38px] flex flex-wrap gap-4.5 justify-center">
            {/* Primary WA Button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans font-semibold text-[14.5px] px-6 py-3.5 rounded-full border border-transparent cursor-pointer transition-all duration-250 ease-out whitespace-nowrap bg-signal text-white hover:-translate-y-[2px] hover:shadow-[0_10px_24px_-8px_rgba(36,81,255,0.45)]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.32 4.94L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.13-4.9-4.32-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.29.29-.12.57.17.28.75 1.24 1.61 2.01 1.11 1 2.05 1.31 2.32 1.46.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.15.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.13.07.72-.17 1.4Z" />
              </svg>
              {t.cta.button}
            </a>
            
            {/* Ghost Services Link */}
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 font-sans font-semibold text-[14.5px] px-6 py-3.5 rounded-full border border-[#333844] cursor-pointer transition-all duration-250 ease-out whitespace-nowrap bg-transparent text-white hover:border-white"
            >
              {t.cta.subButton}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
