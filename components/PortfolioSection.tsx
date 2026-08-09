"use client";

import { useEffect, useRef, useMemo } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectTile({
  tag,
  title,
  desc,
  image,
  link = "https://wa.me/50685803868",
  isStaggered = false,
  className = "",
  objectPosition = "object-top",
  isFeatured = false,
}: {
  tag: string;
  title: string;
  desc: string;
  image: string;
  link?: string;
  isStaggered?: boolean;
  className?: string;
  objectPosition?: string;
  isFeatured?: boolean;
}) {
  const staggerClasses = isStaggered ? "lg:translate-y-12" : "";
  const featuredClasses = isFeatured
    ? "border-rose-400/60 shadow-[0_20px_48px_-18px_rgba(244,63,94,0.38)] hover:shadow-[0_28px_56px_-16px_rgba(244,63,94,0.52)] hover:border-rose-500 ring-2 ring-rose-400/25 lg:scale-[1.035] lg:-translate-y-2.5 z-10"
    : "border-line hover:border-[#d3d8de] hover:shadow-[0_24px_44px_-28px_rgba(11,14,20,0.22)]";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col bg-white rounded-[24px] border overflow-hidden transition-all duration-300 ease-out select-none hover:-translate-y-2 ${featuredClasses} ${staggerClasses} ${className}`}
    >
      {/* Top Accent line for featured card */}
      {isFeatured && (
        <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 animate-pulse" />
      )}

      {/* Top Image area */}
      <div className="relative aspect-[16/10] bg-bg-alt overflow-hidden border-b border-line">
        {isFeatured && (
          <div className="absolute top-3.5 right-3.5 z-10 font-mono text-[10.5px] tracking-wider text-white font-bold bg-gradient-to-r from-rose-600 to-red-600 px-3 py-1 rounded-full uppercase shadow-lg shadow-rose-600/40 flex items-center gap-1.5 border border-white/30 backdrop-blur-sm">
            <span>★</span>
            <span>Trabajo Destacado</span>
          </div>
        )}
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover ${objectPosition} transition-transform duration-700 group-hover:scale-[1.04]`}
        />
      </div>

      {/* Bottom details */}
      <div className="p-7 flex flex-col justify-between flex-grow relative">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span
              className={`font-mono text-[11px] tracking-wider font-semibold border px-3 py-1 rounded-full uppercase ${
                isFeatured
                  ? "text-rose-600 border-rose-500/30 bg-rose-50 font-bold"
                  : "text-signal border-signal/20 bg-signal-dim"
              }`}
            >
              {tag}
            </span>
          </div>

          <h3
            className={`font-display font-semibold text-2xl text-ink transition-colors duration-300 ${
              isFeatured ? "group-hover:text-rose-600" : "group-hover:text-signal"
            }`}
          >
            {title}
          </h3>

          <p className="text-[14.5px] text-ink-soft leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Clean footer link with zero text overlap */}
        <div
          className={`mt-6 pt-2 font-mono text-sm font-semibold flex items-center justify-end gap-1.5 transition-all duration-300 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ${
            isFeatured ? "text-rose-600" : "text-signal"
          }`}
        >
          <span>{tag.includes("SAAS") || tag.includes("CRM") || tag.includes("WEB") ? "→ Visitar sitio" : "→ Ver más"}</span>
        </div>
      </div>
    </a>
  );
}

export default function PortfolioSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

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
  }, [lang]);

  const projects = useMemo(() => [
    {
      tag: t.projects.items.t2Tag,
      title: t.projects.items.t2Title,
      desc: t.projects.items.t2Desc,
      image: "/CapturaOrbitt.jpg",
      link: "https://orbitt.nextsunrise.dev/",
      objectPosition: "object-top",
    },
    {
      tag: t.projects.items.t8Tag,
      title: t.projects.items.t8Title,
      desc: t.projects.items.t8Desc,
      image: "/InicioFresaMusic.jpg",
      link: "https://slategrey-crow-130544.hostingersite.com/",
      objectPosition: "object-top",
      isFeatured: true,
    },
    {
      tag: t.projects.items.t1Tag,
      title: t.projects.items.t1Title,
      desc: t.projects.items.t1Desc,
      image: "/Libreria_Crayola.jpg",
      link: "https://www.libreriacrayolacr.com/",
      objectPosition: "object-center",
    },
  ], [t, lang]);

  return (
    <section ref={sectionRef} id="proyectos" className="py-[76px] bg-bg relative z-10">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Head */}
        <div className="portfolio-reveal max-w-[600px] mb-16">
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
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-12">
          {projects.map((project, index) => {
            return (
              <ProjectTile
                key={index}
                tag={project.tag}
                title={project.title}
                desc={project.desc}
                image={project.image}
                link={project.link}
                objectPosition={project.objectPosition}
                isStaggered={false}
                isFeatured={project.isFeatured}
                className="portfolio-card"
              />
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-8">
          <Link
            href={`/${lang}/portafolio`}
            className="group inline-flex items-center justify-center border border-line hover:border-ink hover:text-ink text-ink font-sans font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-300 bg-white cursor-pointer"
          >
            <span>{t.projects.viewAll}</span>
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-350 transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
