"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // reveal split section
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

  const rows = [
    { label: t.about.row1Label, val: t.about.row1Val },
    { label: t.about.row2Label, val: t.about.row2Val },
    { label: t.about.row3Label, val: t.about.row3Val },
    { label: t.about.row4Label, val: t.about.row4Val },
  ];

  return (
    <section ref={sectionRef} id="nosotros" className="py-[118px] relative z-10 opacity-0">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          
          {/* Left Text */}
          <div className="about-copy">
            <span className="font-mono text-[12px] tracking-[0.14em] text-signal font-semibold uppercase block mb-4">
              {t.about.eyebrow}
            </span>
            <h2 className="font-display font-bold text-[clamp(28px,3.6vw,42px)] text-ink tracking-tight leading-[1.12] mb-[22px]">
              {t.about.title}
            </h2>
            <p className="text-[16.5px] text-ink-soft leading-relaxed">
              {t.about.p1Start}
              <strong className="text-ink font-semibold">{t.about.p1Bold}</strong>
              {t.about.p1End}
            </p>
            <p className="text-[16.5px] text-ink-soft leading-relaxed mt-[18px]">
              {t.about.p2}
            </p>
          </div>

          {/* Right Stats Box */}
          <div className="border border-line rounded-[14px] p-[34px] bg-bg-alt">
            {rows.map((row, idx) => (
              <div
                key={idx}
                className={`flex justify-between py-3.5 border-b border-line text-[14.5px] ${
                  idx === rows.length - 1 ? "border-b-0" : ""
                }`}
              >
                <span className="text-ink-soft">{row.label}</span>
                <span className="font-mono font-medium text-ink">{row.val}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
