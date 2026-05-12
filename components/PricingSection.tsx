"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Check } from "lucide-react";

export default function PricingSection({ dict }: { dict: any }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-card", {
        scale: 0.95,
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const plans = [dict.pricing.plan1, dict.pricing.plan2, dict.pricing.plan3];

  return (
    <section 
      ref={sectionRef}
      id="planes" 
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {dict.pricing.title}
          </h2>
          <p className="text-xl text-slate-600">
            {dict.pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan: any, idx: number) => (
            <div 
              key={idx}
              className={`pricing-card flex flex-col p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 ${
                idx === 1 
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-slate-900/20 scale-105 z-10" 
                  : "bg-white text-slate-900 border-slate-100 hover:border-nx-mid/30"
              }`}
            >
              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-4 ${idx === 1 ? "text-nx-bright" : "text-nx-mid"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-black">{plan.price}</span>
                </div>
                <p className={`text-sm mt-2 font-medium ${idx === 1 ? "text-slate-400" : "text-slate-500"}`}>
                  {plan.period}
                </p>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature: string, fIdx: number) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <div className={`mt-1 shrink-0 ${idx === 1 ? "text-nx-bright" : "text-nx-mid"}`}>
                      <Check className="w-5 h-5" />
                    </div>
                    <span className={`text-sm leading-relaxed ${idx === 1 ? "text-slate-300" : "text-slate-600"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <a 
                href={`https://wa.me/50672018610?text=Hola,%20me%20interesa%20el%20${encodeURIComponent(plan.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-2xl font-bold text-center transition-all duration-300 ${
                  idx === 1
                    ? "bg-nx-mid hover:bg-nx-bright text-white"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-900"
                }`}
              >
                Empezar Ahora
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
