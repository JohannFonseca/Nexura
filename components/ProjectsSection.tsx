"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // reveal title section
      gsap.fromTo(
        ".projects-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-reveal",
            start: "top 92%",
          },
        }
      );

      // stagger cards reveal
      const cards = sectionRef.current?.querySelectorAll(".case-card");
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
              trigger: ".cases-grid",
              start: "top 88%",
            },
          }
        );
      }

      // viewport counters count-up
      const counters = sectionRef.current?.querySelectorAll(".counter");
      counters?.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const items = [
    {
      tag: t.projects.items.tag1,
      desc: t.projects.items.desc1,
      metrics: [
        { num: t.projects.items.metric1Num1, tag: t.projects.items.metric1Tag1, suffix: "%" },
        { num: t.projects.items.metric1Num2, tag: t.projects.items.metric1Tag2, suffix: lang === "es" ? "h/día" : "h/day" },
      ],
    },
    {
      tag: t.projects.items.tag2,
      desc: t.projects.items.desc2,
      metrics: [
        { num: t.projects.items.metric2Num1, tag: t.projects.items.metric2Tag1, suffix: "" },
        { num: t.projects.items.metric2Num2, tag: t.projects.items.metric2Tag2, isStatic: true },
      ],
    },
    {
      tag: t.projects.items.tag3,
      desc: t.projects.items.desc3,
      metrics: [
        { num: t.projects.items.metric3Num1, tag: t.projects.items.metric3Tag1, suffix: "x" },
        { num: t.projects.items.metric3Num2, tag: t.projects.items.metric3Tag2, suffix: "%" },
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="casos" className="py-[76px]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Head */}
        <div className="projects-reveal max-w-[600px] mb-16 opacity-0">
          <span className="font-mono text-[12px] tracking-[0.14em] text-signal font-semibold uppercase block mb-4">
            {t.projects.eyebrow}
          </span>
          <h2 className="font-display font-bold text-[clamp(28px,3.6vw,42px)] text-ink tracking-tight leading-[1.12]">
            {t.projects.title}
          </h2>
          <p className="text-[16.5px] text-ink-soft leading-relaxed mt-4">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Cases Grid */}
        <div className="cases-grid grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="case-card border border-line rounded-[14px] bg-white p-[30px] flex flex-col gap-[22px] transition-all duration-[250ms] hover:border-[#d3d8de] hover:shadow-[0_24px_44px_-28px_rgba(11,14,20,0.22)] hover:-translate-y-1 opacity-0"
            >
              <span className="font-mono text-[11px] tracking-wider text-ink-soft uppercase">
                {item.tag}
              </span>
              <p className="text-[16px] leading-[1.55] text-ink flex-1">
                {item.desc}
              </p>
              <div className="flex gap-[22px] pt-[18px] border-t border-line">
                {item.metrics.map((m, i) => (
                  <div key={i} className="flex-1">
                    <div className="font-display text-[28px] font-bold text-signal leading-none">
                      {m.isStatic ? (
                        <span>{m.num}</span>
                      ) : (
                        <>
                          <span className="counter" data-target={m.num}>0</span>
                          {m.suffix}
                        </>
                      )}
                    </div>
                    <div className="text-[12.5px] text-ink-soft mt-1.5 leading-snug">{m.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
