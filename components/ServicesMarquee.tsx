"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function ServicesMarquee() {
  const { lang } = useLanguage();

  const servicesEs = [
    "Sistemas Web a Medida",
    "Tiendas Virtuales",
    "Puntos de Venta (POS)",
    "Integración con WhatsApp",
    "Automatización de Ventas",
    "Sistemas de Reservas",
    "Gestión de Inventario"
  ];

  const servicesEn = [
    "Custom Web Systems",
    "Online Stores",
    "Point of Sale (POS)",
    "WhatsApp Integration",
    "Sales Automation",
    "Booking Systems",
    "Inventory Management"
  ];

  const list = lang === "es" ? servicesEs : servicesEn;
  
  // Duplicamos la lista varias veces para un efecto infinito sin cortes
  const duplicatedList = [...list, ...list, ...list, ...list];

  return (
    <div className="mt-12 border-t border-b border-line py-5 relative z-10 bg-bg overflow-hidden flex whitespace-nowrap">
      
      {/* Gradientes en los bordes para un efecto suave */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg to-transparent z-20 pointer-events-none" />

      <div className="flex w-fit animate-marquee items-center gap-10 md:gap-14 px-5">
        {duplicatedList.map((service, idx) => (
          <div key={idx} className="flex items-center gap-10 md:gap-14">
            <span className="font-mono text-[12.5px] tracking-wider text-ink-soft select-none font-medium uppercase transition-colors hover:text-ink">
              {service}
            </span>
            {/* Punto separador limpio */}
            <span className="w-1 h-1 rounded-full bg-ink-soft/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
