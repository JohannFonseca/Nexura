"use client";

import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Hide scrollbars natively in React on mount
    document.body.style.overflow = "hidden";

    // Unmount after animations finish (1.6s split start + 0.75s slide duration = ~2.35s total)
    const timer = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, 2400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none">
      
      {/* Left Gate */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-bg origin-left gate-left-slide-animate border-r border-line z-[99999]" />

      {/* Right Gate */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-bg origin-right gate-right-slide-animate border-l border-line z-[99999]" />

      {/* SVG Stroke Cinematic Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-[100000] logo-container-fade-out-animate pointer-events-none">
        <svg
          viewBox="0 0 760 180"
          className="w-[85vw] max-w-[560px] h-auto select-none overflow-visible"
        >
          {/* nexura - Blue Stroke */}
          <text
            x="50"
            y="120"
            className="svg-stroke-animate font-bold text-[84px] tracking-normal uppercase"
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth="2.5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            nexura
          </text>
          
          {/* dev - Ink Solid */}
          <text
            x="530"
            y="120"
            className="fade-gold-animate font-bold text-[84px] tracking-normal uppercase"
            fill="var(--color-ink)"
            style={{ fontFamily: "var(--font-display)" }}
          >
            dev
          </text>
        </svg>
      </div>
    </div>
  );
}
