"use client";

import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Unmount after animations finish (1.6s split start + 0.75s slide duration = ~2.35s total)
    const timer = setTimeout(() => {
      setMounted(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden">
      {/* Left Gate */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-[#07070A] origin-left gate-left-animate border-r border-accent-teal/5" />

      {/* Right Gate */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#07070A] origin-right gate-right-animate border-l border-accent-teal/5" />

      {/* SVG Stroke Cinematic Logo (Centered) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100000] animate-[fade-out_0.35s_cubic-bezier(0.22,1,0.36,1)_1.35s_forwards]">
        <svg
          viewBox="0 0 760 180"
          className="w-[85vw] max-w-[560px] h-auto font-syne select-none overflow-visible"
        >
          {/* Nexuracr - Electric Teal Stroke */}
          <text
            x="40"
            y="120"
            className="svg-stroke-animate font-extrabold text-[84px] tracking-tight"
            fill="none"
            stroke="#00E8C6"
            strokeWidth="2"
          >
            Nexuracr
          </text>
          
          {/* .dev - Matte Gold Solid Glow */}
          <text
            x="535"
            y="120"
            className="fade-gold-animate font-extrabold text-[84px] tracking-tight"
            fill="#C9A84C"
          >
            .dev
          </text>
        </svg>
      </div>

      {/* Hide scrollbars during cinematic entry */}
      <style jsx global>{`
        body {
          overflow: hidden !important;
        }
      `}</style>
    </div>
  );
}
