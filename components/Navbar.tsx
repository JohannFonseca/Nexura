import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* We use the logo.png we renamed */}
          <div className="relative h-12 w-40">
            <Image 
              src="/logo.png" 
              alt="Nexura Logo" 
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#inicio" className="hover:text-brand-800 transition-colors">Inicio</Link>
          <Link href="#proyectos" className="hover:text-brand-800 transition-colors">Proyectos</Link>
          <Link href="#servicios" className="hover:text-brand-800 transition-colors">Servicios</Link>
          <Link href="#nosotros" className="hover:text-brand-800 transition-colors">Nosotros</Link>
          <Link href="#contacto" className="bg-brand-800 text-white px-5 py-2.5 rounded-full hover:bg-brand-700 transition lg:ml-4 shadow-sm">
            Hablemos
          </Link>
        </nav>
        <button className="md:hidden p-2 text-slate-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
