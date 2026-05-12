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
      className="py-32 relative overflow-hidden bg-[#05091a]"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4f8cff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <p className="eyebrow mb-4">Ventajas Nexura</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
            {dict.benefits.title}
          </h2>
          <p className="text-xl text-white/45 leading-relaxed">
            {dict.benefits.subtitle}
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {dict.benefits.items.map((item: any, idx: number) => (
            <div 
              key={idx}
              className="benefit-card group p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-nx-mid/30 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-nx-mid/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-nx-mid group-hover:text-white transition-all duration-500 text-nx-bright">
                {icons[idx]}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/45 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nx-mid/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-nx-bright/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="rule mt-32" />
    </section>
  );
}
