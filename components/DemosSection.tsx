"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Layers, ShieldCheck, PhoneCall, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DemosSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal head
      gsap.fromTo(
        ".demos-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".demos-reveal",
            start: "top 90%",
          },
        }
      );

      // Stagger cards
      const cards = sectionRef.current?.querySelectorAll(".demo-card");
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
              trigger: ".demos-grid",
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const waNumber = "50685803868";

  const getWaUrl = (demoName: string) => {
    const msg = lang === "es"
      ? `Hola Next Sunrise, me interesa solicitar acceso anticipado para probar la demo de ${demoName}.`
      : `Hello Next Sunrise, I'm interested in early access to test the demo for ${demoName}.`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  };

  const demoItems = [
    {
      id: "crm",
      tag: "MOD.CRM",
      title: t.demos.crmTitle,
      desc: t.demos.crmDesc,
      status: t.demos.badgeSoon,
      ctaText: t.demos.crmCta,
      icon: Layers,
      accentColor: "from-blue-500/10 to-indigo-500/5",
      borderColor: "hover:border-blue-300",
      previewLines: lang === "es" ? [
        { label: "Leads Activos", val: "48", color: "bg-blue-500" },
        { label: "Embudo de Ventas", val: "₡4.2M", color: "bg-emerald-500" },
        { label: "WhatsApp Bot", val: "Activo", color: "bg-amber-500" },
      ] : [
        { label: "Active Leads", val: "48", color: "bg-blue-500" },
        { label: "Sales Pipeline", val: "$8.5k", color: "bg-emerald-500" },
        { label: "WhatsApp Bot", val: "Active", color: "bg-amber-500" },
      ]
    },
    {
      id: "onplate",
      tag: "MOD.AR_MENU",
      title: t.demos.onplateTitle,
      desc: t.demos.onplateDesc,
      status: t.demos.badgeSoon,
      ctaText: t.demos.onplateCta,
      icon: Sparkles,
      accentColor: "from-purple-500/10 to-pink-500/5",
      borderColor: "hover:border-purple-300",
      previewLines: lang === "es" ? [
        { label: "Platillos en 3D", val: "En tu mesa", color: "bg-purple-500" },
        { label: "Realidad Aumentada", val: "360° Interactivo", color: "bg-pink-500" },
        { label: "Escanea y Elige", val: "Con Confianza", color: "bg-emerald-500" },
      ] : [
        { label: "3D Dishes", val: "On your table", color: "bg-purple-500" },
        { label: "Augmented Reality", val: "360° Interactive", color: "bg-pink-500" },
        { label: "Scan & Order", val: "With Confidence", color: "bg-emerald-500" },
      ]
    },
    {
      id: "kora",
      tag: "MOD.ERP",
      title: t.demos.koraTitle,
      desc: t.demos.koraDesc,
      status: t.demos.badgeSoon,
      ctaText: t.demos.koraCta,
      icon: ShieldCheck,
      accentColor: "from-amber-500/10 to-orange-500/5",
      borderColor: "hover:border-amber-300",
      previewLines: lang === "es" ? [
        { label: "Gestión ERP", val: "100% Integrado", color: "bg-orange-500" },
        { label: "Control Operativo", val: "Inventario + Ventas", color: "bg-emerald-500" },
        { label: "Solicitar Demo", val: "Vía WhatsApp", color: "bg-blue-500" },
      ] : [
        { label: "ERP Management", val: "100% Integrated", color: "bg-orange-500" },
        { label: "Operations Control", val: "Inventory + Sales", color: "bg-emerald-500" },
        { label: "Request Demo", val: "Via WhatsApp", color: "bg-blue-500" },
      ]
    },
    {
      id: "ai",
      tag: "MOD.VOICE_AI",
      title: t.demos.aiTitle,
      desc: t.demos.aiDesc,
      status: t.demos.badgeSoon,
      ctaText: t.demos.aiCta,
      icon: PhoneCall,
      accentColor: "from-emerald-500/10 to-teal-500/5",
      borderColor: "hover:border-emerald-300",
      previewLines: lang === "es" ? [
        { label: "Agente Telefónico", val: "Voz IA 24/7", color: "bg-emerald-500" },
        { label: "Reservas Mesa", val: "100% Automático", color: "bg-blue-500" },
        { label: "Solicitar Demo", val: "Vía WhatsApp", color: "bg-purple-500" },
      ] : [
        { label: "Phone Agent", val: "Voice AI 24/7", color: "bg-emerald-500" },
        { label: "Table Bookings", val: "100% Automatic", color: "bg-blue-500" },
        { label: "Request Demo", val: "Via WhatsApp", color: "bg-purple-500" },
      ]
    },
  ];

  return (
    <section ref={sectionRef} id="demos" className="py-[84px] bg-bg-alt/50 border-t border-b border-line relative z-10">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="demos-reveal max-w-[680px] mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal-dim border border-signal/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.14em] text-signal font-semibold uppercase">
              {t.demos.label}
            </span>
          </div>
          <h2 className="font-display font-bold text-[clamp(28px,3.6vw,42px)] text-ink tracking-tight leading-[1.12]">
            {t.demos.headline}
          </h2>
          <p className="text-[16.5px] text-ink-soft leading-relaxed mt-4">
            {t.demos.subtext}
          </p>
        </div>

        {/* Demos Bento Grid */}
        <div className="demos-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoItems.map((demo) => {
            const Icon = demo.icon;
            const isCrm = demo.id === "crm";
            const href = isCrm ? "https://orbitt.nextsunrise.dev/" : getWaUrl(demo.title);
            const statusBadge = isCrm ? t.demos.badgeLive : demo.status;
            const badgeStyle = isCrm
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-amber-50 text-amber-700 border-amber-200";
            const dotStyle = isCrm ? "bg-emerald-500" : "bg-amber-500";

            return (
              <div
                key={demo.id}
                className={`demo-card opacity-0 group bg-white rounded-[24px] border border-line overflow-hidden p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-20px_rgba(11,14,20,0.15)] ${demo.borderColor}`}
              >
                <div>
                  {/* Card Top Row: Tag & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[10px] tracking-wider text-ink-soft font-semibold uppercase bg-bg-alt border border-line px-2.5 py-1 rounded-full">
                      {demo.tag}
                    </span>

                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium border ${badgeStyle}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dotStyle} animate-pulse`} />
                      {statusBadge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-bg-alt border border-line flex items-center justify-center text-ink group-hover:scale-105 group-hover:border-signal/40 transition-all duration-300">
                      <Icon className="w-5 h-5 text-signal" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-ink group-hover:text-signal transition-colors duration-300">
                      {demo.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[13.5px] text-ink-soft leading-relaxed mb-6">
                    {demo.desc}
                  </p>

                  {/* Mini Interactive Sandbox Visual Preview */}
                  <div className={`p-4 rounded-xl border border-line bg-gradient-to-br ${demo.accentColor} mb-6`}>
                    <div className="space-y-2.5">
                      {demo.previewLines.map((line, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11.5px] font-mono bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-line/60">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${line.color}`} />
                            <span className="text-ink-soft">{line.label}</span>
                          </div>
                          <span className="font-semibold text-ink">{line.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Action */}
                <div>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-sans text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                      isCrm
                        ? "bg-signal text-white hover:bg-signal/90 border-transparent shadow-sm hover:shadow-md"
                        : "bg-bg-alt hover:bg-ink hover:text-white border-line text-ink"
                    }`}
                  >
                    <span>{isCrm ? (lang === "es" ? "Probar Demo en Vivo" : "Try Live Demo") : demo.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
