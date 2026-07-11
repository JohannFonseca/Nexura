"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import gsap from "gsap";
import { 
  Phone, 
  PhoneOff, 
  Sparkles, 
  Copy, 
  Check, 
  Volume2, 
  Mic,
  MicOff
} from "lucide-react";

// Hardcoded Organization Credentials (100% brand-free, client-safe public keys)
const API_KEY = "9da1c562-2755-46ff-a8a6-398c1a40a8a2";
const ASSISTANT_ID = "889211b5-98aa-462a-86b0-6ca38e20c3b4";

export default function AiDemoSection() {
  const { t } = useLanguage();
  
  // State variables
  const [isCalling, setIsCalling] = useState(false);
  const [callState, setCallState] = useState<"idle" | "connecting" | "connected" | "ended">("idle");
  const [volume, setVolume] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<any>(null);

  // Initialize Client SDK dynamically (To prevent Next.js SSR "window is not defined" error)
  useEffect(() => {
    let activeClient: any = null;

    import("@vapi-ai/web").then((module) => {
      const WebClient = module.default;
      
      // Instantiate voice assistant client with organization public key
      const client = new WebClient(API_KEY);
      audioRef.current = client;
      activeClient = client;

      // Event hook for when call ends from server side or timeout
      client.on("call-end", () => {
        setIsCalling(false);
        setCallState("idle");
        setVolume(0);
      });
    }).catch(err => {
      console.error("Failed to load voice agent client:", err);
    });

    return () => {
      if (activeClient) {
        activeClient.stop();
      }
    };
  }, []);

  // IntersectionObserver reveal effect
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

  // GSAP phone 3D tilt effect on mouse move
  useEffect(() => {
    const phone = phoneRef.current;
    if (!phone) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = phone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const percentX = (x / rect.width) * 2 - 1;
      const percentY = (y / rect.height) * 2 - 1;
      
      gsap.to(phone, {
        rotateX: -percentY * 8,
        rotateY: percentX * 8,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000
      });
    };

    const handleMouseLeave = () => {
      gsap.to(phone, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    phone.addEventListener("mousemove", handleMouseMove);
    phone.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      phone.removeEventListener("mousemove", handleMouseMove);
      phone.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Timer Effect
  useEffect(() => {
    if (isCalling && callState === "connected") {
      setCallDuration(0);
      timerIntervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isCalling, callState]);

  // Handle Call Actions
  const handleStartCall = async () => {
    if (!audioRef.current) {
      alert("El motor de voz de IA se está inicializando. Por favor, intenta de nuevo en unos segundos.");
      return;
    }

    try {
      setCallState("connecting");
      setIsCalling(true);
      setIsMuted(false);

      // Pre-check browser microphone access and permissions
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (micErr) {
        console.error("Microphone access denied:", micErr);
        alert(
          "No se puede iniciar la llamada porque el navegador no tiene acceso al micrófono.\n\n" +
          "Por favor:\n" +
          "1. Haz clic en el icono del candado en la barra de direcciones del navegador.\n" +
          "2. Cambia el permiso de 'Micrófono' a 'Permitir' (Allow).\n" +
          "3. Asegúrate de que no estás en una red no segura (HTTP) si accedes desde tu móvil."
        );
        setCallState("idle");
        setIsCalling(false);
        return;
      }

      // Start WebRTC Call using hardcoded organization variables
      await audioRef.current.start(ASSISTANT_ID);

      // Subscribe to audio client events
      audioRef.current.on("call-start", () => {
        setCallState("connected");
      });

      audioRef.current.on("volume-level", (level: number) => {
        setVolume(level);
      });

      audioRef.current.on("error", (err: any) => {
        console.error("Audio connection error:", err);
        handleEndCall();
      });
      
    } catch (e) {
      console.error("Error executing WebRTC call:", e);
      setCallState("idle");
      setIsCalling(false);
    }
  };

  const handleEndCall = () => {
    if (audioRef.current) {
      audioRef.current.stop();
    }
    setIsCalling(false);
    setCallState("idle");
    setVolume(0);
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      const targetMute = !isMuted;
      audioRef.current.setMuted(targetMute);
      setIsMuted(targetMute);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text.replace(/[«»""]/g, ""));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <section
      ref={sectionRef}
      id="demo-ia"
      className="relative bg-bg-base z-20 py-28 border-t border-b border-white/[0.03] overflow-hidden"
    >
      <style jsx global>{`
        @keyframes soundwave-pulse {
          0%, 100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }
        .soundwave-bar {
          transform-origin: center;
          animation: soundwave-pulse 1.2s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient Glowing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[45vw] h-[45vw] min-w-[300px] rounded-full bg-accent-teal/5 blur-[120px] drift-2" />
        <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] min-w-[300px] rounded-full bg-accent-gold/5 blur-[130px] drift-3" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 reveal-hidden">
          <span className="font-mono text-xs text-accent-teal tracking-widest uppercase block mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-teal animate-pulse" />
            // {t.aiDemo.label}
          </span>
          <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3.2rem)] leading-tight text-text-primary mb-4">
            {t.aiDemo.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base text-text-muted">
            {t.aiDemo.subtext}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Info & Suggestions (Now taking up 7 cols for balanced layout) */}
          <div className="lg:col-span-7 flex flex-col gap-8 reveal-hidden">
            
            {/* Guide Info Card */}
            <div className="bg-surface-card border border-white/[0.04] p-6 sm:p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-teal/5 rounded-full blur-2xl pointer-events-none group-hover:bg-accent-teal/10 transition-colors duration-500" />
              
              <h3 className="font-syne font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-accent-teal" />
                {t.aiDemo.testInstructions}
              </h3>
              
              <p className="font-sans text-sm text-text-muted leading-relaxed mb-6">
                Hemos desarrollado una IA avanzada e integrada de forma nativa para el restaurante simulado <strong>Bistró Nexura</strong>. Puedes pedirle una mesa, preguntar por el menú de hoy, consultar alergias alimentarias o intentar cancelar tu reserva existente.
              </p>

              {/* Suggestions */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-accent-gold uppercase tracking-wider">
                  {t.aiDemo.samplePhrasesTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.aiDemo.samplePhrases.map((phrase, idx) => (
                    <button
                      key={idx}
                      onClick={() => copyToClipboard(phrase, idx)}
                      className="text-left bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 hover:border-accent-teal/20 p-3.5 rounded-2xl text-xs text-text-primary transition-all duration-300 flex justify-between items-start gap-3 group/btn relative cursor-pointer"
                    >
                      <span className="leading-relaxed">{phrase}</span>
                      <span className="shrink-0 mt-0.5 text-text-muted group-hover/btn:text-accent-teal transition-colors">
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-accent-teal" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: simulated glassmorphic phone (100% custom UI, WebRTC voice call) */}
          <div className="lg:col-span-5 flex justify-center reveal-hidden">
            
            {/* Phone Container */}
            <div 
              ref={phoneRef}
              className="relative w-full max-w-[320px] aspect-[9/18.5] bg-[#0A0A0F] rounded-[2.6rem] p-3 border-4 border-[#2E2E38] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_70px_-15px_rgba(0,232,198,0.06)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Outer Bezel Border Shadow */}
              <div className="absolute inset-0 rounded-[2.3rem] border border-white/5 pointer-events-none z-10" />
              
              {/* Screen Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.05] pointer-events-none z-20" />
              
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[72px] h-[19px] bg-black rounded-full z-40 border border-white/10 flex items-center justify-between px-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#101015] border border-white/5 flex items-center justify-center shrink-0">
                  <span className="w-0.5 h-0.5 rounded-full bg-[#0d2a4a]" />
                </span>
                {isCalling && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-teal shadow-[0_0_8px_#00E8C6] animate-pulse" />
                )}
              </div>

              {/* Status Header */}
              <div className="flex justify-between items-center px-6 pt-2.5 pb-2 text-[8px] font-sans text-white/70 select-none z-30 relative">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <svg className="w-2.5 h-2" fill="currentColor" viewBox="0 0 120 120">
                    <rect x="10" y="80" width="15" height="30" rx="3" />
                    <rect x="35" y="60" width="15" height="50" rx="3" />
                    <rect x="60" y="40" width="15" height="70" rx="3" />
                    <rect x="85" y="10" width="15" height="100" rx="3" className="text-accent-teal" />
                  </svg>
                  <span>5G</span>
                  <div className="w-[14px] h-[7px] border border-white/30 rounded-[2px] p-[0.5px] flex items-center relative">
                    <div className="h-full w-[80%] bg-accent-teal rounded-[0.5px]" />
                  </div>
                </div>
              </div>

              {/* CORE SCREEN CONTENT */}
              <div className="w-full h-[calc(100%-25px)] rounded-[2.1rem] bg-[#07070A] overflow-hidden relative border border-white/[0.02] flex flex-col justify-between">
                
                {/* 1. Custom Calling Interface (NO IFRAME, 100% Brand-Free WebRTC Calling) */}
                {isCalling ? (
                  <div className="absolute inset-0 z-30 bg-[#07070A] flex flex-col justify-between py-10 px-6">
                    
                    {/* Status Header */}
                    <div className="text-center space-y-1">
                      <span className="font-mono text-[8px] text-accent-teal uppercase tracking-widest block font-semibold animate-pulse">
                        {callState === "connecting" ? "Conectando..." : "Llamada Activa"}
                      </span>
                      <h4 className="font-syne font-extrabold text-base text-white tracking-wide">
                        Bistró Nexura
                      </h4>
                      <span className="font-mono text-[9px] text-text-muted block">
                        {formatTime(callDuration)}
                      </span>
                    </div>

                    {/* Central Audio Reactive Glowing Sphere (Volume reactive animation) */}
                    <div className="flex items-center justify-center relative my-4">
                      {/* Interactive pulsing glow sphere based on voice volume */}
                      <div 
                        className="absolute w-28 h-28 rounded-full bg-accent-teal/5 border border-accent-teal/15 blur-md transition-all duration-75 flex items-center justify-center"
                        style={{ 
                          transform: `scale(${1 + volume * 1.5})`,
                          opacity: callState === "connected" ? 0.8 : 0.3
                        }}
                      />
                      <div 
                        className="absolute w-24 h-24 rounded-full bg-accent-gold/5 border border-accent-gold/15 blur-sm transition-all duration-75"
                        style={{ 
                          transform: `scale(${1 + volume * 0.9})`,
                          opacity: callState === "connected" ? 0.7 : 0.2
                        }}
                      />
                      
                      {/* Main central avatar sphere */}
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-accent-gold/10 to-accent-teal/10 border border-white/10 flex items-center justify-center shadow-2xl z-10">
                        <Volume2 className={`w-8 h-8 text-accent-teal transition-transform duration-75 ${callState === "connected" && volume > 0.05 ? "scale-110" : ""}`} />
                      </div>
                    </div>

                    {/* Status details */}
                    <div className="text-center px-4">
                      <p className="font-sans text-[10px] text-text-muted leading-relaxed">
                        {callState === "connecting" 
                          ? "Iniciando canal de voz seguro..." 
                          : "Habla naturalmente con nuestro asistente de voz de IA."}
                      </p>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center justify-center gap-6">
                      
                      {/* Mute button */}
                      <button
                        onClick={handleToggleMute}
                        className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          isMuted 
                            ? "bg-accent-gold/20 border-accent-gold/40 text-accent-gold" 
                            : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                        }`}
                        title={isMuted ? "Activar Micrófono" : "Silenciar Micrófono"}
                      >
                        {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>

                      {/* Hang up button */}
                      <button
                        onClick={handleEndCall}
                        className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-red-500/35 transition-all cursor-pointer"
                        title={t.aiDemo.phoneBtnHangup}
                      >
                        <PhoneOff className="w-5 h-5 rotate-135" />
                      </button>

                    </div>
                  </div>
                ) : (
                  // 2. Idle State - Bistro UI with call triggers
                  <>
                    {/* Bistro Mock Brand Header */}
                    <div className="pt-8 px-5 text-center flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-gold/20 to-accent-teal/20 border border-white/10 flex items-center justify-center text-accent-gold shadow-lg shadow-accent-gold/5">
                        <Volume2 className="w-6 h-6" />
                      </div>
                      
                      <div className="flex flex-col gap-0.5">
                        <h4 className="font-syne font-extrabold text-sm text-white tracking-wide">
                          Bistró Nexura
                        </h4>
                        <span className="font-mono text-[8px] text-accent-teal tracking-widest uppercase">
                          AI Reservation Agent
                        </span>
                      </div>
                    </div>

                    {/* Mid description */}
                    <div className="px-5 text-center flex flex-col justify-center flex-1 py-4">
                      <p className="font-sans text-[10px] text-text-muted leading-relaxed">
                        {t.aiDemo.phoneIdleText}
                      </p>
                    </div>

                    {/* Calling Button */}
                    <div className="pb-8 px-5 flex flex-col items-center gap-4">
                      
                      {/* Idle Soundwave Placeholder */}
                      <div className="flex items-center justify-center gap-1.5 h-12 w-full max-w-[160px]">
                        {[0.1, 0.3, 0.5, 0.2, 0.4, 0.6].map((delay, idx) => (
                          <div 
                            key={idx}
                            className="w-1.5 bg-white/5 rounded-full soundwave-bar"
                            style={{ 
                              animationDelay: `${delay}s`, 
                              height: "16px",
                              animationPlayState: "paused" 
                            }}
                          />
                        ))}
                      </div>

                      {/* Main Trigger Button */}
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-accent-teal/20 animate-ping pointer-events-none" />
                        <button
                          onClick={handleStartCall}
                          className="relative z-10 w-16 h-16 rounded-full bg-accent-teal hover:bg-accent-teal hover:shadow-[0_0_30px_rgba(0,232,198,0.6)] active:scale-95 text-[#07070A] flex items-center justify-center transition-all duration-300 cursor-pointer"
                          title={t.aiDemo.phoneBtnCall}
                        >
                          <Phone className="w-6 h-6 text-black fill-black" />
                        </button>
                      </div>
                      
                      <span className="font-sans text-[9px] font-semibold text-white/55 uppercase tracking-wider select-none">
                        {t.aiDemo.phoneBtnCall}
                      </span>

                    </div>
                  </>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
