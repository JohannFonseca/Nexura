"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SunriseExperience() {
  const { lang } = useLanguage();
  const [value, setValue] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animObject = { val: 0 };
      gsap.to(animObject, {
        val: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=150", 
          end: "bottom center",   
          scrub: 1, // Smooth scrub
          onUpdate: (self) => {
            setValue(Math.round(self.progress * 100));
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const labelText = lang === "es" 
    ? "Haz scroll para ver el amanecer" 
    : "Scroll down to see the sunrise";

  const dawnOpacity = 1 - value / 100;
  const dayOpacity = value / 100;
  
  // Sun moves from bottom (below horizon) to center
  const sunTop = 110 - value * 0.7; // 110% to 40%
  // Sun opacity fades in nicely as it appears
  const sunOpacity = Math.min(0.2 + (value / 30), 1); 

  return (
    <div ref={sectionRef} className="w-full bg-white py-20 relative z-10 border-t border-b border-line">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 flex flex-col items-center">
        
        {/* Clean, minimal brand label */}
        <div className="flex items-center gap-2 mb-10 select-none text-center">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse" />
          <span className="font-mono text-[10.5px] tracking-widest text-ink-soft uppercase font-bold">
            {labelText}
          </span>
        </div>

        {/* Abstract Minimalist Sunrise Window */}
        <div className="relative w-full h-[300px] sm:h-[450px] rounded-[32px] overflow-hidden border border-line shadow-sm select-none">
          
          {/* Dawn Background Layer (Dark/Night Sky) */}
          <div 
            className="absolute inset-0 transition-opacity duration-75 ease-out"
            style={{ 
              background: "linear-gradient(to bottom, #0f172a 0%, #1e1b4b 100%)",
              opacity: dawnOpacity
            }}
          />

          {/* Day Background Layer (Morning Sky) */}
          <div 
            className="absolute inset-0 transition-opacity duration-75 ease-out"
            style={{ 
              background: "linear-gradient(to bottom, #eff6ff 0%, #ffffff 100%)",
              opacity: dayOpacity
            }}
          />

          {/* The Rising Sun */}
          <div 
            className="absolute left-1/2 rounded-full border border-amber-300 pointer-events-none z-10 flex items-center justify-center transition-all duration-75 ease-out"
            style={{
              top: `${sunTop}%`,
              width: `${100 + (value * 0.6)}px`,
              height: `${100 + (value * 0.6)}px`,
              opacity: sunOpacity,
              background: "linear-gradient(135deg, #FDE047 0%, #F59E0B 100%)",
              transform: "translate(-50%, -50%)",
              boxShadow: `0 0 ${40 + (value * 0.8)}px rgba(245,158,11,0.6)`
            }}
          >
            {/* Inner core glow for realism */}
            <div className="w-full h-full rounded-full bg-white/50 blur-[8px] scale-75" />
          </div>

          {/* Soft vignette overlay around the borders */}
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] pointer-events-none z-20" />

          {/* Glassmorphism Horizon Line */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[20%] backdrop-blur-md border-t border-white/20 z-30 transition-colors duration-75"
            style={{
               background: `rgba(255, 255, 255, ${0.05 + (value / 250)})`
            }}
          />
        </div>

      </div>
    </div>
  );
}
