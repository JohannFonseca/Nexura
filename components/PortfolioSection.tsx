"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ProjectTile({
  tag,
  title,
  desc,
  image,
  link = "https://wa.me/50685803868",
  isStaggered = false,
  className = "",
}: {
  tag: string;
  title: string;
  desc: string;
  image: string;
  link?: string;
  isStaggered?: boolean;
  className?: string;
}) {
  const staggerClasses = isStaggered ? "lg:translate-y-12" : "";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block bg-white rounded-[24px] border border-line overflow-hidden transition-all duration-300 ease-out select-none hover:-translate-y-2 hover:shadow-[0_24px_44px_-28px_rgba(11,14,20,0.22)] hover:border-[#d3d8de] ${staggerClasses} ${className}`}
    >
      {/* Top Image area */}
      <div className="relative aspect-[16/10] bg-bg-alt overflow-hidden border-b border-line">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      {/* Bottom details */}
      <div className="p-8 relative">
        <div className="flex flex-col gap-3">
          <div>
            <span className="font-mono text-[11px] tracking-wider text-signal font-semibold border border-signal/20 px-3 py-1 rounded-full uppercase bg-signal-dim">
              {tag}
            </span>
          </div>

          <h3 className="font-display font-semibold text-2xl text-ink group-hover:text-signal transition-colors duration-300">
            {title}
          </h3>

          <p className="text-[14.5px] text-ink-soft leading-relaxed max-w-sm">
            {desc}
          </p>
        </div>

        <div className="absolute bottom-8 right-8 font-mono text-sm text-signal flex items-center gap-1.5 transition-all duration-300 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
          <span>{tag === "SAAS" || tag === "CRM" || tag === "WEB" ? "→ Link" : "→ View"}</span>
        </div>
      </div>
    </a>
  );
}

export default function PortfolioSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // reveal title
      gsap.fromTo(
        ".portfolio-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".portfolio-reveal",
            start: "top 92%",
          },
        }
      );

      // stagger cards reveal
      const cards = sectionRef.current?.querySelectorAll(".portfolio-card");
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
              trigger: ".portfolio-grid",
              start: "top 88%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isExpanded, lang]);

  const projects = useMemo(() => [
    {
      tag: t.projects.items.t1Tag,
      title: t.projects.items.t1Title,
      desc: t.projects.items.t1Desc,
      image: "/Pura-Vida_Quiz.webp",
      link: "https://pura-vida-quiz.vercel.app/",
    },
    {
      tag: t.projects.items.t2Tag,
      title: t.projects.items.t2Title,
      desc: t.projects.items.t2Desc,
      image: "/CRM_Lite.webp",
      link: "https://nexuracrm-lite.vercel.app/",
    },
    {
      tag: t.projects.items.t3Tag,
      title: t.projects.items.t3Title,
      desc: t.projects.items.t3Desc,
      image: "/Libreria_Crayola.webp",
      link: "https://www.libreriacrayolacr.com/",
    },
    {
      tag: t.projects.items.t4Tag,
      title: t.projects.items.t4Title,
      desc: t.projects.items.t4Desc,
      image: "/CF_Trainer.webp",
      link: "https://cf-personal-trainer.vercel.app/",
    },
    {
      tag: t.projects.items.t5Tag,
      title: t.projects.items.t5Title,
      desc: t.projects.items.t5Desc,
      image: "/PuntoDeVentaRestaurante.png",
      link: "https://wa.me/50685803868",
    },
  ], [t]);

  return (
    <section ref={sectionRef} id="proyectos" className="py-[118px] bg-bg relative z-10">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Head */}
        <div className="portfolio-reveal max-w-[600px] mb-16 opacity-0">
          <span className="font-mono text-[12px] tracking-[0.14em] text-signal font-semibold uppercase block mb-4">
            {t.projects.label}
          </span>
          <h2 className="font-display font-bold text-[clamp(28px,3.6vw,42px)] text-ink tracking-tight leading-[1.12]">
            {t.projects.headline}
          </h2>
          <p className="text-[16.5px] text-ink-soft leading-relaxed mt-4">
            {t.projects.subtext}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pb-12">
          {projects.map((project, index) => {
            const isStaggered = index % 2 === 1;
            const isHiddenOnMobile = index >= 3 && !isExpanded;

            return (
              <ProjectTile
                key={index}
                tag={project.tag}
                title={project.title}
                desc={project.desc}
                image={project.image}
                link={project.link}
                isStaggered={isStaggered}
                className={`portfolio-card opacity-0 ${isHiddenOnMobile ? "hidden md:block" : ""}`}
              />
            );
          })}
        </div>

        {/* View More Button for mobile */}
        <div className="flex justify-center mt-8 md:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center border border-line hover:border-ink hover:text-ink text-ink font-sans font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-300 bg-white cursor-pointer"
          >
            <span>{isExpanded ? t.projects.showLess : t.projects.showMore}</span>
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
