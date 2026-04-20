"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SmoothCursor() {
  const spotRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spotRef.current || !dotRef.current) return;

    // ── Set initial state ─────────────────────────────
    gsap.set(spotRef.current, { opacity: 0, xPercent: -50, yPercent: -50 });
    gsap.set(dotRef.current,  { opacity: 0, xPercent: -50, yPercent: -50 });

    // ── quickTo for smooth tracking ───────────────────
    const sxTo = gsap.quickTo(spotRef.current, "x", { duration: 0.7, ease: "power3" });
    const syTo = gsap.quickTo(spotRef.current, "y", { duration: 0.7, ease: "power3" });
    const dxTo = gsap.quickTo(dotRef.current,  "x", { duration: 0.05 });
    const dyTo = gsap.quickTo(dotRef.current,  "y", { duration: 0.05 });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      sxTo(e.clientX); syTo(e.clientY);
      dxTo(e.clientX); dyTo(e.clientY);

      if (!visible) {
        visible = true;
        gsap.to([spotRef.current, dotRef.current], { opacity: 1, duration: 0.6 });
      }
    };

    window.addEventListener("mousemove", onMove);

    // ── Grow spotlight on links/buttons ──────────────
    const onEnter = () => {
      gsap.to(spotRef.current, { scale: 2.2, duration: 0.4, ease: "expo.out" });
      gsap.to(dotRef.current,  { scale: 3, background: "#4f8cff", duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(spotRef.current, { scale: 1, duration: 0.5, ease: "expo.out" });
      gsap.to(dotRef.current,  { scale: 1, background: "#ffffff", duration: 0.3 });
    };

    const targets = document.querySelectorAll("a, button");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Soft glow spotlight */}
      <div
        ref={spotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,91,227,0.12) 0%, rgba(79,140,255,0.04) 50%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#ffffff",
          willChange: "transform",
          boxShadow: "0 0 10px rgba(255,255,255,0.6)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
