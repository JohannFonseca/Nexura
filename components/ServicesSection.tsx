"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Code2, Laptop, Layers } from "lucide-react";

// Interactive Bento Service Card Component with 3D Mouse Tilt and Independent Icon Animation
function BentoCard({
  tag,
  title,
  desc,
  icon: Icon,
  className = "",
}: {
  tag: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates from -1 to 1
    const percentX = (x / rect.width) * 2 - 1;
    const percentY = (y / rect.height) * 2 - 1;

    // Max rotation is 6 degrees
    setCoords({
      rx: -percentY * 6,
      ry: percentX * 6,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setCoords({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative group bg-surface-card border rounded-3xl p-8 sm:p-10 transition-glow duration-300 card-tilt-parent overflow-hidden ${className}`}
      style={{
        transform: hovered && !isTouch
          ? `perspective(800px) rotateX(${coords.rx}deg) rotateY(${coords.ry}deg) translateY(-6px)`
          : hovered
          ? "translateY(-6px)"
          : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)",
        borderColor: hovered ? "rgba(0, 232, 198, 0.4)" : "rgba(255, 255, 255, 0.03)",
        boxShadow: hovered
          ? "0 20px 40px -15px rgba(0, 232, 198, 0.08), 0 0 40px rgba(0, 232, 198, 0.08)"
          : "none",
      }}
    >
      {/* Glow highlight spot inside card */}
      <div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(400px circle at 50% 50%, rgba(0, 232, 198, 0.03), transparent 80%)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-8">
        
        {/* Top bar: Icon and Badge tag */}
        <div className="flex items-center justify-between">
          
          {/* Icon - translates independent -4px on hover */}
          <div
            className="w-12 h-12 rounded-2xl bg-accent-teal/5 border border-accent-teal/15 flex items-center justify-center text-accent-teal transition-transform duration-300"
            style={{
              transform: hovered ? "translateY(-4px)" : "translateY(0)",
              boxShadow: hovered ? "0 0 15px rgba(0, 232, 198, 0.25)" : "none",
            }}
          >
            <Icon className="w-6 h-6" />
          </div>

          {/* Badge (JetBrains Mono, gold) */}
          <span
            className="font-mono text-xs text-accent-gold border border-accent-gold/25 px-3 py-1 rounded-full uppercase tracking-wider bg-accent-gold/5"
          >
            {tag}
          </span>
        </div>

        {/* Text descriptions */}
        <div>
          <h3
            className="font-syne font-bold text-2xl text-text-primary mb-3 group-hover:text-accent-teal transition-colors duration-300"
          >
            {title}
          </h3>
          <p className="font-sans font-normal text-sm sm:text-base text-text-muted leading-relaxed">
            {desc}
          </p>
        </div>

      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // Standard Scroll Entrance using IntersectionObserver
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
      id="servicios"
      className="relative bg-bg-base z-20 clip-diagonal-both border-t border-b border-white/[0.03]"
    >
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-hidden">
          <span className="font-mono text-xs text-accent-teal tracking-widest uppercase block mb-3">
            // {t.services.label}
          </span>
          <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3.2rem)] leading-tight text-text-primary mb-4">
            {t.services.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base text-text-muted">
            {t.services.subtext}
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card A (WEB - spans 2 cols on desktop) */}
          <BentoCard
            tag={t.services.cardATag}
            title={t.services.cardATitle}
            desc={t.services.cardADesc}
            icon={Code2}
            className="md:col-span-2 reveal-hidden"
          />

          {/* Card B (SAAS - spans 1 col) */}
          <BentoCard
            tag={t.services.cardBTag}
            title={t.services.cardBTitle}
            desc={t.services.cardBDesc}
            icon={Laptop}
            className="reveal-hidden"
          />

          {/* Card C (CRM - spans 1 col) */}
          <BentoCard
            tag={t.services.cardCTag}
            title={t.services.cardCTitle}
            desc={t.services.cardCDesc}
            icon={Layers}
            className="md:col-span-3 reveal-hidden"
          />

        </div>

      </div>
    </section>
  );
}
