"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Zap, Clock, TrendingUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BenefitsSection({ dict }: { dict: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".benefit-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const icons = [<Brain key="0" />, <Clock key="1" />, <Zap key="2" />, <TrendingUp key="3" />];

  return (
    <section 
      ref={sectionRef}
      id="beneficios" 
      className="py-24 relative overflow-hidden bg-slate-50"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {dict.benefits.title}
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            {dict.benefits.subtitle}
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {dict.benefits.items.map((item: any, idx: number) => (
            <div 
              key={idx}
              className="benefit-card group p-8 rounded-3xl bg-white border border-slate-100 hover:border-nx-mid/20 hover:shadow-2xl hover:shadow-nx-mid/5 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-nx-mid group-hover:text-white transition-all duration-500 text-nx-mid">
                {icons[idx]}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-nx-mid/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-400/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
    </section>
  );
}
