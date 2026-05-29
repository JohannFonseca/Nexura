"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device (mobile / tablets)
    const touchCheck = () => {
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const touchSupport = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      return coarsePointer || touchSupport;
    };

    if (touchCheck()) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    if (!dotRef.current || !ringRef.current) return;

    // Set initial positions
    gsap.set(dotRef.current, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(ringRef.current, { xPercent: -50, yPercent: -50, opacity: 0 });

    // Precise dot (0 lag)
    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.05 });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.05 });

    // Ghost ring (150ms / 0.15s lag)
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.15, ease: "power2.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.15, ease: "power2.out" });

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      if (!hasMoved) {
        hasMoved = true;
        gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Scaling and styling on clickables
    const onMouseEnterClickable = () => {
      // Ring scales to 48px (from 32px -> 1.5x) and fills with 15% opacity teal
      gsap.to(ringRef.current, {
        scale: 1.5,
        backgroundColor: "rgba(0, 232, 198, 0.15)",
        borderColor: "rgba(0, 232, 198, 0.2)",
        duration: 0.25,
        ease: "power2.out",
      });
      // Dot remains constant or subtle scale
      gsap.to(dotRef.current, {
        scale: 0.8,
        duration: 0.2,
      });
    };

    const onMouseLeaveClickable = () => {
      gsap.to(ringRef.current, {
        scale: 1,
        backgroundColor: "rgba(0, 232, 198, 0)",
        borderColor: "#00E8C6",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, {
        scale: 1,
        duration: 0.2,
      });
    };

    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, input[type="submit"], input[type="button"], select, textarea, [role="button"], .interactive-tilt, .magnetic-cta'
      );
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterClickable);
        el.addEventListener("mouseleave", onMouseLeaveClickable);
      });
    };

    // Initial attach
    addHoverListeners();

    // Since SPAs change content, periodically scan or use dynamic delegation
    // Alternatively, mouseover delegation is perfect and robust!
    const onMouseOverDelegation = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isClickable = target.closest(
        'a, button, input[type="submit"], input[type="button"], select, textarea, [role="button"], .interactive-tilt, .magnetic-cta'
      );
      if (isClickable) {
        onMouseEnterClickable();
      } else {
        onMouseLeaveClickable();
      }
    };
    window.addEventListener("mouseover", onMouseOverDelegation);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOverDelegation);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* 8px filled teal circle */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-teal pointer-events-none z-[99999] will-change-transform"
        style={{
          boxShadow: "0 0 10px rgba(0, 232, 198, 0.4)",
        }}
      />
      {/* 32px ghost ring with border */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-teal pointer-events-none z-[99998] bg-transparent will-change-transform"
      />
    </>
  );
}
