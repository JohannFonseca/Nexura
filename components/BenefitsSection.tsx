"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Zap, Cpu, Smartphone, Rocket, Compass, ShieldCheck } from "lucide-react";

export default function BenefitsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll(".reveal-hidden");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const items = [
    {
      icon: Zap,
      label: t.differentiators.items.i1Label,
      desc: t.differentiators.items.i1Desc,
    },
    {
      icon: Cpu,
      label: t.differentiators.items.i2Label,
      desc: t.differentiators.items.i2Desc,
    },
    {
      icon: Smartphone,
      label: t.differentiators.items.i3Label,
      desc: t.differentiators.items.i3Desc,
    },
    {
      icon: Rocket,
      label: t.differentiators.items.i4Label,
      desc: t.differentiators.items.i4Desc,
    },
    {
      icon: Compass,
      label: t.differentiators.items.i5Label,
      desc: t.differentiators.items.i5Desc,
    },
    {
      icon: ShieldCheck,
      label: t.differentiators.items.i6Label,
      desc: t.differentiators.items.i6Desc,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="beneficios"
      className="relative bg-bg-base z-20 py-24 border-t border-white/[0.03] clip-diagonal-both"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 reveal-hidden">
          <span className="font-mono text-xs text-accent-teal tracking-widest uppercase block mb-3">
            // {t.differentiators.label}
          </span>
          <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3.2rem)] leading-tight text-text-primary mb-4">
            {t.differentiators.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base text-text-muted">
            {t.differentiators.subtext}
          </p>
        </div>

        {/* 6-item Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-surface-card border border-white/[0.02] p-8 rounded-3xl flex gap-6 hover:border-accent-teal/20 transition-all duration-300 reveal-hidden"
              >
                {/* SVG Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-accent-teal/5 flex items-center justify-center shrink-0 text-accent-teal border border-accent-teal/10">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-syne font-bold text-lg text-text-primary">
                    {item.label}
                  </h3>
                  <p className="font-sans text-sm text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
