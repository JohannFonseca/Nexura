import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function ContactSection({ dict }: { dict: any }) {
  return (
    <section id="contacto" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-brand-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-2xl shadow-brand-900/20 relative overflow-hidden">
          {/* Subtle patterns */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/5 blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-brand-500/20 blur-[80px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {dict.contact.title}
            </h2>
            <p className="text-brand-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              {dict.contact.subtitle}
            </p>
            
            <Link 
              href={`https://wa.me/50685803868?text=${encodeURIComponent(dict.contact.whatsappMessage)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-brand-900 px-8 py-5 rounded-full font-bold text-lg hover:bg-brand-50 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <MessageCircle className="w-6 h-6 text-green-500" />
              {dict.contact.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
