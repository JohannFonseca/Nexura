"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";

// High-fidelity count-up hook
function useCountUp(target: number, duration: number = 800, trigger: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration, trigger]);

  return count;
}

export default function PricingSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const proCtaRef = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);

  // Intersection observer to trigger count ups
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
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

  // Magnetic Button Effect on Middle Pro Card CTA (80px radius)
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const el = proCtaRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = el.getBoundingClientRect();
      const elX = bounds.left + bounds.width / 2;
      const elY = bounds.top + bounds.height / 2;
      const dist = Math.hypot(e.clientX - elX, e.clientY - elY);

      if (dist < 80) {
        const deltaX = (e.clientX - elX) * 0.25;
        const deltaY = (e.clientY - elY) * 0.25;
        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Numeric values for animating
  const prices = {
    es: { starter: 125000, pro: 300000, enterprise: 35000 },
    en: { starter: 250, pro: 600, enterprise: 70 },
  };

  const currentPrices = prices[lang];

  // Animated numbers
  const animatedStarterPrice = useCountUp(currentPrices.starter, 850, inView);
  const animatedProPrice = useCountUp(currentPrices.pro, 850, inView);
  const animatedEnterprisePrice = useCountUp(currentPrices.enterprise, 850, inView);

  // Formatting helpers
  const formatPrice = (val: number, isColones: boolean) => {
    if (isColones) {
      return `₡${val.toLocaleString("es-CR")}`;
    }
    return `$${val.toLocaleString("en-US")}`;
  };

  return (
    <section
      ref={sectionRef}
      id="precios"
      className="relative bg-bg-base z-20 py-24 border-b border-white/[0.03]"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 reveal-hidden">
          <span className="font-mono text-xs text-accent-teal tracking-widest uppercase block mb-3">
            // {t.pricing.label}
          </span>
          <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3.2rem)] leading-tight text-text-primary mb-4">
            {t.pricing.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base text-text-muted">
            {t.pricing.subtext}
          </p>
        </div>

        {/* Pricing Cards Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pb-12">
          
          {/* Card 1: Starter */}
          <div className="bg-surface-card border border-white/[0.02] rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-accent-teal/20 transition-all duration-300 reveal-hidden h-full">
            <div>
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest block mb-4">// PLAN STARTER</span>
              <h3 className="font-syne font-bold text-2xl text-text-primary mb-2">
                {t.pricing.starterTitle}
              </h3>
              
              {/* Animated Price Counter */}
              <div className="font-mono text-3xl sm:text-4xl font-bold text-accent-teal my-6">
                {formatPrice(animatedStarterPrice, lang === "es")}
              </div>

              {/* Feature list */}
              <ul className="flex flex-col gap-4 border-t border-white/[0.05] pt-6 mt-6">
                {t.pricing.starterFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 font-sans text-sm text-text-muted leading-relaxed">
                    <span className="text-accent-teal mt-0.5">✦</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={
                lang === "es"
                  ? "https://wa.me/50685803868?text=Hola,%20me%20interesa%20obtener%20información%20sobre%20el%20plan%20Starter%20(Landing%20Page)%20para%20mi%20negocio."
                  : "https://wa.me/50685803868?text=Hi,%20I%20am%20interested%20in%20getting%20information%20about%20the%20Starter%20(Landing%20Page)%20plan%20for%20my%20business."
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white/5 hover:bg-accent-teal hover:text-[#07070A] text-text-primary font-sans font-bold text-sm w-full py-4 rounded-full mt-8 border border-white/5 hover:border-accent-teal transition-all duration-300"
            >
              {t.pricing.starterCta}
            </a>
          </div>

          {/* Card 2: Pro (Permanently Elevated, scale 1.03, Conic rotating border glow) */}
          <div className="rotating-border-container rounded-[1.6rem] scale-100 md:scale-[1.03] shadow-[0_30px_70px_-20px_rgba(0,232,198,0.12)] reveal-hidden h-full flex flex-col">
            
            {/* Rotating Conic Gradient Glow Segment */}
            <div className="rotating-border-glow" />

            {/* Inner Surface Card */}
            <div className="rotating-border-inner p-8 sm:p-10 flex flex-col justify-between h-full flex-1 rounded-[1.5rem]">
              <div>
                
                {/* Gold badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-accent-teal uppercase tracking-widest">// PLAN PRO</span>
                  <span className="font-mono text-[10px] text-accent-gold border border-accent-gold/25 px-2 py-0.5 rounded-full uppercase tracking-wider bg-accent-gold/5 font-semibold">
                    Popular
                  </span>
                </div>

                <h3 className="font-syne font-bold text-2xl text-text-primary mb-2">
                  {t.pricing.proTitle}
                </h3>
                
                {/* Animated Price Counter */}
                <div className="font-mono text-3.5xl sm:text-4.5xl font-bold text-accent-teal my-6">
                  {formatPrice(animatedProPrice, lang === "es")}
                </div>

                {/* Feature list */}
                <ul className="flex flex-col gap-4 border-t border-white/[0.05] pt-6 mt-6">
                  {t.pricing.proFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-sans text-sm text-text-muted leading-relaxed">
                      <span className="text-accent-teal mt-0.5">✦</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Magnetic Teal button */}
              <a
                ref={proCtaRef}
                href={
                  lang === "es"
                    ? "https://wa.me/50685803868?text=Hola,%20me%20gustaría%20cotizar%20el%20plan%20Pro%20(Landing%20%2B%20Base%20de%20Datos)%20para%20desarrollar%20una%20plataforma%20a%20la%20medida."
                    : "https://wa.me/50685803868?text=Hi,%20I%20would%20like%20to%20get%20a%20quote%20for%20the%20Pro%20(Landing%20%2B%20Database)%20plan%20to%20build%20a%20custom%20platform."
                }
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-cta inline-flex items-center justify-center bg-accent-teal hover:brightness-110 text-[#07070A] font-sans font-bold text-sm w-full py-4 rounded-full mt-8 transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,232,198,0.45)] transform"
              >
                {t.pricing.proCta}
              </a>
            </div>
          </div>

          {/* Card 3: Enterprise */}
          <div className="bg-surface-card border border-white/[0.02] rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-accent-teal/20 transition-all duration-300 reveal-hidden h-full">
            <div>
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest block mb-4">// PLAN ENTERPRISE</span>
              <h3 className="font-syne font-bold text-2xl text-text-primary mb-2">
                {t.pricing.enterpriseTitle}
              </h3>
              
              {/* Animated Price Counter */}
              <div className="font-mono text-3xl sm:text-4xl font-bold text-accent-teal my-6 flex flex-wrap items-baseline gap-1">
                <span className="text-sm font-sans font-medium text-text-muted mr-1">
                  {lang === "es" ? "Desde" : "From"}
                </span>
                {formatPrice(animatedEnterprisePrice, lang === "es")}
                <span className="text-xs font-sans font-medium text-text-muted">
                  {t.pricing.enterprisePriceSuffix}
                </span>
              </div>

              {/* Feature list */}
              <ul className="flex flex-col gap-4 border-t border-white/[0.05] pt-6 mt-6">
                {t.pricing.enterpriseFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 font-sans text-sm text-text-muted leading-relaxed">
                    <span className="text-accent-teal mt-0.5">✦</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={
                lang === "es"
                  ? "https://wa.me/50685803868?text=Hola,%20quiero%20una%20cotización%20personalizada%20para%20el%20plan%20Enterprise%20(CRM%20/%20Sistema%20a%20la%20Medida)%20para%20mi%20empresa."
                  : "https://wa.me/50685803868?text=Hi,%20I%20want%20a%20custom%20quote%20for%20the%20Enterprise%20(Custom%20CRM%20/%20Custom%20System)%20plan%20for%20my%20company."
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white/5 hover:bg-accent-teal hover:text-[#07070A] text-text-primary font-sans font-bold text-sm w-full py-4 rounded-full mt-8 border border-white/5 hover:border-accent-teal transition-all duration-300"
            >
              {t.pricing.enterpriseCta}
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
