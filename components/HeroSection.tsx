"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";

export default function HeroSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const flowPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Initial setup for GSAP animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Reset initial values natively to avoid layout shift before animation starts
      gsap.set(".hero-reveal-element", { opacity: 0, y: 28 });
      gsap.set(".line-inner", { y: "112%" });
      gsap.set(".flow-container", { opacity: 0, y: 32 });

      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 })
        .to(".line-inner", { y: "0%", duration: 1, stagger: 0.13, ease: "power4.out" }, "-=0.4")
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(".hero-cta-btn", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
        .to(".flow-container", { opacity: 1, y: 0, duration: 1 }, "-=0.8");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const waNumber = "50685803868";
  const waMsg = encodeURIComponent(
    lang === "es"
      ? "Hola Nexura, quiero contarles sobre un sistema que necesito."
      : "Hello Nexura, I want to talk about a custom system I need."
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <header
      ref={sectionRef}
      className="relative pt-[172px] pb-[100px] bg-[radial-gradient(760px_420px_at_82%_-10%,var(--color-signal-dim),transparent_60%),radial-gradient(#eceff4_1px,transparent_1px)] bg-[size:auto,26px_26px] overflow-hidden"
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] gap-10 lg:gap-5 items-center">
          
          {/* Left Copy */}
          <div className="hero-copy">
            <span className="hero-eyebrow inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.12em] text-ink font-semibold border-l-[1.5px] border-t-[1.5px] border-r-[1.5px] border-b-[1.5px] border-transparent relative px-[22px] py-[11px] mb-8 select-none">
              {/* Corner Borders */}
              <span className="absolute top-0 left-0 w-2.5 h-2.5 border-l-[1.5px] border-t-[1.5px] border-signal" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-r-[1.5px] border-b-[1.5px] border-signal" />
              
              <span className="w-1.5 h-1.5 rounded-full bg-status shadow-[0_0_0_4px_var(--color-status-dim)] animate-[pulse_1.8s_ease-in-out_infinite]" />
              {t.hero.eyebrow}
              <span className="text-signal font-bold animate-[blink_1s_steps(1)_infinite]">_</span>
            </span>

            <h1 className="font-display font-bold text-[clamp(36px,4.6vw,54px)] leading-[1.08] tracking-[-0.02em] text-ink">
              <span className="block overflow-hidden">
                <span className="line-inner block sm:whitespace-nowrap">{t.hero.title1}</span>
              </span>
              <span className="block overflow-hidden">
                <span className="line-inner block sm:whitespace-nowrap">{t.hero.title2}</span>
              </span>
              <span className="block overflow-hidden">
                <span className="line-inner block sm:whitespace-nowrap">
                  {lang === "es" ? "sistema " : "system "}
                  <span className="text-signal">{t.hero.titleAccent}</span>
                </span>
              </span>
            </h1>

            <p className="hero-sub hero-reveal-element mt-6 max-w-[480px] text-[17.5px] leading-relaxed text-ink-soft">
              {t.hero.subtitle}
            </p>

            <div className="hero-reveal-element mt-[38px] flex flex-wrap gap-4.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn inline-flex items-center gap-2 font-sans font-semibold text-[14.5px] px-6 py-3.5 rounded-full border border-transparent cursor-pointer transition-all duration-250 ease-out whitespace-nowrap bg-ink text-white hover:-translate-y-[2px] hover:shadow-[0_10px_24px_-8px_rgba(11,14,20,0.45)]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.32 4.94L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.13-4.9-4.32-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.29.29-.12.57.17.28.75 1.24 1.61 2.01 1.11 1 2.05 1.31 2.32 1.46.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.15.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.13.07.72-.17 1.4Z" />
                </svg>
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#casos"
                className="hero-cta-btn inline-flex items-center gap-2 font-sans font-semibold text-[14.5px] px-6 py-3.5 rounded-full border border-line cursor-pointer transition-all duration-250 ease-out whitespace-nowrap bg-transparent text-ink hover:border-ink"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right Visualizer - System Flow Diagram */}
          <div className="flow-container relative w-full select-none" aria-hidden="true">
            <svg className="w-full h-auto overflow-visible" viewBox="0 0 1000 240">
              {/* Background Path */}
              <path
                className="stroke-line stroke-[2px] fill-none"
                d="M60,140 C220,70 350,50 500,70 C650,90 800,70 940,150"
              />
              
              {/* Animated Drawing Path */}
              <path
                ref={flowPathRef}
                id="flowPathRef"
                className="stroke-signal stroke-[2px] fill-none"
                d="M60,140 C220,70 350,50 500,70 C650,90 800,70 940,150"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                style={{
                  animation: "drawPath 1.8s cubic-bezier(.4,.1,.2,1) 0.5s forwards"
                }}
              />
              
              {/* Flowing Status Pulses */}
              <circle className="fill-signal" r="5">
                <animateMotion dur="4s" repeatCount="indefinite">
                  <mpath href="#flowPathRef" />
                </animateMotion>
              </circle>
              <circle className="fill-status" r="4">
                <animateMotion dur="4s" begin="1.3s" repeatCount="indefinite">
                  <mpath href="#flowPathRef" />
                </animateMotion>
              </circle>
              <circle className="fill-signal" r="4">
                <animateMotion dur="4s" begin="2.6s" repeatCount="indefinite">
                  <mpath href="#flowPathRef" />
                </animateMotion>
              </circle>
            </svg>

            {/* Node: Tu Negocio */}
            <div className="absolute left-[6%] top-[58.3%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 text-center">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-white border border-line flex items-center justify-center shadow-[0_14px_26px_-16px_rgba(11,14,20,0.25)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-ink-soft">
                  <path d="M3 9.5 12 3l9 6.5V21H3V9.5Z" />
                  <path d="M9 21v-7h6v7" />
                </svg>
              </div>
              <span className="font-mono text-[10.5px] tracking-wider text-ink-soft uppercase">{lang === "es" ? "TU NEGOCIO" : "YOUR BUSINESS"}</span>
            </div>

            {/* Node: Hub (NEXURA) */}
            <div className="absolute left-[50%] top-[29.2%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 text-center">
              <div className="w-[64px] h-[64px] rounded-[16px] bg-ink border border-ink flex items-center justify-center shadow-[0_20px_40px_-16px_rgba(36,81,255,0.45)]">
                <span className="font-display font-bold text-white text-[20px]">N</span>
              </div>
              <span className="font-mono text-[10.5px] tracking-wider text-ink font-semibold uppercase">NEXURA</span>
            </div>

            {/* Node: Clientes */}
            <div className="absolute left-[94%] top-[62.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 text-center">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-white border border-line flex items-center justify-center shadow-[0_14px_26px_-16px_rgba(11,14,20,0.25)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-ink-soft">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                </svg>
              </div>
              <span className="font-mono text-[10.5px] tracking-wider text-ink-soft uppercase">{lang === "es" ? "CLIENTES" : "CLIENTS"}</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Keyframe style inline for path drawing to ensure load reliability */}
      <style jsx global>{`
        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </header>
  );
}
