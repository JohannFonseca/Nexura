"use client";

import { useEffect, useRef } from "react";
import { Code2, MessageSquare, Database, Smartphone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection({ dict }: { dict: any }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const itemsRef    = useRef<HTMLDivElement[]>([]);
  const activeLineRef = useRef<HTMLDivElement>(null);

  const services = [
    { icon: Code2,         title: dict.services.s1Title, desc: dict.services.s1Desc, num: "01" },
    { icon: MessageSquare, title: dict.services.s2Title, desc: dict.services.s2Desc, num: "02" },
    { icon: Database,      title: dict.services.s3Title, desc: dict.services.s3Desc, num: "03" },
    { icon: Smartphone,    title: dict.services.s4Title, desc: dict.services.s4Desc, num: "04" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // ── Pin left panel while items scroll ─────────
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftRef.current,
          pinSpacing: false,
        });

        // ── Each item: clip-path reveal from left ─────
        itemsRef.current.forEach((item, i) => {
          gsap.fromTo(item,
            { clipPath: "inset(0% 100% 0% 0%)", opacity: 1 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "expo.inOut",
              scrollTrigger: {
                trigger: item,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );

          // Active state highlight on the left panel
          ScrollTrigger.create({
            trigger: item,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => highlightStep(i),
            onEnterBack: () => highlightStep(i),
          });
        });
      });

      mm.add("(max-width: 1023px)", () => {
        itemsRef.current.forEach((item, i) => {
          gsap.fromTo(item,
            { x: -50, opacity: 0 },
            {
              x: 0, opacity: 1,
              duration: 0.9, delay: i * 0.1, ease: "expo.out",
              scrollTrigger: { trigger: item, start: "top 85%" },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlightStep = (activeIndex: number) => {
    itemsRef.current.forEach((item, i) => {
      const num = item.querySelector<HTMLElement>(".svc-num");
      const title = item.querySelector<HTMLElement>("h3");
      if (num && title) {
        gsap.to(num, {
          color: i === activeIndex ? "#4f8cff" : "rgba(255,255,255,0.06)",
          duration: 0.4,
        });
        gsap.to(title, {
          color: i === activeIndex ? "#ffffff" : "rgba(255,255,255,0.4)",
          duration: 0.4,
        });
      }
    });
    // Move the active line
    if (activeLineRef.current) {
      gsap.to(activeLineRef.current, {
        y: activeIndex * 100 + "%",
        duration: 0.5,
        ease: "expo.out",
      });
    }
  };

  return (
    <section ref={sectionRef} id="servicios" className="relative">
      <div className="rule" />

      {/* ── Marquee strip ───────────────────────────── */}
      <div className="overflow-hidden py-3 border-b border-white/[0.05]">
        <div className="marquee-track flex gap-16 whitespace-nowrap" style={{ width: "max-content" }}>
          {[...Array(3)].map((_, oi) =>
            services.map((s, si) => (
              <span key={`${oi}-${si}`} className="eyebrow opacity-20 shrink-0">✦ {s.title}</span>
            ))
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="lg:grid lg:grid-cols-[380px_1fr] lg:gap-16 xl:gap-24">

          {/* ── LEFT – Pinned heading ─────────────────── */}
          <div
            ref={leftRef}
            className="py-24 lg:py-32 lg:h-screen flex flex-col justify-center"
          >
            <p className="eyebrow mb-6">{dict.services.title}</p>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-8">
              {dict.services.title}
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-14">
              {dict.services.subtitle}
            </p>

            {/* Step indicators */}
            <div className="relative hidden lg:block">
              {/* Track */}
              <div className="space-y-0">
                {services.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-white/[0.05]">
                    <span className="svc-num text-3xl font-black text-white/06 font-display transition-colors duration-400 select-none"
                      style={{ color: i === 0 ? "#4f8cff" : "rgba(255,255,255,0.06)" }}
                    >
                      {s.num}
                    </span>
                    <span className="text-sm font-medium text-white/40 transition-colors duration-400"
                      style={{ color: i === 0 ? "#ffffff" : undefined }}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT – Scrolling service items ──────── */}
          <div className="py-24 lg:py-0 space-y-0">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  ref={(el) => { if (el) itemsRef.current[i] = el; }}
                  className="py-16 lg:py-20 border-b border-white/[0.06]"
                  style={{ clipPath: "inset(0% 100% 0% 0%)" }}
                >
                  <div className="flex gap-7">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1"
                      style={{
                        background: "rgba(45,91,227,0.12)",
                        border: "1px solid rgba(79,140,255,0.22)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-nx-bright" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline gap-4 mb-4">
                        <h3 className="text-2xl font-black text-white">{s.title}</h3>
                        <span className="eyebrow text-white/20">{s.num}</span>
                      </div>
                      <p className="text-white/45 text-[15px] leading-relaxed max-w-lg">{s.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rule" />
    </section>
  );
}
