"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function HeroSection() {
  const { lang, t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Mouse coords for particle parallax
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Detect layout scale & touch pointer on mount
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Canvas Particles Animation (Desktop Only)
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleCanvasResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleCanvasResize);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // Normalize coordinate offsets (-1 to 1)
      mouseRef.current.targetX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseRef.current.targetY = ((e.clientY - rect.top) / height) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize 35 particles
    const particleCount = 35;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseX: number;
      baseY: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      particles.push({
        x: rx,
        y: ry,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 1.5 + Math.random() * 1.5,
        baseX: rx,
        baseY: ry,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinate interpolation (lag effect)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Update and draw particles
      particles.forEach((p) => {
        // Dynamic speed drift
        p.baseX += p.vx;
        p.baseY += p.vy;

        // Bounce/wrap borders
        if (p.baseX < 0) p.baseX = width;
        if (p.baseX > width) p.baseX = 0;
        if (p.baseY < 0) p.baseY = height;
        if (p.baseY > height) p.baseY = 0;

        // Apply mouse parallax translation: max ±25px shift
        p.x = p.baseX + mouseRef.current.x * 25;
        p.y = p.baseY + mouseRef.current.y * 25;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 232, 198, 0.45)";
        ctx.fill();
      });

      // Draw connection lines
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect dots within 120px limit
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 232, 198, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleCanvasResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  // Magnetic Button Effect helper
  const primaryCtaRef = useRef<HTMLAnchorElement>(null);
  const secondaryCtaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isMobile) return;

    const setupMagnetic = (ref: React.RefObject<HTMLAnchorElement | null>) => {
      const el = ref.current;
      if (!el) return;

      const handleMouseMove = (e: MouseEvent) => {
        const bounds = el.getBoundingClientRect();
        const elX = bounds.left + bounds.width / 2;
        const elY = bounds.top + bounds.height / 2;
        const dist = Math.hypot(e.clientX - elX, e.clientY - elY);

        // Within 80px hover, snap button slightly towards cursor (max 7px)
        if (dist < 80) {
          const deltaX = (e.clientX - elX) * 0.25;
          const deltaY = (e.clientY - elY) * 0.25;
          gsap.to(el, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    const cleanup1 = setupMagnetic(primaryCtaRef);
    const cleanup2 = setupMagnetic(secondaryCtaRef);

    return () => {
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  }, [isMobile]);

  // Split words helper for Hero Text Reveal
  // TranslateY(70px) to 0, Opacity 0 to 1, Stagger 80ms, cubic-bezier(0.22, 1, 0.36, 1)
  // Animate on mount, triggers after loading gate starts slideouts (2.1s delay)
  const renderHeadlineWords = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-3 pb-1">
        <span
          className="inline-block transform translate-y-[70px] opacity-0 animate-[heroReveal_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          style={{
            animationDelay: `${2050 + i * 80}ms`,
          }}
        >
          {word}
        </span>
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg-base"
    >
      {/* Drifting blurred background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Orb 1: Electric Teal */}
        <div className="absolute top-[10%] left-[-10%] w-[38vw] h-[38vw] min-w-[300px] rounded-full bg-accent-teal/15 blur-[120px] drift-1" />
        
        {/* Orb 2: Dark Teal */}
        <div className="absolute bottom-[15%] right-[-5%] w-[42vw] h-[42vw] min-w-[350px] rounded-full bg-accent-teal/5 blur-[130px] drift-2" />
        
        {/* Orb 3: Near Black / Matte Gold Shadow */}
        <div className="absolute top-[40%] right-[30%] w-[32vw] h-[32vw] min-w-[280px] rounded-full bg-accent-gold/5 blur-[100px] drift-3" />
      </div>

      {/* Connection Lines & Particles Canvas */}
      {!isMobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-80"
        />
      )}

      {/* Main Content Area */}
      <div className="container mx-auto px-6 pt-32 pb-16 relative z-20 flex flex-col items-center text-center">
        
        {/* Small top label (JetBrains Mono, gold, pill border) */}
        <div
          className="inline-flex items-center gap-2 border border-accent-gold/25 px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-xs text-accent-gold tracking-wider uppercase mb-8 opacity-0 animate-[fadeIn_0.75s_ease-out_1.9s_forwards]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-ping" />
          {t.hero.label}
        </div>

        {/* Headline (Syne 800, clamp size, line-height 1.05) */}
        <h1
          className="font-syne font-extrabold text-[clamp(2.1rem,6.2vw,5.6rem)] leading-[1.05] tracking-tight text-text-primary max-w-5xl mb-6 select-none"
        >
          {renderHeadlineWords(t.hero.headline)}
        </h1>

        {/* Subtitle (DM Sans, muted, large, max-width 560px, fades as a block) */}
        <p
          className="font-sans font-normal text-base sm:text-lg md:text-xl text-text-muted max-w-[560px] leading-relaxed mb-10 opacity-0 animate-[fadeIn_0.8s_cubic-bezier(0.22,1,0.36,1)_2.4s_forwards]"
        >
          {t.hero.subtext}
        </p>

        {/* CTAs (slide up last with 60ms between them) */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          
          {/* Primary CTA (Teal fill, magnetic scale 1.03) */}
          <Link
            ref={primaryCtaRef}
            href="#proyectos"
            className="inline-flex items-center justify-center bg-accent-teal hover:brightness-110 text-[#07070A] font-sans font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,232,198,0.35)] transform scale-100 hover:scale-[1.03] opacity-0 animate-[slideUpReveal_0.8s_cubic-bezier(0.22,1,0.36,1)_2.55s_forwards]"
          >
            {t.hero.ctaPrimary}
          </Link>

          {/* Secondary CTA (Ghost outline, WhatsApp icon) */}
          <Link
            ref={secondaryCtaRef}
            href="https://wa.me/50685803868"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-white/10 hover:border-accent-teal hover:text-accent-teal text-text-primary font-sans font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-white/[0.01] hover:bg-white/[0.03] opacity-0 animate-[slideUpReveal_0.8s_cubic-bezier(0.22,1,0.36,1)_2.61s_forwards]"
          >
            {/* WhatsApp mini SVG outline */}
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.062 5.248 5.308 0 11.722 0c3.107.001 6.027 1.212 8.223 3.41 2.196 2.197 3.404 5.12 3.402 8.228-.005 6.463-5.252 11.71-11.67 11.71-2.008-.001-3.982-.515-5.732-1.493L0 24zm6.076-3.791c1.672.993 3.31 1.52 5.568 1.521 5.333 0 9.673-4.32 9.677-9.647.002-2.58-1.002-5.005-2.827-6.83-1.826-1.826-4.256-2.83-6.843-2.83-5.342 0-9.686 4.321-9.69 9.649-.001 2.148.56 4.244 1.624 6.082l-.994 3.633 3.738-.979z" />
            </svg>
            {t.hero.ctaSecondary}
          </Link>
        </div>

      </div>

      {/* Scroll indicator: thin vertical line pulsing downward, center-bottom */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 animate-[fadeIn_0.8s_ease-out_2.8s_forwards]"
      >
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-accent-teal animate-[scrollPulse_2s_infinite]" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes heroReveal {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        @keyframes slideUpReveal {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes scrollPulse {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </section>
  );
}
