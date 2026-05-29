"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import Image from "next/image";

// Wireframe mockup visual inside device mockup
function MockupWireframe({ type }: { type: string }) {
  return (
    <div className="absolute inset-0 p-4 sm:p-6 flex flex-col gap-4 select-none">
      
      {/* Browser Bar */}
      <div className="flex items-center gap-2 pb-3 border-b border-white/[0.05]">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="h-4 w-32 bg-white/5 rounded-md ml-4" />
      </div>

      {/* Wireframe layouts based on category */}
      {type === "WEB" && (
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="w-2/3 h-4 bg-accent-teal/15 rounded-md border border-accent-teal/10" />
          <div className="w-full h-8 bg-white/5 rounded-md border border-white/5" />
          <div className="flex gap-3">
            <div className="w-20 h-7 bg-accent-gold/15 rounded-full border border-accent-gold/10" />
            <div className="w-20 h-7 bg-white/5 rounded-full border border-white/5" />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="h-12 bg-white/[0.02] border border-white/5 rounded-lg" />
            <div className="h-12 bg-white/[0.02] border border-white/5 rounded-lg" />
            <div className="h-12 bg-white/[0.02] border border-white/5 rounded-lg" />
          </div>
        </div>
      )}

      {type === "CRM" && (
        <div className="flex-1 flex gap-4 mt-2">
          {/* Sidebar */}
          <div className="w-12 h-full bg-white/[0.02] border border-white/5 rounded-lg flex flex-col gap-2 p-1.5">
            <div className="h-3 w-full bg-accent-teal/20 rounded" />
            <div className="h-3 w-2/3 bg-white/5 rounded" />
            <div className="h-3 w-3/4 bg-white/5 rounded" />
          </div>
          {/* Main Dashboard */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="h-8 bg-white/[0.03] border border-white/5 rounded-lg flex items-center justify-between px-3">
              <div className="h-3 w-16 bg-white/10 rounded" />
              <div className="h-4 w-12 bg-accent-gold/20 border border-accent-gold/10 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 flex flex-col justify-between">
                <div className="h-2 w-8 bg-white/10 rounded" />
                <div className="h-5 w-14 bg-accent-teal/15 rounded border border-accent-teal/10" />
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 flex flex-col justify-between">
                <div className="h-2 w-8 bg-white/10 rounded" />
                <div className="h-5 w-10 bg-white/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      )}

      {type === "SAAS" && (
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex justify-between items-center">
            <div className="w-1/3 h-3 bg-white/10 rounded" />
            <div className="w-16 h-3 bg-accent-teal/20 rounded" />
          </div>
          {/* Chart Wireframe */}
          <div className="flex-1 border-b border-l border-white/10 mt-2 relative flex items-end gap-2.5 px-4 pb-1">
            <div className="w-full bg-accent-teal/15 border-t border-x border-accent-teal/25 rounded-t" style={{ height: "45%" }} />
            <div className="w-full bg-accent-gold/15 border-t border-x border-accent-gold/25 rounded-t" style={{ height: "75%" }} />
            <div className="w-full bg-accent-teal/15 border-t border-x border-accent-teal/25 rounded-t" style={{ height: "30%" }} />
            <div className="w-full bg-white/5 border-t border-x border-white/10 rounded-t" style={{ height: "60%" }} />
          </div>
        </div>
      )}

    </div>
  );
}

function ProjectTile({
  tag,
  title,
  desc,
  image,
  link = "https://wa.me/50685803868",
  isStaggered = false,
}: {
  tag: string;
  title: string;
  desc: string;
  image: string;
  link?: string;
  isStaggered?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group block bg-surface-card rounded-[2rem] border border-white/[0.03] overflow-hidden transition-all duration-500 ease-out select-none reveal-hidden ${
        isStaggered ? "lg:translate-y-12" : ""
      }`}
      style={{
        transform: hovered
          ? `${isStaggered ? "translateY(48px)" : ""} translateY(-8px)`
          : `${isStaggered ? "translateY(48px)" : ""} translateY(0)`,
        boxShadow: hovered ? "0 24px 60px -20px rgba(0, 232, 198, 0.08)" : "none",
        borderColor: hovered ? "rgba(0, 232, 198, 0.2)" : "rgba(255, 255, 255, 0.03)",
      }}
    >
      {/* Top 70%: Device Mockup Placeholder with subtle gradient shimmer */}
      <div className="relative aspect-[16/10] bg-[#0A0A0E] p-6 sm:p-8 flex items-center justify-center overflow-hidden border-b border-white/[0.03]">
        
        {/* Shimmer Background Grid Overlay */}
        <div className="absolute inset-0 shimmer-bg opacity-[0.2]" />
        
        {/* Fine Line Design Pattern Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(rgba(0, 232, 198, 0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Device Mockup */}
        <div className="w-full h-full relative device-mockup bg-bg-base overflow-hidden transition-all duration-500 group-hover:scale-[1.02]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
            unoptimized
          />
        </div>
      </div>

      {/* Bottom 30%: Details */}
      <div className="p-8 relative">
        <div className="flex flex-col gap-3">
          
          {/* Tag badge (JetBrains Mono) */}
          <div>
            <span className="font-mono text-xs text-accent-gold border border-accent-gold/20 px-3 py-1 rounded-full uppercase tracking-widest bg-accent-gold/5">
              {tag}
            </span>
          </div>

          {/* Project Name (Syne) */}
          <h3 className="font-syne font-bold text-2xl text-text-primary group-hover:text-accent-teal transition-colors duration-300">
            {title}
          </h3>

          {/* Description (DM Sans Muted) */}
          <p className="font-sans text-sm text-text-muted leading-relaxed max-w-sm">
            {desc}
          </p>

        </div>

        {/* Dynamic "→ View" Label slide-in at bottom-right */}
        <div
          className="absolute bottom-8 right-8 font-mono text-sm text-accent-teal flex items-center gap-1.5 transition-all duration-300 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
        >
          <span>→ View</span>
        </div>
      </div>
    </a >
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal-hidden");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="relative bg-bg-base z-20 py-24"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20 reveal-hidden">
          <span className="font-mono text-xs text-accent-teal tracking-widest uppercase block mb-3">
            // {t.projects.label}
          </span>
          <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3.2rem)] leading-tight text-text-primary mb-4">
            {t.projects.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base text-text-muted">
            {t.projects.subtext}
          </p>
        </div>

        {/* Asymmetric 4-tile bento layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 pb-16">
          
          {/* Tile 1: Pura Vida Quiz - WEB */}
          <ProjectTile
            tag={t.projects.items.t1Tag}
            title={t.projects.items.t1Title}
            desc={t.projects.items.t1Desc}
            image="/Pura-Vida_Quiz.png"
            link="https://pura-vida-quiz.vercel.app/"
          />

          {/* Tile 2: CRM Lite - CRM (Staggered down Y axis on desktop) */}
          <ProjectTile
            tag={t.projects.items.t2Tag}
            title={t.projects.items.t2Title}
            desc={t.projects.items.t2Desc}
            image="/CRM_Lite.jpg"
            link="https://nexuracrm-lite.vercel.app/"
            isStaggered={true}
          />

          {/* Tile 3: Librería Crayola - SAAS */}
          <ProjectTile
            tag={t.projects.items.t3Tag}
            title={t.projects.items.t3Title}
            desc={t.projects.items.t3Desc}
            image="/Libreria_Crayola.jpg"
            link="https://www.libreriacrayolacr.com/"
          />

          {/* Tile 4: CRM Parroquia - CRM (Staggered down Y axis on desktop) */}
          <ProjectTile
            tag={t.projects.items.t4Tag}
            title={t.projects.items.t4Title}
            desc={t.projects.items.t4Desc}
            image="/CRM-Parroquia.png"
            link="https://sistema-parroquia.vercel.app/"
            isStaggered={true}
          />

        </div>

      </div>
    </section>
  );
}
