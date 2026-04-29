"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Word component: renders each word with its own overflow-hidden wrapper
// This is SSR-safe since it renders the same HTML on server and client
function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`inline-block ${className}`} style={{ perspective: "800px" }}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="word-outer"
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            // Extra room below each word-wrapper so descenders (g, q, y, p)
            // are not clipped by overflow:hidden
            paddingBottom: "0.18em",
            marginBottom: "-0.18em",
          }}
        >
          <span
            className="word-inner"
            style={{ display: "inline-block" }}
          >
            {word}
          </span>
          {i < text.split(" ").length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection({ dict }: { dict: any }) {
  const sectionRef     = useRef<HTMLElement>(null);
  const eyebrowRef     = useRef<HTMLDivElement>(null);
  const headingRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef         = useRef<HTMLDivElement>(null);
  const statsRef       = useRef<HTMLDivElement>(null);
  const projectsRowRef = useRef<HTMLDivElement>(null);
  const scrollHintRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Eyebrow
      tl.fromTo(eyebrowRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      // 2. Words – all .word-inner inside the heading animate together
      const words = headingRef.current?.querySelectorAll(".word-inner");
      if (words?.length) {
        tl.fromTo(Array.from(words),
          { y: "108%", rotateX: 10 },
          { y: "0%", rotateX: 0, stagger: 0.055, duration: 0.9, transformOrigin: "bottom center" },
          "-=0.4"
        );
      }

      // 3. Rest of content
      tl.fromTo(subtitleRef.current,
        { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4"
      )
      .fromTo(ctaRef.current,
        { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5"
      )
      .fromTo(statsRef.current,
        { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4"
      );

      // 4. Project thumbnails – clip from left, staggered
      const thumbs = projectsRowRef.current?.querySelectorAll<HTMLElement>(".thumb-inner");
      if (thumbs?.length) {
        tl.fromTo(Array.from(thumbs),
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", stagger: 0.13, duration: 1.1, ease: "expo.inOut" },
          "-=0.5"
        );
      }

      tl.fromTo(scrollHintRef.current,
        { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.3"
      );

      // 5. Counters (after entrance finishes)
      const statEls = statsRef.current?.querySelectorAll<HTMLElement>("[data-count]");
      statEls?.forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2, ease: "power2.out", delay: 1.5,
          onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
        });
      });

      // 6. Scroll parallax
      gsap.to(headingRef.current, {
        y: 80, opacity: 0.1, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "60% top", scrub: 1 },
      });
      gsap.to(projectsRowRef.current, {
        y: -50, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    { img: "/CRM_Lite.jpg",         label: "CRM Lite",      url: "https://nexuracrm-lite.vercel.app/",      eager: true },
    { img: "/PuraVida_Quiz.jpg",    label: "Quiz",          url: "https://pura-vida-quiz.vercel.app/",      eager: false },
    { img: "/Libreria_Crayola.jpg", label: "E-commerce",    url: "https://libreria-crayola-cr.vercel.app/", eager: false },
    { img: "/CF_Trainer.jpg",       label: "CF Trainer",    url: "https://cf-personal-trainer.vercel.app/", eager: false },
  ];

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 100% 90% at 50% 55%, #0b1640 0%, #05091a 100%)" }}
        />
        <div className="glow-blue  absolute left-[-5%]  top-[10%]  w-[600px] h-[600px]" />
        <div className="glow-bright absolute right-[5%] bottom-[15%] w-[400px] h-[400px] opacity-60" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(79,140,255,1) 1px, transparent 1px),linear-gradient(90deg,rgba(79,140,255,1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-10 relative z-10 max-w-5xl">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-8">
          <span className="eyebrow">Nexura Digital Agency</span>
          <span className="rule flex-1 max-w-[50px]" />
          <span className="badge"><span className="dot" />CR · 2025</span>
        </div>

        {/* Heading with SSR-safe word split */}
        <h1
          ref={headingRef}
          className="text-[clamp(2.6rem,10vw,5.5rem)] md:text-7xl xl:text-[88px] font-black leading-[1.0] tracking-tight mb-6 md:mb-8"
        >
          <WordReveal text={dict.hero.title} className="text-white" />{" "}
          <WordReveal text={dict.hero.titleHighlight} className="text-gradient" />
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-sm md:text-lg text-white/45 leading-relaxed max-w-xl mb-8 md:mb-10">
          {dict.hero.subtitle}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-3 md:gap-4 items-center mb-10 md:mb-16">
          <Link
            href={`https://wa.me/50685803868?text=${encodeURIComponent(dict.hero.whatsappMessage)}`}
            target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-2.5 bg-nx-mid hover:bg-nx-bright text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300"
            style={{ boxShadow: "0 0 30px rgba(45,91,227,0.5)" }}
          >
            {dict.hero.ctaPrimary}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#proyectos"
            className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-300"
          >
            {dict.hero.ctaSecondary} →
          </Link>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-4 md:flex md:gap-12 border-t border-white/[0.06] pt-6 md:pt-8 mb-10 md:mb-16">
          {[
            { n: 3,   suffix: "+", label: "Proyectos" },
            { n: 100, suffix: "%", label: "Satisfacción" },
            { n: 24,  suffix: "h", label: "Respuesta" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-2xl font-black text-gradient-blue font-display"
                data-count={s.n}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </div>
              <div className="text-[11px] text-white/25 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Project thumbnails row */}
        <div ref={projectsRowRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {projects.map((p, i) => (
            <Link
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              {/* thumb-inner is what gets clip-path animated */}
              <div
                className="thumb-inner img-card overflow-hidden"
                style={{ clipPath: "inset(0% 100% 0% 0%)", boxShadow: "0 20px 50px rgba(5,9,26,0.6)" }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.label}
                    fill
                    unoptimized
                    loading={p.eager ? "eager" : "lazy"}
                    className="object-cover object-top scale-[1.08] group-hover:scale-[1.14] transition-transform duration-700"
                  />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 30%, rgba(5,9,26,0.8) 100%)" }}
                  />
                  <div className="absolute bottom-3 left-4 eyebrow text-white/50">{p.label}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 rule" />
      <div ref={scrollHintRef}
        className="hidden md:flex absolute bottom-8 right-8 items-center gap-2 text-white/20 text-[11px] tracking-widest uppercase"
      >
        <span>Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 bounce-slow" />
      </div>
    </section>
  );
}
