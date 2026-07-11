"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
      const easeProgress = progress * (2 - progress); // Easing out quadratic
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
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // reveal section header
      gsap.fromTo(
        ".pricing-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-reveal",
            start: "top 92%",
            onEnter: () => setInView(true),
          },
        }
      );

      // stagger cards reveal
      const cards = sectionRef.current?.querySelectorAll(".pricing-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".pricing-grid",
              start: "top 88%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  // Numeric values for animating
  const prices = {
    starterColones: 300000,
    starterDollars: 600,
    proColones: 400000,
    proDollars: 800,
    enterpriseColones: 35000,
    enterpriseDollars: 70,
  };

  // Animated numbers
  const animStarterColones = useCountUp(prices.starterColones, 850, inView);
  const animStarterDollars = useCountUp(prices.starterDollars, 850, inView);
  
  const animProColones = useCountUp(prices.proColones, 850, inView);
  const animProDollars = useCountUp(prices.proDollars, 850, inView);
  
  const animEnterpriseColones = useCountUp(prices.enterpriseColones, 850, inView);
  const animEnterpriseDollars = useCountUp(prices.enterpriseDollars, 850, inView);

  // Formatting helper
  const formatPrice = (colonesVal: number, dollarsVal: number) => {
    if (lang === "es") {
      return `₡${colonesVal.toLocaleString("es-CR")}`;
    }
    return `$${dollarsVal}`;
  };

  return (
    <section
      ref={sectionRef}
      id="precios"
      className="relative bg-bg z-10 py-[118px]"
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="pricing-reveal text-center max-w-[600px] mx-auto mb-20 opacity-0">
          <span className="font-mono text-[12px] tracking-[0.14em] text-signal font-semibold uppercase block mb-4">
            {t.pricing.label}
          </span>
          <h2 className="font-display font-bold text-[clamp(28px,3.6vw,42px)] text-ink tracking-tight leading-[1.12]">
            {t.pricing.headline}
          </h2>
          <p className="text-[16.5px] text-ink-soft leading-relaxed mt-4">
            {t.pricing.subtext}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-[22px] items-stretch pb-12">
          
          {/* Card 1: Starter */}
          <div className="pricing-card border border-line rounded-[24px] bg-white p-8 sm:p-10 flex flex-col justify-between hover:border-[#d3d8de] hover:shadow-[0_24px_44px_-28px_rgba(11,14,20,0.22)] hover:-translate-y-1 transition-all duration-[300ms] opacity-0">
            <div>
              <span className="font-mono text-[11px] tracking-wider text-ink-soft uppercase block mb-4">
                // PLAN STARTER
              </span>
              <h3 className="font-display font-semibold text-[22px] text-ink mb-1">
                {t.pricing.starterTitle}
              </h3>
              
              {/* Animated Price Counter */}
              <div className="font-mono text-[30px] sm:text-[34px] font-bold text-signal my-5">
                {formatPrice(animStarterColones, animStarterDollars)}
              </div>

              {/* Feature list */}
              <ul className="flex flex-col gap-3.5 border-t border-line pt-6 mt-6">
                {t.pricing.starterFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] text-ink-soft leading-relaxed">
                    <span className="text-signal mt-1 text-[11px]">✦</span>
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
              className="inline-flex items-center justify-center bg-transparent text-ink border border-line hover:border-ink hover:bg-bg-alt font-sans font-semibold text-sm w-full py-3.5 rounded-full mt-8 cursor-pointer transition-all duration-300"
            >
              {t.pricing.starterCta}
            </a>
          </div>

          {/* Card 2: Pro */}
          <div className="pricing-card border-[2px] border-signal rounded-[24px] bg-white p-8 sm:p-10 flex flex-col justify-between shadow-[0_24px_44px_-28px_rgba(36,81,255,0.18)] hover:-translate-y-1 transition-all duration-[300ms] opacity-0 relative">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] tracking-wider text-signal font-semibold">
                  // PLAN PRO
                </span>
                <span className="font-mono text-[9px] text-signal border border-signal/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-signal-dim font-bold">
                  Popular
                </span>
              </div>

              <h3 className="font-display font-semibold text-[22px] text-ink mb-1">
                {t.pricing.proTitle}
              </h3>
              
              {/* Animated Price Counter */}
              <div className="font-mono text-[30px] sm:text-[34px] font-bold text-signal my-5">
                {lang === "es" ? "A cotizar" : "Quote"}
              </div>

              {/* Feature list */}
              <ul className="flex flex-col gap-3.5 border-t border-line pt-6 mt-6">
                {t.pricing.proFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] text-ink-soft leading-relaxed">
                    <span className="text-signal mt-1 text-[11px]">✦</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={
                lang === "es"
                  ? "https://wa.me/50685803868?text=Hola,%20me%20gustaría%20cotizar%20el%20plan%20Pro%20(Landing%20%2B%20Base%20de%20Datos)%20para%20desarrollar%20una%20plataforma%20a%20la%20medida."
                  : "https://wa.me/50685803868?text=Hi,%20I%20would%20like%20to%20get%20a%20quote%20for%20the%20Pro%20(Landing%20%2B%20Database)%20plan%20to%20build%20a%20custom%20platform."
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-signal text-white font-sans font-semibold text-sm w-full py-3.5 rounded-full mt-8 cursor-pointer transition-all duration-300 hover:shadow-[0_10px_24px_-8px_rgba(36,81,255,0.45)] hover:-translate-y-[1px]"
            >
              {t.pricing.proCta}
            </a>
          </div>

          {/* Card 3: Enterprise */}
          <div className="pricing-card border border-line rounded-[24px] bg-white p-8 sm:p-10 flex flex-col justify-between hover:border-[#d3d8de] hover:shadow-[0_24px_44px_-28px_rgba(11,14,20,0.22)] hover:-translate-y-1 transition-all duration-[300ms] opacity-0">
            <div>
              <span className="font-mono text-[11px] tracking-wider text-ink-soft uppercase block mb-4">
                // PLAN ENTERPRISE
              </span>
              <h3 className="font-display font-semibold text-[22px] text-ink mb-1">
                {t.pricing.enterpriseTitle}
              </h3>
              
              {/* Animated Price Counter */}
              <div className="font-mono text-[30px] sm:text-[34px] font-bold text-signal my-5 flex flex-wrap items-baseline gap-1">
                <span className="text-[13px] font-sans font-normal text-ink-soft mr-1">
                  {lang === "es" ? "Desde" : "From"}
                </span>
                {formatPrice(animEnterpriseColones, animEnterpriseDollars)}
                <span className="text-[12px] font-sans font-normal text-ink-soft">
                  {t.pricing.enterprisePriceSuffix}
                </span>
              </div>

              {/* Feature list */}
              <ul className="flex flex-col gap-3.5 border-t border-line pt-6 mt-6">
                {t.pricing.enterpriseFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] text-ink-soft leading-relaxed">
                    <span className="text-signal mt-1 text-[11px]">✦</span>
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
              className="inline-flex items-center justify-center bg-transparent text-ink border border-line hover:border-ink hover:bg-bg-alt font-sans font-semibold text-sm w-full py-3.5 rounded-full mt-8 cursor-pointer transition-all duration-300"
            >
              {t.pricing.enterpriseCta}
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
