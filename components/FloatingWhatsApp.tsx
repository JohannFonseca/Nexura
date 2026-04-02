import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="https://wa.me/50685803868?text=Hola,%20quiero%20una%20solución%20digital%20para%20mi%20negocio"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-xl shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-current text-white" />
        
        {/* Helper Ping animation */}
        <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-30 animate-ping -z-10"></span>
      </Link>
    </div>
  );
}
