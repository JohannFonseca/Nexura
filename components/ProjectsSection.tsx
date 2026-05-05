"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection({ dict }: { dict: any }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);

  const projectsMetadata = [
    { id: 1, image: "/PuraVida_Quiz.jpg",    url: "https://pura-vida-quiz.vercel.app/",      year: "2026", type: "Interactive" },
    { id: 2, image: "/CRM_Lite.jpg",         url: "https://nexuracrm-lite.vercel.app/",      year: "2026", type: "SaaS / CRM" },
    { id: 3, image: "/Libreria_Crayola.jpg", url: "https://libreriacrayolacr.com", year: "2026", type: "E-commerce" },
    { id: 4, image: "/CF_Trainer.jpg",       url: "https://cf-personal-trainer.vercel.app/", year: "2026", type: "Personal Branding" },
  ];

  const projects = dict.projects.items.map((item: any) => ({
    ...item,
    ...projectsMetadata.find((m) => m.id === item.id),
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // ── HORIZONTAL SCROLL (the iconic GSAP technique) ─
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Restore desktop paddingRight for the track
        track.style.paddingRight = "10vw";
        // Set clamp width on each project card
        track.querySelectorAll<HTMLElement>(".proj-card").forEach((card) => {
          card.style.width = "clamp(320px, 62vw, 780px)";
          card.style.paddingRight = "3vw";
          card.style.height = "100vh";
        });

        const totalScroll = track.scrollWidth - window.innerWidth;

        const hsAnim = gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Subtle progress line
              const line = document.getElementById("proj-progress");
              if (line) line.style.width = `${self.progress * 100}%`;
            },
          },
        });

        // ── Parallax inside each card image ────────────
        track.querySelectorAll<HTMLElement>(".proj-img").forEach((img) => {
          gsap.to(img, {
            x: 40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${totalScroll}`,
              scrub: 0.8,
              containerAnimation: hsAnim,
            },
          });
        });

        return () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
          // Reset styles
          track.style.paddingRight = "";
          track.querySelectorAll<HTMLElement>(".proj-card").forEach((card) => {
            card.style.width = "";
            card.style.paddingRight = "";
            card.style.height = "";
          });
        };
      });

      // ── Mobile: normal vertical stagger ───────────────
      mm.add("(max-width: 767px)", () => {
        track.querySelectorAll<HTMLElement>(".proj-card").forEach((card, i) => {
          gsap.fromTo(card,
            { y: 80, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 1, delay: i * 0.1, ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 85%" },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="proyectos" className="relative overflow-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-white/5">
        <div id="proj-progress" className="h-full bg-nx-mid transition-none" style={{ width: "0%" }} />
      </div>

      {/* ── Track (horizontal scroll container) ────────── */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:items-stretch will-change-transform"
        style={{ paddingRight: "0" }}
      >
        {/* ── Title panel ─────────────────────────────── */}
        <div className="flex-shrink-0 w-screen md:w-[50vw] lg:w-[38vw] flex flex-col justify-center pl-[6vw] pr-8 md:pr-10 h-auto md:h-screen py-20 md:py-0">
          <p className="eyebrow mb-5">Trabajos recientes</p>
          <h2 className="text-3xl md:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
            {dict.projects.title}
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-[260px]">
            {dict.projects.subtitle}
          </p>

          {/* Scroll cue — only on desktop */}
          <div className="hidden md:flex mt-14 items-center gap-3 text-white/25 text-xs uppercase tracking-widest">
            <span>Desliza</span>
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
              <path d="M0 6h36M30 1l6 5-6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ── Project cards ─────────────────────────────── */}
        {projects.map((p: any, i: number) => (
          <div
            key={p.id}
            className="proj-card flex-shrink-0 md:h-screen flex items-center w-full md:w-auto"
            style={{ width: undefined }}
          >
            {/* On desktop, restore the clamp width via inline style only for md+ */}
            <div className="w-full" style={{ maxWidth: "780px" }}>
            <Link
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full img-card overflow-hidden"
              style={{ boxShadow: "0 40px 100px rgba(5,9,26,0.75)", cursor: "none" }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  unoptimized
                  // Extra scale so parallax x has room
                  className="proj-img object-cover object-top scale-[1.12]"
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 30%, rgba(5,9,26,0.85) 100%)" }}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-nx-mid/0 group-hover:bg-nx-mid/10 transition-colors duration-700" />

                {/* Hover badge */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-400"
                >
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 md:p-8" style={{ background: "rgba(11,22,64,0.95)" }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="badge">{p.type}</span>
                      <span className="eyebrow text-white/30">{p.year}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-gradient transition-all duration-300">
                      {p.title}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {p.tags.map((t: string) => (
                        <span key={t} className="badge">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-6xl font-black text-white/5 shrink-0 font-display">
                    0{i + 1}
                  </div>
                </div>
              </div>
            </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Rules */}
      <div className="rule" />
    </section>
  );
}
