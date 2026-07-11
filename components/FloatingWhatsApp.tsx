"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function FloatingWhatsApp() {
  const { lang } = useLanguage();

  const waNumber = "50685803868";
  const waMsg = encodeURIComponent(
    lang === "es"
      ? "Hola Nexura, quiero contarles sobre un sistema que necesito."
      : "Hello Nexura, I want to talk about a custom system I need."
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[26px] right-[26px] z-[90] w-[58px] h-[58px] rounded-full bg-[#1f2530] text-white flex items-center justify-center shadow-[0_16px_34px_-12px_rgba(11,14,20,0.45)] transition-all duration-300 ease-out hover:scale-[1.08] hover:bg-signal cursor-pointer"
      aria-label="Hablar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px]">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.32 4.94L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.13-4.9-4.32-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.29.29-.12.57.17.28.75 1.24 1.61 2.01 1.11 1 2.05 1.31 2.32 1.46.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.15.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.13.07.72-.17 1.4Z" />
      </svg>
    </a>
  );
}
