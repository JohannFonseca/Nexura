"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // reveal head
      gsap.fromTo(
        ".services-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-reveal",
            start: "top 92%",
          },
        }
      );

      // stagger modules reveal
      const modules = sectionRef.current?.querySelectorAll(".service-module");
      if (modules && modules.length > 0) {
        gsap.fromTo(
          modules,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".services-modules-grid",
              start: "top 88%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const items = [
    {
      tag: t.services.saasTag,
      title: t.services.saasTitle,
      desc: t.services.saasDesc,
    },
    {
      tag: t.services.webTag,
      title: t.services.webTitle,
      desc: t.services.webDesc,
    },
    {
      tag: t.services.posTag,
      title: t.services.posTitle,
      desc: t.services.posDesc,
    },
    {
      tag: t.services.crmTag,
      title: t.services.crmTitle,
      desc: t.services.crmDesc,
    },
  ];

  return (
    <section ref={sectionRef} id="servicios" className="py-[118px] bg-bg relative z-10">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Head */}
        <div className="services-reveal max-w-[600px] mb-16 opacity-0">
          <span className="font-mono text-[12px] tracking-[0.14em] text-signal font-semibold uppercase block mb-4">
            {t.services.eyebrow}
          </span>
          <h2 className="font-display font-bold text-[clamp(28px,3.6vw,42px)] text-ink tracking-tight leading-[1.12]">
            {t.services.title}
          </h2>
        </div>

        {/* Services Modules Grid */}
        <div className="services-modules-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[1px] bg-line border border-line rounded-[14px] overflow-hidden">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="service-module bg-bg p-[34px_26px] transition-colors duration-[250ms] hover:bg-bg-alt flex flex-col justify-start opacity-0"
            >
              <span className="font-mono text-[11px] tracking-[0.1em] text-signal mb-[22px] block">
                {item.tag}
              </span>
              <h3 className="font-display font-semibold text-[19px] text-ink mb-2.5 tracking-tight">
                {item.title}
              </h3>
              <p className="text-[14.5px] text-ink-soft leading-[1.55]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
