"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";

export default function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const elements = sectionRef.current?.querySelectorAll(".reveal-hidden");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Magnetic Button Effect on CTA Button
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const el = btnRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = el.getBoundingClientRect();
      const elX = bounds.left + bounds.width / 2;
      const elY = bounds.top + bounds.height / 2;
      const dist = Math.hypot(e.clientX - elX, e.clientY - elY);

      if (dist < 100) {
        const deltaX = (e.clientX - elX) * 0.3;
        const deltaY = (e.clientY - elY) * 0.3;
        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          scale: 1.04,
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.45, ease: "power2.out" });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.45, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative bg-bg-base z-20 py-32 overflow-hidden clip-diagonal-top border-t border-white/[0.03]"
    >
      {/* Drifting Glowing Orb Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] min-w-[320px] rounded-full bg-accent-teal/10 blur-[130px] drift-1" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center flex flex-col items-center">
        
        {/* Sub tag */}
        <span className="font-mono text-xs text-accent-gold tracking-widest uppercase block mb-4 reveal-hidden">
          // {t.finalCta.subtext}
        </span>

        {/* Headline (Syne, clamps, line-height 1.1) */}
        <h2 className="font-syne font-extrabold text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.1] tracking-tight text-text-primary max-w-3xl mb-12 reveal-hidden">
          {t.finalCta.headline}
        </h2>

        {/* Large Magnetic CTA Button with full glow on hover */}
        <div className="reveal-hidden">
          <a
            ref={btnRef}
            href="https://wa.me/50685803868"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-accent-teal hover:brightness-110 text-[#07070A] font-sans font-bold text-lg px-12 py-5 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,232,198,0.55)] transform select-none"
          >
            {t.finalCta.cta}
          </a>
        </div>

      </div>
    </section>
  );
}
