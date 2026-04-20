"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection({ dict }: { dict: any }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const quoteRef    = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Text lines stagger reveal ─────────────────────
      const lines = leftRef.current?.querySelectorAll(".txt-line");
      lines?.forEach((line, i) => {
        gsap.fromTo(line,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9, delay: i * 0.08, ease: "expo.out",
            scrollTrigger: { trigger: line, start: "top 82%" },
          }
        );
      });

      // ── Image clip-path reveal (top → down) ──────────
      gsap.fromTo(imageRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3, ease: "expo.inOut",
          scrollTrigger: { trigger: imageRef.current, start: "top 78%" },
        }
      );

      // ── Image parallax (inner img moves up slower) ────
      gsap.to(imageRef.current?.querySelector(".about-inner-img"),
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // ── Quote sliding in ─────────────────────────────
      gsap.fromTo(quoteRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 84%" },
        }
      );

      // ── Stat counters ────────────────────────────────
      const counters = statsRef.current?.querySelectorAll<HTMLElement>("[data-count]");
      counters?.forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="nosotros" className="py-32 relative overflow-hidden">
      <div className="glow-blue absolute left-0 bottom-0 w-[500px] h-[400px] opacity-35" />
      <div className="rule mb-0" />

      <div className="container mx-auto px-6 pt-20 relative z-10">
        <p className="eyebrow mb-16">{dict.about.label}</p>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* LEFT */}
          <div ref={leftRef}>
            <h2 className="txt-line text-4xl md:text-5xl font-black text-white leading-tight mb-8">
              {dict.about.titleStart}{" "}
              <span className="text-gradient">{dict.about.titleHighlight}</span>.
            </h2>
            <p className="txt-line text-white/45 text-sm leading-relaxed mb-5">{dict.about.p1}</p>
            <p className="txt-line text-white/45 text-sm leading-relaxed mb-12">{dict.about.p2}</p>

            {/* Stats grid */}
            <div ref={statsRef} className="txt-line grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.06]">
              {[
                { n: 100, suffix: "%", label: "Satisfacción" },
                { n: 3,   suffix: "+", label: "Proyectos" },
                { n: 1,   suffix: "",  label: "Equipo dedicado" },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.03] p-6 text-center hover:bg-white/[0.05] transition-colors duration-300">
                  <div
                    className="text-2xl font-black text-gradient-blue mb-1 font-display"
                    data-count={s.n}
                    data-suffix={s.suffix}
                  >
                    0{s.suffix}
                  </div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Image with clip-path reveal */}
            <div
              ref={imageRef}
              className="img-card overflow-hidden relative"
              style={{ boxShadow: "0 40px 100px rgba(5,9,26,0.8)", clipPath: "inset(0% 0% 100% 0%)" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/Nexura_CRM_Lite.png"
                  alt="Nexura en acción"
                  fill
                  unoptimized
                  className="about-inner-img object-cover object-top scale-[1.15]"
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg,transparent 50%,rgba(5,9,26,0.85) 100%)" }}
                />
                <div className="absolute bottom-6 left-6">
                  <div className="eyebrow text-white/40 mb-1">Nexura · 2025</div>
                  <div className="text-white font-bold text-sm">Soluciones que funcionan</div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div
              ref={quoteRef}
              className="glass rounded-2xl p-6"
              style={{ borderLeft: "3px solid rgba(79,140,255,0.45)" }}
            >
              <p className="text-white/65 text-sm leading-relaxed italic font-serif">
                "Si quieres escalar, nosotros ponemos la tecnología."
              </p>
              <div className="mt-3 eyebrow text-white/25">— Nexura Digital Agency</div>
            </div>
          </div>
        </div>
      </div>
      <div className="rule mt-32" />
    </section>
  );
}
