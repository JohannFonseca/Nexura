"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Check, Sparkles } from "lucide-react";

export default function PricingSection({ dict }: { dict: any }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure visibility before animating
      gsap.set(".pricing-card", { opacity: 1, visibility: "visible" });
      
      gsap.from(".pricing-card", {
        scale: 0.9,
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const plans = [
    dict?.pricing?.plan1,
    dict?.pricing?.plan2,
    dict?.pricing?.plan3
  ].filter(Boolean);

  return (
    <section 
      ref={sectionRef}
      id="planes" 
      className="py-32 bg-[#05091a] relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <p className="eyebrow mb-4">Inversión Inteligente</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            {dict.pricing.title}
          </h2>
          <p className="text-xl text-white/45 leading-relaxed">
            {dict.pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan: any, idx: number) => (
            <div 
              key={idx}
              className={`pricing-card flex flex-col p-10 rounded-[2.5rem] border transition-all duration-700 relative overflow-hidden ${
                idx === 1 
                  ? "bg-nx-mid/20 border-nx-mid/50 shadow-2xl shadow-nx-mid/20 scale-105 z-10" 
                  : "bg-slate-900/40 border-white/10 hover:border-nx-mid/30"
              }`}
            >
              {idx === 1 && (
                <div className="absolute top-0 right-0 p-4">
                  <Sparkles className="w-6 h-6 text-nx-bright opacity-50" />
                </div>
              )}
              
              <div className="mb-10">
                <h3 className={`text-xl font-bold mb-6 ${idx === 1 ? "text-nx-bright" : "text-white"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-black text-white">{plan.price}</span>
                </div>
                <p className="text-sm mt-3 font-medium text-white/40">
                  {plan.period}
                </p>
              </div>

              <div className="flex-1 space-y-5 mb-12">
                {plan.features.map((feature: string, fIdx: number) => (
                  <div key={fIdx} className="flex items-start gap-4">
                    <div className={`mt-1 shrink-0 ${idx === 1 ? "text-nx-bright" : "text-nx-mid"}`}>
                      <Check className="w-5 h-5" />
                    </div>
                    <span className="text-[15px] leading-relaxed text-white/60">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <a 
                href={`https://wa.me/50672018610?text=Hola,%20me%20interesa%20el%20${encodeURIComponent(plan.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-5 rounded-2xl font-bold text-center transition-all duration-300 ${
                  idx === 1
                    ? "bg-nx-mid hover:bg-nx-bright text-white shadow-lg shadow-nx-mid/20"
                    : "bg-white/5 hover:bg-white/10 text-white"
                }`}
              >
                Empezar Proyecto
              </a>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rule mt-32" />
    </section>
  );
}
