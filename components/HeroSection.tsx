import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(30,58,138,0.05)] opacity-50 blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <h1 className="mx-auto max-w-4xl font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight text-slate-900 leading-[1.1]">
          We build digital solutions that <span className="text-brand-800">generate results</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-slate-600">
          Impulsamos el crecimiento de tu negocio mediante tecnología a la medida, automatización y diseño enfocado en la conversión de clientes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="https://wa.me/50685803868?text=Hola,%20quiero%20una%20solución%20digital%20para%20mi%20negocio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-brand-800 text-white px-8 py-4 rounded-full font-medium hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/20 transition-all duration-300">
            Contact via WhatsApp
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#proyectos" className="flex items-center gap-2 bg-white text-slate-800 border border-slate-200 px-8 py-4 rounded-full font-medium hover:bg-slate-50 transition-colors">
            Ver Proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
