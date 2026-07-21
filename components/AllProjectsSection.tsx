"use client";

import { useEffect, useRef, useMemo } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { ProjectTile } from "./PortfolioSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AllProjectsSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll to top when this section/page loads
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // reveal title
      gsap.fromTo(
        ".all-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      // stagger cards reveal
      const cards = sectionRef.current?.querySelectorAll(".all-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const projects = useMemo(() => [
    {
      tag: t.projects.items.t1Tag,
      title: t.projects.items.t1Title,
      desc: t.projects.items.t1Desc,
      image: "/Libreria_Crayola.jpg",
      link: "https://www.libreriacrayolacr.com/",
      objectPosition: "object-center",
    },
    {
      tag: t.projects.items.t2Tag,
      title: t.projects.items.t2Title,
      desc: t.projects.items.t2Desc,
      image: "/CRM_Lite.webp",
      link: "https://nexuracrm-lite.vercel.app/",
      objectPosition: "object-top",
    },
    {
      tag: t.projects.items.t3Tag,
      title: t.projects.items.t3Title,
      desc: t.projects.items.t3Desc,
      image: "/PuntoDeVentaRestaurante.png",
      link: lang === "es"
        ? "https://wa.me/50685803868?text=Hola%20Nexura,%20me%20interesa%20cotizar%20un%20Punto%20de%20Venta%20para%20Restaurante."
        : "https://wa.me/50685803868?text=Hello%20Nexura,%20I%20am%20interested%20in%20quoting%20a%20Restaurant%20POS%20System.",
      objectPosition: "object-top",
    },
    {
      tag: t.projects.items.t4Tag,
      title: t.projects.items.t4Title,
      desc: t.projects.items.t4Desc,
      image: "/Next-Interaction.jpg",
      link: "https://nextinteraction.com/",
      objectPosition: "object-top",
    },
    {
      tag: t.projects.items.t5Tag,
      title: t.projects.items.t5Title,
      desc: t.projects.items.t5Desc,
      image: "/Pura-Vida_Quiz.webp",
      link: "https://pura-vida-quiz.vercel.app/",
      objectPosition: "object-top",
    },
    {
      tag: t.projects.items.t6Tag,
      title: t.projects.items.t6Title,
      desc: t.projects.items.t6Desc,
      image: "/CF_Trainer.webp",
      link: "https://cf-personal-trainer.vercel.app/",
      objectPosition: "object-top",
    },
  ], [t, lang]);

  return (
    <section ref={sectionRef} className="py-[60px] bg-bg relative z-10 min-h-[80vh]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Head */}
        <div className="all-reveal max-w-[600px] mb-16 opacity-0">
          <span className="font-mono text-[12px] tracking-[0.14em] text-signal font-semibold uppercase block mb-4">
            {t.projects.label}
          </span>
          <h1 className="font-display font-bold text-[clamp(32px,4vw,48px)] text-ink tracking-tight leading-[1.1]">
            {lang === "es" ? "Todos los proyectos" : "All Projects"}
          </h1>
          <p className="text-[16.5px] text-ink-soft leading-relaxed mt-4">
            {t.projects.subtext}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-12">
          {projects.map((project, index) => (
            <ProjectTile
              key={index}
              tag={project.tag}
              title={project.title}
              desc={project.desc}
              image={project.image}
              link={project.link}
              objectPosition={project.objectPosition}
              isStaggered={false}
              className="all-card opacity-0"
            />
          ))}

          {/* Special text-only lead card for ¿Tu negocio aquí? */}
          {/* Special text-only lead card for ¿Tu negocio aquí? */}
          <a
            href={lang === "es"
              ? "https://wa.me/50685803868?text=Hola%20Nexura,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20de%20software%20a%20medida%20para%20mi%20negocio."
              : "https://wa.me/50685803868?text=Hello%20Nexura,%20I%20would%20like%20to%20quote%20a%20custom%20software%20project%20for%20my%20business."}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-[24px] border border-line overflow-hidden transition-all duration-300 ease-out select-none hover:-translate-y-2 hover:shadow-[0_24px_44px_-28px_rgba(11,14,20,0.22)] hover:border-[#d3d8de] all-card opacity-0"
          >
            {/* Top Area: Visual Placeholder (Dashed background + Plus icon) */}
            <div className="relative aspect-[16/10] bg-bg-alt overflow-hidden border-b border-line flex items-center justify-center p-6">
              {/* Dashed inner box for tech style */}
              <div className="absolute inset-4 rounded-[16px] border-2 border-dashed border-line group-hover:border-signal/50 transition-colors duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border border-line bg-white flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(11,14,20,0.04)] group-hover:scale-110 group-hover:border-signal group-hover:shadow-[0_0_20px_rgba(36,81,255,0.15)] transition-all duration-300">
                  <span className="font-display text-2xl font-bold text-ink-soft group-hover:text-signal transition-colors duration-300">+</span>
                </div>
              </div>
            </div>

            {/* Bottom Details */}
            <div className="p-8 relative">
              <div className="flex flex-col gap-3">
                <div>
                  <span className="font-mono text-[11px] tracking-wider text-signal font-semibold border border-signal/20 px-3 py-1 rounded-full uppercase bg-signal-dim">
                    {t.projects.items.t7Tag}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-2xl text-ink group-hover:text-signal transition-colors duration-300">
                  {t.projects.items.t7Title}
                </h3>

                <p className="text-[14.5px] text-ink-soft leading-relaxed max-w-sm">
                  {t.projects.items.t7Desc}
                </p>
              </div>

              <div className="absolute bottom-8 right-8 font-mono text-sm text-signal flex items-center gap-1.5 transition-all duration-300 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                <span>{lang === "es" ? "→ Cotizar" : "→ Quote"}</span>
              </div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
