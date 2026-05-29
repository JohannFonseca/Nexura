"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";
import { Home, BarChart2, User, Settings, LayoutDashboard, Users, Package } from "lucide-react";

export default function HeroSection() {
  const { lang, t } = useLanguage();
  const visualizerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

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

      {/* SaaS & Cloud Architecture Visualizer (Stripe/Linear style) */}
      <div
        ref={visualizerRef}
        className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[98vw] max-w-[920px] aspect-[16/9] z-10 pointer-events-none select-none overflow-visible opacity-[0.82] hover:opacity-[0.92] transition-opacity duration-700 scale-[0.35] min-[400px]:scale-[0.42] sm:scale-[0.6] md:scale-[0.8] lg:scale-100"
      >
          {/* Backplane: SVG Omnichannel Sync Beams with animated flowing dots */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Fine grid dotted layout lines */}
            <defs>
              <linearGradient id="teal-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E8C6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00E8C6" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="gold-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.02" />
              </linearGradient>
              <pattern id="infra-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="0.75" fill="rgba(0, 232, 198, 0.07)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#infra-dots)" />

            {/* Connecting flow lines from Laptop (Left) to POS Tablet (Center-Bottom) */}
            <path
              d="M 270 200 C 330 200, 330 310, 420 310"
              fill="none"
              stroke="rgba(0, 232, 198, 0.12)"
              strokeWidth="1.5"
            />
            <path
              d="M 270 200 C 330 200, 330 310, 420 310"
              fill="none"
              stroke="#00E8C6"
              strokeWidth="1.5"
              className="data-flow-line opacity-40"
            />

            {/* Connecting flow lines from Laptop (Left) to Smartphone (Right) */}
            <path
              d="M 270 140 C 450 140, 450 160, 700 160"
              fill="none"
              stroke="rgba(0, 232, 198, 0.12)"
              strokeWidth="1.5"
            />
            <path
              d="M 270 140 C 450 140, 450 160, 700 160"
              fill="none"
              stroke="#00E8C6"
              strokeWidth="1.5"
              className="data-flow-line opacity-40"
            />

            {/* Connecting flow lines from POS Tablet (Center-Bottom) to Smartphone (Right) */}
            <path
              d="M 520 310 C 620 310, 620 200, 700 200"
              fill="none"
              stroke="rgba(0, 232, 198, 0.12)"
              strokeWidth="1.5"
            />
            <path
              d="M 520 310 C 620 310, 620 200, 700 200"
              fill="none"
              stroke="#00E8C6"
              strokeWidth="1.5"
              className="data-flow-line opacity-40"
            />

            {/* Left Edge Input path — Representing active store sales syncing */}
            <path
              d="M -50 155 H 110"
              fill="none"
              stroke="rgba(0, 232, 198, 0.08)"
              strokeWidth="1"
            />

            {/* Glowing moving flow dot along Laptop -> POS Tablet */}
            <circle r="3" fill="#00E8C6" className="shadow-[0_0_8px_#00E8C6]">
              <animateMotion
                path="M 270 200 C 330 200, 330 310, 420 310"
                dur="4.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Glowing moving flow dot along Laptop -> Smartphone */}
            <circle r="3" fill="#00E8C6" className="shadow-[0_0_8px_#00E8C6]">
              <animateMotion
                path="M 270 140 C 450 140, 450 160, 700 160"
                dur="5.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Glowing moving flow dot along POS Tablet -> Smartphone */}
            <circle r="2.5" fill="#C9A84C" className="shadow-[0_0_6px_#C9A84C]">
              <animateMotion
                path="M 520 310 C 620 310, 620 200, 700 200"
                dur="3.8s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* Device 1: Widescreen Laptop Mockup (z-10, CRM & Executive Portal) (Parallax: 12px) */}
          <div
            className="absolute left-[3%] top-[8%] w-[490px] h-[290px] z-10 backdrop-blur-xl bg-[#0F0F14]/40 border border-white/[0.08] rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-300 hover:border-accent-teal/30 hover:shadow-[0_25px_60px_rgba(0,232,198,0.15)] group/laptop flex flex-col justify-between"
          >
            {/* Top window bar macOS style */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/10 group-hover/laptop:bg-[#FF5F56] transition-colors" />
                <span className="w-2 h-2 rounded-full bg-white/10 group-hover/laptop:bg-[#FFBD2E] transition-colors" />
                <span className="w-2 h-2 rounded-full bg-white/10 group-hover/laptop:bg-[#27C93F] transition-colors" />
              </div>
              <span className="font-mono text-[8px] text-accent-gold tracking-widest uppercase font-bold">// NEXURA_CONTROL // ERP</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            </div>
            
            {/* Split Screen Portal Layout */}
            <div className="flex-1 flex gap-3.5 overflow-hidden">
              {/* Sidebar Portal Navigation */}
              <div className="w-[105px] border-r border-white/[0.05] pr-2.5 flex flex-col gap-2 font-mono text-[8.5px] text-text-muted">
                <div className="text-accent-teal font-bold bg-accent-teal/5 border border-accent-teal/10 px-2 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer group">
                  <LayoutDashboard className="w-3 h-3 text-accent-teal" /> Dashboard
                </div>
                <div className="hover:text-white px-2 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer group">
                  <Users className="w-3 h-3 text-text-muted group-hover:text-white transition-colors" /> Clientes
                </div>
                <div className="hover:text-white px-2 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer group">
                  <Package className="w-3 h-3 text-text-muted group-hover:text-white transition-colors" /> Inventario
                </div>
                <div className="hover:text-white px-2 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer group">
                  <Settings className="w-3 h-3 text-text-muted group-hover:text-white transition-colors" /> Ajustes
                </div>
              </div>

              {/* Main CRM Area */}
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* KPI Metrics Widgets */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-bg-base/60 border border-white/[0.03] p-2 rounded-xl flex flex-col justify-center">
                    <span className="font-mono text-[7px] text-text-muted uppercase">Facturación Mensual</span>
                    <span className="font-sans font-bold text-xs text-white mt-0.5">₡18,450,000</span>
                    <span className="font-mono text-[7px] text-accent-teal mt-0.5">▲ +24.8% este mes</span>
                  </div>
                  <div className="bg-bg-base/60 border border-white/[0.03] p-2 rounded-xl flex flex-col justify-center">
                    <span className="font-mono text-[7px] text-text-muted uppercase">Facturas Emitidas</span>
                    <span className="font-sans font-bold text-xs text-white mt-0.5">1,248</span>
                    <span className="font-mono text-[7px] text-accent-teal mt-0.5">✓ Sincronizadas MH</span>
                  </div>
                </div>

                {/* Sales Graph Chart */}
                <div className="bg-bg-base/40 border border-white/[0.02] p-2 rounded-xl flex-1 mt-2.5 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-center border-b border-white/5 pb-1 mb-1">
                    <span className="font-mono text-[7px] text-text-muted uppercase">Ventas de la Semana</span>
                    <span className="font-mono text-[7px] text-accent-gold font-semibold">En Vivo</span>
                  </div>
                  {/* Styled SVG Area Chart representing professional Sales Curve */}
                  <svg viewBox="0 0 300 80" className="w-full h-[75px] overflow-visible">
                    <defs>
                      <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00E8C6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#00E8C6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid Guide lines */}
                    <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    {/* Gradient Fill Area */}
                    <path
                      d="M 0 60 Q 50 15 100 45 T 200 10 T 300 35 L 300 80 L 0 80 Z"
                      fill="url(#chart-fill)"
                    />
                    {/* Glowing Stroke Path */}
                    <path
                      d="M 0 60 Q 50 15 100 45 T 200 10 T 300 35"
                      fill="none"
                      stroke="#00E8C6"
                      strokeWidth="2"
                      className="shadow-[0_0_10px_#00E8C6]"
                    />
                    {/* Hot point dot */}
                    <circle cx="200" cy="10" r="3.5" fill="#C9A84C" className="animate-pulse" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Device 2: POS Tablet Mockup (z-15, Omnichannel checkout) (Parallax: 18px) */}
          <div
            className="absolute left-[35%] top-[50%] w-[330px] h-[210px] z-15 backdrop-blur-xl bg-[#0F0F14]/45 border border-white/[0.08] rounded-2xl p-4 shadow-[0_30px_70px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-accent-teal/30 hover:shadow-[0_25px_60px_rgba(0,232,198,0.15)] group/pos flex flex-col justify-between"
          >
            {/* Top Bar POS Title */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-2.5">
              <span className="font-mono text-[8px] text-accent-gold tracking-widest uppercase font-bold">// NEXURA_POS // RESTAURANTE SUCURSAL</span>
              <div className="flex items-center gap-1.5 font-mono text-[7px] text-accent-teal uppercase font-bold bg-accent-teal/5 border border-accent-teal/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-[pulse_1s_infinite]" />
                <span>Factura Electrónica</span>
              </div>
            </div>

            {/* Split Screen POS Checkout */}
            <div className="flex-1 flex gap-3 overflow-hidden">
              {/* Left Column: Current Checkout Invoice (span 3) */}
              <div className="flex-1 flex flex-col justify-between font-mono text-[8.5px] text-text-muted bg-bg-base/40 border border-white/[0.02] p-2.5 rounded-xl overflow-hidden">
                <div className="flex flex-col gap-1.5 overflow-hidden">
                  <span className="font-bold text-white border-b border-white/5 pb-1">Factura Actual</span>
                  <div className="flex justify-between text-white/80">
                    <span>1x Software Facturación</span>
                    <span>₡180,000</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>1x Integración API MH</span>
                    <span>₡120,000</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-accent-teal border-t border-white/5 pt-1.5 mt-1 text-[9.5px]">
                  <span>TOTAL COBRO:</span>
                  <span>₡300,000</span>
                </div>
              </div>

              {/* Right Column: Checkout Controls & Processing (span 2) */}
              <div className="w-[110px] flex flex-col justify-between font-mono text-[8px] text-text-muted">
                <div className="bg-bg-base/30 border border-white/[0.03] p-1.5 rounded-lg flex flex-col gap-1 justify-center">
                  <span>Terminal: <span className="text-white">Caja 01</span></span>
                  <span>Cajero: <span className="text-white">ID 408</span></span>
                </div>
                {/* Billing processing button */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="bg-accent-teal hover:brightness-110 text-black text-center rounded-xl font-bold py-2.5 shadow-[0_0_12px_rgba(0,232,198,0.25)] transition-all cursor-pointer">
                    Cobrar ₡300,000
                  </div>
                  <div className="text-[7px] text-center text-text-muted animate-pulse">
                    Validando con Hacienda...
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Device 3: Smartphone Mockup (z-20, Upgraded iPhone Pro Executive App) */}
          <div
            className="absolute right-[3%] top-[6%] w-[215px] h-[400px] z-20 backdrop-blur-2xl bg-[#07070A]/85 border-[4px] border-[#1e1e24] ring-1 ring-white/15 rounded-[2.6rem] p-3.5 shadow-[0_45px_100px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.15)] transition-all duration-300 hover:border-accent-teal/40 hover:shadow-[0_45px_80px_rgba(0,232,198,0.25)] group/phone flex flex-col justify-between overflow-hidden"
          >
            {/* Physical Button Mockups on Rim */}
            <div className="absolute -left-[4px] top-[80px] w-[3px] h-[25px] bg-[#2E2E38] rounded-l-md" />
            <div className="absolute -left-[4px] top-[115px] w-[3px] h-[25px] bg-[#2E2E38] rounded-l-md" />
            <div className="absolute -right-[4px] top-[95px] w-[3px] h-[40px] bg-[#2E2E38] rounded-r-md" />

            {/* Glossy glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.08] pointer-events-none z-30 rounded-[2.4rem] border border-white/10" />
            
            {/* Top iOS Status Bar & Dynamic Island */}
            <div className="relative z-10 flex items-center justify-between px-2 pt-0.5 pb-1">
              <span className="font-sans text-[8px] font-semibold text-white/95">9:41</span>
              
              {/* Dynamic Island Capsule */}
              <div className="w-[64px] h-[18px] bg-[#000000] border border-white/10 rounded-full flex items-center justify-between px-2 relative shadow-inner">
                {/* Camera lens */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#101015] border border-white/5 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-[#0d2a4a]" />
                </div>
                {/* Active indicator dot */}
                <span className="w-1 h-1 rounded-full bg-accent-teal shadow-[0_0_4px_#00E8C6] animate-pulse" />
              </div>

              <div className="flex items-center gap-1.5 text-white/80">
                {/* Cellular Signal Strength Bars */}
                <svg className="w-3 h-2.5 text-white/90" fill="currentColor" viewBox="0 0 120 120">
                  <rect x="10" y="80" width="15" height="30" rx="3" />
                  <rect x="35" y="60" width="15" height="50" rx="3" />
                  <rect x="60" y="40" width="15" height="70" rx="3" />
                  <rect x="85" y="10" width="15" height="100" rx="3" fill="currentColor" className="text-accent-teal" />
                </svg>
                {/* WiFi Arc Icon */}
                <svg className="w-3 h-2.5 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21l-12-12a17 17 0 0 1 24 0z" />
                </svg>
                {/* Battery Rim + Fill */}
                <div className="w-[18px] h-[9px] border border-white/40 rounded-[3px] p-[1px] flex items-center relative">
                  <div className="h-full w-[80%] bg-accent-teal rounded-[1px]" />
                  <div className="w-[1.5px] h-[3px] bg-white/40 absolute -right-[2.5px] rounded-r-[1px]" />
                </div>
              </div>
            </div>

            {/* Premium App Bar Header */}
            <div className="relative z-10 px-1 pb-1.5 border-b border-white/[0.06] flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-accent-gold/20 to-accent-teal/20 border border-white/10 flex items-center justify-center overflow-hidden">
                  <User className="w-3 h-3 text-accent-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[8.5px] font-bold text-white tracking-wide uppercase">NEXURA HQ</span>
                  <span className="font-sans text-[6px] text-text-muted">CEO Dashboard</span>
                </div>
              </div>
              <span className="font-mono text-[6.5px] text-accent-teal uppercase font-bold tracking-widest animate-pulse flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-accent-teal" /> LIVE
              </span>
            </div>

            {/* App Interface Scrollable Content Suite */}
            <div className="relative z-10 flex-1 flex flex-col gap-2 pt-2 justify-start overflow-hidden">
              {/* Section 1: KPI Business Metrics */}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-white/[0.02] border border-white/[0.04] p-1.5 rounded-lg flex flex-col justify-center shadow-inner">
                  <span className="font-mono text-[6px] text-text-muted uppercase">Ventas Hoy</span>
                  <span className="font-sans font-bold text-[9.5px] text-white mt-0.5">₡450,000</span>
                  <span className="font-mono text-[5.5px] text-accent-teal mt-0.5 font-bold">▲ +18%</span>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.04] p-1.5 rounded-lg flex flex-col justify-center shadow-inner">
                  <span className="font-mono text-[6px] text-text-muted uppercase">Clientes</span>
                  <span className="font-sans font-bold text-[9.5px] text-white mt-0.5">+18</span>
                  <span className="font-mono text-[5.5px] text-accent-gold mt-0.5 font-bold">★ Record</span>
                </div>
              </div>

              {/* Section 2: Real-time Sparkline Mini Area Graph */}
              <div className="bg-white/[0.02] border border-white/[0.04] p-1.5 rounded-lg flex flex-col justify-between shadow-inner h-[58px]">
                <div className="flex justify-between items-center border-b border-white/[0.03] pb-0.5">
                  <span className="font-mono text-[6px] text-text-muted uppercase">Rendimiento Operativo</span>
                  <span className="font-mono text-[6px] text-accent-teal">99.8%</span>
                </div>
                {/* SVG Mini Chart */}
                <svg viewBox="0 0 160 35" className="w-full h-[32px] overflow-visible">
                  <defs>
                    <linearGradient id="phone-chart-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 30 Q 30 5 60 20 T 120 10 T 160 18 L 160 35 L 0 35 Z"
                    fill="url(#phone-chart-fill)"
                  />
                  <path
                    d="M 0 30 Q 30 5 60 20 T 120 10 T 160 18"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="1.2"
                  />
                  <circle cx="120" cy="10" r="1.8" fill="#00E8C6" className="animate-pulse" />
                </svg>
              </div>

              {/* Section 3: Live System Push Notifications */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[6px] text-text-muted uppercase tracking-wider px-0.5">Actividad Omnicanal</span>
                
                {/* Notification Item 1 */}
                <div className="bg-white/[0.03] border border-white/[0.04] p-1.5 rounded-lg flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-teal shadow-[0_0_4px_#00E8C6] shrink-0" />
                    <span className="font-mono text-[7px] text-white/90 truncate">Caja 01: Factura Enviada</span>
                  </div>
                  <span className="font-mono text-[6.5px] text-accent-teal shrink-0">+₡300k</span>
                </div>
                
                {/* Notification Item 2 */}
                <div className="bg-white/[0.03] border border-white/[0.04] p-1.5 rounded-lg flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold shadow-[0_0_4px_#C9A84C] shrink-0" />
                    <span className="font-mono text-[7px] text-white/90 truncate">CRM: Contrato Firmado [Grupo Sur]</span>
                  </div>
                  <span className="font-mono text-[6.5px] text-accent-gold shrink-0">✓ Firmado</span>
                </div>
              </div>

              {/* Section 4: SaaS Targets Gauge Meter */}
              <div className="bg-white/[0.01] border border-white/[0.03] p-1.5 rounded-lg flex flex-col gap-1 mt-0.5">
                <div className="flex justify-between font-mono text-[6px] text-text-muted uppercase">
                  <span>Disponibilidad API</span>
                  <span className="text-white font-bold">99.9%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-teal rounded-full animate-pulse shadow-[0_0_4px_#00E8C6]" style={{ width: "99.9%" }} />
                </div>
              </div>
            </div>

            {/* Bottom iOS Navigation Bar */}
            <div className="relative z-10 border-t border-white/[0.06] pt-1.5 pb-0.5 flex justify-around items-center font-sans text-[11px] text-text-muted">
              <span className="text-accent-teal cursor-pointer hover:text-white transition-colors group">
                <Home className="w-4 h-4 text-accent-teal" />
              </span>
              <span className="cursor-pointer hover:text-white transition-colors group">
                <BarChart2 className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
              </span>
              <span className="cursor-pointer hover:text-white transition-colors group">
                <User className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
              </span>
              <span className="cursor-pointer hover:text-white transition-colors group">
                <Settings className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
              </span>
            </div>
          </div>

          {/* Subtle floating product suite tags */}
          <div className="absolute left-[3%] bottom-[6%] font-mono text-[8px] text-[#00E8C6]/12 hover:text-[#00E8C6]/35 transition-colors pointer-events-auto cursor-default">
            // OMNICHANNEL_SYNC // flawless
          </div>
          <div className="absolute right-[5%] top-[5%] font-mono text-[8px] text-[#C9A84C]/12 hover:text-[#C9A84C]/35 transition-colors pointer-events-auto cursor-default">
            // ANALYTICS_ENGINE // live
          </div>
          <div className="absolute left-[26%] top-[3%] font-mono text-[8px] text-white/5 hover:text-white/15 transition-colors pointer-events-auto cursor-default">
            // API_GATEWAY // active
          </div>
          <div className="absolute right-[28%] bottom-[3%] font-mono text-[8px] text-white/5 hover:text-white/15 transition-colors pointer-events-auto cursor-default">
            // REALTIME_REVENUE // fluid
          </div>
        </div>

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
            href={
              lang === "es"
                ? "https://wa.me/50685803868?text=Hola,%20me%20interesa%20agendar%20una%20consultoría%20para%20conocer%20más%20sobre%20el%20desarrollo%20de%20software%20a%20la%20medida%20para%20mi%20negocio."
                : "https://wa.me/50685803868?text=Hi,%20I%20am%20interested%20in%20scheduling%20a%20consultation%20to%20learn%20more%20about%20custom%20software%20development%20for%20my%20business."
            }
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
    </section>
  );
}
