"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MonitorSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [liveSecs, setLiveSecs] = useState(0);

  // Live verificado ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSecs((prev) => (prev + 1) % 13);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // reveal whole monitor section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
          },
        }
      );

      // number ticker count-up when scrolled into view
      const counters = sectionRef.current?.querySelectorAll(".counter");
      counters?.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") || "0");
        const isFloat = el.getAttribute("data-decimals") === "1";
        const thousands = el.getAttribute("data-thousands") === "true";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onUpdate() {
            if (isFloat) {
              el.textContent = obj.val.toFixed(1);
            } else if (thousands) {
              el.textContent = Math.round(obj.val).toLocaleString(
                lang === "es" ? "es-CR" : "en-US"
              );
            } else {
              el.textContent = Math.round(obj.val).toString();
            }
          },
        });
      });

      // bar chart micro pulse animation
      const bars = sectionRef.current?.querySelectorAll(".monitor-item-bar");
      if (bars && bars.length > 0) {
        gsap.to(bars, {
          scaleY: 1.35,
          duration: 1.1,
          ease: "sine.inOut",
          stagger: { each: 0.08, repeat: -1, yoyo: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const items = [
    {
      label: t.monitor.saas,
      target: "99.98",
      decimals: "2",
      thousands: "false",
      unit: "%",
      caption: t.monitor.saasDesc,
      bars: [7, 14, 9, 18, 12, 20, 16],
    },
    {
      label: t.monitor.web,
      target: "0.8",
      decimals: "1",
      thousands: "false",
      unit: "s",
      caption: t.monitor.webDesc,
      bars: [10, 16, 8, 14, 20, 11, 17],
    },
    {
      label: t.monitor.pos,
      target: "1240",
      decimals: "0",
      thousands: "true",
      unit: "",
      caption: t.monitor.posDesc,
      bars: [14, 9, 20, 15, 10, 18, 13],
    },
    {
      label: t.monitor.crm,
      target: "86",
      decimals: "0",
      thousands: "false",
      unit: "",
      caption: t.monitor.crmDesc,
      bars: [9, 17, 13, 20, 8, 15, 11],
    },
  ];

  return (
    <section className="py-0 relative z-10 -mt-16">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <div
          ref={sectionRef}
          className="border border-line rounded-[14px] bg-bg shadow-[0_30px_60px_-30px_rgba(11,14,20,0.18)] overflow-hidden"
        >
          {/* Monitor Head */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-line bg-bg-alt">
            <span className="font-mono text-[11.5px] tracking-widest text-ink-soft">
              {t.monitor.title}
            </span>
            <div className="flex gap-1.5">
              <i className="w-2 h-2 rounded-full bg-line" />
              <i className="w-2 h-2 rounded-full bg-line" />
              <i className="w-2 h-2 rounded-full bg-line" />
            </div>
          </div>

          {/* Monitor Subhead */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-line">
            <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
              <span className="w-2 h-2 rounded-full bg-status shadow-[0_0_0_4px_var(--color-status-dim)] animate-[pulse_1.8s_ease-in-out_infinite]" />
              {t.monitor.status}
            </span>
            <span className="font-mono text-[11px] text-ink-soft">
              {lang === "es"
                ? `verificado hace ${liveSecs}s`
                : `verified ${liveSecs}s ago`}
            </span>
          </div>

          {/* Monitor Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`p-[22px_20px] border-b md:border-b-0 border-line ${
                  idx % 2 === 0 ? "border-r" : "md:border-r"
                } ${idx < 3 ? "md:border-r" : "md:border-r-0"} ${
                  idx === 2 || idx === 3 ? "border-b-0" : ""
                }`}
              >
                <div className="font-mono text-[11px] tracking-wider text-ink-soft flex items-center gap-1.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-status" />
                  {item.label}
                </div>
                <div className="font-display text-[26px] font-semibold text-ink">
                  <span
                    className="counter"
                    data-target={item.target}
                    data-decimals={item.decimals}
                    data-thousands={item.thousands}
                  >
                    0
                  </span>
                  {item.unit && (
                    <span className="text-[16px] font-medium text-ink-soft ml-0.5">
                      {item.unit}
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-ink-soft mt-1">{item.caption}</div>

                {/* Micro Bar Chart */}
                <div className="flex items-end gap-[3px] h-[22px] mt-3">
                  {item.bars.map((h, i) => (
                    <i
                      key={i}
                      className="monitor-item-bar flex-1 bg-status-dim rounded-[2px] origin-bottom"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
