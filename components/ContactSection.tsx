"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection({ dict }: { dict: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const bodyRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(wrapRef.current,
        { y: 70, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.3, ease: "expo.out",
          scrollTrigger: { trigger: wrapRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(bodyRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: "expo.out",
          scrollTrigger: { trigger: bodyRef.current, start: "top 88%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── 3D tilt ──────────────────────────────────────────
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current!.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    gsap.to(wrapRef.current, {
      rotateY: dx * 5, rotateX: -dy * 4,
      duration: 0.5, ease: "power2.out",
    });
  };
  const onLeave = () => {
    gsap.to(wrapRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 1, ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section ref={sectionRef} id="contacto" className="py-32 relative overflow-hidden">
      <div className="glow-blue absolute left-1/2 -translate-x-1/2 bottom-0 w-[700px] h-[400px] opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        {/* ── Eyebrow ──────────────────────────────────── */}
        <p className="eyebrow mb-16">Contacto</p>

        {/* ── Main CTA card ────────────────────────────── */}
        <div
          ref={wrapRef}
          className="perspective preserve-3d rounded-[2.5rem] overflow-hidden relative"
          style={{ boxShadow: "0 60px 120px rgba(5,9,26,0.8)" }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {/* Background – dark navy with blue gradient */}
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #0b1640 0%, #0f1a50 40%, #0b1640 100%)",
            }}
          />
          {/* Animated glow inside */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-50"
            style={{
              background: "radial-gradient(ellipse, rgba(45,91,227,0.4) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          {/* Fine grid texture */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(79,140,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,140,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Top rule inside card */}
          <div className="absolute top-0 left-16 right-16 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(79,140,255,0.3), transparent)" }}
          />

          {/* Content */}
          <div className="relative z-10 px-10 md:px-20 py-20 md:py-28 text-center">
            <div className="badge inline-flex mb-8">
              <span className="dot" /> Hablemos
            </div>

            <h2
              ref={titleRef}
              className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-8"
            >
              {dict.contact.title}
            </h2>

            <p className="text-white/50 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              {dict.contact.subtitle}
            </p>

            <div ref={bodyRef}>
              <Link
                href={`https://wa.me/50685803868?text=${encodeURIComponent(dict.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-nx-navy px-9 py-4 rounded-full font-bold text-base hover:bg-nx-pale transition-all duration-300"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                {dict.contact.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bottom rule inside card */}
          <div className="absolute bottom-0 left-16 right-16 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(79,140,255,0.3), transparent)" }}
          />
        </div>
      </div>
    </section>
  );
}
